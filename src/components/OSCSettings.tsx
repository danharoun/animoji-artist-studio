
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getOSCSettings, updateOSCSettings } from '@/lib/osc';
import { Settings } from 'lucide-react';

const OSCSettings: React.FC = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(getOSCSettings());

  const handleSaveSettings = () => {
    updateOSCSettings(settings);
    toast({
      title: 'OSC Settings Updated',
      description: `Connection set to ${settings.ip}:${settings.port}`,
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
        <div className="space-y-2">
          <label htmlFor="ip" className="text-sm font-medium">IP Address</label>
          <Input 
            id="ip"
            value={settings.ip}
            onChange={(e) => setSettings({ ...settings, ip: e.target.value })}
            placeholder="127.0.0.1"
          />
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
              setIsOpen(false);
            }}
          >
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OSCSettings;
