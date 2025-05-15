
import { useEffect, useState } from 'react';

// Define base URL for API
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3000' : '';

// Define OSC settings type
export type OSCSettingsType = {
  ip: string;
  port: number;
  connected: boolean;
};

// Get current OSC settings
export const getOSCSettings = async (): Promise<OSCSettingsType> => {
  const response = await fetch(`${API_BASE_URL}/api/osc/settings`);
  return response.json();
};

// Update OSC settings
export const updateOSCSettings = async (settings: Partial<OSCSettingsType>): Promise<OSCSettingsType> => {
  const response = await fetch(`${API_BASE_URL}/api/osc/settings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(settings)
  });
  return response.json();
};

// Send OSC message
export const sendOSCMessage = async (address: string, ...args: any[]): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/osc/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ address, args })
    });
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Failed to send OSC message:', error);
    return false;
  }
};

// Hook for OSC status
export const useOSCStatus = () => {
  const [status, setStatus] = useState<OSCSettingsType>({
    ip: '127.0.0.1',
    port: 8000,
    connected: false
  });

  useEffect(() => {
    // Get initial status
    getOSCSettings().then(setStatus).catch(console.error);
    
    // Set up polling for status updates
    const interval = setInterval(() => {
      getOSCSettings().then(setStatus).catch(console.error);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return status;
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

// Send emotion values to audio2face
export const sendEmotions = async (emotions: EmotionValues): Promise<boolean> => {
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
