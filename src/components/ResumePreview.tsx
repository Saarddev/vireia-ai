
import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import ModernTemplate from './resume-preview/ModernTemplate';
import CustomizableTemplate from './resume-preview/CustomizableTemplate';
import ProfessionalTemplate from './resume-preview/ProfessionalTemplate';
import PreviewControls from './resume-preview/PreviewControls';
import { ResumeData, ResumeSettings } from '@/types/resume';
import AIAnalysisDrawer from './resume-builder/AIAnalysisDrawer';
import { toast } from '@/hooks/use-toast';

interface ResumePreviewProps {
  data: ResumeData;
  settings: ResumeSettings;
  onDataChange?: (section: string, data: any) => void;
  onGenerateWithAI?: (section: string) => Promise<string>;
  showAIAnalysis?: boolean;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  data,
  settings = {},
  onDataChange,
  onGenerateWithAI,
  showAIAnalysis = false
}) => {
  // Ensure data is valid and complete with defaults
  const safeData: ResumeData = React.useMemo(() => {
    return {
      personal: data.personal || {
        name: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: ""
      },
      summary: data.summary || "",
      experience: Array.isArray(data.experience) ? data.experience : [],
      education: Array.isArray(data.education) ? data.education : [],
      skills: data.skills || { technical: [], soft: [] },
      languages: Array.isArray(data.languages) ? data.languages : [],
      certifications: Array.isArray(data.certifications) ? data.certifications : [],
      projects: Array.isArray(data.projects) ? data.projects : []
    };
  }, [data]);

  const { isMobile } = useIsMobile();
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const resumeContentRef = useRef<HTMLDivElement>(null);

  const handleGenerateWithAI = async (section: string): Promise<string> => {
    if (onGenerateWithAI) {
      return await onGenerateWithAI(section);
    }
    return '';
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    try {
      window.print();
      toast({
        title: "Print Dialog Opened",
        description: "Use the print dialog to save as PDF",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error downloading your resume",
        variant: "destructive"
      });
    }
  };

  // Function to render the selected template
  const renderTemplate = () => {
    const template = settings.template || 'modern';
    
    switch (template) {
      case 'modern':
        return (
          <ModernTemplate
            data={safeData}
            settings={settings}
            onUpdateData={onDataChange}
            onGenerateWithAI={onGenerateWithAI}
          />
        );
      case 'professional':
        return (
          <ProfessionalTemplate
            data={safeData}
            settings={settings}
            onUpdateData={onDataChange}
            onGenerateWithAI={onGenerateWithAI}
          />
        );
      case 'customizable':
        return (
          <CustomizableTemplate
            data={safeData}
            settings={settings}
            onUpdateData={onDataChange}
            onGenerateWithAI={onGenerateWithAI}
          />
        );
      default:
        return (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">
              {template.charAt(0).toUpperCase() + template.slice(1)} template preview
            </p>
          </div>
        );
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  return (
    <div className="relative h-full flex flex-col overflow-hidden">
      <PreviewControls
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onDownload={handleDownloadPDF}
        onPrint={handlePrint}
      >
        {showAIAnalysis && (
          <div className="ml-auto mr-2">
            <AIAnalysisDrawer resumeData={safeData} />
          </div>
        )}
        <span className="text-sm text-gray-600 ml-2">
          {Math.round(zoomLevel * 100)}%
        </span>
      </PreviewControls>
      
      <div className="flex-1 overflow-auto p-4 relative scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <div className="min-h-full flex items-start justify-center pb-20">
          <Card
            className={cn(
              "resume-content bg-white rounded-lg shadow-md p-6 md:p-8 transition-all duration-200 mx-auto",
              "border border-gray-200 w-full max-w-[21cm]"
            )}
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top center',
              marginBottom: `${(zoomLevel - 1) * 100}%`,
              fontFamily: settings.fontFamily || 'Inter',
              fontSize: `${settings.fontSize || 11}pt`
            }}
          >
            <div ref={resumeContentRef} className="resume-content">
              {renderTemplate()}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
