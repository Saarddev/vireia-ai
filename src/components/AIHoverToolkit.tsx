
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, Plus } from 'lucide-react';

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
    <div className={`flex items-center gap-1 p-1 rounded-lg bg-background/95 border border-border/50 shadow-lg backdrop-blur-sm transition-all duration-300 ${className}`}>
      {onComplete && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-muted-foreground hover:text-green-600 hover:bg-green-50 flex items-center gap-1.5"
          onClick={onComplete}
        >
          <Check className="h-4 w-4" />
          <span className="text-sm">Complete</span>
        </Button>
      )}
      
      {onAddChanges && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-muted-foreground hover:text-resume-purple hover:bg-purple-50 flex items-center gap-1.5"
          onClick={onAddChanges}
        >
          <Plus className="h-4 w-4" />
          <span className="text-sm">Add changes</span>
        </Button>
      )}
    </div>
  );
};

export default AIHoverToolkit;
