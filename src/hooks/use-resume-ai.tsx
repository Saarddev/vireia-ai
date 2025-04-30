
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { toast as sonnerToast } from 'sonner';

export function useResumeAI() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateSummary = async (experience: string[], skills: string[]): Promise<string> => {
    setIsGenerating(true);
    try {
      // Validate input data
      if (!Array.isArray(experience) || experience.length === 0) {
        toast({
          title: "Missing Experience",
          description: "Please add some work experience before generating a summary.",
        });
        return "";
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to use AI features",
        });
        throw new Error('Authentication required');
      }

      console.log("Calling enhance-resume with summary type", { experience, skills });
      const { data, error } = await supabase.functions.invoke('enhance-resume', {
        body: { 
          type: 'summary',
          experience,
          skills
        }
      });

      if (error) {
        console.error('Error from edge function:', error);
        throw new Error(`Edge function error: ${error.message || error}`);
      }
      
      if (!data || !data.summary) {
        console.error("Invalid response from AI service:", data);
        toast({
          title: "Error",
          description: "No summary generated. Please try again.",
          variant: "destructive"
        });
        throw new Error('Invalid response from AI service');
      }
      
      sonnerToast.success("Summary Generated", {
        description: "Your professional summary has been generated."
      });
      
      return data.summary;

    } catch (error: any) {
      console.error('Error generating summary:', error);
      toast({
        title: "Error",
        description: `Failed to generate summary: ${error.message || "Please try again"}`,
        variant: "destructive"
      });
      return "";
    } finally {
      setIsGenerating(false);
    }
  };

  const extractSkills = async (experience: string[]) => {
    setIsGenerating(true);
    try {
      // Validate input data
      if (!Array.isArray(experience) || experience.length === 0) {
        toast({
          title: "Missing Experience",
          description: "Please add some work experience before extracting skills.",
        });
        return null;
      }
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to use AI features",
        });
        throw new Error('Authentication required');
      }

      console.log("Calling enhance-resume with skills type", { experience });
      const { data, error } = await supabase.functions.invoke('enhance-resume', {
        body: { 
          type: 'skills',
          experience
        }
      });

      if (error) {
        console.error('Error from edge function:', error);
        throw new Error(`Edge function error: ${error.message || error}`);
      }
      
      if (!data || (!data.technical && !data.soft)) {
        console.error("Invalid skill data from AI service:", data);
        throw new Error('Invalid skill data from AI service');
      }
      
      sonnerToast.success("Skills Extracted", {
        description: `Found ${(data.technical?.length || 0) + (data.soft?.length || 0)} skills from your experience.`
      });
      
      return {
        technical: data.technical || [],
        soft: data.soft || []
      };

    } catch (error: any) {
      console.error('Error extracting skills:', error);
      toast({
        title: "Error",
        description: `Failed to extract skills: ${error.message || "Please try again"}`,
        variant: "destructive"
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const improveDescription = async (description: string): Promise<string> => {
    setIsGenerating(true);
    try {
      if (!description || description.trim() === '') {
        toast({
          title: "Missing Content",
          description: "Please add some content before improving.",
        });
        return "";
      }
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to use AI features",
        });
        throw new Error('Authentication required');
      }

      console.log("Calling enhance-resume with improve type", { description: description.slice(0, 50) + '...' });
      const { data, error } = await supabase.functions.invoke('enhance-resume', {
        body: { 
          type: 'improve',
          description
        }
      });

      if (error) {
        console.error('Error from edge function:', error);
        throw new Error(`Edge function error: ${error.message || error}`);
      }
      
      if (!data || !data.improved) {
        console.error("Invalid response from AI service:", data);
        throw new Error('Invalid response from AI service');
      }
      
      sonnerToast.success("Description Improved", {
        description: "Your job description has been enhanced."
      });
      
      return data.improved;

    } catch (error: any) {
      console.error('Error improving description:', error);
      toast({
        title: "Error",
        description: `Failed to improve description: ${error.message || "Please try again"}`,
        variant: "destructive"
      });
      return "";
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generateSummary,
    extractSkills,
    improveDescription
  };
}
