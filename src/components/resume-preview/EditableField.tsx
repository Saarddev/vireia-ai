
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AIHoverToolkit from "@/components/AIHoverToolkit";
import { Loader2 } from "lucide-react";

interface EditableFieldProps {
  value: string;
  placeholder: string;
  className?: string;
  onSave: (val: string) => void;
  onGenerateWithAI?: () => Promise<string>;
  autoFocus?: boolean;
  maxRows?: number;
  minRows?: number;
  inputStyle?: React.CSSProperties;
  outputStyle?: React.CSSProperties;
}

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  placeholder,
  className,
  onSave,
  onGenerateWithAI,
  autoFocus = false,
  maxRows = 5,
  minRows = 1,
  inputStyle = {},
  outputStyle = {}
}) => {
  const [editing, setEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showToolkit, setShowToolkit] = useState(false);
  const [streamingText, setStreamingText] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const rowHeight = 20;
      const maxHeight = rowHeight * maxRows;
      const minHeight = rowHeight * minRows;
      const newHeight = Math.max(Math.min(scrollHeight, maxHeight), minHeight);
      textareaRef.current.style.height = newHeight + "px";
    }
  }, [editing, localValue, maxRows, minRows]);

  const streamGeneratedText = (current: string, generated: string) => {
    setStreamingText(current);
    let i = 0;
    function next() {
      setStreamingText(current + generated.slice(0, i));
      if (i < generated.length) {
        i++;
        setTimeout(next, 18);
      } else {
        setStreamingText(null);
        setLocalValue(current + generated);
      }
    }
    next();
  };

  const handleAIComplete = async () => {
    if (!onGenerateWithAI) return "";
    setIsGenerating(true);
    try {
      const result = await onGenerateWithAI();
      if (result) {
        streamGeneratedText(localValue, result.replace(localValue, ""));
      }
      return "";
    } catch (error) {
      console.error("AI generation failed:", error);
      return "";
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAIContinue = async () => {
    if (!onGenerateWithAI) return "";
    setIsGenerating(true);
    try {
      const result = await onGenerateWithAI();
      if (result && result.length > localValue.length) {
        const added = result.slice(localValue.length);
        streamGeneratedText(localValue, added);
      }
      return "";
    } catch (error) {
      console.error("AI continuation failed:", error);
      return "";
    } finally {
      setIsGenerating(false);
    }
  };

  const startEdit = () => {
    setEditing(true);
    setTimeout(() => textareaRef.current?.focus(), 5);
  };

  const handleSave = () => {
    if (streamingText !== null) return;
    setEditing(false);
    if (localValue !== value) onSave(localValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      setEditing(false);
      setLocalValue(value);
    }
  };

  // Function to render bullet points properly in read-only view
  const renderBulletPoints = (text: string) => {
    if (!text) return placeholder;
    
    if (text.includes('•')) {
      return (
        <div className="bullet-list">
          {text.split('\n').map((line, i) => {
            // Make sure we don't double the bullet points
            const cleanLine = line.replace(/^•\s*•\s*/, '• ');
            return (
              <React.Fragment key={i}>
                <div className="bullet-line">{cleanLine}</div>
                {i < text.split('\n').length - 1 && <br />}
              </React.Fragment>
            );
          })}
        </div>
      );
    }
    
    return text || placeholder;
  };

  return (
    <div 
      className={cn(
        "relative w-full group transition-colors min-h-[20px]",
        className
      )}
      onClick={startEdit}
      onMouseEnter={() => setShowToolkit(true)}
      onMouseLeave={() => setShowToolkit(false)}
      onFocus={() => setShowToolkit(true)}
      onBlur={e => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          handleSave();
        }
      }}
    >
      {editing || streamingText !== null ? (
        <div className="relative w-full">
          <textarea
            ref={textareaRef}
            className={cn(
              "block w-full px-1 py-0.5 text-inherit font-inherit rounded",
              "border border-gray-200 focus:border-[#5d4dcd] focus:ring-1 focus:ring-[#5d4dcd]",
              "bg-white/95 shadow-sm transition-all outline-0 resize-none",
              isGenerating && "opacity-70"
            )}
            value={streamingText !== null ? streamingText : localValue}
            onChange={e => setLocalValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            readOnly={streamingText !== null}
            style={{
              fontFamily: "inherit",
              fontSize: "inherit",
              fontWeight: "inherit",
              lineHeight: "inherit",
              ...inputStyle
            }}
            autoFocus={autoFocus}
            rows={minRows}
          />
          <div className="absolute -right-2 -top-7 z-20 flex gap-1 opacity-90 bg-white shadow-sm rounded-md px-1 py-0.5 animate-fade-in">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              disabled={isGenerating}
              className="h-5 text-xs px-2"
            >
              <span className="font-medium text-[#5d4dcd]">Save</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setEditing(false);
                setLocalValue(value);
              }}
              disabled={isGenerating}
              className="h-5 text-xs px-2"
            >
              <span className="text-gray-500">Cancel</span>
            </Button>
          </div>
          {onGenerateWithAI && (
            <div className="absolute -right-2 -bottom-7 z-10 animate-fade-in">
              <AIHoverToolkit
                onComplete={handleAIComplete}
                onAddChanges={handleAIContinue}
                className="shadow-sm scale-90"
              />
            </div>
          )}
          {isGenerating && (
            <span className="absolute -left-5 top-1 animate-spin text-[#5d4dcd]">
              <Loader2 size={14} />
            </span>
          )}
        </div>
      ) : (
        <div
          tabIndex={0}
          style={{
            ...outputStyle,
            fontSize: "inherit",
            fontWeight: "inherit",
            lineHeight: "inherit",
          }}
          className={cn(
            "block w-full transition-colors duration-200",
            "hover:bg-gray-50/50 focus:bg-gray-50/50 rounded px-1 py-0.5",
            !value && "text-gray-400"
          )}
        >
          {renderBulletPoints(value)}
        </div>
      )}
    </div>
  );
};

export default EditableField;
