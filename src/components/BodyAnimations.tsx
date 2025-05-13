
import React, { useState, useEffect } from 'react';
import AnimationButton from './AnimationButton';
import AnimationPanel from './AnimationPanel';
import { BODY_ANIMATIONS } from '@/lib/osc';
import { ChefHat, Utensils, Sandwich, Pizza, Soup, Cake, Cookie, Fork, Spoon, EggFried } from 'lucide-react';

const BodyAnimations: React.FC = () => {
  const [activeAnimation, setActiveAnimation] = useState<string | null>(null);

  const handleAnimationChange = (address: string) => {
    setActiveAnimation(address);
  };

  // Reset active animation after 2 seconds
  useEffect(() => {
    if (activeAnimation) {
      const timer = setTimeout(() => {
        setActiveAnimation(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeAnimation]);

  return (
    <AnimationPanel 
      title="Body Animations" 
      description="Control the body movements and postures of AIMAN, our AI Chef"
      className="panel-gradient-body"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <AnimationButton
          icon={<ChefHat size={24} />}
          label="Sit"
          address={BODY_ANIMATIONS.SIT}
          isActive={activeAnimation === BODY_ANIMATIONS.SIT}
          onChange={handleAnimationChange}
          className="bg-blue-800/20 hover:bg-blue-700/30"
        />
        
        <AnimationButton
          icon={<Utensils size={24} />}
          label="IDLE"
          address={BODY_ANIMATIONS.IDLE}
          isActive={activeAnimation === BODY_ANIMATIONS.IDLE}
          onChange={handleAnimationChange}
          className="bg-blue-800/20 hover:bg-blue-700/30"
        />
        
        <AnimationButton
          icon={<Fork size={24} />}
          label="Speaking Sit"
          address={BODY_ANIMATIONS.SPEAKING_SIT}
          isActive={activeAnimation === BODY_ANIMATIONS.SPEAKING_SIT}
          onChange={handleAnimationChange}
          className="bg-blue-800/20 hover:bg-blue-700/30"
        />
        
        <AnimationButton
          icon={<Soup size={24} />}
          label="Interrogative"
          address={BODY_ANIMATIONS.SPEAKING_INTERROGATIVE}
          isActive={activeAnimation === BODY_ANIMATIONS.SPEAKING_INTERROGATIVE}
          onChange={handleAnimationChange}
          className="bg-blue-800/20 hover:bg-blue-700/30"
        />
        
        <AnimationButton
          icon={<Pizza size={24} />}
          label="Exclamative"
          address={BODY_ANIMATIONS.SPEAKING_EXCLAMATIVE}
          isActive={activeAnimation === BODY_ANIMATIONS.SPEAKING_EXCLAMATIVE}
          onChange={handleAnimationChange}
          className="bg-blue-800/20 hover:bg-blue-700/30"
        />
        
        <AnimationButton
          icon={<Spoon size={24} />}
          label="Sad"
          address={BODY_ANIMATIONS.SPEAKING_SAD}
          isActive={activeAnimation === BODY_ANIMATIONS.SPEAKING_SAD}
          onChange={handleAnimationChange}
          className="bg-blue-800/20 hover:bg-blue-700/30"
        />
        
        <AnimationButton
          icon={<EggFried size={24} />}
          label="Angry"
          address={BODY_ANIMATIONS.SPEAKING_ANGRY}
          isActive={activeAnimation === BODY_ANIMATIONS.SPEAKING_ANGRY}
          onChange={handleAnimationChange}
          className="bg-blue-800/20 hover:bg-blue-700/30"
        />
        
        <AnimationButton
          icon={<Sandwich size={24} />}
          label="Fear"
          address={BODY_ANIMATIONS.SPEAKING_FEAR}
          isActive={activeAnimation === BODY_ANIMATIONS.SPEAKING_FEAR}
          onChange={handleAnimationChange}
          className="bg-blue-800/20 hover:bg-blue-700/30"
        />
        
        <AnimationButton
          icon={<Cake size={24} />}
          label="Happy"
          address={BODY_ANIMATIONS.SPEAKING_HAPPY}
          isActive={activeAnimation === BODY_ANIMATIONS.SPEAKING_HAPPY}
          onChange={handleAnimationChange}
          className="bg-blue-800/20 hover:bg-blue-700/30"
        />
        
        <AnimationButton
          icon={<Cookie size={24} />}
          label="Hesitation"
          address={BODY_ANIMATIONS.SPEAKING_HESITATION}
          isActive={activeAnimation === BODY_ANIMATIONS.SPEAKING_HESITATION}
          onChange={handleAnimationChange}
          className="bg-blue-800/20 hover:bg-blue-700/30"
        />
      </div>
    </AnimationPanel>
  );
};

export default BodyAnimations;
