
import React, { useState } from 'react';
import AnimationPanel from './AnimationPanel';
import EmotionSlider from './EmotionSlider';
import { sendEmotions, EmotionValues } from '@/lib/osc';
import { Button } from '@/components/ui/button';
import { Smile } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const EmotionControls: React.FC = () => {
  const { toast } = useToast();
  const [emotions, setEmotions] = useState<EmotionValues>({
    amazement: 0,
    anger: 0,
    cheekiness: 0,
    disgust: 0,
    fear: 0,
    grief: 0,
    joy: 0,
    outofbreath: 0,
    pain: 0,
    sadness: 0,
  });

  const handleEmotionChange = (emotion: keyof EmotionValues, value: number) => {
    setEmotions(prev => ({
      ...prev,
      [emotion]: value
    }));
  };

  const handleSendEmotions = async () => {
    try {
      await sendEmotions(emotions);
      toast({
        title: "Emotions sent",
        description: "Emotion values sent to audio2face",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Failed to send emotions",
        description: "Error sending emotion values",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleResetEmotions = () => {
    setEmotions({
      amazement: 0,
      anger: 0,
      cheekiness: 0,
      disgust: 0,
      fear: 0,
      grief: 0,
      joy: 0,
      outofbreath: 0,
      pain: 0,
      sadness: 0,
    });
  };

  return (
    <AnimationPanel 
      title="Emotion Controls" 
      gradientClass="panel-gradient-emotion"
      icon={<Smile size={18} className="text-pink-400" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EmotionSlider 
          label="Amazement" 
          value={emotions.amazement} 
          onChange={(value) => handleEmotionChange('amazement', value)}
          color="bg-pink-500"
        />
        <EmotionSlider 
          label="Anger" 
          value={emotions.anger} 
          onChange={(value) => handleEmotionChange('anger', value)}
          color="bg-red-500"
        />
        <EmotionSlider 
          label="Cheekiness" 
          value={emotions.cheekiness} 
          onChange={(value) => handleEmotionChange('cheekiness', value)}
          color="bg-orange-500"
        />
        <EmotionSlider 
          label="Disgust" 
          value={emotions.disgust} 
          onChange={(value) => handleEmotionChange('disgust', value)}
          color="bg-yellow-500"
        />
        <EmotionSlider 
          label="Fear" 
          value={emotions.fear} 
          onChange={(value) => handleEmotionChange('fear', value)}
          color="bg-purple-500"
        />
        <EmotionSlider 
          label="Grief" 
          value={emotions.grief} 
          onChange={(value) => handleEmotionChange('grief', value)}
          color="bg-blue-500"
        />
        <EmotionSlider 
          label="Joy" 
          value={emotions.joy} 
          onChange={(value) => handleEmotionChange('joy', value)}
          color="bg-green-500"
        />
        <EmotionSlider 
          label="Out of Breath" 
          value={emotions.outofbreath} 
          onChange={(value) => handleEmotionChange('outofbreath', value)}
          color="bg-cyan-500"
        />
        <EmotionSlider 
          label="Pain" 
          value={emotions.pain} 
          onChange={(value) => handleEmotionChange('pain', value)}
          color="bg-red-500"
        />
        <EmotionSlider 
          label="Sadness" 
          value={emotions.sadness} 
          onChange={(value) => handleEmotionChange('sadness', value)}
          color="bg-blue-500"
        />
      </div>
      
      <div className="flex justify-between mt-6 pt-4 border-t border-border/50">
        <Button variant="outline" onClick={handleResetEmotions}>
          Reset All
        </Button>
        <Button onClick={handleSendEmotions}>
          Send Emotions
        </Button>
      </div>
    </AnimationPanel>
  );
};

export default EmotionControls;
