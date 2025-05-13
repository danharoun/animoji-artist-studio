
import React, { useState, useEffect } from 'react';
import AnimationButton from './AnimationButton';
import AnimationPanel from './AnimationPanel';
import { FACE_ANIMATIONS } from '@/lib/osc';
import { Smile, Frown, Meh, Laugh, Angry } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const FaceAnimations: React.FC = () => {
  const [activeAnimation, setActiveAnimation] = useState<string | null>(null);
  const [autoReset, setAutoReset] = useState(true);

  const handleAnimationChange = (address: string) => {
    setActiveAnimation(address);
  };

  // Reset active animation after 2 seconds if autoReset is enabled
  useEffect(() => {
    if (activeAnimation && autoReset) {
      const timer = setTimeout(() => {
        setActiveAnimation(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeAnimation, autoReset]);

  return (
    <AnimationPanel
      title="Face Animations"
      description="Control facial expressions and emotions of AIMAN, our AI Chef"
      className="panel-gradient-face"
    >
      <div className="flex items-center mb-4 space-x-2">
        <Switch
          id="auto-reset"
          checked={autoReset}
          onCheckedChange={setAutoReset}
        />
        <Label htmlFor="auto-reset">Auto-reset animations</Label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <AnimationButton
          icon={<Meh size={24} />}
          label="Default"
          address={FACE_ANIMATIONS.DEFAULT}
          isActive={activeAnimation === FACE_ANIMATIONS.DEFAULT}
          onChange={handleAnimationChange}
          className="bg-purple-800/20 hover:bg-purple-700/30"
        />
        
        <AnimationButton
          icon={<Smile size={24} />}
          label="IDLE"
          address={FACE_ANIMATIONS.IDLE}
          isActive={activeAnimation === FACE_ANIMATIONS.IDLE}
          onChange={handleAnimationChange}
          className="bg-purple-800/20 hover:bg-purple-700/30"
        />
        
        <AnimationButton
          icon={<Meh size={24} className="text-yellow-500" />}
          label="Shocked"
          address={FACE_ANIMATIONS.SHOCKED}
          isActive={activeAnimation === FACE_ANIMATIONS.SHOCKED}
          onChange={handleAnimationChange}
          className="bg-purple-800/20 hover:bg-purple-700/30"
        />
        
        <AnimationButton
          icon={<Laugh size={24} className="text-green-500" />}
          label="Happy"
          address={FACE_ANIMATIONS.HAPPY}
          isActive={activeAnimation === FACE_ANIMATIONS.HAPPY}
          onChange={handleAnimationChange}
          className="bg-purple-800/20 hover:bg-purple-700/30"
        />
        
        <AnimationButton
          icon={<Frown size={24} className="text-blue-500" />}
          label="Concerned"
          address={FACE_ANIMATIONS.CONCERNED}
          isActive={activeAnimation === FACE_ANIMATIONS.CONCERNED}
          onChange={handleAnimationChange}
          className="bg-purple-800/20 hover:bg-purple-700/30"
        />
        
        <AnimationButton
          icon={<Angry size={24} className="text-red-500" />}
          label="Angry"
          address={FACE_ANIMATIONS.ANGRY}
          isActive={activeAnimation === FACE_ANIMATIONS.ANGRY}
          onChange={handleAnimationChange}
          className="bg-purple-800/20 hover:bg-purple-700/30"
        />
      </div>
    </AnimationPanel>
  );
};

export default FaceAnimations;
