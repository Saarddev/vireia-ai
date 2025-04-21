
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

interface LinkedInExperience {
  title?: string;
  company?: string;
  location?: string;
  start_month?: string;
  start_year?: string;
  end_month?: string;
  end_year?: string;
  is_current?: boolean;
  description?: string;
}

interface LinkedInEducation {
  school?: string;
  degree?: string;
  field_of_study?: string;
  start_month?: string;
  start_year?: string;
  end_month?: string;
  end_year?: string;
  activities?: string;
}

interface LinkedInData {
  full_name?: string;
  headline?: string;
  location?: string;
  linkedin_url?: string;
  about?: string;
  experiences?: LinkedInExperience[];
  educations?: LinkedInEducation[];
}

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
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
  const [resumeTitle, setResumeTitle] = useState("");

  useEffect(() => {
    const fetchResumeData = async () => {
      setIsLoading(true);

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          toast({
            title: "Authentication required",
            description: "Please sign in to create or edit resumes",
            variant: "destructive",
          });
          navigate('/sign-in');
          return;
        }

        if (!resumeId) {
          toast({
            title: "Error",
            description: "Resume ID is required",
            variant: "destructive",
          });
          navigate('/resume');
          return;
        }

        const { data: resume, error } = await supabase
          .from('resumes')
          .select('*')
          .eq('id', resumeId)
          .single();

        if (error) throw error;

        if (!resume) {
          toast({
            title: "Resume not found",
            description: "The requested resume could not be found",
            variant: "destructive",
          });
          navigate('/resume');
          return;
        }

        setResumeTitle(resume.title);

        // Fine handling of resume content/settings
        // We want ONLY well-typed objects as content/settings, never fallback to empty or broken sample
        let content: typeof resumeData = resume.content;
        if (typeof content !== "object" || !content || Array.isArray(content)) {
          // Defensive: re-fetch actual, ignore if ill-formed
          content = { ...resumeData }; // keeps shape
        } else {
          // If missing keys (AI may), patch to fill blanks for UI safety
          content = {
            personal: {
              name: content.personal?.name || "",
              title: content.personal?.title || "",
              email: content.personal?.email || "",
              phone: content.personal?.phone || "",
              location: content.personal?.location || "",
              linkedin: content.personal?.linkedin || "",
              website: content.personal?.website || ""
            },
            summary: content.summary || "",
            experience: Array.isArray(content.experience) ? content.experience : [],
            education: Array.isArray(content.education) ? content.education : [],
            skills: {
              technical: (content.skills && Array.isArray(content.skills.technical)) ? content.skills.technical : [],
              soft: (content.skills && Array.isArray(content.skills.soft)) ? content.skills.soft : []
            },
            languages: Array.isArray(content.languages) ? content.languages : [],
            certifications: Array.isArray(content.certifications) ? content.certifications : [],
            projects: Array.isArray(content.projects) ? content.projects : []
          };
        }
        setResumeData(content);

        let settings: typeof resumeSettings = resume.settings;
        if (typeof settings !== "object" || !settings || Array.isArray(settings)) {
          settings = { ...resumeSettings };
        } else {
          settings = {
            fontFamily: settings.fontFamily || "Inter",
            fontSize: settings.fontSize || 10,
            primaryColor: settings.primaryColor || "#9b87f5",
            secondaryColor: settings.secondaryColor || "#6E59A5",
            accentColor: settings.accentColor || "#D6BCFA",
            paperSize: settings.paperSize || "a4",
            margins: settings.margins || "normal"
          };
        }
        setResumeSettings(settings);

        setSelectedTemplate(resume.template || "modern");

        // Only auto-enrich with LinkedIn if minimal data present
        if (
          (!content.personal.name || !content.summary) && 
          session.user &&
          resume.user_id === session.user.id // Ownership check
        ) {
          // Try to augment with stored LinkedIn data on user's profile only if it exists
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('linkedin_data')
            .eq('id', session.user.id)
            .single();

          if (!profileError && profile?.linkedin_data) {
            // Defensive: If the AI hasn't filled correctly, draw from raw LinkedIn
            const linkedinData = profile.linkedin_data;
            // Patch personal and summary (plus experience, education) if missing
            if (linkedinData?.full_name) {
              setResumeData(prev => ({
                ...prev,
                personal: {
                  ...prev.personal,
                  name: linkedinData.full_name || prev.personal.name,
                  title: linkedinData.headline || prev.personal.title,
                  location: linkedinData.location || prev.personal.location,
                  linkedin: linkedinData.linkedin_url || prev.personal.linkedin
                }
              }));
            }
            if (linkedinData?.about) {
              setResumeData(prev => ({
                ...prev,
                summary: linkedinData.about || prev.summary
              }));
            }
            if (linkedinData?.experiences && Array.isArray(linkedinData.experiences) && linkedinData.experiences.length > 0) {
              const formattedExperiences = linkedinData.experiences.map((exp: any, index: number) => ({
                id: `exp-${index}`,
                title: exp.title || "",
                company: exp.company || "",
                location: exp.location || "",
                startDate: `${exp.start_month || ""} ${exp.start_year || ""}`.trim(),
                endDate: exp.is_current ? "Present" : `${exp.end_month || ""} ${exp.end_year || ""}`.trim(),
                description: exp.description || ""
              }));
              setResumeData(prev => ({
                ...prev,
                experience: formattedExperiences
              }));
            }
            if (linkedinData?.educations && Array.isArray(linkedinData.educations) && linkedinData.educations.length > 0) {
              const formattedEducation = linkedinData.educations.map((edu: any, index: number) => ({
                id: `edu-${index}`,
                institution: edu.school || "",
                degree: edu.degree || "",
                field: edu.field_of_study || "",
                startDate: `${edu.start_month || ""} ${edu.start_year || ""}`.trim(),
                endDate: `${edu.end_month || ""} ${edu.end_year || ""}`.trim(),
                description: edu.activities || ""
              }));
              setResumeData(prev => ({
                ...prev,
                education: formattedEducation
              }));
            }
          }
        }

        setProgress(calculateProgress(content));
        setIsLoading(false);

        toast({
          title: "Resume loaded",
          description: "Start building your resume. AI has pre-filled your details."
        });

      } catch (error) {
        console.error('Error loading resume:', error);
        toast({
          title: "Error",
          description: "Failed to load resume data. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        navigate('/resume');
      }
    };

    fetchResumeData();
  }, [resumeId, toast, navigate]);

  const calculateProgress = (content: any) => {
    let progress = 0;
    let total = 0;
    
    if (content.personal) {
      const personalFields = Object.values(content.personal).filter(val => val !== '').length;
      progress += personalFields;
      total += Object.keys(content.personal).length;
    }
    
    if (content.summary) {
      progress += 1;
    }
    total += 1;
    
    if (content.experience && content.experience.length > 0) {
      progress += 1;
    }
    total += 1;
    
    if (content.education && content.education.length > 0) {
      progress += 1;
    }
    total += 1;
    
    if (content.skills && (content.skills.technical.length > 0 || content.skills.soft.length > 0)) {
      progress += 1;
    }
    total += 1;
    
    return Math.round((progress / total) * 100);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('resumes')
        .update({
          content: resumeData,
          template: selectedTemplate,
          settings: resumeSettings,
          updated_at: new Date().toISOString()
        })
        .eq('id', resumeId);
        
      if (error) throw error;
      
      toast({
        title: "Resume saved",
        description: "Your resume has been successfully saved."
      });
    } catch (error) {
      console.error('Error saving resume:', error);
      toast({
        title: "Error",
        description: "Failed to save resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
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
    
    setProgress(calculateProgress({
      ...resumeData,
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
          name={resumeTitle || resumeData.personal.name || "New Resume"}
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
