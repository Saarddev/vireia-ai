
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AIHoverToolkit from "@/components/AIHoverToolkit";
import { Loader2, SquarePen } from "lucide-react";

interface EditableFieldProps {
  value: string;
  placeholder: string;
  className?: string;
  onSave: (val: string) => void;
  onGenerateWithAI?: () => Promise<string | undefined>;
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

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Auto-grow textarea, but max height
  React.useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const rowHeight = 24;
      const maxHeight = rowHeight * maxRows;
      const newHeight = Math.min(scrollHeight, maxHeight);
      textareaRef.current.style.height = newHeight + "px";
    }
  }, [editing, localValue, maxRows]);

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
    if (!onGenerateWithAI) return;
    setIsGenerating(true);
    let result: string | undefined;
    try {
      result = await onGenerateWithAI();
      // If streaming, show streaming effect instead of instant insert
      if (result) {
        streamGeneratedText(localValue, result.replace(localValue, ""));
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAIContinue = async () => {
    if (!onGenerateWithAI) return;
    setIsGenerating(true);
    let result: string | undefined;
    try {
      result = await onGenerateWithAI();
      // Simulate "continue": append only new content, smoothly
      if (result && result.length > localValue.length) {
        const added = result.slice(localValue.length);
        streamGeneratedText(localValue, added);
      }
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
        "relative w-full group px-1 rounded hover:bg-resume-purple/10 transition-colors min-h-[32px]",
        className
      )}
      tabIndex={0}
      onClick={startEdit}
      onMouseEnter={() => setShowToolkit(true)}
      onMouseLeave={() => setShowToolkit(false)}
      onFocus={() => setShowToolkit(true)}
      onBlur={(e) => {
        // if focus moved outside (not within toolkit), save
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
              "block w-full min-h-[32px] max-h-[160px] rounded-xl px-4 py-2 text-base border border-gray-200 focus:border-resume-purple focus:ring-1 focus:ring-resume-purple bg-white/90 shadow transition-all outline-0 resize-none",
              isGenerating && "opacity-70",
              "placeholder:text-gray-400",
              "font-medium",
            )}
            value={streamingText !== null ? streamingText : localValue}
            onChange={e => setLocalValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            readOnly={streamingText !== null}
            style={{ fontFamily: "inherit", lineHeight: "1.3" }}
            autoFocus={autoFocus}
            rows={minRows}
            aria-label={placeholder}
          />
          {/* Save/Cancel reveal on focus */}
          <div className="absolute -right-2 -top-10 z-20 flex gap-2 opacity-80 bg-white/90 rounded shadow px-2 py-1 transition-all animate-fade-in pointer-events-auto">
            <Button variant="ghost" size="sm" onClick={handleSave} disabled={isGenerating} tabIndex={-1}>
              <span className="font-semibold text-resume-purple">Save</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setEditing(false);
                setLocalValue(value);
              }}
              disabled={isGenerating}
              tabIndex={-1}
            >
              <span className="text-gray-500">Cancel</span>
            </Button>
          </div>
          {/* AI toolkit always visible in edit mode */}
          {onGenerateWithAI && (
            <div className="absolute -right-2 -bottom-10 z-10 animate-fade-in">
              <AIHoverToolkit
                onComplete={handleAIComplete}
                onAddChanges={handleAIContinue}
                className="shadow-lg"
              />
            </div>
          )}
          {isGenerating && (
            <span className="absolute -left-8 top-2 animate-spin text-resume-purple">
              <Loader2 size={20} />
            </span>
          )}
        </div>
      ) : (
        <span
          className={cn(
            "block transition-all",
            value
              ? "cursor-pointer hover:bg-resume-purple/10 rounded text-gray-900 before:content-[''] before:block before:absolute before:-inset-1 before:rounded before:bg-resume-purple/10 before:opacity-0 group-hover:before:opacity-100"
              : "text-gray-400 italic",
            "px-2 py-1",
            "font-medium",
            "relative"
          )}
          style={{
            minHeight: 32,
            transition: "background .18s cubic-bezier(.4,0,.2,1), box-shadow .18s cubic-bezier(.4,0,.2,1)"
          }}
        >
          {value ? (
            <span>{value}</span>
          ) : (
            <span>{placeholder}</span>
          )}
          {/* Pen icon appears on hover/focus */}
          <span className={cn(
            "absolute right-0 top-1 text-resume-purple/60 opacity-0 group-hover:opacity-70 transition-opacity pointer-events-none"
          )}>
            <SquarePen className="w-4 h-4" />
          </span>
        </span>
      )}
    </div>
  );
};

export default EditableField;
