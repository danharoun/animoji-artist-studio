
import React, { useState } from 'react';
import AnimationButton from './AnimationButton';
import AnimationPanel from './AnimationPanel';
import { FACE_ANIMATIONS } from '@/lib/osc';
import { Smile, Angry, Frown, Happy, Surprise, ArrowDown } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const FaceAnimations: React.FC = () => {
  const [activeAnimation, setActiveAnimation] = useState<string | null>(null);
  const [focusedLook, setFocusedLook] = useState(true);

  const handleAnimationClick = (animationAddress: string) => {
    setActiveAnimation(animationAddress);
  };

  return (
    <AnimationPanel 
      title="Face Animations" 
      gradientClass="panel-gradient-face"
      icon={<ArrowDown size={18} className="text-purple-400" />}
    >
      <div className="flex items-center space-x-2 mb-4">
        <Switch 
          id="focused-look" 
          checked={focusedLook} 
          onCheckedChange={setFocusedLook} 
        />
        <Label htmlFor="focused-look" className="text-xs">
          {focusedLook ? 'Focused Look' : 'Unfocused Look'}
        </Label>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        <AnimationButton
          icon={<ArrowDown size={24} />}
          label="Default"
          address={FACE_ANIMATIONS.DEFAULT}
          isActive={activeAnimation === FACE_ANIMATIONS.DEFAULT}
          onClick={() => handleAnimationClick(FACE_ANIMATIONS.DEFAULT)}
          activeColor="bg-purple-500/20 text-purple-500 border-purple-500/50"
        />
        
        <AnimationButton
          icon={<Surprise size={24} />}
          label="IDLE"
          address={FACE_ANIMATIONS.IDLE}
          isActive={activeAnimation === FACE_ANIMATIONS.IDLE}
          onClick={() => handleAnimationClick(FACE_ANIMATIONS.IDLE)}
          activeColor="bg-purple-500/20 text-purple-500 border-purple-500/50"
        />
        
        <AnimationButton
          icon={<Surprise size={24} />}
          label="Shocked"
          address={FACE_ANIMATIONS.SHOCKED}
          isActive={activeAnimation === FACE_ANIMATIONS.SHOCKED}
          onClick={() => handleAnimationClick(FACE_ANIMATIONS.SHOCKED)}
          activeColor="bg-purple-500/20 text-purple-500 border-purple-500/50"
        />
        
        <AnimationButton
          icon={<Happy size={24} />}
          label="Happy"
          address={FACE_ANIMATIONS.HAPPY}
          isActive={activeAnimation === FACE_ANIMATIONS.HAPPY}
          onClick={() => handleAnimationClick(FACE_ANIMATIONS.HAPPY)}
          activeColor="bg-purple-500/20 text-purple-500 border-purple-500/50"
        />
        
        <AnimationButton
          icon={<Frown size={24} />}
          label="Concerned"
          address={FACE_ANIMATIONS.CONCERNED}
          isActive={activeAnimation === FACE_ANIMATIONS.CONCERNED}
          onClick={() => handleAnimationClick(FACE_ANIMATIONS.CONCERNED)}
          activeColor="bg-purple-500/20 text-purple-500 border-purple-500/50"
        />
        
        <AnimationButton
          icon={<Angry size={24} />}
          label="Angry"
          address={FACE_ANIMATIONS.ANGRY}
          isActive={activeAnimation === FACE_ANIMATIONS.ANGRY}
          onClick={() => handleAnimationClick(FACE_ANIMATIONS.ANGRY)}
          activeColor="bg-purple-500/20 text-purple-500 border-purple-500/50"
        />
      </div>
    </AnimationPanel>
  );
};

export default FaceAnimations;
