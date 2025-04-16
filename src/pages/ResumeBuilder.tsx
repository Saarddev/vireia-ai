
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
    paperSize: "a4",
    margins: "normal"
  });
  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(20);
  const [aiSuggestion, setAiSuggestion] = useState(null);

  useEffect(() => {
    // Simulate progress bar advancement
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
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50/80 via-indigo-50/40 to-purple-50/60 dark:from-gray-900 dark:via-purple-950/30 dark:to-gray-900">
        <header className="sticky top-0 z-50 p-3 md:p-4 border-b bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-sm">
          <div className="container max-w-[1800px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/resume')} 
                className="text-gray-600 hover:text-resume-purple dark:text-gray-300 dark:hover:text-resume-purple-light transition-colors flex items-center gap-1 hover:scale-105 transform duration-200"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h1 className="text-xl font-semibold flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-resume-purple" />
                  <span className="text-gray-800 dark:text-gray-200 font-display">{resumeData.personal.name}'s Resume</span>
                </h1>
                <Badge variant="outline" className="text-sm text-resume-purple border-resume-purple py-1">Draft</Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center mr-4">
                <Switch 
                  id="ai-mode" 
                  checked={aiEnabled} 
                  onCheckedChange={handleAIToggle} 
                  className="mr-2 data-[state=checked]:bg-resume-purple"
                />
                <Label htmlFor="ai-mode" className="text-sm font-medium cursor-pointer flex items-center">
                  <Sparkles className="h-3 w-3 mr-1 text-resume-purple" /> AI Assistant
                </Label>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/resume')} className="hover:border-resume-purple hover:text-resume-purple">
                  Cancel
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload} className="gap-1 hover:border-resume-purple hover:text-resume-purple">
                  <Download className="h-4 w-4" /> Export
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare} className="gap-1 hover:border-resume-purple hover:text-resume-purple">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSave} 
                  disabled={isSaving}
                  className="bg-resume-purple hover:bg-resume-purple-dark gap-1 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  <Save className="h-4 w-4" /> {isSaving ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex">
          {/* Sidebar */}
          <Sidebar side="left" variant="floating" collapsible="icon">
            <SidebarHeader className="p-3 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-resume-purple dark:text-resume-purple-light font-display">Resume Builder</h3>
                <SidebarTrigger />
              </div>
              
              <div className="flex gap-2 items-center">
                <Progress value={progress} className="h-2 bg-gray-100 dark:bg-gray-800" indicatorClassName="bg-resume-purple" />
                <span className="text-xs font-medium">{progress}%</span>
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
                        tooltip="Personal Information"
                        onClick={() => setActiveSection("personal")}
                      >
                        <UserRound className="h-4 w-4" />
                        <span>Personal Info</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        isActive={activeSection === "summary"}
                        tooltip="Professional Summary"
                        onClick={() => setActiveSection("summary")}
                      >
                        <FileText className="h-4 w-4" />
                        <span>Summary</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        isActive={activeSection === "experience"}
                        tooltip="Work Experience"
                        onClick={() => setActiveSection("experience")}
                      >
                        <Briefcase className="h-4 w-4" />
                        <span>Experience</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        isActive={activeSection === "education"}
                        tooltip="Education History"
                        onClick={() => setActiveSection("education")}
                      >
                        <GraduationCap className="h-4 w-4" />
                        <span>Education</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        isActive={activeSection === "skills"}
                        tooltip="Skills & Expertise"
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
                        tooltip="Resume Templates"
                        onClick={() => setActiveSection("templates")}
                      >
                        <LayoutPanelLeft className="h-4 w-4" />
                        <span>Templates</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        isActive={activeSection === "settings"}
                        tooltip="Resume Settings"
                        onClick={() => setActiveSection("settings")}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              
              <SidebarSeparator />
              
              <SidebarGroup>
                <SidebarGroupLabel>AI Tools</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        isActive={activeSection === "ai"}
                        tooltip="AI Resume Review"
                        onClick={() => setActiveSection("ai")}
                        variant={activeSection === "ai" ? "default" : "outline"}
                        className={activeSection === "ai" ? "bg-resume-purple text-white" : "border border-dashed border-resume-purple/30 text-resume-purple hover:bg-resume-purple/10"}
                      >
                        <Wand2 className="h-4 w-4" />
                        <span>AI Resume Review</span>
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

          {/* Main Content */}
          <SidebarInset className="flex flex-col px-4 py-6 md:p-6">
            {/* AI Suggestion Alert */}
            {aiSuggestion && (
              <div className="mb-6 animate-slide-up">
                <div className="bg-resume-purple/10 dark:bg-resume-purple/20 border border-resume-purple/20 dark:border-resume-purple/30 rounded-xl p-4 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-resume-purple text-white p-2 rounded-full">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-resume-purple dark:text-resume-purple-light mb-1 font-display">AI Suggestion</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{aiSuggestion.content}</p>
                      <div className="mt-3 flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-xs gap-1 border-resume-purple/20 hover:border-resume-purple hover:bg-resume-purple/5"
                          onClick={dismissAiSuggestion}
                        >
                          <X className="h-3 w-3" /> Dismiss
                        </Button>
                        <Button 
                          size="sm" 
                          className="text-xs gap-1 bg-resume-purple hover:bg-resume-purple-dark"
                          onClick={applyAiSuggestion}
                        >
                          <Check className="h-3 w-3" /> Apply Suggestion
                        </Button>
                      </div>
                    </div>
                    <button onClick={dismissAiSuggestion} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* AI Quick Actions */}
            {aiEnabled && (
              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 animate-fade-in">
                <Button 
                  variant="outline" 
                  className="h-auto py-3 px-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-resume-purple/20 hover:border-resume-purple hover:bg-resume-purple/5 shadow-sm group transition-all duration-300"
                  onClick={generateWithAI}
                  disabled={aiGenerating}
                >
                  <div className="flex flex-col items-start text-left">
                    <div className="flex items-center mb-1">
                      <Wand2 className={`h-4 w-4 mr-2 text-resume-purple ${aiGenerating ? 'animate-spin' : 'group-hover:animate-bounce'}`} />
                      <span className="font-medium">Complete Resume</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Create a full resume from your profile</span>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-3 px-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-resume-purple/20 hover:border-resume-purple hover:bg-resume-purple/5 shadow-sm group transition-all duration-300"
                >
                  <div className="flex flex-col items-start text-left">
                    <div className="flex items-center mb-1">
                      <MessageSquarePlus className="h-4 w-4 mr-2 text-resume-purple group-hover:animate-pulse" />
                      <span className="font-medium">Enhance Summary</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Make your summary more impactful</span>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-3 px-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-resume-purple/20 hover:border-resume-purple hover:bg-resume-purple/5 shadow-sm group transition-all duration-300"
                >
                  <div className="flex flex-col items-start text-left">
                    <div className="flex items-center mb-1">
                      <MousePointerClick className="h-4 w-4 mr-2 text-resume-purple group-hover:animate-pulse" />
                      <span className="font-medium">ATS Optimization</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Optimize for applicant tracking systems</span>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-3 px-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-resume-purple/20 hover:border-resume-purple hover:bg-resume-purple/5 shadow-sm group transition-all duration-300"
                >
                  <div className="flex flex-col items-start text-left">
                    <div className="flex items-center mb-1">
                      <ShieldCheck className="h-4 w-4 mr-2 text-resume-purple group-hover:animate-pulse" />
                      <span className="font-medium">Check for Errors</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Find grammar and spelling mistakes</span>
                  </div>
                </Button>
              </div>
            )}
            
            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-16rem)]">
              {/* Form Section */}
              <div className="h-full overflow-auto rounded-xl shadow-xl">
                <Card className="h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-100/60 dark:border-gray-800/60 overflow-hidden">
                  <div className="p-5 md:p-6 h-full overflow-auto">
                    <div className="mx-auto space-y-6">
                      {activeSection === "personal" && (
                        <PersonalInfoForm 
                          data={resumeData.personal} 
                          onChange={(data) => handleDataChange("personal", data)} 
                        />
                      )}
                      {activeSection === "summary" && (
                        <SummaryForm 
                          data={resumeData.summary} 
                          onChange={(data) => handleDataChange("summary", data)} 
                        />
                      )}
                      {activeSection === "experience" && (
                        <ExperienceForm 
                          data={resumeData.experience} 
                          onChange={(data) => handleDataChange("experience", data)} 
                        />
                      )}
                      {activeSection === "education" && (
                        <EducationForm 
                          data={resumeData.education} 
                          onChange={(data) => handleDataChange("education", data)} 
                        />
                      )}
                      {activeSection === "skills" && (
                        <SkillsForm 
                          data={resumeData.skills} 
                          onChange={(data) => handleDataChange("skills", data)} 
                        />
                      )}
                      {activeSection === "templates" && (
                        <TemplateSelector 
                          selectedTemplate={selectedTemplate}
                          onSelect={setSelectedTemplate}
                        />
                      )}
                      {activeSection === "settings" && (
                        <ResumeSettings 
                          settings={resumeSettings}
                          onChange={handleSettingsChange}
                        />
                      )}
                      {activeSection === "ai" && (
                        <AIAssistant 
                          resumeData={resumeData}
                          enabled={aiEnabled}
                        />
                      )}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Preview Section */}
              <div className="h-full overflow-auto rounded-xl shadow-xl">
                <Card className="h-full flex flex-col bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-100/60 dark:border-gray-800/60">
                  <div className="flex-1 overflow-auto p-5 md:p-6">
                    <ResumePreview 
                      data={resumeData} 
                      template={selectedTemplate}
                      settings={resumeSettings}
                    />
                  </div>
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
