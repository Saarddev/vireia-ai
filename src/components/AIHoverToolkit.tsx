
import React from 'react';
import { Button } from "@/components/ui/button";
import { Wand2, Edit, Sparkles, Loader } from 'lucide-react';

export interface AIHoverToolkitProps {
  onComplete: () => Promise<string>;
  onAddChanges?: () => Promise<string>;
  icon?: React.ReactNode;
  label?: string;
  className?: string; // Added className prop
}

const AIHoverToolkit: React.FC<AIHoverToolkitProps> = ({ 
  onComplete, 
  onAddChanges,
  icon = <Wand2 className="h-3 w-3 mr-1" />,
  label = "Enhance with AI",
  className = "" // Default empty className
}) => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleComplete = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    try {
      await onComplete();
    } catch (error) {
      console.error('Error completing AI action:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddChanges = async () => {
    if (!onAddChanges || isGenerating) return;
    
    try {
      await onAddChanges();
    } catch (error) {
      console.error('Error adding changes:', error);
    }
  };

  return (
    <div className={`flex gap-1 ${className}`}>
      <Button 
        size="sm" 
        variant="ghost" 
        className="h-7 text-xs px-2 hover:bg-purple-50 hover:text-resume-purple" 
        onClick={handleComplete}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <Loader className="h-3 w-3 mr-1 animate-spin" />
        ) : (
          icon
        )}
        {label}
      </Button>
      
      {onAddChanges && (
        <Button
          size="sm"
          variant="ghost"
          className="h-7 text-xs px-2 hover:bg-purple-50 hover:text-resume-purple"
          onClick={handleAddChanges}
        >
          <Edit className="h-3 w-3 mr-1" />
          Add bullet
        </Button>
      )}
    </div>
  );
};

export default AIHoverToolkit;
