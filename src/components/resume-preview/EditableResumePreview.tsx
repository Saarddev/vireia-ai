
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Check, Loader } from 'lucide-react';
import AIHoverToolkit from "@/components/AIHoverToolkit";
import { enhanceResumeText } from '@/utils/summarizeText';
import { toast } from 'sonner';

interface EditableContentProps {
  content: string;
  onSave: (content: string) => void;
  className?: string;
  onGenerateWithAI?: () => Promise<string>;
  sectionType?: string;
}

export const EditableContent: React.FC<EditableContentProps> = ({ 
  content, 
  onSave, 
  className = "", 
  onGenerateWithAI,
  sectionType = "general"
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showToolkit, setShowToolkit] = useState(false);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSave(editedContent);
    setIsEditing(false);
  };

  const handleGenerate = async () => {
    if (!onGenerateWithAI) return Promise.resolve("");
    
    setIsGenerating(true);
    try {
      await onGenerateWithAI();
    } finally {
      setIsGenerating(false);
    }
    return Promise.resolve("");
  };

  const handleEnhance = async () => {
    if (!editedContent) {
      toast.error("Please add some content before enhancing");
      return Promise.resolve("");
    }
    
    setIsGenerating(true);
    try {
      const enhancedText = await enhanceResumeText(editedContent, sectionType);
      if (enhancedText) {
        setEditedContent(enhancedText);
      }
    } catch (error) {
      console.error("Error enhancing text:", error);
    } finally {
      setIsGenerating(false);
    }
    return Promise.resolve("");
  };

  const handleContinue = () => {
    const newText = editedContent + "\n";
    setEditedContent(newText);
    return Promise.resolve("");
  };

  const formatContent = (text: string) => {
    if (!text) return null;

    // Check if the text contains bullet points or multiple lines
    if (text.includes('•') || text.includes('-') || text.includes('\n')) {
      // Transform the text to properly handle bullet points from both • and - characters
      const lines = text.split('\n');
      
      return (
        <ul className="list-disc pl-6 space-y-1">
          {lines.map((line, idx) => {
            // Clean the line from bullet point characters
            let cleanedLine = line.trim();
            if (cleanedLine.startsWith('•') || cleanedLine.startsWith('-')) {
              cleanedLine = cleanedLine.substring(1).trim();
            }
            
            // Skip empty lines
            if (!cleanedLine) return null;
            
            return (
              <li key={idx} className="text-gray-800 leading-relaxed">
                {cleanedLine}
              </li>
            );
          })}
        </ul>
      );
    }
    
    return <p className="whitespace-pre-line text-gray-800">{text}</p>;
  };

  if (isEditing) {
    return (
      <div className="relative">
        <div 
          className="relative group"
          onMouseEnter={() => setShowToolkit(true)}
          onMouseLeave={() => setShowToolkit(false)}
        >
          <div className={`absolute -top-10 left-0 z-10 transform transition-all duration-300 ease-out ${
            showToolkit ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}>
            <div className="flex space-x-1">
              <AIHoverToolkit 
                onComplete={handleGenerate}
                onAddChanges={handleContinue}
              />
              <Button 
                size="sm" 
                variant="outline"
                className="h-7 px-2 text-xs border-resume-purple text-resume-purple hover:bg-resume-purple/10 whitespace-nowrap"
                onClick={() => handleEnhance()}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <Loader className="h-3 w-3 animate-spin mr-1" /> 
                ) : null}
                Enhance Text
              </Button>
            </div>
          </div>
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className={`w-full min-h-[100px] p-2 border border-resume-purple focus:ring-resume-purple transition-all duration-200 ${className}`}
            autoFocus
          />
        </div>
        <div className="flex justify-end mt-2 gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setEditedContent(content);
              setIsEditing(false);
            }}
          >
            Cancel
          </Button>
          <Button 
            size="sm"
            className="bg-resume-purple hover:bg-resume-purple/80"
            onClick={handleSave}
          >
            <Check className="h-4 w-4 mr-1" /> Save
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group relative cursor-text rounded-md transition-all duration-200"
      onClick={() => setIsEditing(true)}
      onMouseEnter={() => setShowToolkit(true)}
      onMouseLeave={() => setShowToolkit(false)}
    >
      <div className={`${className} relative hover:bg-gray-50/50 p-1 rounded`}>
        {content ? (
          formatContent(content)
        ) : (
          <p className="text-gray-400 italic">Click to edit</p>
        )}
        <div className={`absolute -top-10 left-0 z-10 transform transition-all duration-300 ease-out ${
          showToolkit ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
          <div className="flex space-x-1">
            <AIHoverToolkit 
              onComplete={handleGenerate}
              onAddChanges={handleContinue}
            />
            <Button 
              size="sm" 
              variant="outline"
              className="h-7 px-2 text-xs border-resume-purple text-resume-purple hover:bg-resume-purple/10 whitespace-nowrap"
              onClick={() => {
                setIsEditing(true);
                setTimeout(() => handleEnhance(), 100);
              }}
            >
              Enhance Text
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditableContent;
