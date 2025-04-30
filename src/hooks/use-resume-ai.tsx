
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useResumeAI() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast: uiToast } = useToast();

  const generateSummary = async (experience: string[], skills: string[]): Promise<string> => {
    setIsGenerating(true);
    try {
      // Validate input data
      if (!Array.isArray(experience) || experience.length === 0) {
        uiToast({
          title: "Missing Experience",
          description: "Please add some work experience before generating a summary.",
        });
        return "";
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        uiToast({
          title: "Authentication Required",
          description: "Please sign in to use AI features",
        });
        throw new Error('Authentication required');
      }

      console.log('Calling edge function with experience:', experience.length, 'items');
      console.log('Skills data:', skills);

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
        console.error('Invalid data from edge function:', data);
        uiToast({
          title: "Error",
          description: "No summary generated. Please try again.",
          variant: "destructive"
        });
        throw new Error('Invalid response from AI service');
      }
      
      const summary = data.summary.trim();

      // Format as bullet points if not already
      let formattedSummary = summary;
      if (!formattedSummary.includes('•') && !formattedSummary.includes('-')) {
        const sentences = formattedSummary
          .split(/[.!?]\s+/)
          .filter(s => s.trim().length > 0)
          .map(s => `• ${s.trim()}`);
        formattedSummary = sentences.join('\n');
      }

      toast.success('Professional summary generated');
      
      return formattedSummary;

    } catch (error: any) {
      console.error('Error generating summary:', error);
      uiToast({
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
        uiToast({
          title: "Missing Experience",
          description: "Please add some work experience before extracting skills.",
        });
        return null;
      }
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        uiToast({
          title: "Authentication Required",
          description: "Please sign in to use AI features",
        });
        throw new Error('Authentication required');
      }

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
        throw new Error('Invalid skill data from AI service');
      }
      
      toast.success(`Found ${(data.technical?.length || 0) + (data.soft?.length || 0)} skills from your experience`);
      
      return {
        technical: data.technical || [],
        soft: data.soft || []
      };

    } catch (error: any) {
      console.error('Error extracting skills:', error);
      uiToast({
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
        uiToast({
          title: "Missing Content",
          description: "Please add some content before improving.",
        });
        return "";
      }
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        uiToast({
          title: "Authentication Required",
          description: "Please sign in to use AI features",
        });
        throw new Error('Authentication required');
      }

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
        throw new Error('Invalid response from AI service');
      }
      
      toast.success('Description enhanced successfully');
      
      return data.improved;

    } catch (error: any) {
      console.error('Error improving description:', error);
      uiToast({
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
