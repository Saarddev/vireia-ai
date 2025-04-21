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
import { FileText, Briefcase, Linkedin, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from '@/integrations/supabase/client';
import { fetchLinkedInProfile, transformLinkedInData } from '@/services/linkedinService';
import { createEnhancedResume } from '@/services/resumeEnhancementService';
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  resumeName: z.string().min(3, {
    message: "Resume name must be at least 3 characters.",
  }),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  linkedinProfile: z.string().optional(),
  notes: z.string().optional(),
  useAI: z.boolean().default(true),
  enhancementLevel: z.enum(["basic", "standard", "professional"]).default("standard"),
});

type CreateResumeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onResumeCreated?: () => void;
};

const CreateResumeDialog = ({ open, onOpenChange, onResumeCreated }: CreateResumeDialogProps) => {
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
      useAI: true,
      enhancementLevel: "standard",
    },
  });

  const useAI = form.watch("useAI");

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
      const data = await fetchLinkedInProfile(linkedinUrl);
      
      // Save LinkedIn data to user profile
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await supabase
          .from('profiles')
          .update({
            linkedin_url: linkedinUrl,
            linkedin_data: data
          })
          .eq('id', session.user.id);
      }
      
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
      
      let resume;
      
      // Use AI enhancement if selected
      if (values.useAI) {
        try {
          toast({
            title: "Creating Enhanced Resume",
            description: "AI is analyzing your LinkedIn data to create your resume...",
          });

          // Pass enhancementLevel and notes as prompt params if wanted (not in edge function currently but can expand)
          // For now, call as before
          resume = await createEnhancedResume(session.user.id, values.resumeName);

          toast({
            title: "AI Enhancement Complete",
            description: "Your resume has been enhanced with AI",
          });
        } catch (error) {
          console.error('Error with AI enhancement:', error);
          toast({
            title: "AI Enhancement Failed",
            description: "Falling back to basic resume creation.",
            variant: "destructive",
          });
          values.useAI = false;
        }
      }
      
      // If AI enhancement failed or wasn't selected, create basic resume from LinkedIn data if available
      if (!values.useAI || !resume) {
        let resumeContent = {
          personal: {
            name: "",
            title: values.jobTitle || "",
            email: "",
            phone: "",
            location: "",
            linkedin: values.linkedinProfile || "",
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
        };
        if (values.linkedinProfile) {
          try {
            const linkedinData = await fetchLinkedInProfile(values.linkedinProfile);
            resumeContent = transformLinkedInData(linkedinData) || resumeContent;
          } catch (error) {
            console.error('Error importing LinkedIn data:', error);
          }
        }
        const { data: newResume, error } = await supabase
          .from('resumes')
          .insert({
            title: values.resumeName,
            content: resumeContent,
            template: 'modern',
            user_id: session.user.id,
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
        resume = newResume;
      }

      setIsLoading(false);
      onOpenChange(false);
      
      toast({
        title: "Resume created!",
        description: `${values.resumeName} has been created successfully.`,
      });
      
      // Call the callback to refresh the resumes list
      if (onResumeCreated) onResumeCreated();

      // Always route to builder with the new resume id
      if (resume && resume.id) {
        navigate(`/resume/builder/${resume.id}`); // Force builder to re-fetch actual content by id
      }
      
      form.reset();
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
            
            <div className="space-y-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
              <FormField
                control={form.control}
                name="useAI"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-resume-purple" />
                      <FormLabel className="text-sm font-medium leading-none">
                        Enhance with AI
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              {useAI && (
                <FormField
                  control={form.control}
                  name="enhancementLevel"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Enhancement Level</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="basic" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Basic - Structure and format LinkedIn data
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="standard" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Standard - Add professional summary and enhance descriptions
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="professional" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Professional - Comprehensive enhancements with keywords and skills
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>
                        Select how much AI enhancement to apply to your resume
                      </FormDescription>
                    </FormItem>
                  )}
                />
              )}
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
