
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import BuilderHeader from '@/components/resume-builder/BuilderHeader';
import BuilderSidebar from '@/components/resume-builder/BuilderSidebar';
import AISuggestion from '@/components/resume-builder/AISuggestion';
import ResumePreview from '@/components/ResumePreview';
import PersonalInfoForm from '@/components/resume-builder/PersonalInfoForm';
import ExperienceForm from '@/components/resume-builder/ExperienceForm';
import EducationForm from '@/components/resume-builder/EducationForm';
import SkillsForm from '@/components/resume-builder/SkillsForm';
import SummaryForm from '@/components/resume-builder/SummaryForm';
import AIAssistant from '@/components/resume-builder/AIAssistant';
import TemplateSelector from '@/components/resume-builder/TemplateSelector';
import ResumeSettings from '@/components/resume-builder/ResumeSettings';
import { useResumeData } from '@/hooks/use-resume-data';
import { useResumeAI } from '@/hooks/use-resume-ai';

interface AISuggestionData {
  type: string;
  section: string;
  content: string;
}

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { isMobile } = useIsMobile();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("personal");
  const [aiEnabled, setAiEnabled] = useState(true);
  const [aiSuggestion, setAiSuggestion] = useState<AISuggestionData | null>(null);

  const {
    isLoading,
    resumeData,
    setResumeData,
    resumeTitle,
    selectedTemplate,
    setSelectedTemplate,
    resumeSettings,
    setResumeSettings,
    calculateProgress,
    handleSave
  } = useResumeData(resumeId);

  const {
    isGenerating,
    generateSummary,
    extractSkills,
    improveDescription
  } = useResumeAI();

  const handleDataChange = (section: string, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSettingsChange = (newSettings: any) => {
    setResumeSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  const handleAIToggle = (enabled: boolean) => {
    setAiEnabled(enabled);
  };

  const dismissAiSuggestion = () => {
    setAiSuggestion(null);
  };

  const applyAiSuggestion = () => {
    if (aiSuggestion) {
      if (aiSuggestion.section === "summary") {
        handleDataChange("summary", aiSuggestion.content);
      }
      setAiSuggestion(null);
    }
  };

  const handleGenerateWithAI = async (section: string): Promise<string> => {
    if (!aiEnabled) {
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
          const summary = await generateSummary(
            resumeData.experience.map(exp => exp.description),
            [...resumeData.skills.technical, ...resumeData.skills.soft]
          );
          if (summary) {
            handleDataChange("summary", summary);
            return summary;
          }
          break;
        }
        case "skills": {
          const skills = await extractSkills(
            resumeData.experience.map(exp => exp.description)
          );
          if (skills) {
            handleDataChange("skills", skills);
            return "";
          }
          break;
        }
        default:
          toast({
            title: "AI Generation",
            description: `AI generation not available for ${section} section`,
          });
          return "";
      }
    } catch (error) {
      console.error('Error generating with AI:', error);
      toast({
        title: "Error",
        description: "Failed to generate with AI. Please try again.",
        variant: "destructive"
      });
    }
    return "";
  };

  const renderActiveForm = () => {
    switch (activeSection) {
      case "personal":
        return (
          <PersonalInfoForm 
            data={resumeData.personal}
            onChange={(data) => handleDataChange("personal", data)}
          />
        );
      case "summary":
        return (
          <SummaryForm 
            data={resumeData.summary}
            onChange={(data) => handleDataChange("summary", data)}
            isGenerating={isGenerating}
            onGenerateWithAI={async () => handleGenerateWithAI("summary")}
          />
        );
      case "experience":
        return (
          <ExperienceForm 
            data={resumeData.experience}
            onChange={(data) => handleDataChange("experience", data)}
            onGenerateWithAI={async (text: string) => {
              const improved = await improveDescription(text);
              return improved;
            }}
          />
        );
      case "education":
        return (
          <EducationForm 
            data={resumeData.education}
            onChange={(data) => handleDataChange("education", data)}
          />
        );
      case "skills":
        return (
          <SkillsForm 
            data={resumeData.skills}
            onChange={(data) => handleDataChange("skills", data)}
            isGenerating={isGenerating}
            onExtractSkills={async () => handleGenerateWithAI("skills")}
          />
        );
      case "templates":
        return (
          <TemplateSelector 
            selectedTemplate={selectedTemplate} 
            onSelect={setSelectedTemplate} 
          />
        );
      case "settings":
        return (
          <ResumeSettings 
            settings={resumeSettings} 
            onChange={handleSettingsChange} 
          />
        );
      case "ai":
        return (
          <AIAssistant 
            resumeData={resumeData} 
            enabled={aiEnabled} 
          />
        );
      default:
        return (
          <div className="p-4 text-center">
            <p>Select a section to edit</p>
          </div>
        );
    }
  };

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50/80 via-background to-purple-50/60 dark:from-gray-900/90 dark:via-gray-900/50 dark:to-gray-900/90">
        <BuilderHeader 
          name={resumeTitle || resumeData.personal.name || "New Resume"}
          isSaving={false}
          aiEnabled={aiEnabled}
          onSave={handleSave}
          onAIToggle={handleAIToggle}
          onDownload={() => {}}
          onShare={() => {}}
        />

        <div className="flex-1 flex">
          <Sidebar side="left" variant="floating" collapsible="icon">
            <BuilderSidebar 
              progress={calculateProgress(resumeData)}
              activeSection={activeSection}
              aiEnabled={aiEnabled}
              aiGenerating={isGenerating}
              onSectionChange={setActiveSection}
              onGenerateWithAI={() => handleGenerateWithAI(activeSection)}
            />
          </Sidebar>

          <SidebarInset className="flex flex-col p-4 lg:p-6">
            <AISuggestion 
              suggestion={aiSuggestion}
              onDismiss={dismissAiSuggestion}
              onApply={applyAiSuggestion}
            />
            
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
              <div className="xl:col-span-5 h-full overflow-auto">
                <Card className="h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-100/60 dark:border-gray-800/60 overflow-hidden shadow-xl">
                  <div className="p-4 lg:p-6 h-full overflow-auto">
                    <div className="max-w-2xl space-y-6">
                      {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-4 py-20">
                          <div className="w-16 h-16 border-4 border-resume-purple border-t-transparent rounded-full animate-spin"></div>
                          <p className="text-resume-gray text-lg">Loading resume...</p>
                        </div>
                      ) : (
                        renderActiveForm()
                      )}
                    </div>
                  </div>
                </Card>
              </div>

              <div className="xl:col-span-7 h-full overflow-auto">
                <Card className="h-full flex flex-col bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-100/60 dark:border-gray-800/60 shadow-xl">
                  <ResumePreview 
                    data={resumeData} 
                    template={selectedTemplate}
                    settings={resumeSettings}
                    onDataChange={(section, data) => handleDataChange(section, data)}
                    onGenerateWithAI={handleGenerateWithAI}
                  />
                </Card>
              </div>
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ResumeBuilder;
