import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
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

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { isMobile } = useIsMobile();
  const [activeSection, setActiveSection] = useState("personal");
  const [aiEnabled, setAiEnabled] = useState(true);
  const [aiSuggestion, setAiSuggestion] = useState(null);

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
    isGenerating: aiGenerating,
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

  const renderActiveForm = () => {
    const formProps = {
      data: resumeData[activeSection],
      onChange: (data: any) => handleDataChange(activeSection, data),
      onGenerateWithAI: async (text: string) => {
        const improved = await improveDescription(text);
        if (improved) {
          return improved;
        }
      }
    };

    switch (activeSection) {
      case "personal":
        return <PersonalInfoForm {...formProps} />;
      case "summary":
        return (
          <SummaryForm 
            {...formProps}
            isGenerating={aiGenerating}
            onGenerateWithAI={async () => {
              const summary = await generateSummary(
                resumeData.experience.map(exp => exp.description),
                [...resumeData.skills.technical, ...resumeData.skills.soft]
              );
              if (summary) {
                handleDataChange("summary", summary);
              }
            }}
          />
        );
      case "experience":
        return <ExperienceForm {...formProps} />;
      case "education":
        return <EducationForm {...formProps} />;
      case "skills":
        return (
          <SkillsForm 
            {...formProps}
            isGenerating={aiGenerating}
            onExtractSkills={async () => {
              const skills = await extractSkills(
                resumeData.experience.map(exp => exp.description)
              );
              if (skills) {
                handleDataChange("skills", skills);
              }
            }}
          />
        );
      case "templates":
        return <TemplateSelector selectedTemplate={selectedTemplate} onSelect={setSelectedTemplate} />;
      case "settings":
        return <ResumeSettings settings={resumeSettings} onChange={handleSettingsChange} />;
      case "ai":
        return <AIAssistant resumeData={resumeData} enabled={aiEnabled} />;
      default:
        return <PersonalInfoForm {...formProps} />;
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
              aiGenerating={aiGenerating}
              onSectionChange={setActiveSection}
              onGenerateWithAI={() => {}}
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
