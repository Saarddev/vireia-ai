import React, { useRef, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import ModernTemplate from './resume-preview/ModernTemplate';
import CustomizableTemplate from './resume-preview/CustomizableTemplate';
import ProfessionalTemplate from './resume-preview/ProfessionalTemplate';
import PreviewControls from './resume-preview/PreviewControls';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ResumeData, ResumeSettings, SegmentStyles } from '@/types/resume';
import AIAnalysisDrawer from './resume-builder/AIAnalysisDrawer';
import { useParams } from 'react-router-dom';

interface ResumePreviewProps {
  data: ResumeData;
  template?: string;
  settings?: ResumeSettings;
  onDataChange?: (section: string, data: any) => void;
  onGenerateWithAI?: (section: string) => Promise<string>;
  showAIAnalysis?: boolean;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  data,
  template = 'modern',
  settings = {
    fontFamily: 'Inter',
    fontSize: 11,
    primaryColor: '#5d4dcd',
    secondaryColor: '#333333',
    accentColor: '#d6bcfa',
    paperSize: 'letter',
    margins: 'normal',
    template: 'modern'
  },
  onDataChange,
  onGenerateWithAI,
  showAIAnalysis = false
}) => {
  // Ensure settings are always properly defined with defaults
  const safeSettings: ResumeSettings = React.useMemo(() => {
    return {
      fontFamily: settings?.fontFamily || 'Inter',
      fontSize: settings?.fontSize || 11,
      primaryColor: settings?.primaryColor || '#5d4dcd',
      secondaryColor: settings?.secondaryColor || '#333333',
      accentColor: settings?.accentColor || '#d6bcfa',
      paperSize: settings?.paperSize || 'letter',
      margins: settings?.margins || 'normal',
      template: settings?.template || template || 'modern',
      customStyles: settings?.customStyles || {}
    };
  }, [settings, template]);

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

  const { resumeId } = useParams();
  const { isMobile } = useIsMobile();
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const resumeContentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Zoom functions
  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 0.25, 2));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  }, []);

  // Handle wheel zoom with Ctrl key
  const handleWheelZoom = useCallback((e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();

      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    }
  }, [handleZoomIn, handleZoomOut]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey)) {
      if (e.key === '=' || e.key === '+') {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === '-') {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === '0') {
        e.preventDefault();
        setZoomLevel(1);
      }
    }
  }, [handleZoomIn, handleZoomOut]);

  // Add event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add wheel event listener
    container.addEventListener('wheel', handleWheelZoom, { passive: false });

    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('wheel', handleWheelZoom);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleWheelZoom, handleKeyDown]);

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
    window.open(`/resume/pdf/${resumeId}`, '_blank');
  };

  // Function to render the selected template
  const renderTemplate = () => {
    // Use template priority: safeSettings.template > template prop > default
    const templateToUse = safeSettings.template || template || 'modern';

    console.log('Rendering template:', templateToUse, 'Settings template:', safeSettings.template, 'Template prop:', template);

    switch (templateToUse) {
      case 'modern':
        return (
          <ModernTemplate
            data={safeData}
            settings={safeSettings}
            onUpdateData={onDataChange}
            onGenerateWithAI={onGenerateWithAI}
          />
        );
      case 'professional':
        return (
          <ProfessionalTemplate
            data={safeData}
            settings={safeSettings}
            onUpdateData={onDataChange}
            onGenerateWithAI={onGenerateWithAI}
          />
        );
      case 'customizable':
        return (
          <CustomizableTemplate
            data={safeData}
            settings={safeSettings}
            onUpdateData={onDataChange}
            onGenerateWithAI={onGenerateWithAI}
          />
        );
      default:
        return (
          <ModernTemplate
            data={safeData}
            settings={safeSettings}
            onUpdateData={onDataChange}
            onGenerateWithAI={onGenerateWithAI}
          />
        );
    }
  };

  return (
    <div ref={containerRef} className=" h-screen flex flex-col overflow-hidden">
      <PreviewControls
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onDownload={handleDownloadPDF}
        onPrint={handlePrint}
      >
        {showAIAnalysis && (
          <div className="ml-auto mr-2">
            <AIAnalysisDrawer resumeData={data} />
          </div>
        )}
        <span className="text-sm text-gray-600 ml-2">
          {Math.round(zoomLevel * 100)}%
        </span>
      </PreviewControls>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full w-full">
          <div
            className="flex items-start justify-center p-4"
            style={{
              minHeight: `${100 * zoomLevel}vh`,
              paddingBottom: `${zoomLevel > 1 ? (zoomLevel - 1) * 50 : 0}vh`
            }}
          >
            <Card
              className={cn(
                "resume-content bg-transparent rounded-lg shadow-md transition-all duration-200 mx-auto",
                " w-full max-w-[21cm]"
              )}
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'top center',
                minHeight: 'auto'
              }}
            >
              <div ref={resumeContentRef} className=" ">
                {renderTemplate()}
              </div>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ResumePreview;
