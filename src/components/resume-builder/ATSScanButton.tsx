
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Zap } from "lucide-react";
import { scanResumeWithATS } from '@/utils/summarizeText';

interface ATSScanButtonProps {
  resumeData: any;
  onScanComplete: (results: any) => void;
  disabled?: boolean;
}

const ATSScanButton: React.FC<ATSScanButtonProps> = ({ resumeData, onScanComplete, disabled = false }) => {
  const [isScanning, setIsScanning] = React.useState(false);
  
  const handleScan = async () => {
    setIsScanning(true);
    try {
      const results = await scanResumeWithATS(resumeData);
      if (results) {
        onScanComplete(results);
      }
    } finally {
      setIsScanning(false);
    }
  };
  
  return (
    <Button 
      onClick={handleScan}
      className="flex items-center gap-2 bg-resume-purple hover:bg-resume-purple/90 shadow-md transition-all"
      disabled={disabled || isScanning}
    >
      {isScanning ? (
        <>
          <FileText className="h-4 w-4 animate-pulse" /> 
          Scanning...
        </>
      ) : (
        <>
          <Zap className="h-4 w-4" /> 
          Scan Resume with ATS
        </>
      )}
    </Button>
  );
};

export default ATSScanButton;
