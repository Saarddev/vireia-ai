
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ResumeData, ResumeSettings } from '@/types/resume';

interface CanvasControlButtonsProps {
  resumeId?: string;
  resumeData: ResumeData;
  settings?: ResumeSettings;
  template: string;
}

const CanvasControlButtons = ({ 
  resumeId, 
  resumeData,
  settings,
  template
}: CanvasControlButtonsProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/resume');
  };

  const handlePreview = () => {
    // Open in new tab for preview
    const previewUrl = `/resume/pdf/${resumeId}`;
    window.open(previewUrl, '_blank');
  };
  
  const handleDownload = () => {
    // Trigger download functionality
    const downloadUrl = `/resume/pdf/${resumeId}?download=true`;
    window.open(downloadUrl, '_blank');
  };

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleBack}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={handlePreview}
      >
        <ExternalLink className="h-4 w-4 mr-2" />
        Preview
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={handleDownload}
      >
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>
    </div>
  );
};

export default CanvasControlButtons;
