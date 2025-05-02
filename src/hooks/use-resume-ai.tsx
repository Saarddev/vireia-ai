
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

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

      // Generate a cache key based on the input data to prevent duplicate summaries
      const cacheKey = `summary-${JSON.stringify(experience).slice(0, 100)}-${JSON.stringify(skills).slice(0, 50)}`;
      const cachedSummary = localStorage.getItem(cacheKey);
      
      // If we have a cached result and it's not for education, use it
      if (cachedSummary && !cacheKey.toLowerCase().includes('education')) {
        return cachedSummary;
      }

      const { data, error } = await supabase.functions.invoke('enhance-resume', {
        body: { 
          type: 'summary',
          experience,
          skills,
          // Add a parameter to signal we want to preserve user's content
          preserveUserContent: true
        }
      });

      if (error) {
        console.error('Error from edge function:', error);
        throw new Error(`Edge function error: ${error.message || error}`);
      }
      
      if (!data || !data.summary) {
        toast({
          title: "Error",
          description: "No summary generated. Please try again.",
          variant: "destructive"
        });
        throw new Error('Invalid response from AI service');
      }
      
      toast({
        title: "Summary Generated",
        description: "Your professional summary has been generated."
      });
      
      // Don't cache education summaries to prevent duplicates
      if (!cacheKey.toLowerCase().includes('education')) {
        // Cache the result with a unique key based on input data
        localStorage.setItem(cacheKey, data.summary);
      }
      
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

      const { data, error } = await supabase.functions.invoke('enhance-resume', {
        body: { 
          type: 'skills',
          experience,
          preserveUserContent: true
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

      // Generate a unique cache key for each description
      const descriptionHash = description.slice(0, 50);
      const cacheKey = `improve-${descriptionHash}`;
      
      // Check if we have a cached result
      const cachedResult = localStorage.getItem(cacheKey);
      if (cachedResult) {
        return cachedResult;
      }

      const { data, error } = await supabase.functions.invoke('enhance-resume', {
        body: { 
          type: 'improve',
          description,
          preserveUserContent: true
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
      
      // Cache the result
      localStorage.setItem(cacheKey, data.improved);
      
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
