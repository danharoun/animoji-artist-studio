
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { sendOSCMessage } from '@/lib/osc';
import { useToast } from '@/components/ui/use-toast';

interface AnimationButtonProps {
  icon: React.ReactNode;
  label: string;
  address: string;
  className?: string;
  activeColor?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const AnimationButton: React.FC<AnimationButtonProps> = ({
  icon,
  label,
  address,
  className,
  activeColor = 'bg-primary/20 text-primary border-primary/50',
  isActive = false,
  onClick
}) => {
  const { toast } = useToast();

  const handleClick = async () => {
    try {
      await sendOSCMessage(address);
      toast({
        title: "Animation triggered",
        description: `Sent command to ${address}`,
        duration: 2000,
      });
      if (onClick) onClick();
    } catch (error) {
      toast({
        title: "Failed to send command",
        description: `Error sending to ${address}`,
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <Button
      variant="outline"
      className={cn(
        "h-auto min-h-16 flex flex-col items-center justify-center gap-1 p-3 transition-all duration-300 border-2",
        isActive ? activeColor : "hover:bg-card/80",
        className
      )}
      onClick={handleClick}
    >
      <div className={cn(
        "text-xl mb-1 transition-transform duration-300",
        isActive ? "scale-110 text-primary" : ""
      )}>
        {icon}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </Button>
  );
};

export default AnimationButton;
