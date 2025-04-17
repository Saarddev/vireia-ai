
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Sparkles } from 'lucide-react';

interface AISuggestionProps {
  suggestion: {
    type: string;
    section: string;
    content: string;
  } | null;
  onDismiss: () => void;
  onApply: () => void;
}

const AISuggestion: React.FC<AISuggestionProps> = ({
  suggestion,
  onDismiss,
  onApply
}) => {
  if (!suggestion) return null;

  return (
    <div className="mb-6">
      <Card className="bg-resume-purple/5 border border-resume-purple/20 shadow-lg overflow-hidden">
        <div className="p-4 flex items-start gap-4">
          <div className="bg-resume-purple text-white p-2 rounded-lg shadow-inner">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-resume-purple dark:text-resume-purple-light mb-1 font-display">
              AI Suggestion
            </h3>
            <p className="text-sm text-muted-foreground">
              {suggestion.content}
            </p>
            <div className="mt-3 flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                className="text-xs gap-1.5 border-resume-purple/20 hover:border-resume-purple hover:bg-resume-purple/5"
                onClick={onDismiss}
              >
                <X className="h-3 w-3" />
                Dismiss
              </Button>
              <Button 
                size="sm" 
                className="text-xs gap-1.5 bg-resume-purple hover:bg-resume-purple-dark"
                onClick={onApply}
              >
                <Check className="h-3 w-3" />
                Apply Suggestion
              </Button>
            </div>
          </div>
          <button 
            onClick={onDismiss}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AISuggestion;
