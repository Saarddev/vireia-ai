
import React from 'react';
import { Button } from "@/components/ui/button";
import { Wand2, FileText } from 'lucide-react';
import { summarizeText } from '@/utils/summarizeText';
import { toast } from 'sonner';

export interface AIHoverToolkitProps {
  onComplete: () => Promise<string>;
  className?: string;
}

const AIHoverToolkit: React.FC<AIHoverToolkitProps> = ({ 
  onComplete,
  className = ""
}) => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleEnhance = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    try {
      await onComplete();
    } catch (error) {
      console.error('Error enhancing with AI:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSummarize = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    try {
      const text = await onComplete();
      if (!text) {
        toast.error("No content to summarize");
        return;
      }
      
      const summarized = await summarizeText(text);
      if (summarized) {
        // Return the summarized text to be used by the parent component
        return summarized;
      }
    } catch (error) {
      console.error('Error summarizing text:', error);
      toast.error("Failed to summarize text");
    } finally {
      setIsGenerating(false);
    }
    
    return "";
  };

  return (
    <div className={`flex gap-1 ${className}`}>
      <Button 
        size="sm" 
        variant="ghost" 
        className="h-7 text-xs px-2 hover:bg-purple-50 hover:text-resume-purple" 
        onClick={handleEnhance}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <span className="flex items-center">
            <span className="h-3 w-3 mr-1 rounded-full border-2 border-resume-purple border-t-transparent animate-spin"></span>
            Working...
          </span>
        ) : (
          <>
            <Wand2 className="h-3 w-3 mr-1" />
            Enhance
          </>
        )}
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
    </div>
  );
};

export default AIHoverToolkit;
