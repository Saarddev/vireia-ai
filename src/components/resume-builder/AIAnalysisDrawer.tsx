
import React from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from "@/components/ui/button";
import { Brain, Sparkles } from 'lucide-react';
import AIAssistant from '@/components/resume-builder/AIAssistant';

interface AIAnalysisDrawerProps {
  resumeData: any;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AIAnalysisDrawer: React.FC<AIAnalysisDrawerProps> = ({ 
  resumeData, 
  isOpen, 
  onOpenChange 
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="border-resume-purple/30 text-resume-purple dark:text-resume-purple-light hover:bg-resume-purple/10 flex items-center gap-2"
        >
          <Brain className="h-4 w-4" />
          <span>AI Analysis</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-6 max-h-[85vh] overflow-y-auto">
        <div className="container mx-auto max-w-4xl">
          <AIAssistant resumeData={resumeData} enabled={true} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AIAnalysisDrawer;
