
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useResumeData } from '@/hooks/use-resume-data';
import { useResumeAI } from '@/hooks/use-resume-ai';
import { summarizeText } from '@/utils/summarizeText';
import { 
  Download, 
  Undo, 
  Redo, 
  Move, 
  PanelLeft, 
  ChevronLeft,
  Share2,
  Plus,
  Settings as SettingsIcon,
  Layers,
  Save,
  ZoomIn,
  ZoomOut,
  X,
  FileText,
  List,
  Edit,
  Check,
  Eye // Added missing Eye component import
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { Card } from '@/components/ui/card';
import { ResumeLoadingSkeleton } from '@/components/resume-preview/LoadingSkeleton';
import ModernTemplate from '@/components/resume-preview/ModernTemplate';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Added missing Textarea component import
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";

const CANVAS_PADDING = 40;
const DEFAULT_ZOOM = 100;
const PAPER_SIZES = {
  a4: { width: '210mm', height: '297mm', ratio: 1.414 },
  letter: { width: '8.5in', height: '11in', ratio: 1.294 },
  legal: { width: '8.5in', height: '14in', ratio: 1.647 },
};

const ResumeCanvas = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string>("select");
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [undoStack, setUndoStack] = useState<any[]>([]);
  const [redoStack, setRedoStack] = useState<any[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [isSectionEditorOpen, setIsSectionEditorOpen] = useState(false);
  const [editingField, setEditingField] = useState<{section: string; field?: string; itemId?: string; value: string}>({section: '', value: ''});
  const { isGenerating, improveDescription, generateSummary, extractSkills } = useResumeAI();

  const { 
    isLoading, 
    resumeData, 
    setResumeData, 
    resumeTitle, 
    setResumeTitle,
    selectedTemplate, 
    setSelectedTemplate, 
    resumeSettings, 
    setResumeSettings,
    calculateProgress,
    handleSave
  } = useResumeData(resumeId);

  // Track history for undo/redo
  const addToHistory = (newData: any) => {
    setUndoStack((prev) => [...prev, JSON.stringify(resumeData)]);
    setRedoStack([]);
  };

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0]);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 50));
  };

  const handleZoomReset = () => {
    setZoom(DEFAULT_ZOOM);
  };

  const handleDownload = async () => {
    try {
      toast.success("Preparing your resume for download...");
      // In a real implementation, we would generate and download a PDF
      window.open(`/resume/pdf/${resumeId}`, '_blank');
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast.error('Failed to download resume');
    }
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    
    const lastState = undoStack[undoStack.length - 1];
    setUndoStack(undoStack.slice(0, -1));
    setRedoStack([...redoStack, JSON.stringify(resumeData)]);
    
    // Apply the undo action
    setResumeData(JSON.parse(lastState));
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    
    const nextState = redoStack[redoStack.length - 1];
    setRedoStack(redoStack.slice(0, -1));
    setUndoStack([...undoStack, JSON.stringify(resumeData)]);
    
    // Apply the redo action
    setResumeData(JSON.parse(nextState));
  };

  const handleBackToBuilder = () => {
    navigate(`/resume/builder/${resumeId}`);
  };

  const handleChangeTool = (tool: string) => {
    setActiveTool(tool);
  };

  const handleSaveChanges = async () => {
    await handleSave();
    toast.success("Resume saved successfully!");
  };

  const handleDataChange = (section: string, data: any) => {
    addToHistory(resumeData);
    setResumeData(prev => {
      if (section === 'personal') {
        return { ...prev, personal: data };
      } else if (section === 'summary') {
        return { ...prev, summary: data };
      } else {
        // For array sections: experience, education, projects etc.
        return { ...prev, [section]: data };
      }
    });
  };

  const handleAddItem = (section: string) => {
    if (section === 'experience') {
      setResumeData(prev => ({
        ...prev,
        experience: [
          ...prev.experience,
          {
            id: uuidv4(),
            title: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            description: ""
          }
        ]
      }));
    } else if (section === 'education') {
      setResumeData(prev => ({
        ...prev,
        education: [
          ...prev.education,
          {
            id: uuidv4(),
            degree: "",
            institution: "",
            field: "", // Added missing field property
            location: "",
            startDate: "",
            endDate: "",
            description: ""
          }
        ]
      }));
    } else if (section === 'projects') {
      setResumeData(prev => ({
        ...prev,
        projects: [
          ...prev.projects,
          {
            id: uuidv4(),
            title: "",
            description: "",
            technologies: [],
            startDate: "",
            endDate: "",
            link: ""
          }
        ]
      }));
    }
    setActiveSection(section);
  };

  const handleRemoveItem = (section: string, id: string) => {
    addToHistory(resumeData);
    setResumeData(prev => {
      const items = [...prev[section]];
      const updatedItems = items.filter(item => item.id !== id);
      return { ...prev, [section]: updatedItems };
    });
  };

  const handleFieldEdit = (section: string, field?: string, itemId?: string, initialValue?: string) => {
    setEditingField({
      section,
      field,
      itemId,
      value: initialValue || ''
    });
    setIsSectionEditorOpen(true);
  };

  const handleSaveField = async () => {
    const { section, field, itemId, value } = editingField;
    
    if (section === 'summary') {
      handleDataChange('summary', value);
    } else if (section === 'personal' && field) {
      handleDataChange('personal', {
        ...resumeData.personal,
        [field]: value
      });
    } else if (itemId && field && ['experience', 'education', 'projects'].includes(section)) {
      const items = [...resumeData[section]];
      const itemIndex = items.findIndex(item => item.id === itemId);
      
      if (itemIndex >= 0) {
        const updatedItem = { ...items[itemIndex], [field]: value };
        items[itemIndex] = updatedItem;
        handleDataChange(section, items);
      }
    }
    
    setIsSectionEditorOpen(false);
  };

  const handleGenerateWithAI = async (section: string): Promise<string> => {
    try {
      if (section.startsWith('summary')) {
        // Extract experience descriptions for better summary generation
        const experienceText = resumeData.experience
          .map(exp => exp.description)
          .join('\n\n');
          
        const skills = [...resumeData.skills.technical, ...resumeData.skills.soft];
        
        const generatedSummary = await generateSummary(
          resumeData.experience.map(e => e.description), 
          skills
        );
        
        if (generatedSummary) {
          handleDataChange('summary', generatedSummary);
          return generatedSummary;
        }
      } else if (section.startsWith('experience-desc') && editingField.itemId) {
        const experience = resumeData.experience.find(e => e.id === editingField.itemId);
        if (experience) {
          const improved = await improveDescription(editingField.value || experience.description);
          if (improved) {
            // Update in the editing field rather than immediately saving
            setEditingField(prev => ({ ...prev, value: improved }));
            return improved;
          }
        }
      }
      
      return "";
    } catch (error) {
      console.error('AI generation error:', error);
      toast.error("Failed to generate content with AI");
      return "";
    }
  };

  useEffect(() => {
    // Auto-save changes every 30 seconds
    const saveInterval = setInterval(() => {
      if (resumeData && resumeId) {
        handleSave().catch(console.error);
      }
    }, 30000);
    
    return () => clearInterval(saveInterval);
  }, [resumeData, resumeId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-resume-purple border-t-transparent rounded-full animate-spin"></div>
          <p className="text-resume-gray text-lg">Loading your resume canvas...</p>
        </div>
      </div>
    );
  }

  const paperSize = PAPER_SIZES[resumeSettings.paperSize || 'a4'];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 h-14">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleBackToBuilder}
            className="flex items-center text-gray-600 hover:text-resume-purple"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span>Back</span>
          </Button>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-medium text-gray-800 truncate max-w-[200px]">
              {resumeTitle || "Untitled Resume"}
            </h1>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 rounded-full"
              onClick={() => {
                const newTitle = prompt("Enter a new title for your resume", resumeTitle);
                if (newTitle) setResumeTitle(newTitle);
              }}
            >
              <Edit className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleUndo} disabled={undoStack.length === 0}>
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleRedo} disabled={redoStack.length === 0}>
                  <Redo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="flex items-center space-x-1 px-2 py-1 border border-gray-200 rounded-md bg-gray-50">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleZoomOut}>
              <ZoomOut className="h-3.5 w-3.5" />
            </Button>
            <span className="text-xs text-gray-600 w-10 text-center">{zoom}%</span>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleZoomIn}>
              <ZoomIn className="h-3.5 w-3.5" />
            </Button>
          </div>
          
          <Button variant="outline" className="ml-2" onClick={handleSaveChanges}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button variant="default" className="bg-resume-purple hover:bg-purple-700" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Toggleable */}
        {showSidebar && (
          <div className="w-64 border-r border-gray-200 bg-white overflow-y-auto">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="style">Style</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="p-3 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Sections</h3>
                  {Object.entries({
                    personal: "Personal Info",
                    summary: "Summary", 
                    experience: "Experience",
                    education: "Education",
                    skills: "Skills",
                    projects: "Projects"
                  }).map(([key, label]) => (
                    <div 
                      key={key} 
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${activeSection === key ? 'bg-purple-100 text-resume-purple' : 'hover:bg-gray-100'}`}
                      onClick={() => setActiveSection(key)}
                    >
                      <span className="text-sm">{label}</span>
                      {key === 'summary' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFieldEdit('summary', undefined, undefined, resumeData.summary);
                          }}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      )}
                      {['experience', 'education', 'projects'].includes(key) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddItem(key);
                          }}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                
                {activeSection === 'personal' && (
                  <div className="space-y-2 pl-2 animate-fade-in">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Personal Information</h4>
                    {Object.entries(resumeData.personal).map(([field, value]) => (
                      <div 
                        key={field}
                        className="flex items-center justify-between text-sm p-1.5 hover:bg-gray-50 rounded"
                      >
                        <span className="capitalize">{field}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => handleFieldEdit('personal', field, undefined, value as string)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeSection === 'experience' && (
                  <div className="space-y-2 pl-2 animate-fade-in">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Experience Items</h4>
                    {resumeData.experience.map((exp) => (
                      <div 
                        key={exp.id}
                        className="flex flex-col space-y-1 p-2 border border-gray-100 rounded hover:border-gray-200 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{exp.title || "New Position"}</span>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-1.5 text-xs"
                              onClick={() => handleFieldEdit('experience', 'description', exp.id, exp.description)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-1.5 text-xs text-red-500"
                              onClick={() => handleRemoveItem('experience', exp.id || '')}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">{exp.company}, {exp.startDate} - {exp.endDate}</div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => handleAddItem('experience')}
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      Add Experience
                    </Button>
                  </div>
                )}
                
                {activeSection === 'education' && (
                  <div className="space-y-2 pl-2 animate-fade-in">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Education Items</h4>
                    {resumeData.education.map((edu) => (
                      <div 
                        key={edu.id}
                        className="flex flex-col space-y-1 p-2 border border-gray-100 rounded hover:border-gray-200 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{edu.degree || "New Degree"}</span>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-1.5 text-xs"
                              onClick={() => handleFieldEdit('education', 'description', edu.id, edu.description || '')}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-1.5 text-xs text-red-500"
                              onClick={() => handleRemoveItem('education', edu.id || '')}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">{edu.institution}, {edu.startDate} - {edu.endDate}</div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => handleAddItem('education')}
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      Add Education
                    </Button>
                  </div>
                )}
                
                {activeSection === 'projects' && (
                  <div className="space-y-2 pl-2 animate-fade-in">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Project Items</h4>
                    {resumeData.projects.map((project) => (
                      <div 
                        key={project.id}
                        className="flex flex-col space-y-1 p-2 border border-gray-100 rounded hover:border-gray-200 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{project.title || "New Project"}</span>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-1.5 text-xs"
                              onClick={() => handleFieldEdit('projects', 'description', project.id, project.description)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-1.5 text-xs text-red-500"
                              onClick={() => handleRemoveItem('projects', project.id || '')}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">{project.startDate} - {project.endDate}</div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => handleAddItem('projects')}
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      Add Project
                    </Button>
                  </div>
                )}
                
                {activeSection === 'skills' && (
                  <div className="space-y-3 pl-2 animate-fade-in">
                    <div>
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Technical Skills</h4>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {resumeData.skills.technical.map((skill, index) => (
                          <div key={index} className="group relative flex items-center">
                            <span className="px-2 py-1 bg-[#efeafc] rounded-sm text-xs border-[0.5px] border-[#dad3f8] text-violet-600 font-medium">
                              {skill}
                            </span>
                            <button 
                              className="absolute -right-1 -top-1 h-4 w-4 bg-red-500 rounded-full text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => {
                                const newTechnical = [...resumeData.skills.technical];
                                newTechnical.splice(index, 1);
                                handleDataChange('skills', {
                                  ...resumeData.skills,
                                  technical: newTechnical
                                });
                              }}
                            >
                              <X className="h-2 w-2" />
                            </button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => {
                            const skill = prompt("Enter a new technical skill");
                            if (skill) {
                              handleDataChange('skills', {
                                ...resumeData.skills,
                                technical: [...resumeData.skills.technical, skill]
                              });
                            }
                          }}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Soft Skills</h4>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {resumeData.skills.soft.map((skill, index) => (
                          <div key={index} className="group relative flex items-center">
                            <span className="px-2 py-1 bg-[#f3f3f3] rounded-sm text-xs border-[0.5px] border-[#e5e5e5] text-gray-700 font-medium">
                              {skill}
                            </span>
                            <button 
                              className="absolute -right-1 -top-1 h-4 w-4 bg-red-500 rounded-full text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => {
                                const newSoft = [...resumeData.skills.soft];
                                newSoft.splice(index, 1);
                                handleDataChange('skills', {
                                  ...resumeData.skills,
                                  soft: newSoft
                                });
                              }}
                            >
                              <X className="h-2 w-2" />
                            </button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => {
                            const skill = prompt("Enter a new soft skill");
                            if (skill) {
                              handleDataChange('skills', {
                                ...resumeData.skills,
                                soft: [...resumeData.skills.soft, skill]
                              });
                            }
                          }}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                      onClick={async () => {
                        try {
                          toast.info("Analyzing your experience to extract skills...");
                          const extractedSkills = await extractSkills(
                            resumeData.experience.map(e => e.description)
                          );
                          
                          if (extractedSkills) {
                            handleDataChange('skills', extractedSkills);
                            toast.success("Skills extracted successfully!");
                          }
                        } catch (error) {
                          console.error(error);
                          toast.error("Failed to extract skills");
                        }
                      }}
                      disabled={isGenerating}
                    >
                      <FileText className="h-3.5 w-3.5 mr-1" />
                      Extract from Experience
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="style" className="p-3 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Template</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div 
                      className={`p-2 border rounded-md cursor-pointer ${selectedTemplate === 'modern' ? 'border-resume-purple bg-purple-50' : 'border-gray-200'}`}
                      onClick={() => setSelectedTemplate('modern')}
                    >
                      <div className="h-16 bg-white border border-gray-200 rounded-md mb-1 flex flex-col p-1">
                        <div className="w-1/2 h-2 bg-resume-purple rounded mb-1"></div>
                        <div className="w-1/3 h-1 bg-gray-200 rounded mb-1.5"></div>
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                        </div>
                      </div>
                      <p className="text-xs text-center">Modern</p>
                    </div>
                    <div 
                      className={`p-2 border rounded-md cursor-pointer ${selectedTemplate === 'classic' ? 'border-resume-purple bg-purple-50' : 'border-gray-200'}`}
                      onClick={() => setSelectedTemplate('classic')}
                    >
                      <div className="h-16 bg-white border border-gray-200 rounded-md mb-1 flex flex-col p-1 items-center">
                        <div className="w-2/3 h-2 bg-gray-800 rounded mb-1"></div>
                        <div className="w-1/2 h-1 bg-gray-200 rounded mb-1.5"></div>
                        <div className="w-full border-t border-gray-200 my-1"></div>
                        <div className="w-full flex justify-between">
                          <div className="w-1/4 h-1 bg-gray-200 rounded"></div>
                          <div className="w-1/4 h-1 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                      <p className="text-xs text-center">Classic</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    <div 
                      className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                      style={{ backgroundColor: resumeSettings.primaryColor }}
                      onClick={() => {
                        const color = prompt("Enter primary color (hex format)", resumeSettings.primaryColor);
                        if (color && /^#[0-9A-Fa-f]{6}$/.test(color)) {
                          setResumeSettings({...resumeSettings, primaryColor: color});
                        }
                      }}
                    ></div>
                    <div 
                      className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                      style={{ backgroundColor: resumeSettings.secondaryColor }}
                      onClick={() => {
                        const color = prompt("Enter secondary color (hex format)", resumeSettings.secondaryColor);
                        if (color && /^#[0-9A-Fa-f]{6}$/.test(color)) {
                          setResumeSettings({...resumeSettings, secondaryColor: color});
                        }
                      }}
                    ></div>
                    <div 
                      className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                      style={{ backgroundColor: resumeSettings.accentColor }}
                      onClick={() => {
                        const color = prompt("Enter accent color (hex format)", resumeSettings.accentColor);
                        if (color && /^#[0-9A-Fa-f]{6}$/.test(color)) {
                          setResumeSettings({...resumeSettings, accentColor: color});
                        }
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Typography</h3>
                  <div>
                    <Label className="text-xs">Font Family</Label>
                    <Select 
                      value={resumeSettings.fontFamily} 
                      onValueChange={(value) => setResumeSettings({...resumeSettings, fontFamily: value})}
                    >
                      <SelectTrigger className="h-8 mt-1">
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Lato">Lato</SelectItem>
                        <SelectItem value="Open Sans">Open Sans</SelectItem>
                        <SelectItem value="Montserrat">Montserrat</SelectItem>
                        <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Font Size</span>
                      <span className="text-xs font-medium">{resumeSettings.fontSize}pt</span>
                    </div>
                    <Slider 
                      defaultValue={[resumeSettings.fontSize]} 
                      min={8} 
                      max={14} 
                      step={0.5} 
                      className="w-full"
                      onValueChange={(value) => setResumeSettings({...resumeSettings, fontSize: value[0]})}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-xs">Paper Size</Label>
                    <Select 
                      value={resumeSettings.paperSize} 
                      onValueChange={(value: "a4" | "letter" | "legal") => setResumeSettings({...resumeSettings, paperSize: value})}
                    >
                      <SelectTrigger className="h-8 mt-1">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a4">A4</SelectItem>
                        <SelectItem value="letter">US Letter</SelectItem>
                        <SelectItem value="legal">US Legal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-xs">Margins</Label>
                    <Select 
                      value={resumeSettings.margins} 
                      onValueChange={(value: "narrow" | "normal" | "wide") => setResumeSettings({...resumeSettings, margins: value})}
                    >
                      <SelectTrigger className="h-8 mt-1">
                        <SelectValue placeholder="Select margins" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="narrow">Narrow (0.5")</SelectItem>
                        <SelectItem value="normal">Normal (1")</SelectItem>
                        <SelectItem value="wide">Wide (1.5")</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
        
        {/* Main Canvas Area */}
        <div className="flex-1 overflow-hidden bg-gray-100 relative">
          <div className="absolute top-2 left-2 z-10">
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <PanelLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="absolute top-2 right-2 z-10 flex space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant={activeTool === 'select' ? 'default' : 'outline'} 
                    size="icon" 
                    className={activeTool === 'select' ? 'bg-resume-purple' : 'bg-white'}
                    onClick={() => handleChangeTool('select')}
                  >
                    <Move className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Select Tool</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant={activeTool === 'text' ? 'default' : 'outline'} 
                    size="icon" 
                    className={activeTool === 'text' ? 'bg-resume-purple' : 'bg-white'}
                    onClick={() => handleChangeTool('text')}
                  >
                    <span className="font-medium text-sm">T</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Text Tool</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="bg-white"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-[95vw] h-[90vh]">
                      <div className="h-full flex flex-col">
                        <div className="flex justify-end gap-2 mb-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleDownload}
                          >
                            <Download className="mr-2 h-4 w-4" /> Download PDF
                          </Button>
                        </div>
                        <Card className="h-full flex-grow overflow-auto p-6">
                          <ModernTemplate
                            data={resumeData}
                            settings={resumeSettings}
                            onUpdateData={handleDataChange}
                          />
                        </Card>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TooltipTrigger>
                <TooltipContent>Preview</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div 
            className="h-full w-full overflow-auto p-8 flex items-center justify-center"
            style={{ cursor: activeTool === 'move' ? 'move' : 'default' }}
          >
            <div 
              ref={canvasRef}
              className="bg-white shadow-lg transition-transform duration-200 overflow-hidden"
              style={{ 
                transform: `scale(${zoom / 100})`,
                width: paperSize.width,
                height: paperSize.height,
                transformOrigin: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="w-full h-full p-6">
                {isLoading ? (
                  <ResumeLoadingSkeleton />
                ) : (
                  <ModernTemplate
                    data={resumeData}
                    settings={resumeSettings}
                    onUpdateData={handleDataChange}
                    onGenerateWithAI={handleGenerateWithAI}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section editor dialog */}
      <Dialog open={isSectionEditorOpen} onOpenChange={setIsSectionEditorOpen}>
        <DialogContent className="max-w-2xl">
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold">{
              editingField.section === 'summary' ? 'Edit Summary' :
              editingField.section === 'personal' ? `Edit ${editingField.field}` :
              'Edit Content'
            }</h2>
            
            <div className="flex flex-col space-y-2">
              <Label>Content</Label>
              <Textarea 
                value={editingField.value}
                onChange={(e) => setEditingField({...editingField, value: e.target.value})}
                className="min-h-[200px]"
              />
            </div>
            
            {editingField.section === 'experience-desc' && (
              <Button
                variant="outline"
                onClick={async () => {
                  const improved = await handleGenerateWithAI('experience-desc');
                  if (improved) {
                    setEditingField({...editingField, value: improved});
                  }
                }}
                disabled={isGenerating}
              >
                {isGenerating ? 'Improving...' : 'Improve with AI'}
              </Button>
            )}
            
            {editingField.section === 'summary' && (
              <Button
                variant="outline"
                onClick={async () => {
                  const summary = await handleGenerateWithAI('summary');
                  if (summary) {
                    setEditingField({...editingField, value: summary});
                  }
                }}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Summary with AI'}
              </Button>
            )}
            
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsSectionEditorOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveField}
                className="bg-resume-purple hover:bg-purple-700"
              >
                <Check className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResumeCanvas;
