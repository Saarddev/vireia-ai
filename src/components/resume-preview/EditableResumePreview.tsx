
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

  const handleGenerate = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!onGenerateWithAI) return;
    
    setIsGenerating(true);
    try {
      await onGenerateWithAI();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleContinue = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const newText = editedContent + "\n";
    setEditedContent(newText);
  };

  if (isEditing) {
    return (
      <div className="relative">
        <div 
          className="relative group"
          onMouseEnter={() => setShowToolkit(true)}
          onMouseLeave={() => setShowToolkit(false)}
        >
          <div className={`absolute -top-12 left-0 z-10 transform transition-all duration-300 ease-out ${
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
      className="group relative p-2 rounded-md transition-all duration-200 hover:bg-gray-50 cursor-text"
      onClick={() => setIsEditing(true)}
    >
      <div className={`${className} relative`}>
        {content ? (
          <p className="whitespace-pre-line">{content}</p>
        ) : (
          <p className="text-gray-400 italic">No content. Click to add.</p>
        )}
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
        >
          <Edit3 className="h-4 w-4 text-resume-purple" />
        </Button>
      </div>
    </div>
  );
};

export default EditableContent;
