
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
import { Loader } from 'lucide-react';

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
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleCreate}>
          <DialogHeader>
            <DialogTitle>Create a New Resume</DialogTitle>
            <DialogDescription>
              Enter your LinkedIn URL to automatically generate a professional resume with AI.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right col-span-1">
                Name
              </Label>
              <Input
                id="name"
                placeholder="My Professional Resume"
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="linkedin" className="text-right col-span-1">
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/yourname"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isCreating} className="gap-2">
              {isCreating && <Loader className="h-4 w-4 animate-spin" />}
              {isCreating ? 'Creating...' : 'Create Resume'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
