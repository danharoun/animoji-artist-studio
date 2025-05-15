
# OSC Backend Server

This is a simple Node.js backend server for handling OSC (Open Sound Control) communication.

## Setup

1. Install dependencies:
```
npm install express cors osc socket.io
```

2. Run the server:
```
node server.js
```

The server will run on port 3000 by default, or you can set the PORT environment variable.

## API Endpoints

- GET `/api/osc/settings` - Get current OSC settings
- POST `/api/osc/settings` - Update OSC settings (send IP and port in request body)
- POST `/api/osc/message` - Send OSC message (send address and args in request body)

## Socket.IO Events

- `osc:status` - Server emits this event when OSC status changes
