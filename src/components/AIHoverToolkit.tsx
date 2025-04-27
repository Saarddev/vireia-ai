
import React from 'react';
import { Button } from "@/components/ui/button";
import { Wand2, Edit, FileText, Loader } from 'lucide-react';
import { summarizeText } from '@/utils/summarizeText';
import { toast } from 'sonner';

export interface AIHoverToolkitProps {
  onComplete: () => Promise<string>;
  onAddChanges?: () => Promise<string>;
  icon?: React.ReactNode;
  label?: string;
  className?: string;
}

const AIHoverToolkit: React.FC<AIHoverToolkitProps> = ({ 
  onComplete, 
  onAddChanges,
  icon = <Wand2 className="h-3 w-3 mr-1" />,
  label = "Enhance with AI",
  className = ""
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

  const handleSummarize = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    try {
      const text = await onComplete();
      if (!text) {
        toast.error("No content to summarize");
        setIsGenerating(false);
        return;
      }
      
      const summarized = await summarizeText(text);
      if (summarized) {
        // We need to update the content with the summarized version
        // This will be handled by onComplete which should accept the summarized text
        const updateFn = async () => summarized;
        await onComplete();
      }
    } catch (error) {
      console.error('Error summarizing text:', error);
      toast.error("Failed to summarize text");
    } finally {
      setIsGenerating(false);
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
      
      <Button 
        size="sm"
        variant="ghost"
        className="h-7 text-xs px-2 hover:bg-purple-50 hover:text-resume-purple"
        onClick={handleSummarize}
        disabled={isGenerating}
      >
        <FileText className="h-3 w-3 mr-1" />
        Summarize
      </Button>
      
      {onAddChanges && (
        <Button
          size="sm"
          variant="ghost"
          className="h-7 text-xs px-2 hover:bg-purple-50 hover:text-resume-purple"
          onClick={handleAddChanges}
        >
          <Edit className="h-3 w-3 mr-1" />
          Continue writing
        </Button>
      )}
    </div>
  );
};

export default AIHoverToolkit;
