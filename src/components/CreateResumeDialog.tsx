
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Sparkles, LinkedinIcon, PenLine } from 'lucide-react';

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
  const [resumeTitle, setResumeTitle] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resumeTitle.trim()) {
      onCreateResume(resumeTitle.trim());
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md overflow-hidden border-0 shadow-xl bg-white dark:bg-gray-900">
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-purple-100 via-white to-blue-50 dark:from-purple-950/30 dark:via-gray-900 dark:to-blue-950/30 opacity-80"></div>
        
        <DialogHeader className="relative z-10">
          <div className="mx-auto h-14 w-14 rounded-full flex items-center justify-center bg-purple-100 dark:bg-purple-900/50 mb-3">
            <PenLine className="h-6 w-6 text-resume-purple" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-resume-purple to-purple-600 bg-clip-text text-transparent">
            Create Your Resume
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 dark:text-gray-400 px-4">
            Start crafting your professional story with our AI-powered resume builder
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4 relative z-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3 px-1">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Resume Title
              </Label>
              <Input
                id="title"
                type="text"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                placeholder="E.g., Software Engineer 2024"
                className="w-full px-3 py-2 border-gray-300 focus:border-resume-purple focus:ring-resume-purple dark:bg-gray-800 dark:border-gray-700"
                autoFocus
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Give your resume a descriptive name to find it easily
              </p>
            </div>
            
            <div className="grid gap-4 pt-2">
              <Button
                type="submit"
                disabled={!resumeTitle.trim() || isCreating}
                className="w-full bg-resume-purple hover:bg-resume-purple/90 text-white font-medium py-2 transition-all duration-200 shadow-sm hover:shadow-md"
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
                  <span className="w-full border-t border-gray-200 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">or</span>
                </div>
              </div>
              
              <Button
                type="button"
                variant="outline"
                className="w-full border-resume-purple/30 text-resume-purple hover:bg-resume-purple/10 dark:border-resume-purple/50 dark:text-purple-300 dark:hover:bg-resume-purple/20 font-medium"
              >
                <LinkedinIcon className="mr-2 h-4 w-4" />
                Import from LinkedIn
              </Button>
            </div>
          </form>
          
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              By creating a resume, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateResumeDialog;
