
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
  MessageSquarePlus
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

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isMobile, isTablet } = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
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
      toast({
        title: "AI Generation Complete",
        description: "Your resume has been enhanced by our AI assistant."
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50/80 to-gray-50/80 dark:from-gray-900/80 dark:via-purple-950/30 dark:to-gray-900/80">
      <header className="sticky top-0 z-50 p-4 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm">
        <div className="container max-w-[1800px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/resume')} 
              className="text-resume-gray hover:text-resume-purple transition-colors flex items-center gap-1 hover:scale-105 transform duration-200"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-xl font-semibold flex items-center">
                <FileText className="mr-2 h-5 w-5 text-resume-purple" />
                <span className="text-gray-800 dark:text-gray-200">{resumeData.personal.name}'s Resume</span>
              </h1>
              <Badge variant="outline" className="text-sm text-resume-purple border-resume-purple">Draft</Badge>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
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

      <div className="container max-w-[1800px] mx-auto px-4 py-6 flex-1 flex flex-col gap-6">
        {/* Progress bar */}
        <div className="w-full bg-white/50 dark:bg-gray-800/50 rounded-full h-2 mb-2">
          <div 
            className="bg-resume-purple h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Quick AI Actions */}
        {aiEnabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button 
              variant="outline" 
              className="h-auto py-3 px-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-resume-purple/20 hover:border-resume-purple hover:bg-resume-purple/5 shadow-sm group transition-all duration-300"
              onClick={generateWithAI}
              disabled={aiGenerating}
            >
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center mb-1">
                  <Wand2 className={`h-4 w-4 mr-2 text-resume-purple ${aiGenerating ? 'animate-spin' : 'group-hover:animate-bounce'}`} />
                  <span className="font-medium">Generate Complete Resume</span>
                </div>
                <span className="text-xs text-muted-foreground">Create a full resume based on your profile</span>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-14rem)]">
          {/* Side navigation - collapsible on mobile */}
          {(sidebarOpen || !isMobile) && (
            <div className="lg:col-span-3 xl:col-span-2 h-full overflow-auto">
              <Card className="shadow-lg h-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-resume-purple/10 hover:border-resume-purple/20 transition-colors p-2">
                <div className="flex flex-col h-full">
                  <div className="p-3">
                    <h2 className="font-semibold mb-2 text-lg flex items-center">
                      <GanttChartSquare className="mr-2 h-5 w-5 text-resume-purple" />
                      Resume Sections
                    </h2>
                  </div>
                  
                  <div className="overflow-y-auto flex-1">
                    <div className="space-y-1 px-2">
                      <Button 
                        variant={activeSection === "personal" ? "default" : "ghost"} 
                        className={`w-full justify-start ${activeSection === "personal" ? "bg-resume-purple text-white" : ""}`}
                        onClick={() => setActiveSection("personal")}
                      >
                        <UserRound className="mr-2 h-4 w-4" /> Personal Information
                      </Button>
                      <Button 
                        variant={activeSection === "summary" ? "default" : "ghost"}
                        className={`w-full justify-start ${activeSection === "summary" ? "bg-resume-purple text-white" : ""}`}
                        onClick={() => setActiveSection("summary")}
                      >
                        <FileText className="mr-2 h-4 w-4" /> Professional Summary
                      </Button>
                      <Button 
                        variant={activeSection === "experience" ? "default" : "ghost"}
                        className={`w-full justify-start ${activeSection === "experience" ? "bg-resume-purple text-white" : ""}`}
                        onClick={() => setActiveSection("experience")}
                      >
                        <Briefcase className="mr-2 h-4 w-4" /> Work Experience
                      </Button>
                      <Button 
                        variant={activeSection === "education" ? "default" : "ghost"}
                        className={`w-full justify-start ${activeSection === "education" ? "bg-resume-purple text-white" : ""}`}
                        onClick={() => setActiveSection("education")}
                      >
                        <GraduationCap className="mr-2 h-4 w-4" /> Education
                      </Button>
                      <Button 
                        variant={activeSection === "skills" ? "default" : "ghost"}
                        className={`w-full justify-start ${activeSection === "skills" ? "bg-resume-purple text-white" : ""}`}
                        onClick={() => setActiveSection("skills")}
                      >
                        <Code className="mr-2 h-4 w-4" /> Skills
                      </Button>
                    </div>

                    <Separator className="my-4 mx-2" />

                    <div className="space-y-1 px-2">
                      <Button 
                        variant={activeSection === "templates" ? "default" : "ghost"}
                        className={`w-full justify-start ${activeSection === "templates" ? "bg-resume-purple text-white" : ""}`}
                        onClick={() => setActiveSection("templates")}
                      >
                        <LayoutPanelLeft className="mr-2 h-4 w-4" /> Templates
                      </Button>
                      <Button 
                        variant={activeSection === "settings" ? "default" : "ghost"}
                        className={`w-full justify-start ${activeSection === "settings" ? "bg-resume-purple text-white" : ""}`}
                        onClick={() => setActiveSection("settings")}
                      >
                        <Settings className="mr-2 h-4 w-4" /> Settings
                      </Button>
                    </div>
                  </div>

                  <div className="p-2 mt-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-resume-purple border border-dashed border-resume-purple/30 hover:bg-resume-purple/10 hover:border-resume-purple"
                      onClick={() => setActiveSection("ai")}
                    >
                      <Wand2 className="mr-2 h-4 w-4" /> AI Resume Review
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Content */}
          <div className={`${sidebarOpen || !isMobile ? "lg:col-span-9 xl:col-span-10" : "lg:col-span-12"} h-full grid grid-cols-1 md:grid-cols-2 gap-6`}>
            {/* Mobile sidebar toggle */}
            {isMobile && (
              <div className="fixed bottom-5 left-5 z-10">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full shadow-lg bg-resume-purple text-white hover:bg-resume-purple-dark"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <PanelLeft className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Main form content */}
            <div className="h-full overflow-auto">
              <Card className="shadow-lg h-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-resume-purple/10 hover:border-resume-purple/20 transition-colors">
                <div className="p-6 h-full overflow-auto">
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

            {/* Resume preview */}
            <div className="h-full overflow-auto">
              <Card className="shadow-lg h-full flex flex-col bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-resume-purple/10 hover:border-resume-purple/20 transition-colors">
                <div className="flex-1 overflow-auto p-4">
                  <ResumePreview 
                    data={resumeData} 
                    template={selectedTemplate}
                    settings={resumeSettings}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
