import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { Layout, Palette, SidebarClose, Sparkles } from 'lucide-react';
import CanvasControlButtons from '@/components/resume-builder/CanvasControlButtons';
import ResumePreview from '@/components/ResumePreview';
import TemplateSelector from '@/components/resume-builder/TemplateSelector';
import ResumeSettings from '@/components/resume-builder/ResumeSettings';
import { useResumeData } from '@/hooks/use-resume-data';
import { useResumeAI } from '@/hooks/use-resume-ai';
import { ResumeData } from '@/types/resume';

// Add the template selector to the sidebar options
const canvasSidebarOptions = [
  { id: 'templates', name: 'Templates', icon: Layout },
  { id: 'style', name: 'Style', icon: Palette },
  { id: 'sections', name: 'Sections', icon: SidebarClose },
  { id: 'ai', name: 'AI', icon: Sparkles }
];

const ResumeCanvas = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const { isMobile } = useIsMobile();
  const [activeTab, setActiveTab] = useState<string>('templates');
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const {
    isGenerating,
    generateSummary,
    extractSkills,
    improveDescription
  } = useResumeAI();

  const { resumeData, isLoading, setResumeData, resumeTitle, selectedTemplate, setSelectedTemplate, resumeSettings, setResumeSettings, handleSave, calculateProgress } = useResumeData(resumeId);
  
  const handleSectionDataChange = (section: string, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleGenerateWithAI = async (section: string): Promise<string> => {
    if (!true) {
      toast({
        title: "AI is disabled",
        description: "Please enable AI to use this feature",
        variant: "destructive"
      });
      return "";
    }

    try {
      switch (section) {
        case "summary": {
          const experienceDescriptions = Array.isArray(resumeData.experience) 
            ? resumeData.experience.map(exp => exp.description)
            : [];

          const allSkills = [
            ...(Array.isArray(resumeData.skills?.technical) ? resumeData.skills.technical : []),
            ...(Array.isArray(resumeData.skills?.soft) ? resumeData.skills.soft : [])
          ];
          
          const summary = await generateSummary(experienceDescriptions, allSkills);
          return summary || "";
        }
        case "skills": {
          const experienceDescriptions = Array.isArray(resumeData.experience) 
            ? resumeData.experience.map(exp => exp.description)
            : [];
            
          const skills = await extractSkills(experienceDescriptions);
          if (skills) {
            handleSectionDataChange("skills", skills);
          }
          return "";
        }
        default:
          return "";
      }
    } catch (error) {
      console.error('Error generating with AI:', error);
      toast({
        title: "Error",
        description: "Failed to generate with AI. Please try again.",
        variant: "destructive"
      });
      return "";
    }
  };

  // Add a handler for template change
  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template);
    // Save the template change
    handleSave();
  };

  // Update the sidebar content to include the template selector
  const renderSidebarContent = () => {
    switch (activeTab) {
      case 'templates':
        return (
          <div className="p-4">
            <h3 className="text-lg font-medium mb-4">Select Template</h3>
            <TemplateSelector 
              selectedTemplate={selectedTemplate} 
              onSelect={handleTemplateChange}
              compact={true}
              className="mb-6"
            />
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Template Settings</h4>
              <ResumeSettings
                settings={resumeSettings || {}}
                onChange={(newSettings) => {
                  setResumeSettings({
                    ...resumeSettings,
                    ...newSettings
                  });
                }}
                compact={true}
              />
            </div>
          </div>
        );
      case 'style':
        return (
          <div className="p-4">
            <h3 className="text-lg font-medium mb-4">Style Settings</h3>
            <ResumeSettings
              settings={resumeSettings || {}}
              onChange={(newSettings) => {
                setResumeSettings({
                  ...resumeSettings,
                  ...newSettings
                });
              }}
              compact={true}
            />
          </div>
        );
      case 'sections':
        return (
          <div className="p-4">
            <h3 className="text-lg font-medium mb-4">Section Visibility</h3>
            {/* Example: Toggle visibility of sections */}
            <div className="space-y-2">
              <Label htmlFor="personal">Personal Info</Label>
              <Input type="checkbox" id="personal" checked={selectedSections.includes('personal')} onChange={() => {}} />

              <Label htmlFor="experience">Experience</Label>
              <Input type="checkbox" id="experience" checked={selectedSections.includes('experience')} onChange={() => {}} />

              {/* Add more sections as needed */}
            </div>
          </div>
        );
      case 'ai':
        return (
          <div className="p-4">
            <h3 className="text-lg font-medium mb-4">AI Assistant</h3>
            {/* Add AI assistant controls here */}
            <p className="text-sm text-muted-foreground">AI features coming soon.</p>
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50/80 via-background to-purple-50/60 dark:from-gray-900/90 dark:via-gray-900/50 dark:to-gray-900/90">
      <div className="border-b sticky top-0 z-40 bg-white/90 backdrop-blur-sm dark:bg-gray-950/90">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-4">
            <CanvasControlButtons 
              resumeId={resumeId}
              resumeData={resumeData}
              settings={resumeSettings}
              template={selectedTemplate}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <SidebarProvider defaultOpen={!isMobile}>
          <Sidebar side="left" size="sm" className="bg-white dark:bg-gray-950 border-r">
            <div className="flex flex-col h-full">
              <div className="p-2 border-b">
                <div className="flex space-x-1">
                  {canvasSidebarOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant={activeTab === option.id ? "default" : "ghost"}
                      size="sm"
                      className="flex-1 justify-start"
                      onClick={() => setActiveTab(option.id)}
                    >
                      <option.icon className="h-4 w-4 mr-2" />
                      {option.name}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                {renderSidebarContent()}
              </div>
            </div>
          </Sidebar>

          <div className="flex-1 flex flex-col overflow-hidden">
            <ResumePreview
              data={resumeData}
              template={selectedTemplate}
              settings={resumeSettings}
              onDataChange={handleSectionDataChange}
              onGenerateWithAI={handleGenerateWithAI}
            />
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default ResumeCanvas;
