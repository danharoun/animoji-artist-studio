
import React from 'react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';

interface EmotionSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  color?: string;
}

const EmotionSlider: React.FC<EmotionSliderProps> = ({
  label,
  value,
  onChange,
  className,
  color = "bg-primary"
}) => {
  const handleChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };

  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-muted-foreground">
          {label}
        </label>
        <span className="text-xs font-medium text-foreground">
          {Math.round(value * 100)}%
        </span>
      </div>
      <Slider
        value={[value]}
        min={0}
        max={1}
        step={0.01}
        onValueChange={handleChange}
        className="cursor-pointer"
      />
    </div>
  );
};

export default EmotionSlider;
