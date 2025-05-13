
import React from 'react';
import Header from '@/components/layout/Header';
import BodyAnimations from '@/components/BodyAnimations';
import FaceAnimations from '@/components/FaceAnimations';
import EmotionControls from '@/components/EmotionControls';
import { useToast } from '@/components/ui/use-toast';

const Index: React.FC = () => {
  const { toast } = useToast();

  React.useEffect(() => {
    toast({
      title: "AIMAN Chef Animation Studio",
      description: "AI Chef animation controller ready",
      duration: 3000,
    });
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <div className="flex-1 p-4 md:p-6 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Animation Controller</h2>
          <div className="text-xs text-muted-foreground">
            Ready to animate AIMAN
          </div>
        </div>
        
        {/* Main content */}
        <div className="grid gap-6">
          <BodyAnimations />
          <FaceAnimations />
          <EmotionControls />
        </div>
        
        {/* Footer */}
        <footer className="py-4 text-center text-xs text-muted-foreground mt-auto">
          <p>AIMAN Chef Animation Studio | AI Chef Animation Controller</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
