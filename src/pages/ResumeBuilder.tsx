
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
  CornerDownLeft, 
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
  Eye,
  Palette
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

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
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
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [isSaving, setIsSaving] = useState(false);

  // Simulate loading resume data
  useEffect(() => {
    // In a real app, this would fetch the resume data based on resumeId
    toast({
      title: "Resume loaded",
      description: "Your resume data has been successfully loaded."
    });
  }, [resumeId, toast]);

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
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

  const handleAIToggle = (enabled) => {
    setAiEnabled(enabled);
    toast({
      title: enabled ? "AI Assistant enabled" : "AI Assistant disabled",
      description: enabled ? "AI will now suggest improvements to your resume." : "AI suggestions have been turned off."
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-950 dark:to-purple-950">
      {/* Header */}
      <header className="p-4 border-b bg-white dark:bg-gray-900 shadow-sm">
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/resume')} 
              className="text-resume-gray hover:text-resume-purple transition-colors flex items-center gap-1"
            >
              <CornerDownLeft className="h-4 w-4" /> Back
            </button>
            <h1 className="text-xl font-semibold flex items-center">
              <FileText className="mr-2 h-5 w-5 text-resume-purple" />
              <span className="text-gray-800 dark:text-gray-200">{resumeData.personal.name}'s Resume</span>
            </h1>
            <Badge variant="outline" className="text-sm text-resume-purple border-resume-purple">Draft</Badge>
          </div>
          
          <div className="flex items-center gap-2">
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
            
            <Button variant="outline" size="sm" onClick={() => navigate('/resume')}>
              Cancel
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} className="gap-1">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare} className="gap-1">
              <Share2 className="h-4 w-4" /> Share
            </Button>
            <Button 
              size="sm" 
              onClick={handleSave} 
              disabled={isSaving}
              className="bg-resume-purple hover:bg-resume-purple-dark gap-1"
            >
              <Save className="h-4 w-4" /> {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-6 flex-1 flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Left Sidebar - Sections */}
          <div className="lg:col-span-1">
            <Card className="shadow-sm h-full">
              <div className="p-4 flex flex-col h-full">
                <h2 className="font-semibold mb-4 text-lg flex items-center">
                  <GanttChartSquare className="mr-2 h-5 w-5 text-resume-purple" />
                  Resume Sections
                </h2>
                <div className="space-y-1">
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
                  <Button 
                    variant={activeSection === "languages" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeSection === "languages" ? "bg-resume-purple text-white" : ""}`}
                    onClick={() => setActiveSection("languages")}
                  >
                    <Languages className="mr-2 h-4 w-4" /> Languages
                  </Button>
                  <Button 
                    variant={activeSection === "certifications" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeSection === "certifications" ? "bg-resume-purple text-white" : ""}`}
                    onClick={() => setActiveSection("certifications")}
                  >
                    <Award className="mr-2 h-4 w-4" /> Certifications
                  </Button>
                  <Button 
                    variant={activeSection === "projects" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeSection === "projects" ? "bg-resume-purple text-white" : ""}`}
                    onClick={() => setActiveSection("projects")}
                  >
                    <Globe className="mr-2 h-4 w-4" /> Projects
                  </Button>
                </div>

                <Separator className="my-6" />

                <h2 className="font-semibold mb-4 text-lg flex items-center">
                  <Palette className="mr-2 h-5 w-5 text-resume-purple" />
                  Appearance
                </h2>
                <div className="space-y-1">
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

                <div className="mt-auto">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-resume-purple mt-6 border border-dashed border-resume-purple/30"
                    onClick={() => setActiveSection("ai")}
                  >
                    <Wand2 className="mr-2 h-4 w-4" /> AI Resume Review
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Middle - Form Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-sm h-full">
              <div className="p-4 h-full overflow-auto">
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
                  <ResumeSettings />
                )}
                {activeSection === "ai" && (
                  <AIAssistant 
                    resumeData={resumeData}
                    enabled={aiEnabled}
                  />
                )}
              </div>
            </Card>
          </div>

          {/* Right - Preview */}
          <div className="lg:col-span-1">
            <Card className="shadow-sm h-full flex flex-col">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-semibold flex items-center">
                  <Eye className="mr-2 h-5 w-5 text-resume-purple" /> Preview
                </h2>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              </div>
              <div className="p-4 flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
                <ResumePreview 
                  data={resumeData} 
                  template={selectedTemplate} 
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
