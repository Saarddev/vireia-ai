
import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils";
import { format } from "date-fns"
import { DateRange } from "react-day-picker"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { supabase } from '@/integrations/supabase/client';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import BuilderSidebar from '@/components/resume-builder/BuilderSidebar';
import ResumePreview from '@/components/ResumePreview';
import { templates } from '@/data/templates';
import { ResumeData, Experience, Education, Project } from '@/types/resume';
import { useResumeAI } from '@/hooks/use-resume-ai';
import AIAssistant from '@/components/resume-builder/AIAssistant';

const ResumeBuilder: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
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
    skills: { technical: [], soft: [] },
    languages: [],
    certifications: [],
    projects: []
  });
  const [displayData, setDisplayData] = useState<ResumeData>(resumeData);
  const [activeSection, setActiveSection] = useState("personal");
  const [activeTab, setActiveTab] = useState("personal");
  const [template, setTemplate] = useState("modern");
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [settings, setSettings] = useState({
    fontFamily: 'Inter',
    fontSize: 10,
    primaryColor: '#5d4dcd',
    paperSize: 'a4',
    margins: 'normal'
  });
  const { toast } = useToast();
  const { generateSummary } = useResumeAI();

  const calculateProgress = useCallback(() => {
    let completedFields = 0;
    let totalFields = 0;

    // Personal Info
    totalFields += 7;
    for (const key in resumeData.personal) {
      if (resumeData.personal[key as keyof typeof resumeData.personal]) {
        completedFields++;
      }
    }

    // Summary
    totalFields++;
    if (resumeData.summary) {
      completedFields++;
    }

    // Experience
    totalFields += resumeData.experience.length * 4; // title, company, startDate, description
    resumeData.experience.forEach(exp => {
      if (exp.title) completedFields++;
      if (exp.company) completedFields++;
      if (exp.startDate) completedFields++;
      if (exp.description) completedFields++;
    });

    // Education
    totalFields += resumeData.education.length * 3; // institution, degree, date
    resumeData.education.forEach(edu => {
      if (edu.institution) completedFields++;
      if (edu.degree) completedFields++;
      if (edu.date) completedFields++;
    });

    // Skills
    totalFields += resumeData.skills.technical.length + resumeData.skills.soft.length;
    completedFields += resumeData.skills.technical.length + resumeData.skills.soft.length;

    const progress = (completedFields / totalFields) * 100;
    return isFinite(progress) ? Math.min(Math.max(progress, 0), 100) : 0;
  }, [resumeData]);

  const progress = calculateProgress();

  const handleDataChange = (section: string, data: any) => {
    setResumeData(prev => ({ ...prev, [section]: data }));
    setDisplayData(prev => ({ ...prev, [section]: data }));
  };

  const handleResumeUpdate = (updatedResume: ResumeData) => {
    setResumeData(updatedResume);
    setDisplayData(updatedResume);
  };

  const handleGenerateWithAI = async (section: string): Promise<void> => {
    if (section === "summary") {
      const experienceText = resumeData.experience.map(job => 
        `${job.title} at ${job.company}: ${job.description}`
      ).join("\n");
      
      try {
        setIsAIGenerating(true);
        const summary = await generateSummary(experienceText, [
          ...resumeData.skills.technical,
          ...resumeData.skills.soft
        ]);
        
        if (summary) {
          setResumeData(prev => ({
            ...prev,
            summary
          }));
          toast({
            title: "Professional summary generated!",
            description: "Your summary has been updated with AI assistance"
          });
        }
      } catch (error) {
        console.error("Error generating summary:", error);
      } finally {
        setIsAIGenerating(false);
      }
    }
  };

  const handleToggleAI = () => {
    setIsAIEnabled(prev => !prev);
    toast({
      title: `AI Assistant ${isAIEnabled ? "disabled" : "enabled"}`,
      description: `AI features are now ${isAIEnabled ? "disabled" : "enabled"}.`
    });
  };

  const handleSettingsChange = (newSettings: any) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    
    // Only update active section if it's not a template tab
    if (!["templates", "settings", "ai"].includes(tabName)) {
      setActiveSection(tabName);
    }
    
    // Deep copy the resumeData to avoid type issues
    const safeResumeData = JSON.parse(JSON.stringify(resumeData));
    
    setDisplayData(safeResumeData);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <BuilderHeader 
        onToggleAI={handleToggleAI}
        isAIEnabled={isAIEnabled}
      />
      
      <main className="flex-1 flex overflow-hidden">
        <div className="w-72 border-r border-gray-200 flex flex-col h-full overflow-hidden">
          <BuilderSidebar 
            progress={progress}
            activeSection={activeSection}
            aiEnabled={isAIEnabled}
            aiGenerating={isAIGenerating}
            onSectionChange={handleTabChange}
            onGenerateWithAI={() => handleGenerateWithAI("summary")}
          />
        </div>
        
        <div className="flex-1 overflow-hidden flex">
          <div className="w-1/2 overflow-auto px-8 py-6">
            {activeTab === "personal" && (
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Enter your basic details</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={resumeData.personal.name} onChange={(e) => handleDataChange("personal", { ...resumeData.personal, name: e.target.value })} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" value={resumeData.personal.title} onChange={(e) => handleDataChange("personal", { ...resumeData.personal, title: e.target.value })} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={resumeData.personal.email} onChange={(e) => handleDataChange("personal", { ...resumeData.personal, email: e.target.value })} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" value={resumeData.personal.phone} onChange={(e) => handleDataChange("personal", { ...resumeData.personal, phone: e.target.value })} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" value={resumeData.personal.location} onChange={(e) => handleDataChange("personal", { ...resumeData.personal, location: e.target.value })} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input id="linkedin" type="url" value={resumeData.personal.linkedin} onChange={(e) => handleDataChange("personal", { ...resumeData.personal, linkedin: e.target.value })} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" type="url" value={resumeData.personal.website} onChange={(e) => handleDataChange("personal", { ...resumeData.personal, website: e.target.value })} />
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "summary" && (
              <Card>
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                  <CardDescription>Write a brief overview of your qualifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="summary">Summary</Label>
                      <Textarea id="summary" value={resumeData.summary} onChange={(e) => handleDataChange("summary", e.target.value)} className="min-h-[100px]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "experience" && (
              <Card>
                <CardHeader>
                  <CardTitle>Experience</CardTitle>
                  <CardDescription>Detail your work experience</CardDescription>
                </CardHeader>
                <CardContent>
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="mb-6 border rounded-md p-4">
                      <h4 className="text-lg font-semibold mb-2">Job {index + 1}</h4>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor={`title-${index}`}>Position</Label>
                          <Input id={`title-${index}`} value={exp.title} onChange={(e) => {
                            const newExperience = [...resumeData.experience];
                            newExperience[index] = { ...exp, title: e.target.value };
                            handleDataChange("experience", newExperience);
                          }} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor={`company-${index}`}>Company</Label>
                          <Input id={`company-${index}`} value={exp.company} onChange={(e) => {
                            const newExperience = [...resumeData.experience];
                            newExperience[index] = { ...exp, company: e.target.value };
                            handleDataChange("experience", newExperience);
                          }} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                          <Input id={`startDate-${index}`} type="date" value={exp.startDate} onChange={(e) => {
                            const newExperience = [...resumeData.experience];
                            newExperience[index] = { ...exp, startDate: e.target.value };
                            handleDataChange("experience", newExperience);
                          }} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor={`description-${index}`}>Description</Label>
                          <Textarea id={`description-${index}`} value={exp.description} onChange={(e) => {
                            const newExperience = [...resumeData.experience];
                            newExperience[index] = { ...exp, description: e.target.value };
                            handleDataChange("experience", newExperience);
                          }} className="min-h-[80px]" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button onClick={() => handleDataChange("experience", [...resumeData.experience, { title: "", company: "", startDate: "", description: "" } as Experience])}>
                    Add Experience
                  </Button>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "education" && (
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>Detail your education history</CardDescription>
                </CardHeader>
                <CardContent>
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="mb-6 border rounded-md p-4">
                      <h4 className="text-lg font-semibold mb-2">Education {index + 1}</h4>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor={`institution-${index}`}>Institution</Label>
                          <Input id={`institution-${index}`} value={edu.institution} onChange={(e) => {
                            const newEducation = [...resumeData.education];
                            newEducation[index] = { ...edu, institution: e.target.value };
                            handleDataChange("education", newEducation);
                          }} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor={`degree-${index}`}>Degree</Label>
                          <Input id={`degree-${index}`} value={edu.degree} onChange={(e) => {
                            const newEducation = [...resumeData.education];
                            newEducation[index] = { ...edu, degree: e.target.value };
                            handleDataChange("education", newEducation);
                          }} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor={`date-${index}`}>Graduation Date</Label>
                          <Input id={`date-${index}`} type="date" value={edu.date} onChange={(e) => {
                            const newEducation = [...resumeData.education];
                            newEducation[index] = { ...edu, date: e.target.value };
                            handleDataChange("education", newEducation);
                          }} />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button onClick={() => handleDataChange("education", [...resumeData.education, { institution: "", degree: "", date: "" } as Education])}>
                    Add Education
                  </Button>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "skills" && (
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>List your technical and soft skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="technicalSkills">Technical Skills</Label>
                      <Input
                        id="technicalSkills"
                        placeholder="Add a technical skill"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const skill = (e.target as HTMLInputElement).value.trim();
                            if (skill && !resumeData.skills.technical.includes(skill)) {
                              handleDataChange("skills", { ...resumeData.skills, technical: [...resumeData.skills.technical, skill] });
                            }
                            (e.target as HTMLInputElement).value = '';
                          }
                        }}
                      />
                      <div className="flex flex-wrap gap-1">
                        {resumeData.skills.technical.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="mr-1">
                            {skill}
                            <Button variant="ghost" size="icon" className="ml-2 -mr-1 h-4 w-4" onClick={() => {
                              const newSkills = [...resumeData.skills.technical];
                              newSkills.splice(index, 1);
                              handleDataChange("skills", { ...resumeData.skills, technical: newSkills });
                            }}>
                              <span className="sr-only">Remove</span>
                              <X />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="softSkills">Soft Skills</Label>
                      <Input
                        id="softSkills"
                        placeholder="Add a soft skill"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const skill = (e.target as HTMLInputElement).value.trim();
                            if (skill && !resumeData.skills.soft.includes(skill)) {
                              handleDataChange("skills", { ...resumeData.skills, soft: [...resumeData.skills.soft, skill] });
                            }
                            (e.target as HTMLInputElement).value = '';
                          }
                        }}
                      />
                      <div className="flex flex-wrap gap-1">
                        {resumeData.skills.soft.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="mr-1">
                            {skill}
                            <Button variant="ghost" size="icon" className="ml-2 -mr-1 h-4 w-4" onClick={() => {
                              const newSkills = [...resumeData.skills.soft];
                              newSkills.splice(index, 1);
                              handleDataChange("skills", { ...resumeData.skills, soft: newSkills });
                            }}>
                              <span className="sr-only">Remove</span>
                              <X />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "projects" && (
              <Card>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>Showcase your personal projects</CardDescription>
                </CardHeader>
                <CardContent>
                  {resumeData.projects.map((project, index) => (
                    <div key={index} className="mb-6 border rounded-md p-4">
                      <h4 className="text-lg font-semibold mb-2">Project {index + 1}</h4>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor={`title-${index}`}>Name</Label>
                          <Input id={`title-${index}`} value={project.title} onChange={(e) => {
                            const newProjects = [...resumeData.projects];
                            newProjects[index] = { ...project, title: e.target.value };
                            handleDataChange("projects", newProjects);
                          }} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor={`description-${index}`}>Description</Label>
                          <Textarea id={`description-${index}`} value={project.description} onChange={(e) => {
                            const newProjects = [...resumeData.projects];
                            newProjects[index] = { ...project, description: e.target.value };
                            handleDataChange("projects", newProjects);
                          }} className="min-h-[80px]" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor={`link-${index}`}>Link</Label>
                          <Input id={`link-${index}`} type="url" value={project.link} onChange={(e) => {
                            const newProjects = [...resumeData.projects];
                            newProjects[index] = { ...project, link: e.target.value };
                            handleDataChange("projects", newProjects);
                          }} />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button onClick={() => handleDataChange("projects", [...resumeData.projects, { title: "", description: "", link: "", technologies: [] } as Project])}>
                    Add Project
                  </Button>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "templates" && (
              <Card>
                <CardHeader>
                  <CardTitle>Templates</CardTitle>
                  <CardDescription>Choose a resume template</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                  {templates.map(tmpl => (
                    <div key={tmpl.id} className="w-40">
                      <img src={tmpl.image} alt={tmpl.name} className="rounded-md shadow-sm" />
                      <Button variant="outline" className="w-full mt-2" onClick={() => setTemplate(tmpl.id)}>
                        {tmpl.name}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
            
            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Customize your resume</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fontFamily">Font Family</Label>
                    <Select value={settings.fontFamily} onValueChange={(value) => handleSettingsChange({ fontFamily: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Helvetica">Helvetica</SelectItem>
                        <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fontSize">Font Size</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">8</span>
                      <Slider
                        defaultValue={[settings.fontSize]}
                        max={14}
                        min={8}
                        step={1}
                        onValueChange={(value) => handleSettingsChange({ fontSize: value[0] })}
                        className="w-[70%] mx-2"
                      />
                      <span className="text-sm text-muted-foreground">14</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <Input type="color" value={settings.primaryColor} onChange={(e) => handleSettingsChange({ primaryColor: e.target.value })} />
                  </div>

                  <div className="space-y-2">
                    <Label>Paper Size</Label>
                    <Select value={settings.paperSize} onValueChange={(value) => handleSettingsChange({ paperSize: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select paper size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a4">A4</SelectItem>
                        <SelectItem value="letter">Letter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Margins</Label>
                    <Select value={settings.margins} onValueChange={(value) => handleSettingsChange({ margins: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select margin size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="narrow">Narrow</SelectItem>
                        <SelectItem value="wide">Wide</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "ai" && (
              <AIAssistant 
                resumeData={resumeData} 
                enabled={isAIEnabled}
                onUpdateResume={handleResumeUpdate}
              />
            )}
          </div>
          
          <div className="w-1/2 bg-gray-50 border-l border-gray-100">
            <ResumePreview 
              data={displayData}
              template={template}
              settings={settings}
              onDataChange={handleDataChange}
              onGenerateWithAI={handleGenerateWithAI}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeBuilder;

interface BuilderHeaderProps {
  onToggleAI: () => void;
  isAIEnabled: boolean;
}

const BuilderHeader: React.FC<BuilderHeaderProps> = ({ onToggleAI, isAIEnabled }) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">Resume Builder</h1>
      <div className="flex items-center gap-4">
        <Label htmlFor="ai-toggle" className="text-sm font-medium text-gray-700">
          AI Assistant
        </Label>
        <Switch id="ai-toggle" checked={isAIEnabled} onCheckedChange={onToggleAI} />
      </div>
    </header>
  );
};

const X = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-x"
  >
    <path d="M18 6 6 18" />
    <path d="M6 6 18 18" />
  </svg>
);
