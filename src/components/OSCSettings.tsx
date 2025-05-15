
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getOSCSettings, updateOSCSettings } from '@/lib/osc';
import { Settings, CheckCircle, XCircle } from 'lucide-react';

const OSCSettings: React.FC = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(getOSCSettings());
  const [connectionStatus, setConnectionStatus] = useState({ connected: false, lastChecked: Date.now() });

  // Update connection status periodically
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        const current = getOSCSettings();
        setConnectionStatus({ 
          connected: current.connected || false, 
          lastChecked: Date.now() 
        });
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleSaveSettings = () => {
    const result = updateOSCSettings(settings);
    setConnectionStatus({ 
      connected: result.connected || false,
      lastChecked: Date.now() 
    });
    
    toast({
      title: 'OSC Settings Updated',
      description: `Connection ${result.connected ? 'established' : 'attempted'} to ${settings.ip}:${settings.port}`,
      duration: 2000,
    });
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
            onClick={() => {
              handleSaveSettings();
            }}
          >
            Save & Connect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OSCSettings;
