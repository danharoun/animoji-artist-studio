
import React from 'react';
import { cn } from '@/lib/utils';
import { ChefHat } from 'lucide-react';
import OSCSettings from '@/components/OSCSettings';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("py-4 px-6 flex items-center justify-between bg-card/50 backdrop-blur-md border-b border-border/50", className)}>
      <div className="flex items-center space-x-2">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse-glow"></div>
          <div className="absolute inset-0.5 rounded-full bg-card flex items-center justify-center">
            <ChefHat className="h-6 w-6 text-gradient-to-r from-blue-500 to-purple-500" />
          </div>
        </div>
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            AIMAN Chef Animation Studio
          </h1>
          <p className="text-xs text-muted-foreground">AI Chef Animation Controller</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <OSCSettings />
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-xs text-muted-foreground">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
            Connected to OSC
          </div>
          <div className="h-4 w-px bg-border"></div>
          <div className="text-xs text-muted-foreground">v1.0.0</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
