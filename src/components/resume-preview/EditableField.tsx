
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

  // Auto-grow textarea
  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const rowHeight = 20; // Approximate line height
      const maxHeight = rowHeight * maxRows;
      const minHeight = rowHeight * minRows;
      const newHeight = Math.max(Math.min(scrollHeight, maxHeight), minHeight);
      textareaRef.current.style.height = newHeight + "px";
    }
  }, [editing, localValue, maxRows, minRows]);

  // Streaming effect for generated text
  const streamGeneratedText = (current: string, generated: string) => {
    setStreamingText(current);
    let i = 0;
    function next() {
      setStreamingText(current + generated.slice(0, i));
      if (i < generated.length) {
        i++;
        setTimeout(next, 18); // ~55 wpm
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

  // Keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      setEditing(false);
      setLocalValue(value);
    }
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
      onBlur={(e) => {
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
              "block w-full px-1 py-0.5 text-sm rounded border border-gray-200 focus:border-resume-purple focus:ring-1 focus:ring-resume-purple bg-white/95 shadow-sm transition-all outline-0 resize-none",
              isGenerating && "opacity-70"
            )}
            value={streamingText !== null ? streamingText : localValue}
            onChange={e => setLocalValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            readOnly={streamingText !== null}
            style={{ fontFamily: "inherit" }}
            autoFocus={autoFocus}
            rows={minRows}
          />
          {/* Minimal save/cancel controls */}
          <div className="absolute -right-2 -top-7 z-20 flex gap-1 opacity-90 bg-white shadow-sm rounded-md px-1 py-0.5 animate-fade-in">
            <Button variant="ghost" size="sm" onClick={handleSave} disabled={isGenerating} className="h-5 text-xs px-2">
              <span className="font-medium text-resume-purple">Save</span>
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
          
          {/* AI generation controls */}
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
            <span className="absolute -left-5 top-1 animate-spin text-resume-purple">
              <Loader2 size={14} />
            </span>
          )}
        </div>
      ) : (
        <span
          tabIndex={0}
          className={cn(
            "block transition-colors px-1 -mx-1 rounded cursor-text hover:bg-gray-50/70",
            value ? "text-gray-800" : "text-gray-400 italic"
          )}
        >
          {value || placeholder}
        </span>
      )}
    </div>
  );
};

export default EditableField;
