
import React from 'react';
import { Button } from "@/components/ui/button";
import { Wand2, PlusCircle } from 'lucide-react';

interface AIHoverToolkitProps {
  onComplete?: () => void;
  onAddChanges?: () => void;
  className?: string;
}

const AIHoverToolkit: React.FC<AIHoverToolkitProps> = ({
  onComplete,
  onAddChanges,
  className
}) => {
  return (
    <div className={`flex items-center gap-1.5 p-1.5 rounded-lg bg-background/95 border border-border/50 shadow-md backdrop-blur-sm transition-all duration-300 ${className}`}>
      {onComplete && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2.5 text-muted-foreground hover:text-resume-purple hover:bg-resume-purple/10 flex items-center gap-1.5"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onComplete) onComplete();
          }}
        >
          <Wand2 className="h-4 w-4" />
          <span className="text-sm font-medium">Generate</span>
        </Button>
      )}
      
      {onAddChanges && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2.5 text-muted-foreground hover:text-resume-purple hover:bg-resume-purple/10 flex items-center gap-1.5"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onAddChanges) onAddChanges();
          }}
        >
          <PlusCircle className="h-4 w-4" />
          <span className="text-sm font-medium">Continue</span>
        </Button>
      )}
    </div>
  );
};

export default AIHoverToolkit;
