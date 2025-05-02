
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createEnhancedResume } from '@/services/resumeEnhancementService';
import { toast } from 'sonner';
import { FileText, Linkedin, Loader, ArrowRight } from 'lucide-react';

export interface CreateResumeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onResumeCreated?: () => Promise<void>;
}

export default function CreateResumeDialog({
  open,
  onOpenChange,
  onResumeCreated
}: CreateResumeDialogProps) {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setLinkedinUrl('');
    setResumeName('');
    setError(null);
  };

  const handleOpenChange = (newOpenState: boolean) => {
    if (!newOpenState) {
      resetForm();
    }
    onOpenChange(newOpenState);
  };

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!linkedinUrl.trim()) {
      setError('Please enter your LinkedIn profile URL');
      return;
    }

    setError(null);
    setIsCreating(true);

    try {
      await createEnhancedResume(linkedinUrl, resumeName || 'My Professional Resume');
      toast.success('Resume created successfully!');
      
      if (onResumeCreated) {
        await onResumeCreated();
      }
      
      handleOpenChange(false);
    } catch (error: any) {
      console.error('Error creating resume:', error);
      setError(error.message || 'Failed to create resume. Please try again.');
      toast.error('Failed to create resume');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Form */}
          <div className="p-6 flex-1">
            <form onSubmit={handleCreate} className="space-y-5">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-resume-purple">Create Your Resume</DialogTitle>
                <DialogDescription className="text-sm text-gray-500 mt-1">
                  Import your professional data from LinkedIn and let AI create a personalized resume for you.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Resume Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="My Professional Resume"
                    value={resumeName}
                    onChange={(e) => setResumeName(e.target.value)}
                    className="w-full border-gray-300 focus:border-resume-purple"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-sm font-medium flex items-center gap-1">
                    <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                    LinkedIn Profile URL
                  </Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/yourname"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full border-gray-300 focus:border-resume-purple"
                  />
                  <p className="text-xs text-gray-500">
                    We'll use your profile data to generate a professional resume
                  </p>
                </div>
                
                {error && (
                  <div className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-md p-2 mt-2">
                    {error}
                  </div>
                )}
              </div>
              
              <DialogFooter className="pt-2">
                <Button 
                  type="submit" 
                  disabled={isCreating}
                  className="w-full bg-resume-purple hover:bg-resume-purple-dark transition-colors"
                >
                  {isCreating ? (
                    <span className="flex items-center gap-2">
                      <Loader className="h-4 w-4 animate-spin" />
                      Creating Resume...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Create Resume
                    </span>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </div>
          
          {/* Right side - Info box */}
          <div className="bg-purple-50 p-6 flex-1 hidden md:block">
            <div className="h-full flex flex-col justify-center">
              <h3 className="font-semibold text-resume-purple mb-3">How It Works</h3>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-resume-purple rounded-full w-5 h-5 flex items-center justify-center text-white text-xs mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-medium">Connect LinkedIn</p>
                    <p className="text-xs text-gray-600">Provide your LinkedIn URL to import your professional data</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="bg-resume-purple rounded-full w-5 h-5 flex items-center justify-center text-white text-xs mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-medium">AI Enhancement</p>
                    <p className="text-xs text-gray-600">Our AI analyzes and improves your experience to sound professional</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="bg-resume-purple rounded-full w-5 h-5 flex items-center justify-center text-white text-xs mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-medium">Edit & Customize</p>
                    <p className="text-xs text-gray-600">Refine your resume with our easy-to-use editor</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-6 bg-white rounded-lg p-3 border border-purple-100 shadow-sm">
                <p className="text-xs text-gray-500 italic">
                  "This tool helped me create an ATS-friendly resume in minutes and landed me 3 interviews in my first week!"
                </p>
                <p className="text-xs font-medium mt-2">— Sarah K., Software Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
