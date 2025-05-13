
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimationPanelProps {
  title: string;
  children: ReactNode;
  className?: string;
  gradientClass?: string;
  icon?: ReactNode;
}

const AnimationPanel: React.FC<AnimationPanelProps> = ({ 
  title, 
  children, 
  className,
  gradientClass = "panel-gradient-body",
  icon
}) => {
  return (
    <div className={cn("animation-card p-4", gradientClass, className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="w-6 h-6 flex items-center justify-center">
              {icon}
            </div>
          )}
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        </div>
        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default AnimationPanel;
