
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Sparkles, LinkedinIcon } from 'lucide-react';

interface CreateResumeDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateResume: (title: string) => void;
  isCreating?: boolean;
}

const CreateResumeDialog: React.FC<CreateResumeDialogProps> = ({
  open,
  onClose,
  onCreateResume,
  isCreating = false
}) => {
  const [resumeTitle, setResumeTitle] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resumeTitle.trim()) {
      onCreateResume(resumeTitle.trim());
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-resume-purple to-purple-600 bg-clip-text text-transparent">
            Create Your Resume
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Start crafting your professional story with our AI-powered resume builder
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Resume Title
              </Label>
              <Input
                id="title"
                type="text"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                placeholder="E.g., Software Engineer 2024"
                className="w-full px-3 py-2"
                autoFocus
              />
            </div>
            
            <div className="grid gap-4">
              <Button
                type="submit"
                disabled={!resumeTitle.trim() || isCreating}
                className="w-full bg-resume-purple hover:bg-resume-purple/90"
              >
                {isCreating ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Create Resume
                  </>
                )}
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">or</span>
                </div>
              </div>
              
              <Button
                type="button"
                variant="outline"
                className="w-full border-resume-purple/30 text-resume-purple hover:bg-resume-purple/10"
                onClick={() => {
                  // Handle LinkedIn import
                }}
              >
                <LinkedinIcon className="mr-2 h-4 w-4" />
                Import from LinkedIn
              </Button>
            </div>
          </form>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              By creating a resume, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateResumeDialog;
