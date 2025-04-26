
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Sparkles, LinkedinIcon, PenLine, Loader2, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { createEnhancedResume } from "@/services/resumeEnhancementService";
import { supabase } from "@/integrations/supabase/client";

interface CreateResumeDialogProps {
  open: boolean;
  onClose: () => void;
  onResumeCreated?: (resumeId: string) => void;
  isCreating?: boolean;
}

const CreateResumeDialog: React.FC<CreateResumeDialogProps> = ({
  open,
  onClose,
  onResumeCreated,
  isCreating = false
}) => {
  const [resumeTitle, setResumeTitle] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isProcessingLinkedIn, setIsProcessingLinkedIn] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleLinkedInImport = async () => {
    if (!linkedinUrl) {
      toast({
        title: "LinkedIn URL Required",
        description: "Please enter your LinkedIn profile URL to import data",
        variant: "destructive"
      });
      return;
    }

    setIsProcessingLinkedIn(true);
    try {
      const newResume = await createEnhancedResume(linkedinUrl, resumeTitle);
      
      if (newResume && onResumeCreated) {
        onResumeCreated(newResume.id);
      }
      onClose();
      
      toast({
        title: "Success!",
        description: "Your resume has been created from LinkedIn data",
      });
    } catch (error: any) {
      console.error('Error importing LinkedIn data:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to import LinkedIn data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessingLinkedIn(false);
    }
  };

  const handleCreateBlank = async () => {
    if (!resumeTitle.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a title for your resume",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Authentication required');

      const { data: resume, error } = await supabase
        .from('resumes')
        .insert({
          title: resumeTitle,
          template: 'modern',
          user_id: user.id,
          content: {
            personal: {
              name: "",
              title: "",
              email: "",
              phone: "",
              location: "",
              linkedin: "",
              website: ""
            },
            summary: "",
            experience: [],
            education: [],
            skills: {
              technical: [],
              soft: []
            },
            languages: [],
            certifications: [],
            projects: []
          },
          settings: {
            fontFamily: "Inter",
            fontSize: 10,
            primaryColor: "#9b87f5",
            secondaryColor: "#6E59A5",
            accentColor: "#D6BCFA",
            paperSize: "a4",
            margins: "normal"
          }
        })
        .select()
        .single();

      if (error) throw error;
      
      if (onResumeCreated && resume) {
        onResumeCreated(resume.id);
      }
      onClose();
    } catch (error) {
      console.error('Error creating resume:', error);
      toast({
        title: "Error",
        description: "Failed to create resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);
    setResumeTitle(file.name.replace(/\.[^/.]+$/, ""));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Resume</DialogTitle>
          <DialogDescription>
            Create a new resume or import from LinkedIn
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Resume Title</Label>
            <Input
              id="title"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              placeholder="E.g., Software Engineer 2024"
            />
          </div>

          <div>
            <Label htmlFor="linkedin">LinkedIn Profile URL (Optional)</Label>
            <Input
              id="linkedin"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          <div>
            <Label htmlFor="resume-upload">Upload Existing Resume (Optional)</Label>
            <Input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
            />
            {uploadedFile && (
              <p className="text-sm text-muted-foreground mt-1">
                Selected: {uploadedFile.name}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onClick={handleCreateBlank}
              disabled={!resumeTitle.trim() || isCreating || isProcessingLinkedIn}
            >
              <FileText className="mr-2 h-4 w-4" />
              Create Blank Resume
            </Button>

            <Button
              variant="outline"
              onClick={handleLinkedInImport}
              disabled={!linkedinUrl || isProcessingLinkedIn || isCreating}
            >
              {isProcessingLinkedIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <LinkedinIcon className="mr-2 h-4 w-4" />
                  Import from LinkedIn
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateResumeDialog;
