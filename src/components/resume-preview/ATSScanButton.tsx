
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileSearch } from 'lucide-react';
import ATSScannerDialog from './ATSScannerDialog';
import { ResumeData } from '@/types/resume';

interface ATSScanButtonProps {
  resumeData: ResumeData;
  onUpdateResume?: (updatedResume: ResumeData) => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null;
  size?: "default" | "sm" | "lg" | "icon" | null;
  className?: string;
}

const ATSScanButton: React.FC<ATSScanButtonProps> = ({
  resumeData,
  onUpdateResume,
  variant = "outline",
  size = "default",
  className = ""
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setDialogOpen(true)}
        className={className}
      >
        <FileSearch className="mr-2 h-4 w-4" />
        ATS Scanner
      </Button>
      
      <ATSScannerDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        resumeData={resumeData}
        onUpdateResume={onUpdateResume}
      />
    </>
  );
};

export default ATSScanButton;
