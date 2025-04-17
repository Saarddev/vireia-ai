
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  FileText, 
  Save, 
  Download, 
  Share2, 
  Sparkles
} from 'lucide-react';

interface BuilderHeaderProps {
  name: string;
  isSaving: boolean;
  aiEnabled: boolean;
  onSave: () => void;
  onDownload: () => void;
  onShare: () => void;
  onAIToggle: (enabled: boolean) => void;
}

const BuilderHeader: React.FC<BuilderHeaderProps> = ({
  name,
  isSaving,
  aiEnabled,
  onSave,
  onDownload,
  onShare,
  onAIToggle
}) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 px-4 py-3 border-b bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-sm">
      <div className="container max-w-[1800px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/resume')} 
            className="text-muted-foreground hover:text-resume-purple dark:hover:text-resume-purple-light transition-colors flex items-center gap-1.5 hover:scale-105 transform duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back</span>
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-xl font-semibold flex items-center">
              <FileText className="mr-2 h-5 w-5 text-resume-purple" />
              <span className="text-foreground font-display">{name}'s Resume</span>
            </h1>
            <Badge 
              variant="outline" 
              className="text-sm text-resume-purple border-resume-purple/30 bg-resume-purple/5 py-1"
            >
              Draft
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center mr-4">
            <Switch 
              id="ai-mode" 
              checked={aiEnabled} 
              onCheckedChange={onAIToggle} 
              className="mr-2 data-[state=checked]:bg-resume-purple"
            />
            <Label 
              htmlFor="ai-mode" 
              className="text-sm font-medium cursor-pointer flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 mr-1.5 text-resume-purple" />
              AI Assistant
            </Label>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onSave} 
              className="gap-1.5 border-resume-purple/20 text-resume-purple hover:bg-resume-purple/5 hover:border-resume-purple transition-all duration-300"
              disabled={isSaving}
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onDownload}
              className="gap-1.5 border-resume-purple/20 text-resume-purple hover:bg-resume-purple/5 hover:border-resume-purple transition-all duration-300"
            >
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onShare}
              className="gap-1.5 border-resume-purple/20 text-resume-purple hover:bg-resume-purple/5 hover:border-resume-purple transition-all duration-300"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BuilderHeader;
