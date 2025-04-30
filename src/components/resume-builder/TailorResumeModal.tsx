
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader, FileText, Sparkles } from "lucide-react";
import { toast } from 'sonner';

interface TailorResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (jobDescription: string) => Promise<void>;
  isSubmitting: boolean;
}

const TailorResumeModal: React.FC<TailorResumeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting
}) => {
  const [jobDescription, setJobDescription] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async () => {
    if (jobDescription.trim().length < 50) {
      setError('Please enter a more detailed job description (at least 50 characters).');
      return;
    }
    
    setError('');
    try {
      await onSubmit(jobDescription);
      // Don't clear the job description here in case it fails
      // We'll clear it on successful completion in the parent component
    } catch (err: any) {
      console.error('Error in tailoring resume:', err);
      toast.error(`Failed to tailor resume: ${err.message || 'Unknown error'}`);
    }
  };

  const handleClose = () => {
    setJobDescription('');
    setError('');
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-resume-purple" />
            Tailor Your Resume
          </DialogTitle>
          <DialogDescription>
            Paste a job description below and we'll optimize your resume to match the requirements,
            using ATS-friendly formatting and relevant keywords to increase your chances of getting noticed.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="job-description" className="text-sm font-medium">
              Job Description
            </label>
            <Textarea
              id="job-description"
              placeholder="Paste the full job description here (minimum 50 characters)..."
              className="min-h-[200px] resize-none"
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                if (error && e.target.value.trim().length >= 50) {
                  setError('');
                }
              }}
              disabled={isSubmitting}
            />
            {error && (
              <p className="text-xs text-red-500">
                {error}
              </p>
            )}
          </div>
          
          <div className="bg-purple-50 border-resume-purple/20 border rounded-md p-3 text-sm">
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-resume-purple mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-resume-purple">How this works:</p>
                <p className="text-gray-600 mt-1">Our AI will analyze the job description and:</p>
                <ul className="list-disc pl-5 mt-1 text-gray-600 space-y-1">
                  <li>Extract key skills and requirements</li>
                  <li>Optimize your summary and bullet points with relevant keywords</li>
                  <li>Format your resume to be ATS-friendly</li>
                  <li>Customize content to highlight relevant experience</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="bg-resume-purple hover:bg-resume-purple/90"
            disabled={jobDescription.trim().length < 50 || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Tailoring Resume...
              </>
            ) : (
              'Tailor My Resume'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TailorResumeModal;
