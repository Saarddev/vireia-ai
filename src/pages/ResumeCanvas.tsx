import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useResumeData } from '@/hooks/use-resume-data';
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
  Layers
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

const CANVAS_PADDING = 40;
const DEFAULT_ZOOM = 100;

const ResumeCanvas = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string>("select");
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [isDragging, setIsDragging] = useState(false);
  const [undoStack, setUndoStack] = useState<any[]>([]);
  const [redoStack, setRedoStack] = useState<any[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);

  const { 
    isLoading, 
    resumeData, 
    setResumeData, 
    resumeTitle, 
    selectedTemplate, 
    resumeSettings, 
    setResumeSettings,
    handleSave
  } = useResumeData(resumeId);

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
      // For now, just navigate to the PDF view page
      window.open(`/resume/pdf/${resumeId}`, '_blank');
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast.error('Failed to download resume');
    }
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    
    const lastAction = undoStack[undoStack.length - 1];
    setUndoStack(undoStack.slice(0, -1));
    setRedoStack([...redoStack, lastAction]);
    
    // Apply the undo action
    // This would restore previous state
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    
    const nextAction = redoStack[redoStack.length - 1];
    setRedoStack(redoStack.slice(0, -1));
    setUndoStack([...undoStack, nextAction]);
    
    // Apply the redo action
    // This would reapply the action
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
          <h1 className="text-lg font-medium text-gray-800 truncate max-w-[200px]">
            {resumeTitle || "Untitled Resume"}
          </h1>
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
              <span className="text-sm">-</span>
            </Button>
            <span className="text-xs text-gray-600 w-10 text-center">{zoom}%</span>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleZoomIn}>
              <span className="text-sm">+</span>
            </Button>
          </div>
          
          <Button variant="outline" className="ml-2" onClick={handleSaveChanges}>Save</Button>
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
                      className={`flex items-center p-2 rounded-md cursor-pointer ${activeSection === key ? 'bg-purple-100 text-resume-purple' : 'hover:bg-gray-100'}`}
                      onClick={() => setActiveSection(key)}
                    >
                      <span className="text-sm">{label}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <Button variant="ghost" className="w-full justify-start text-resume-purple" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Section
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="style" className="p-3 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Template</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className={`p-2 border rounded-md cursor-pointer ${selectedTemplate === 'modern' ? 'border-resume-purple bg-purple-50' : 'border-gray-200'}`}>
                      <div className="h-16 bg-gray-200 rounded-md mb-1"></div>
                      <p className="text-xs text-center">Modern</p>
                    </div>
                    <div className={`p-2 border rounded-md cursor-pointer ${selectedTemplate === 'classic' ? 'border-resume-purple bg-purple-50' : 'border-gray-200'}`}>
                      <div className="h-16 bg-gray-200 rounded-md mb-1"></div>
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
                    ></div>
                    <div 
                      className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                      style={{ backgroundColor: resumeSettings.secondaryColor }}
                    ></div>
                    <div 
                      className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                      style={{ backgroundColor: resumeSettings.accentColor }}
                    ></div>
                    <div 
                      className="w-6 h-6 rounded-full border border-gray-300 bg-white flex items-center justify-center cursor-pointer text-xs"
                    >
                      +
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Typography</h3>
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
                    />
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
                  <Button 
                    variant={activeTool === 'layers' ? 'default' : 'outline'} 
                    size="icon" 
                    className={activeTool === 'layers' ? 'bg-resume-purple' : 'bg-white'}
                    onClick={() => handleChangeTool('layers')}
                  >
                    <Layers className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Layers</TooltipContent>
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
                width: '8.5in',
                height: '11in',
                padding: `${CANVAS_PADDING}px`,
                transformOrigin: 'center'
              }}
            >
              <div className="w-full h-full">
                {/* This would normally render the actual resume template */}
                {/* For now we'll just show a placeholder with some of the resume data */}
                <div className="border-b-2 border-resume-purple mb-4 pb-2">
                  <h1 className="text-2xl font-bold">{resumeData.personal.name || "Your Name"}</h1>
                  <p className="text-resume-purple">{resumeData.personal.title || "Professional Title"}</p>
                </div>
                
                {resumeData.summary && (
                  <div className="mb-4">
                    <h2 className="text-sm font-semibold uppercase tracking-wider mb-1 border-b border-gray-200">Summary</h2>
                    <p className="text-sm">{resumeData.summary}</p>
                  </div>
                )}
                
                {resumeData.experience.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-sm font-semibold uppercase tracking-wider mb-1 border-b border-gray-200">Experience</h2>
                    {resumeData.experience.map((exp, i) => (
                      <div key={i} className="mb-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{exp.title}</span>
                          <span className="text-sm">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <p className="text-sm text-resume-purple">{exp.company}, {exp.location}</p>
                        <ul className="list-disc pl-5 text-sm mt-1">
                          {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                            <li key={i}>{line.trim().replace(/^[-•*]\s*/, '')}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Other sections would be rendered here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCanvas;
