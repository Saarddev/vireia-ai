import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { 
  FileText, 
  ArrowLeft, 
  Save, 
  Download, 
  Share2, 
  Wand2, 
  LayoutPanelLeft,
  Settings,
  UserRound,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Languages,
  GanttChartSquare,
  Globe,
  Sparkles,
  PanelLeft,
  Palette,
  MousePointerClick,
  ShieldCheck,
  MessageSquarePlus,
  Check,
  X,
  ExternalLink,
  Clock,
  CloudLightning
} from 'lucide-react';

import ResumePreview from '@/components/ResumePreview';
import PersonalInfoForm from '@/components/resume-builder/PersonalInfoForm';
import ExperienceForm from '@/components/resume-builder/ExperienceForm';
import EducationForm from '@/components/resume-builder/EducationForm';
import SkillsForm from '@/components/resume-builder/SkillsForm';
import SummaryForm from '@/components/resume-builder/SummaryForm';
import AIAssistant from '@/components/resume-builder/AIAssistant';
import TemplateSelector from '@/components/resume-builder/TemplateSelector';
import ResumeSettings from '@/components/resume-builder/ResumeSettings';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
  SidebarInset
} from "@/components/ui/sidebar";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isMobile, isTablet } = useIsMobile();
  const [activeSection, setActiveSection] = useState("personal");
  const [resumeData, setResumeData] = useState({
    personal: {
      name: "John Smith",
      title: "Software Engineer",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/johnsmith",
      website: "johnsmith.dev"
    },
    summary: "Experienced software engineer with 5+ years of experience in full-stack development. Passionate about building scalable web applications and solving complex problems.",
    experience: [
      {
        id: "exp1",
        title: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        location: "San Francisco, CA",
        startDate: "Jan 2022",
        endDate: "Present",
        description: "Lead developer for the company's flagship product. Managed a team of 5 engineers and implemented CI/CD pipelines that reduced deployment time by 40%."
      },
      {
        id: "exp2",
        title: "Software Engineer",
        company: "Web Innovators",
        location: "San Jose, CA",
        startDate: "Jun 2019",
        endDate: "Dec 2021",
        description: "Developed and maintained RESTful APIs using Node.js and Express. Implemented new features that increased user engagement by 25%."
      }
    ],
    education: [
      {
        id: "edu1",
        degree: "Master of Science in Computer Science",
        institution: "Stanford University",
        location: "Stanford, CA",
        startDate: "Sep 2017",
        endDate: "May 2019",
        description: "Specialization in Artificial Intelligence. GPA: 3.8/4.0"
      },
      {
        id: "edu2",
        degree: "Bachelor of Science in Computer Engineering",
        institution: "University of California, Berkeley",
        location: "Berkeley, CA",
        startDate: "Sep 2013",
        endDate: "May 2017",
        description: "Dean's List, Graduated with Honors. GPA: 3.7/4.0"
      }
    ],
    skills: {
      technical: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "SQL", "MongoDB"],
      soft: ["Leadership", "Communication", "Problem Solving", "Team Management", "Agile Methodologies"]
    },
    languages: [
      { language: "English", proficiency: "Native" },
      { language: "Spanish", proficiency: "Intermediate" }
    ],
    certifications: [
      { id: "cert1", name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "2023" },
      { id: "cert2", name: "Professional Scrum Master I", issuer: "Scrum.org", date: "2021" }
    ],
    projects: [
      { 
        id: "proj1", 
        name: "E-commerce Platform", 
        technologies: ["React", "Node.js", "MongoDB"], 
        description: "Built a scalable e-commerce platform with real-time inventory management and payment processing integration." 
      },
      { 
        id: "proj2", 
        name: "Machine Learning Pipeline", 
        technologies: ["Python", "TensorFlow", "AWS Lambda"], 
        description: "Developed an automated ML pipeline that processes and analyzes customer data to predict buying behavior." 
      }
    ]
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(85);
    }, 1000);
    
    toast({
      title: "Resume loaded",
      description: "Your resume data has been loaded. AI is ready to assist you."
    });
    
    return () => clearTimeout(timer);
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

  const handleDataChange = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSettingsChange = (newSettings) => {
    setResumeSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  const handleAIToggle = (enabled) => {
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

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50/80 via-background to-purple-50/60 dark:from-gray-900/90 dark:via-gray-900/50 dark:to-gray-900/90">
        <header className="sticky top-0 z-50 px-4 py-3 border-b bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-sm">
          <div className="container max-w-[1800px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/resume')} 
                className="text-muted-foreground hover:text-resume-purple dark:hover:text-resume-purple-light transition-colors flex items-center gap-1.5 hover:scale-105 transform duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="font-medium">Back</span>
              </button>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h1 className="text-xl font-semibold flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-resume-purple" />
                  <span className="text-foreground font-display">{resumeData.personal.name}'s Resume</span>
                </h1>
                <Badge 
                  variant="outline" 
                  className="text-sm text-resume-purple border-resume-purple/30 bg-resume-purple/5 py-1"
                >
                  Draft
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center mr-4">
                <Switch 
                  id="ai-mode" 
                  checked={aiEnabled} 
                  onCheckedChange={handleAIToggle} 
                  className="mr-2 data-[state=checked]:bg-resume-purple"
                />
                <Label 
                  htmlFor="ai-mode" 
                  className="text-sm font-medium cursor-pointer flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5 mr-1.5 text-resume-purple" />
                  AI Assistant
                </Label>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSave} 
                  className="gap-1.5 border-resume-purple/20 text-resume-purple hover:bg-resume-purple/5 hover:border-resume-purple transition-all duration-300"
                  disabled={isSaving}
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving..." : "Save"}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleDownload}
                  className="gap-1.5 border-resume-purple/20 text-resume-purple hover:bg-resume-purple/5 hover:border-resume-purple transition-all duration-300"
                >
                  <Download className="h-4 w-4" />
                  Export PDF
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleShare}
                  className="gap-1.5 border-resume-purple/20 text-resume-purple hover:bg-resume-purple/5 hover:border-resume-purple transition-all duration-300"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex">
          <Sidebar side="left" variant="floating" collapsible="icon">
            <SidebarHeader className="p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-resume-purple dark:text-resume-purple-light font-display">
                  Resume Builder
                </h3>
                <SidebarTrigger />
              </div>
              
              <div className="flex gap-2 items-center bg-muted/30 rounded-lg p-2">
                <Progress 
                  value={progress} 
                  className="h-2" 
                  indicatorClassName="bg-resume-purple"
                />
                <span className="text-xs font-medium text-muted-foreground">{progress}%</span>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Resume Sections</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        isActive={activeSection === "personal"}
                        onClick={() => setActiveSection("personal")}
                      >
                        <UserRound className="h-4 w-4" />
                        <span>Personal Info</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        isActive={activeSection === "summary"}
                        onClick={() => setActiveSection("summary")}
                      >
                        <FileText className="h-4 w-4" />
                        <span>Summary</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        isActive={activeSection === "experience"}
                        onClick={() => setActiveSection("experience")}
                      >
                        <Briefcase className="h-4 w-4" />
                        <span>Experience</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        isActive={activeSection === "education"}
                        onClick={() => setActiveSection("education")}
                      >
                        <GraduationCap className="h-4 w-4" />
                        <span>Education</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        isActive={activeSection === "skills"}
                        onClick={() => setActiveSection("skills")}
                      >
                        <Code className="h-4 w-4" />
                        <span>Skills</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              
              <SidebarSeparator />
              
              <SidebarGroup>
                <SidebarGroupLabel>Customization</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        isActive={activeSection === "templates"}
                        onClick={() => setActiveSection("templates")}
                      >
                        <LayoutPanelLeft className="h-4 w-4" />
                        <span>Templates</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        isActive={activeSection === "settings"}
                        onClick={() => setActiveSection("settings")}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        isActive={activeSection === "ai"}
                        onClick={() => setActiveSection("ai")}
                        className={cn(
                          "w-full gap-2",
                          activeSection === "ai" ? "text-resume-purple" : "text-muted-foreground"
                        )}
                      >
                        <div className="relative">
                          <Wand2 className="h-4 w-4" />
                          {aiEnabled && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-resume-purple rounded-full" />
                          )}
                        </div>
                        <span>AI Assistant</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter className="p-3">
              <Button 
                variant="outline" 
                size="sm"
                className="w-full justify-center gap-2 border-resume-purple/20 text-resume-purple hover:bg-resume-purple/10 hover:border-resume-purple dark:border-resume-purple-light/20 dark:text-resume-purple-light dark:hover:bg-resume-purple-light/10"
                onClick={generateWithAI}
                disabled={aiGenerating || !aiEnabled}
              >
                {aiGenerating ? (
                  <CloudLightning className="h-4 w-4 animate-pulse" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                {aiGenerating ? "Generating..." : "Generate with AI"}
              </Button>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset className="flex flex-col p-4 lg:p-6">
            {aiSuggestion && (
              <div className="mb-6">
                <Card className="bg-resume-purple/5 border border-resume-purple/20 shadow-lg overflow-hidden">
                  <div className="p-4 flex items-start gap-4">
                    <div className="bg-resume-purple text-white p-2 rounded-lg shadow-inner">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-resume-purple dark:text-resume-purple-light mb-1 font-display">
                        AI Suggestion
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {aiSuggestion.content}
                      </p>
                      <div className="mt-3 flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-xs gap-1.5 border-resume-purple/20 hover:border-resume-purple hover:bg-resume-purple/5"
                          onClick={dismissAiSuggestion}
                        >
                          <X className="h-3 w-3" />
                          Dismiss
                        </Button>
                        <Button 
                          size="sm" 
                          className="text-xs gap-1.5 bg-resume-purple hover:bg-resume-purple-dark"
                          onClick={applyAiSuggestion}
                        >
                          <Check className="h-3 w-3" />
                          Apply Suggestion
                        </Button>
                      </div>
                    </div>
                    <button 
                      onClick={dismissAiSuggestion}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </Card>
              </div>
            )}
            
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 h-[calc(100vh-8rem)]">
              <div className="xl:col-span-3 h-full overflow-auto">
                <Card className="h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-100/60 dark:border-gray-800/60 overflow-hidden shadow-xl">
                  <div className="p-4 lg:p-6 h-full overflow-auto">
                    <div className="max-w-2xl space-y-6">
                      {activeSection === "personal" && <PersonalInfoForm data={resumeData.personal} onChange={(data) => handleDataChange("personal", data)} />}
                      {activeSection === "summary" && <SummaryForm data={resumeData.summary} onChange={(data) => handleDataChange("summary", data)} />}
                      {activeSection === "experience" && <ExperienceForm data={resumeData.experience} onChange={(data) => handleDataChange("experience", data)} />}
                      {activeSection === "education" && <EducationForm data={resumeData.education} onChange={(data) => handleDataChange("education", data)} />}
                      {activeSection === "skills" && <SkillsForm data={resumeData.skills} onChange={(data) => handleDataChange("skills", data)} />}
                      {activeSection === "templates" && <TemplateSelector selectedTemplate={selectedTemplate} onSelect={setSelectedTemplate} />}
                      {activeSection === "settings" && <ResumeSettings settings={resumeSettings} onChange={handleSettingsChange} />}
                      {activeSection === "ai" && <AIAssistant resumeData={resumeData} enabled={aiEnabled} />}
                    </div>
                  </div>
                </Card>
              </div>

              <div className="xl:col-span-9 h-full overflow-auto">
                <Card className="h-full flex flex-col bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-100/60 dark:border-gray-800/60 shadow-xl">
                  <ResumePreview 
                    data={resumeData} 
                    template={selectedTemplate}
                    settings={resumeSettings}
                    onDataChange={handleDataChange}
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
