
import React from 'react';
import { 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Wand2, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ResumeData, ResumeSettings } from '@/types/resume';
import ResumeContentTab from './ResumeContentTab';
import ResumeStyleTab from './ResumeStyleTab';
import { Progress } from '@/components/ui/progress';

interface ResumeSidebarProps {
  data: ResumeData;
  settings: ResumeSettings;
  activeSection: string;
  aiEnabled?: boolean;
  aiGenerating?: boolean;
  onSectionChange: (section: string) => void;
  onSettingsChange: (settings: Partial<ResumeSettings>) => void;
  onGenerateWithAI?: () => void;
}

const ResumeSidebar: React.FC<ResumeSidebarProps> = ({
  data,
  settings,
  activeSection,
  aiEnabled = false,
  aiGenerating = false,
  onSectionChange,
  onSettingsChange,
  onGenerateWithAI
}) => {
  // Calculate overall progress
  const calculateProgress = () => {
    const sections = [
      'personal', 'summary', 'experience', 'education', 'skills', 'projects', 'languages'
    ];
    
    const progress = sections.reduce((acc, section) => {
      switch(section) {
        case 'personal':
          const personalFields = Object.values(data.personal).filter(Boolean).length;
          return acc + (personalFields / 7);
        case 'summary':
          return acc + (data.summary ? 1 : 0);
        case 'experience':
          return acc + (data.experience.length > 0 ? 1 : 0);
        case 'education':
          return acc + (data.education.length > 0 ? 1 : 0);
        case 'skills':
          return acc + ((data.skills.technical.length > 0 || data.skills.soft.length > 0) ? 1 : 0);
        case 'projects':
          return acc + (data.projects.length > 0 ? 1 : 0);
        case 'languages':
          return acc + (data.languages.length > 0 ? 1 : 0);
        default:
          return acc;
      }
    }, 0);
    
    return Math.round((progress / sections.length) * 100);
  };

  const progress = calculateProgress();

  return (
    <>
      <SidebarHeader className="px-5 py-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
            Resume Editor
          </h3>
          <SidebarTrigger />
        </div>
        
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500">Completion</span>
            <span className="text-xs font-medium text-gray-500">{progress}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-2 bg-gray-100" 
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="w-full mb-2 grid grid-cols-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
            <ResumeContentTab 
              data={data}
              activeSection={activeSection}
              onSectionChange={onSectionChange}
              aiEnabled={aiEnabled}
            />
          </TabsContent>
          
          <TabsContent value="style">
            <ResumeStyleTab 
              settings={settings}
              onSettingsChange={onSettingsChange}
            />
          </TabsContent>
        </Tabs>
      </SidebarContent>
      
      {aiEnabled && (
        <SidebarFooter className="p-4">
          <Button 
            variant="outline" 
            size="sm"
            className={cn(
              "w-full justify-center gap-2 border border-transparent",
              "bg-gradient-to-r from-purple-100 to-indigo-100 hover:from-purple-200 hover:to-indigo-200",
              "text-purple-600 font-medium",
              "transition-all duration-300 shadow-sm",
              aiGenerating && "animate-pulse"
            )}
            onClick={onGenerateWithAI}
            disabled={aiGenerating}
          >
            {aiGenerating ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                <span>Generate with AI</span>
              </>
            )}
          </Button>
        </SidebarFooter>
      )}
    </>
  );
};

export default ResumeSidebar;
