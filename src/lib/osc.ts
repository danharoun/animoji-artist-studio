
/**
 * OSC Messaging Utility for Digital Human Animation
 */
import { UDPPort } from 'osc';

// Default OSC connection settings
const DEFAULT_OSC_SETTINGS = {
  ip: '127.0.0.1',
  port: 8000
};

// Store the current OSC settings
let oscSettings = { ...DEFAULT_OSC_SETTINGS };

// OSC port instance
let oscPort: any = null;

// Initialize OSC port
const initializeOSC = () => {
  try {
    if (oscPort) {
      // Close existing connection if it exists
      try {
        oscPort.close();
      } catch (e) {
        console.log('Error closing existing OSC port:', e);
      }
    }

    // Create a new OSC UDP Port
    oscPort = new UDPPort({
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
    });

    // Log any OSC errors
    oscPort.on("error", (error: any) => {
      console.error("OSC Port error:", error);
    });

    return true;
  } catch (error) {
    console.error("Failed to initialize OSC:", error);
    return false;
  }
};

// Allow updating the OSC connection settings
export const updateOSCSettings = (newSettings: Partial<typeof DEFAULT_OSC_SETTINGS>) => {
  oscSettings = { ...oscSettings, ...newSettings };
  console.log('OSC settings updated:', oscSettings);
  
  // Re-initialize the OSC connection with new settings
  const success = initializeOSC();
  return { ...oscSettings, connected: success };
};

// Get current OSC settings
export const getOSCSettings = () => {
  return { 
    ...oscSettings, 
    connected: oscPort?.options?.socket?.readable || false 
  };
};

// Send actual OSC messages
export const sendOSCMessage = (address: string, ...args: any[]) => {
  const { ip, port } = oscSettings;
  console.log(`Sending OSC message to ${ip}:${port} - ${address}:`, args);
  
  // Initialize OSC connection if not already done
  if (!oscPort) {
    initializeOSC();
  }
  
  return new Promise<boolean>((resolve, reject) => {
    try {
      if (!oscPort || !oscPort.options.socket) {
        console.error("No OSC connection available");
        resolve(false);
        return;
      }
      
      // Send the OSC message
      oscPort.send({
        address: address,
        args: args.map(arg => ({
          type: typeof arg === 'number' ? 'f' : 's',
          value: arg
        }))
      });
      
      resolve(true);
    } catch (error) {
      console.error("Error sending OSC message:", error);
      reject(error);
    }
  });
};

// Body animation commands
export const BODY_ANIMATIONS = {
  SIT: "/Animation/BodySit/",
  IDLE: "/Animation/Body/IDLE",
  SPEAKING_SIT: "/Animation/Body/SpeakingSit",
  SPEAKING_INTERROGATIVE: "/Animation/Body/SpeakingSit/Interrogative",
  SPEAKING_EXCLAMATIVE: "/Animation/Body/SpeakingSit/Exclamative",
  SPEAKING_SAD: "/Animation/Body/SpeakingSit/Sad",
  SPEAKING_ANGRY: "/Animation/Body/SpeakingSit/Angry",
  SPEAKING_FEAR: "/Animation/Body/SpeakingSit/Fear",
  SPEAKING_HAPPY: "/Animation/Body/SpeakingSit/Happy",
  SPEAKING_HESITATION: "/Animation/Body/SpeakingSit/Hesitation",
};

// Face animation commands
export const FACE_ANIMATIONS = {
  DEFAULT: "/Animation/Face",
  IDLE: "/Animation/Face/IDLE",
  SHOCKED: "/Animation/Face/Shots/Shocked",
  HAPPY: "/Animation/Face/Happy",
  CONCERNED: "/Animation/Face/Concerned",
  ANGRY: "/Animation/Face/Angry",
};

// Emotion types
export type EmotionValues = {
  amazement: number;
  anger: number;
  cheekiness: number;
  disgust: number;
  fear: number;
  grief: number;
  joy: number;
  outofbreath: number;
  pain: number;
  sadness: number;
};

// Send emotion values (0-1) to audio2face
export const sendEmotions = (emotions: EmotionValues) => {
  const values = [
    emotions.amazement,
    emotions.anger,
    emotions.cheekiness,
    emotions.disgust,
    emotions.fear,
    emotions.grief,
    emotions.joy,
    emotions.outofbreath,
    emotions.pain,
    emotions.sadness,
  ];
  
  return sendOSCMessage("/Animation/Face", ...values);
};

// Initialize OSC connection on module load
initializeOSC();
