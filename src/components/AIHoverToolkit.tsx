
import React, { useState } from 'react';
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleComplete = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    try {
      await onComplete();
    } catch (error) {
      console.error('Error completing AI action:', error);
      toast.error('Failed to complete AI action');
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
      toast.error('Failed to add changes');
    }
  };

  const handleSummarize = async () => {
    if (isGenerating || isSummarizing) return;
    
    setIsSummarizing(true);
    try {
      const text = await onComplete();
      if (!text) {
        toast.error("No content to summarize");
        return;
      }
      
      const summarized = await summarizeText(text);
      if (summarized) {
        // Use the onComplete function to update with summarized content
        // This is a bit of a hack, but it allows us to reuse the onComplete function
        const originalOnComplete = onComplete;
        onComplete = async () => summarized;
        await handleComplete();
        onComplete = originalOnComplete;
      }
    } catch (error) {
      console.error('Error summarizing text:', error);
      toast.error("Failed to summarize text");
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className={`flex gap-1 ${className}`}>
      <Button 
        size="sm" 
        variant="ghost" 
        className="h-7 text-xs px-2 hover:bg-purple-50 hover:text-resume-purple" 
        onClick={handleComplete}
        disabled={isGenerating || isSummarizing}
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
        disabled={isGenerating || isSummarizing}
      >
        {isSummarizing ? (
          <Loader className="h-3 w-3 mr-1 animate-spin" />
        ) : (
          <FileText className="h-3 w-3 mr-1" />
        )}
        Summarize
      </Button>
      
      {onAddChanges && (
        <Button
          size="sm"
          variant="ghost"
          className="h-7 text-xs px-2 hover:bg-purple-50 hover:text-resume-purple"
          onClick={handleAddChanges}
          disabled={isGenerating || isSummarizing}
        >
          <Edit className="h-3 w-3 mr-1" />
          Continue writing
        </Button>
      )}
    </div>
  );
};

export default AIHoverToolkit;
