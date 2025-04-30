
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Wand2, FileText, Plus } from 'lucide-react';
import { summarizeText } from '@/utils/summarizeText';
import { toast } from 'sonner';

export interface AIHoverToolkitProps {
  onComplete: () => Promise<string>;
  onAddChanges?: () => Promise<string>;
  className?: string;
}

const AIHoverToolkit: React.FC<AIHoverToolkitProps> = ({ 
  onComplete,
  onAddChanges,
  className = ""
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [operation, setOperation] = useState<"enhance" | "summarize" | "add" | null>(null);

  const handleEnhance = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    setOperation("enhance");
    try {
      const result = await onComplete();
      if (result) {
        toast.success("Content enhanced successfully");
      }
    } catch (error: any) {
      console.error('Error enhancing with AI:', error);
      toast.error(`Enhancement failed: ${error.message || "Please try again"}`);
    } finally {
      setIsGenerating(false);
      setOperation(null);
    }
  };

  const handleSummarize = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    setOperation("summarize");
    try {
      const text = await onComplete();
      if (!text) {
        toast.error("No content to summarize");
        return "";
      }
      
      const summarized = await summarizeText(text);
      if (summarized) {
        toast.success("Content summarized successfully");
        return summarized;
      }
    } catch (error: any) {
      console.error('Error summarizing text:', error);
      toast.error(`Summarization failed: ${error.message || "Please try again"}`);
    } finally {
      setIsGenerating(false);
      setOperation(null);
    }
    
    return "";
  };

  const handleAddChanges = async () => {
    if (!onAddChanges || isGenerating) return;
    
    setIsGenerating(true);
    setOperation("add");
    try {
      const result = await onAddChanges();
      if (result) {
        toast.success("Changes added successfully");
      }
    } catch (error: any) {
      console.error('Error adding changes:', error);
      toast.error(`Failed to add changes: ${error.message || "Please try again"}`);
    } finally {
      setIsGenerating(false);
      setOperation(null);
    }
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
        {isGenerating && operation === "enhance" ? (
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
        {isGenerating && operation === "summarize" ? (
          <span className="flex items-center">
            <span className="h-3 w-3 mr-1 rounded-full border-2 border-resume-purple border-t-transparent animate-spin"></span>
            Summarizing...
          </span>
        ) : (
          <>
            <FileText className="h-3 w-3 mr-1" />
            Summarize
          </>
        )}
      </Button>

      {onAddChanges && (
        <Button
          size="sm"
          variant="ghost"
          className="h-7 text-xs px-2 hover:bg-purple-50 hover:text-resume-purple"
          onClick={handleAddChanges}
          disabled={isGenerating}
        >
          {isGenerating && operation === "add" ? (
            <span className="flex items-center">
              <span className="h-3 w-3 mr-1 rounded-full border-2 border-resume-purple border-t-transparent animate-spin"></span>
              Adding...
            </span>
          ) : (
            <>
              <Plus className="h-3 w-3 mr-1" />
              Add
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default AIHoverToolkit;
