
import React, { useState, useEffect, useRef } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from 'lucide-react';

interface AITabContinuationProps {
  value: string;
  onChange: (value: string) => void;
  onGenerateWithAI?: () => Promise<string>;
  placeholder?: string;
  className?: string;
  rows?: number;
  minRows?: number;
  maxRows?: number;
}

const AITabContinuation: React.FC<AITabContinuationProps> = ({
  value,
  onChange,
  onGenerateWithAI,
  placeholder = "Start typing or press Tab for AI continuation...",
  className = "",
  rows = 3,
  minRows = 2,
  maxRows = 10
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAIHint, setShowAIHint] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-resize textarea based on content
  const calculateRows = () => {
    if (!textareaRef.current) return rows;
    const lineCount = (value.match(/\n/g) || []).length + 1;
    return Math.max(minRows, Math.min(lineCount, maxRows));
  };

  // Handle tab key press
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab' && !e.shiftKey && onGenerateWithAI) {
      e.preventDefault();
      
      // Get cursor position
      const cursorPos = textareaRef.current?.selectionStart || 0;
      
      // Show loading state
      setIsGenerating(true);
      
      try {
        // Get AI completion
        const aiText = await onGenerateWithAI();
        
        // If we got text back, insert it at cursor position
        if (aiText) {
          const newText = value.substring(0, cursorPos) + aiText + value.substring(cursorPos);
          onChange(newText);
          
          // Set cursor position after the inserted text
          setTimeout(() => {
            if (textareaRef.current) {
              const newPosition = cursorPos + aiText.length;
              textareaRef.current.selectionStart = newPosition;
              textareaRef.current.selectionEnd = newPosition;
              textareaRef.current.focus();
            }
          }, 0);
        }
      } catch (error) {
        console.error('Error getting AI continuation:', error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  // Show hint when user stops typing
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      if (e.target.value.length > 10 && onGenerateWithAI) {
        setShowAIHint(true);
        setTimeout(() => setShowAIHint(false), 3000);
      }
    }, 1500);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`resize-none pr-12 ${className}`}
        rows={calculateRows()}
        disabled={isGenerating}
      />
      
      {isGenerating && (
        <div className="absolute right-3 top-3 text-resume-purple">
          <span className="h-4 w-4 rounded-full border-2 border-resume-purple border-t-transparent animate-spin inline-block"></span>
        </div>
      )}
      
      {showAIHint && !isGenerating && (
        <div className="absolute right-3 top-3 bg-resume-purple text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 animate-fade-in">
          <Sparkles className="h-3 w-3" />
          Press Tab for AI
        </div>
      )}
    </div>
  );
};

export default AITabContinuation;
