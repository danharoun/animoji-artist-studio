
/**
 * OSC Messaging Utility for Digital Human Animation
 */

// Default OSC connection settings
const DEFAULT_OSC_SETTINGS = {
  ip: '127.0.0.1',
  port: 8000
};

// Store the current OSC settings
let oscSettings = { ...DEFAULT_OSC_SETTINGS };

// Allow updating the OSC connection settings
export const updateOSCSettings = (newSettings: Partial<typeof DEFAULT_OSC_SETTINGS>) => {
  oscSettings = { ...oscSettings, ...newSettings };
  console.log('OSC settings updated:', oscSettings);
  return oscSettings;
};

// Get current OSC settings
export const getOSCSettings = () => {
  return { ...oscSettings };
};

// In a real application, this would connect to an OSC server
export const sendOSCMessage = (address: string, ...args: any[]) => {
  const { ip, port } = oscSettings;
  console.log(`Sending OSC message to ${ip}:${port} - ${address}:`, args);
  // Here you would implement the actual OSC sending logic
  // using a library like osc.js or a backend API
  // Example: oscClient.send({ address, args, host: ip, port });
  
  // For now, we'll just simulate success
  return new Promise<boolean>((resolve) => {
    setTimeout(() => resolve(true), 100);
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
