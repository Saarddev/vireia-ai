
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, X, Wand2, Loader, FileText } from "lucide-react";
import AITabContinuation from '@/components/AITabContinuation';
import { summarizeText } from '@/utils/summarizeText';

interface EditableFieldProps {
  value: string;
  placeholder: string;
  className?: string;
  onSave: (value: string) => void;
  onGenerateWithAI?: () => Promise<string>;
  minRows?: number;
  maxRows?: number;
  inputStyle?: React.CSSProperties;
  outputStyle?: React.CSSProperties;
  renderHTML?: (text: string) => string;
}

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  placeholder,
  className = '',
  onSave,
  onGenerateWithAI,
  minRows = 1,
  maxRows = 4,
  inputStyle = {},
  outputStyle = {},
  renderHTML
}) => {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleEdit = () => {
    setEditValue(value);
    setEditing(true);
  };

  const handleCancel = () => {
    setEditValue(value);
    setEditing(false);
  };

  const handleSave = () => {
    onSave(editValue);
    setEditing(false);
  };

  const handleGenerateWithAI = async () => {
    if (!onGenerateWithAI) return "";

    setIsGenerating(true);
    try {
      const generatedText = await onGenerateWithAI();
      if (generatedText) {
        setEditValue(generatedText);
        return generatedText;
      }
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
    
    return "";
  };

  const handleSummarize = async () => {
    if (!editValue.trim()) return "";

    setIsGenerating(true);
    try {
      const summarized = await summarizeText(editValue);
      if (summarized) {
        setEditValue(summarized);
        return summarized;
      }
    } catch (error) {
      console.error('Error summarizing content:', error);
    } finally {
      setIsGenerating(false);
    }
    
    return "";
  };

  return (
    <div className={`editable-field relative transition-all duration-200 ${editing ? 'editing' : ''}`}>
      {editing ? (
        <div className="edit-mode w-full">
          <AITabContinuation
            value={editValue}
            onChange={setEditValue}
            onGenerateWithAI={onGenerateWithAI} 
            placeholder={placeholder}
            className={`w-full py-1 px-2 border border-gray-300 rounded text-sm focus:border-resume-purple focus:ring-1 focus:ring-resume-purple outline-none transition-all duration-200 ${className}`}
            minRows={minRows}
            maxRows={maxRows}
          />
          <div className="flex items-center justify-end mt-1 gap-1">
            {onGenerateWithAI && (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleGenerateWithAI}
                  className="text-xs h-7 px-2 text-resume-purple hover:bg-resume-purple/10"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader className="h-3 w-3 mr-1 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-3 w-3 mr-1" />
                      Enhance
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleSummarize}
                  className="text-xs h-7 px-2 text-resume-purple hover:bg-resume-purple/10"
                  disabled={isGenerating}
                >
                  <FileText className="h-3 w-3 mr-1" />
                  Summarize
                </Button>
              </>
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="text-xs h-7 px-2"
            >
              <X className="h-3 w-3 mr-1" />
              Cancel
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="text-xs h-7 px-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            >
              <Check className="h-3 w-3 mr-1" />
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`view-mode cursor-pointer py-0.5 rounded hover:bg-gray-50 transition-all ${className}`}
          onClick={handleEdit}
          style={outputStyle}
        >
          {value ? (
            renderHTML ? (
              <div dangerouslySetInnerHTML={{ __html: renderHTML(value) }} />
            ) : (
              value
            )
          ) : (
            <span className="text-gray-400 italic">{placeholder}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default EditableField;
