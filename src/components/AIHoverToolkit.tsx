
import React from 'react';
import { Button } from "@/components/ui/button";
import { Wand2, PlusCircle } from 'lucide-react';

interface AIHoverToolkitProps {
  onComplete?: () => void | Promise<string>;
  onAddChanges?: () => void | Promise<string>;
  className?: string;
}

const AIHoverToolkit: React.FC<AIHoverToolkitProps> = ({
  onComplete,
  onAddChanges,
  className
}) => {
  return (
    <div className={`flex items-center gap-1 p-1 rounded-lg bg-white/95 border border-gray-100 shadow-sm backdrop-blur-sm transition-all duration-200 ${className}`}>
      {onComplete && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs text-muted-foreground hover:text-resume-purple hover:bg-resume-purple/10 flex items-center gap-1"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onComplete) onComplete();
          }}
        >
          <Wand2 className="h-3 w-3" />
          <span className="font-medium">Generate</span>
        </Button>
      )}
      
      {onAddChanges && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs text-muted-foreground hover:text-resume-purple hover:bg-resume-purple/10 flex items-center gap-1"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onAddChanges) onAddChanges();
          }}
        >
          <PlusCircle className="h-3 w-3" />
          <span className="font-medium">Continue</span>
        </Button>
      )}
    </div>
  );
};

export default AIHoverToolkit;
