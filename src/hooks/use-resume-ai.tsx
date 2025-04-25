
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

export function useResumeAI() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateSummary = async (experience: string[], skills: string[]): Promise<string> => {
    setIsGenerating(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Authentication required');

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
        throw new Error('Invalid response from AI service');
      }
      
      toast({
        title: "Summary Generated",
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
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Authentication required');

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
      
      toast({
        title: "Skills Extracted",
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
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Authentication required');

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
      
      toast({
        title: "Description Improved",
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
