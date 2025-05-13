
import React, { useState } from 'react';
import AnimationButton from './AnimationButton';
import AnimationPanel from './AnimationPanel';
import { BODY_ANIMATIONS } from '@/lib/osc';
import { Happy, Angry, Frown, Smile, Surprise, ArrowRight } from 'lucide-react';

const BodyAnimations: React.FC = () => {
  const [activeAnimation, setActiveAnimation] = useState<string | null>(null);

  const handleAnimationClick = (animationAddress: string) => {
    setActiveAnimation(animationAddress);
  };

  return (
    <AnimationPanel 
      title="Body Animations" 
      gradientClass="panel-gradient-body"
      icon={<ArrowRight size={18} className="text-blue-400" />}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        <AnimationButton
          icon={<ArrowRight size={24} />}
          label="Body Sit"
          address={BODY_ANIMATIONS.SIT}
          isActive={activeAnimation === BODY_ANIMATIONS.SIT}
          onClick={() => handleAnimationClick(BODY_ANIMATIONS.SIT)}
          activeColor="bg-blue-500/20 text-blue-500 border-blue-500/50"
        />
        
        <AnimationButton
          icon={<Surprise size={24} />}
          label="IDLE"
          address={BODY_ANIMATIONS.IDLE}
          isActive={activeAnimation === BODY_ANIMATIONS.IDLE}
          onClick={() => handleAnimationClick(BODY_ANIMATIONS.IDLE)}
          activeColor="bg-blue-500/20 text-blue-500 border-blue-500/50"
        />
        
        <AnimationButton
          icon={<ArrowRight size={24} />}
          label="Speaking Sit"
          address={BODY_ANIMATIONS.SPEAKING_SIT}
          isActive={activeAnimation === BODY_ANIMATIONS.SPEAKING_SIT}
          onClick={() => handleAnimationClick(BODY_ANIMATIONS.SPEAKING_SIT)}
          activeColor="bg-blue-500/20 text-blue-500 border-blue-500/50"
        />
        
        <AnimationButton
          icon={<Surprise size={24} />}
          label="Interrogative"
          address={BODY_ANIMATIONS.SPEAKING_INTERROGATIVE}
          isActive={activeAnimation === BODY_ANIMATIONS.SPEAKING_INTERROGATIVE}
          onClick={() => handleAnimationClick(BODY_ANIMATIONS.SPEAKING_INTERROGATIVE)}
          activeColor="bg-blue-500/20 text-blue-500 border-blue-500/50"
        />
        
        <AnimationButton
          icon={<Surprise size={24} />}
          label="Exclamative"
          address={BODY_ANIMATIONS.SPEAKING_EXCLAMATIVE}
          isActive={activeAnimation === BODY_ANIMATIONS.SPEAKING_EXCLAMATIVE}
          onClick={() => handleAnimationClick(BODY_ANIMATIONS.SPEAKING_EXCLAMATIVE)}
          activeColor="bg-blue-500/20 text-blue-500 border-blue-500/50"
        />
        
        <AnimationButton
          icon={<Frown size={24} />}
          label="Sad"
          address={BODY_ANIMATIONS.SPEAKING_SAD}
          isActive={activeAnimation === BODY_ANIMATIONS.SPEAKING_SAD}
          onClick={() => handleAnimationClick(BODY_ANIMATIONS.SPEAKING_SAD)}
          activeColor="bg-blue-500/20 text-blue-500 border-blue-500/50"
        />
        
        <AnimationButton
          icon={<Angry size={24} />}
          label="Angry"
          address={BODY_ANIMATIONS.SPEAKING_ANGRY}
          isActive={activeAnimation === BODY_ANIMATIONS.SPEAKING_ANGRY}
          onClick={() => handleAnimationClick(BODY_ANIMATIONS.SPEAKING_ANGRY)}
          activeColor="bg-blue-500/20 text-blue-500 border-blue-500/50"
        />
        
        <AnimationButton
          icon={<Surprise size={24} />}
          label="Fear"
          address={BODY_ANIMATIONS.SPEAKING_FEAR}
          isActive={activeAnimation === BODY_ANIMATIONS.SPEAKING_FEAR}
          onClick={() => handleAnimationClick(BODY_ANIMATIONS.SPEAKING_FEAR)}
          activeColor="bg-blue-500/20 text-blue-500 border-blue-500/50"
        />
        
        <AnimationButton
          icon={<Happy size={24} />}
          label="Happy"
          address={BODY_ANIMATIONS.SPEAKING_HAPPY}
          isActive={activeAnimation === BODY_ANIMATIONS.SPEAKING_HAPPY}
          onClick={() => handleAnimationClick(BODY_ANIMATIONS.SPEAKING_HAPPY)}
          activeColor="bg-blue-500/20 text-blue-500 border-blue-500/50"
        />
        
        <AnimationButton
          icon={<Surprise size={24} />}
          label="Hesitation"
          address={BODY_ANIMATIONS.SPEAKING_HESITATION}
          isActive={activeAnimation === BODY_ANIMATIONS.SPEAKING_HESITATION}
          onClick={() => handleAnimationClick(BODY_ANIMATIONS.SPEAKING_HESITATION)}
          activeColor="bg-blue-500/20 text-blue-500 border-blue-500/50"
        />
      </div>
    </AnimationPanel>
  );
};

export default BodyAnimations;
