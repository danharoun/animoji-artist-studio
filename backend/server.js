
const express = require('express');
const path = require('path');
const cors = require('cors');
const osc = require('osc');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// OSC configuration
let oscPort = null;
let oscSettings = {
  ip: '127.0.0.1',
  port: 8000,
  connected: false
};

// Initialize OSC connection
function initializeOSC() {
  try {
    if (oscPort) {
      try {
        oscPort.close();
      } catch (e) {
        console.log('Error closing existing OSC port:', e);
      }
    }

    // Create a new OSC UDP Port
    oscPort = new osc.UDPPort({
      localAddress: "0.0.0.0",
      localPort: 0, // Use any available port for sending
      remoteAddress: oscSettings.ip,
      remotePort: oscSettings.port,
      metadata: true
    });

    // Open the port
    oscPort.open();
    
    // Log when port is ready
    oscPort.on("ready", () => {
      console.log(`OSC Port ready - sending to ${oscSettings.ip}:${oscSettings.port}`);
      oscSettings.connected = true;
      io.emit('osc:status', oscSettings);
    });

    // Log any OSC errors
    oscPort.on("error", (error) => {
      console.error("OSC Port error:", error);
      oscSettings.connected = false;
      io.emit('osc:status', oscSettings);
    });

    return true;
  } catch (error) {
    console.error("Failed to initialize OSC:", error);
    oscSettings.connected = false;
    io.emit('osc:status', oscSettings);
    return false;
  }
}

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoints
app.get('/api/osc/settings', (req, res) => {
  res.json(oscSettings);
});

app.post('/api/osc/settings', (req, res) => {
  const { ip, port } = req.body;
  oscSettings.ip = ip || oscSettings.ip;
  oscSettings.port = parseInt(port) || oscSettings.port;
  
  const success = initializeOSC();
  oscSettings.connected = success;
  
  io.emit('osc:status', oscSettings);
  res.json(oscSettings);
});

app.post('/api/osc/message', (req, res) => {
  const { address, args } = req.body;
  
  if (!oscPort || !oscPort.options || !oscPort.options.socket) {
    return res.status(500).json({ error: 'OSC connection not available' });
  }
  
  try {
    oscPort.send({
      address,
      args: args.map(arg => ({
        type: typeof arg === 'number' ? 'f' : 's',
        value: arg
      }))
    });
    
    console.log(`Sent OSC message to ${oscSettings.ip}:${oscSettings.port} - ${address}:`, args);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending OSC message:', error);
    res.status(500).json({ error: 'Failed to send OSC message' });
  }
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Send current OSC status to newly connected client
  socket.emit('osc:status', oscSettings);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Initialize OSC on startup
initializeOSC();

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
