
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Check, Edit3, Loader } from 'lucide-react';
import AIHoverToolkit from "@/components/AIHoverToolkit";

interface EditableContentProps {
  content: string;
  onSave: (content: string) => void;
  className?: string;
  onGenerateWithAI?: () => Promise<void>;
}

export const EditableContent: React.FC<EditableContentProps> = ({ 
  content, 
  onSave, 
  className = "", 
  onGenerateWithAI 
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
    if (!onGenerateWithAI) return "";
    
    setIsGenerating(true);
    try {
      await onGenerateWithAI();
    } finally {
      setIsGenerating(false);
    }
    return "";
  };

  const handleContinue = () => {
    const newText = editedContent + "\n";
    setEditedContent(newText);
    return "";
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
            {onGenerateWithAI && (
              <AIHoverToolkit 
                onComplete={handleGenerate}
                onAddChanges={handleContinue}
              />
            )}
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
          <p className="whitespace-pre-line">{content}</p>
        ) : (
          <p className="text-gray-400 italic">Click to edit</p>
        )}
        {onGenerateWithAI && (
          <div className={`absolute -top-10 left-0 z-10 transform transition-all duration-300 ease-out ${
            showToolkit ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}>
            <AIHoverToolkit 
              onComplete={handleGenerate}
              onAddChanges={handleContinue}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableContent;
