
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Sparkles, LinkedinIcon, PenLine, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { fetchLinkedInProfile, transformLinkedInData } from "@/services/linkedinService";
import { supabase } from "@/integrations/supabase/client";
import { enhanceResumeWithAI } from "@/services/resumeEnhancementService";

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
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isProcessingLinkedIn, setIsProcessingLinkedIn] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (resumeTitle.trim()) {
      onCreateResume(resumeTitle.trim());
    }
  };

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
      // 1. Fetch LinkedIn profile data
      const linkedinData = await fetchLinkedInProfile(linkedinUrl);
      
      if (!linkedinData) {
        throw new Error('Failed to fetch LinkedIn data');
      }
      
      // 2. Transform LinkedIn data to our resume format
      const transformedData = transformLinkedInData(linkedinData);
      
      // 3. Use AI to enhance the resume
      const enhancedResume = await enhanceResumeWithAI(linkedinData);
      
      // 4. Store the data in Supabase
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      // 5. Create the resume in the database
      const { data: resume, error } = await supabase
        .from('resumes')
        .insert({
          title: resumeTitle || 'My Professional Resume',
          content: enhancedResume,
          template: 'modern',
          user_id: user.id,
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
      
      toast({
        title: "Success!",
        description: "Your resume has been created from LinkedIn data",
      });
      
      onCreateResume(resumeTitle || 'My Professional Resume');
      
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
            Start crafting your professional story or import from LinkedIn
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4 relative z-10">
          <div className="space-y-4">
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
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">or import from LinkedIn</span>
              </div>
            </div>

            <div className="space-y-3 px-1">
              <Label htmlFor="linkedin" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                LinkedIn Profile URL
              </Label>
              <Input
                id="linkedin"
                type="text"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full px-3 py-2 border-gray-300 focus:border-resume-purple focus:ring-resume-purple dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          </div>
            
          <div className="grid gap-4 pt-2">
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={!resumeTitle.trim() || isCreating || isProcessingLinkedIn}
              className="w-full bg-resume-purple hover:bg-resume-purple/90 text-white font-medium py-2 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Create Resume
                </>
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="w-full border-resume-purple/30 text-resume-purple hover:bg-resume-purple/10 dark:border-resume-purple/50 dark:text-purple-300 dark:hover:bg-resume-purple/20 font-medium"
              onClick={handleLinkedInImport}
              disabled={isProcessingLinkedIn || isCreating}
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
