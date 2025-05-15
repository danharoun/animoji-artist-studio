
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getOSCSettings, updateOSCSettings, useOSCStatus } from '@/lib/api';
import { Settings, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const OSCSettings: React.FC = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({ ip: '127.0.0.1', port: 8000, connected: false });
  const [connectionStatus, setConnectionStatus] = useState({ connected: false, lastChecked: Date.now() });
  const [isBackendAvailable, setIsBackendAvailable] = useState<boolean | null>(null);
  
  // Check if backend is available
  useEffect(() => {
    if (isOpen) {
      fetch(`${import.meta.env.DEV ? 'http://localhost:3000' : ''}/api/osc/settings`)
        .then(response => {
          setIsBackendAvailable(response.ok);
          return response.json();
        })
        .then(data => {
          setSettings(data);
          setConnectionStatus({
            connected: data.connected,
            lastChecked: Date.now()
          });
        })
        .catch(error => {
          console.error('Backend connection error:', error);
          setIsBackendAvailable(false);
        });
    }
  }, [isOpen]);

  // Periodically refresh status when dialog is open
  useEffect(() => {
    if (isOpen && isBackendAvailable) {
      const interval = setInterval(() => {
        getOSCSettings()
          .then(data => {
            setSettings(data);
            setConnectionStatus({
              connected: data.connected,
              lastChecked: Date.now()
            });
          })
          .catch(() => {
            setConnectionStatus(prev => ({
              ...prev,
              connected: false,
              lastChecked: Date.now()
            }));
          });
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isOpen, isBackendAvailable]);

  const handleSaveSettings = async () => {
    if (!isBackendAvailable) {
      toast({
        title: 'Backend Not Available',
        description: 'The OSC backend server is not running. Please start it first.',
        variant: 'destructive',
        duration: 5000,
      });
      return;
    }

    try {
      const result = await updateOSCSettings(settings);
      setConnectionStatus({ 
        connected: result.connected,
        lastChecked: Date.now() 
      });
      
      toast({
        title: 'OSC Settings Updated',
        description: `Connection ${result.connected ? 'established' : 'attempted'} to ${settings.ip}:${settings.port}`,
        duration: 2000,
      });
    } catch (error) {
      console.error('Failed to update OSC settings:', error);
      toast({
        title: 'Failed to update OSC settings',
        description: 'An error occurred while updating OSC settings',
        variant: 'destructive',
        duration: 3000,
      });
    }
  };

  if (!isOpen) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1"
        onClick={() => setIsOpen(true)}
      >
        <Settings size={16} />
        <span className="hidden md:inline">OSC Settings</span>
      </Button>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          OSC Connection Settings
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsOpen(false)}
          >
            ✕
          </Button>
        </CardTitle>
        <CardDescription>
          Configure connection to your OSC server
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isBackendAvailable === false && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-3 mb-4">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-600 dark:text-amber-400" />
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                Backend server not detected
              </p>
            </div>
            <p className="text-xs mt-1 text-amber-700 dark:text-amber-400">
              Please start the OSC backend server: <code>node backend/server.js</code>
            </p>
          </div>
        )}
      
        <div className="flex items-center gap-2 text-sm pb-1">
          <span>Connection status:</span>
          {connectionStatus.connected ? (
            <span className="flex items-center text-green-500">
              <CheckCircle size={16} className="mr-1" />
              Connected
            </span>
          ) : (
            <span className="flex items-center text-red-500">
              <XCircle size={16} className="mr-1" />
              Not connected
            </span>
          )}
        </div>
      
        <div className="space-y-2">
          <label htmlFor="ip" className="text-sm font-medium">IP Address</label>
          <Input 
            id="ip"
            value={settings.ip}
            onChange={(e) => setSettings({ ...settings, ip: e.target.value })}
            placeholder="127.0.0.1"
          />
          <p className="text-xs text-muted-foreground">
            Enter the IP address of your OSC server (not localhost if on different machine)
          </p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="port" className="text-sm font-medium">Port</label>
          <Input 
            id="port"
            type="number"
            value={settings.port}
            onChange={(e) => setSettings({ ...settings, port: parseInt(e.target.value) || 8000 })}
            placeholder="8000"
          />
          <p className="text-xs text-muted-foreground">
            Make sure this port matches the listening port on your OSC server
          </p>
        </div>
        
        <div className="flex justify-end gap-2 pt-2">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveSettings}
            disabled={!isBackendAvailable}
          >
            Save & Connect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OSCSettings;
