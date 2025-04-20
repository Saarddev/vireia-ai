
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FileText, Briefcase, Linkedin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  resumeName: z.string().min(3, {
    message: "Resume name must be at least 3 characters.",
  }),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  linkedinProfile: z.string().optional(),
  notes: z.string().optional(),
});

type CreateResumeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CreateResumeDialog = ({ open, onOpenChange }: CreateResumeDialogProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resumeName: "",
      company: "",
      jobTitle: "",
      linkedinProfile: "",
      notes: "",
    },
  });

  const importLinkedInData = async (linkedinUrl: string) => {
    if (!linkedinUrl) {
      toast({
        title: "LinkedIn URL Required",
        description: "Please enter a LinkedIn profile URL to import data.",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    
    try {
      const encodedUrl = encodeURIComponent(linkedinUrl);
      const response = await fetch(`https://fresh-linkedin-profile-data.p.rapidapi.com/get-linkedin-profile?linkedin_url=${encodedUrl}&include_skills=false&include_certifications=false&include_publications=false&include_honors=false&include_volunteers=false&include_projects=false&include_patents=false&include_courses=false&include_organizations=false&include_profile_status=false&include_company_public_url=false`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'fresh-linkedin-profile-data.p.rapidapi.com',
          'x-rapidapi-key': '0e8903e27emsh2333e866a960be6p1d76cbjsn8250ba0b208d'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch LinkedIn data');
      }

      const data = await response.json();
      
      // Auto-fill form with LinkedIn data
      if (data) {
        form.setValue('resumeName', `${data.full_name || ''} - Resume`);
        
        // If there's current employment data
        if (data.experiences && data.experiences.length > 0) {
          const currentJob = data.experiences[0];
          form.setValue('jobTitle', currentJob.title || '');
          form.setValue('company', currentJob.company || '');
        }
        
        toast({
          title: "Data Imported",
          description: "LinkedIn data has been successfully imported",
        });
      }
    } catch (error) {
      console.error('Error fetching LinkedIn data:', error);
      toast({
        title: "Import Failed",
        description: "Could not import LinkedIn data. Please try again or enter details manually.",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to create a resume",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Generate a unique resume ID
      const resumeId = crypto.randomUUID();
      
      // In a real app, you would save this data to your database
      // For now, we'll just simulate it with a timeout
      setTimeout(() => {
        setIsLoading(false);
        onOpenChange(false);
        
        toast({
          title: "Resume created!",
          description: `${values.resumeName} has been created successfully.`,
        });
        
        // Navigate to the resume builder with the new resume ID
        navigate(`/resume-builder/${resumeId}`);
        
        form.reset();
      }, 1500);
    } catch (error) {
      console.error('Error creating resume:', error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to create resume. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Resume</DialogTitle>
          <DialogDescription>
            Enter the details below to create a customized resume
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="resumeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume Name*</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FileText className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" placeholder="e.g., Software Engineer Resume" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Company</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-9" placeholder="e.g., Google" {...field} />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Company you're applying to
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Senior Developer" {...field} />
                    </FormControl>
                    <FormDescription>
                      Position you're targeting
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Import Data From</h3>
              
              <div className="flex flex-col space-y-2">
                <FormField
                  control={form.control}
                  name="linkedinProfile"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex space-x-2">
                        <div className="relative flex-1">
                          <Linkedin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            className="pl-9" 
                            placeholder="LinkedIn profile URL" 
                            {...field} 
                          />
                        </div>
                        <Button 
                          type="button" 
                          variant="outline"
                          disabled={isImporting}
                          onClick={() => importLinkedInData(field.value)}
                        >
                          {isImporting ? "Importing..." : "Import"}
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any specific skills or experiences you want to highlight..." 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-resume-purple hover:bg-resume-purple-dark shadow-sm shadow-resume-purple/20"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Resume"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateResumeDialog;
