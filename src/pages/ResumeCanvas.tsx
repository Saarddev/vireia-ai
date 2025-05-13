
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Edit, Plus, Layout, Palette } from 'lucide-react';
import CanvasControlButtons from '@/components/resume-builder/CanvasControlButtons';
import ResumePreview from '@/components/ResumePreview';
import TemplateSelector from '@/components/resume-builder/TemplateSelector';
import ResumeSettings from '@/components/resume-builder/ResumeSettings';
import { useResumeData } from '@/hooks/use-resume-data';
import { useResumeAI } from '@/hooks/use-resume-ai';
import { ResumeData } from '@/types/resume';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ResumeCanvas = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const { isMobile } = useIsMobile();
  const [activeSection, setActiveSection] = useState<string>('templates');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const {
    isGenerating,
    generateSummary,
    extractSkills,
  } = useResumeAI();

  const { 
    resumeData, 
    isLoading, 
    setResumeData, 
    resumeTitle, 
    selectedTemplate, 
    setSelectedTemplate, 
    resumeSettings, 
    setResumeSettings, 
    handleSave, 
    calculateProgress 
  } = useResumeData(resumeId);
  
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

  // Handle settings change
  const handleSettingsChange = (newSettings: any) => {
    setResumeSettings({
      ...resumeSettings,
      ...newSettings
    });
    // Auto-save when settings change
    handleSave();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  const resumeSections = [
    { id: 'personal', name: 'Personal Info', hasContent: !!resumeData.personal },
    { id: 'summary', name: 'Summary', hasContent: !!resumeData.summary },
    { id: 'experience', name: 'Experience', hasContent: Array.isArray(resumeData.experience) && resumeData.experience.length > 0 },
    { id: 'education', name: 'Education', hasContent: Array.isArray(resumeData.education) && resumeData.education.length > 0 },
    { id: 'skills', name: 'Skills', hasContent: !!resumeData.skills },
    { id: 'projects', name: 'Projects', hasContent: Array.isArray(resumeData.projects) && resumeData.projects.length > 0 },
  ];

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
          <Sidebar className="bg-white dark:bg-gray-950 border-r" side="left">
            <Tabs defaultValue="content" className="w-full h-full flex flex-col">
              <TabsList className="grid grid-cols-2 mx-4 mt-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="style">Style</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="flex-1 overflow-auto p-4 mt-2">
                <h3 className="font-medium mb-4">Sections</h3>
                <div className="space-y-2">
                  {resumeSections.map(section => (
                    <div key={section.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm">{section.name}</span>
                      <div>
                        {section.hasContent ? (
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Plus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="style" className="flex-1 overflow-auto p-4 mt-2">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Template</h3>
                    <TemplateSelector
                      selectedTemplate={selectedTemplate}
                      onSelect={handleTemplateChange}
                      compact={true}
                      className="mb-6"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Appearance</h3>
                    <ResumeSettings
                      settings={resumeSettings || {}}
                      onChange={handleSettingsChange}
                      compact={true}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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
