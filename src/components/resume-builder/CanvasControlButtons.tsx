
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface CanvasControlButtonsProps {
  resumeId?: string;
  resumeData?: any;
  settings?: any;
  template?: string;
}

const CanvasControlButtons: React.FC<CanvasControlButtonsProps> = ({
  resumeId,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/resume/builder/${resumeId}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleBack}
        className="flex items-center gap-1"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </Button>
    </div>
  );
};

export default CanvasControlButtons;
