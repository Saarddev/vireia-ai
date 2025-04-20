
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { useIsMobile } from '@/hooks/use-mobile';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from "@/components/ui/sidebar";

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
import { supabase } from '@/integrations/supabase/client';

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { toast } = useToast();
  const { isMobile } = useIsMobile();
  const [activeSection, setActiveSection] = useState("personal");
  const [resumeData, setResumeData] = useState({
    personal: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: ""
    },
    summary: "",
    experience: [],
    education: [],
    skills: {
      technical: [],
      soft: []
    },
    languages: [],
    certifications: [],
    projects: []
  });
  const [aiEnabled, setAiEnabled] = useState(true);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [resumeSettings, setResumeSettings] = useState({
    fontFamily: "Inter",
    fontSize: 10,
    primaryColor: "#9b87f5",
    secondaryColor: "#6E59A5",
    accentColor: "#D6BCFA",
    paperSize: "a4",
    margins: "normal"
  });
  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(20);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResumeData = async () => {
      setIsLoading(true);
      
      try {
        // In a production app, you would fetch the resume data from your database
        // using the resumeId parameter
        
        // For now, we'll just simulate loading with a timer
        setTimeout(() => {
          setProgress(85);
          setIsLoading(false);
          
          toast({
            title: "Resume ready",
            description: "Start building your professional resume. AI is ready to assist you."
          });
        }, 1500);
        
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          toast({
            title: "Authentication required",
            description: "Please sign in to create or edit resumes",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error loading resume:', error);
        toast({
          title: "Error",
          description: "Failed to load resume data. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };
    
    fetchResumeData();
  }, [resumeId, toast]);

  const handleSave = () => {
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Resume saved",
        description: "Your resume has been successfully saved."
      });
    }, 1500);
  };

  const handleDownload = () => {
    toast({
      title: "Resume downloaded",
      description: "Your resume has been downloaded as PDF."
    });
  };

  const handleShare = () => {
    toast({
      title: "Share link created",
      description: "A shareable link has been copied to your clipboard."
    });
  };

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
    toast({
      title: enabled ? "AI Assistant enabled" : "AI Assistant disabled",
      description: enabled ? "AI will now suggest improvements to your resume." : "AI suggestions have been turned off."
    });
  };

  const generateWithAI = () => {
    setAiGenerating(true);
    
    setTimeout(() => {
      setAiGenerating(false);
      setAiSuggestion({
        type: "improvement",
        section: "summary",
        content: "Consider highlighting your experience with cloud technologies and microservices architecture to make your profile more appealing to modern tech companies."
      });
      toast({
        title: "AI Generation Complete",
        description: "Your resume has been enhanced by our AI assistant."
      });
    }, 2500);
  };

  const dismissAiSuggestion = () => {
    setAiSuggestion(null);
  };

  const applyAiSuggestion = () => {
    if (aiSuggestion) {
      if (aiSuggestion.section === "summary") {
        const enhancedSummary = resumeData.summary + " " + aiSuggestion.content;
        handleDataChange("summary", enhancedSummary);
      }
      setAiSuggestion(null);
      toast({
        title: "AI Suggestion Applied",
        description: "The suggestion has been applied to your resume."
      });
    }
  };

  // Render the appropriate form based on active section
  const renderActiveForm = () => {
    switch (activeSection) {
      case "personal":
        return <PersonalInfoForm data={resumeData.personal} onChange={(data) => handleDataChange("personal", data)} />;
      case "summary":
        return <SummaryForm data={resumeData.summary} onChange={(data) => handleDataChange("summary", data)} />;
      case "experience":
        return <ExperienceForm data={resumeData.experience} onChange={(data) => handleDataChange("experience", data)} />;
      case "education":
        return <EducationForm data={resumeData.education} onChange={(data) => handleDataChange("education", data)} />;
      case "skills":
        return <SkillsForm data={resumeData.skills} onChange={(data) => handleDataChange("skills", data)} />;
      case "templates":
        return <TemplateSelector selectedTemplate={selectedTemplate} onSelect={setSelectedTemplate} />;
      case "settings":
        return <ResumeSettings settings={resumeSettings} onChange={handleSettingsChange} />;
      case "ai":
        return <AIAssistant resumeData={resumeData} enabled={aiEnabled} />;
      default:
        return <PersonalInfoForm data={resumeData.personal} onChange={(data) => handleDataChange("personal", data)} />;
    }
  };

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50/80 via-background to-purple-50/60 dark:from-gray-900/90 dark:via-gray-900/50 dark:to-gray-900/90">
        <BuilderHeader 
          name={resumeData.personal.name || "New Resume"}
          isSaving={isSaving}
          aiEnabled={aiEnabled}
          onSave={handleSave}
          onDownload={handleDownload}
          onShare={handleShare}
          onAIToggle={handleAIToggle}
        />

        <div className="flex-1 flex">
          <Sidebar side="left" variant="floating" collapsible="icon">
            <BuilderSidebar 
              progress={progress}
              activeSection={activeSection}
              aiEnabled={aiEnabled}
              aiGenerating={aiGenerating}
              onSectionChange={setActiveSection}
              onGenerateWithAI={generateWithAI}
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
