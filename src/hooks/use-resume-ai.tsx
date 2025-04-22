
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

export function useResumeAI() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateSummary = async (experience: string[], skills: string[]) => {
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

      if (error) throw error;
      
      toast({
        title: "Summary Generated",
        description: "Your professional summary has been generated."
      });
      
      return data.summary;

    } catch (error) {
      console.error('Error generating summary:', error);
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive"
      });
      return null;
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

      if (error) throw error;
      
      toast({
        title: "Skills Extracted",
        description: `Found ${(data.technical?.length || 0) + (data.soft?.length || 0)} skills from your experience.`
      });
      
      return {
        technical: data.technical || [],
        soft: data.soft || []
      };

    } catch (error) {
      console.error('Error extracting skills:', error);
      toast({
        title: "Error",
        description: "Failed to extract skills. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const improveDescription = async (description: string) => {
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

      if (error) throw error;
      
      toast({
        title: "Description Improved",
        description: "Your job description has been enhanced."
      });
      
      return data.improved;

    } catch (error) {
      console.error('Error improving description:', error);
      toast({
        title: "Error",
        description: "Failed to improve description. Please try again.",
        variant: "destructive"
      });
      return null;
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
