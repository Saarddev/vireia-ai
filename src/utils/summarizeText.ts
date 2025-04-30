
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';

/**
 * Summarizes a text using AI through the Supabase Edge Function
 * @param text The text to summarize
 * @returns The summarized text or null if the operation failed
 */
export const summarizeText = async (text: string): Promise<string | null> => {
  try {
    if (!text || text.trim().length < 30) {
      toast.error("Text is too short to summarize");
      return null;
    }
    
    // Log the request to help debug
    console.log('Summarizing text with length:', text.length);
    
    const { data, error } = await supabase.functions.invoke('enhance-resume', {
      body: { 
        type: 'summarize',
        text: text.trim()
      }
    });

    if (error) {
      console.error('Error from edge function:', error);
      toast.error(`Summarization failed: ${error.message || "Unknown error"}`);
      return null;
    }
    
    if (!data || !data.summary) {
      console.error('Invalid response format from edge function:', data);
      toast.error("Received invalid response format");
      return null;
    }
    
    return data.summary;
  } catch (error: any) {
    console.error('Error summarizing text:', error);
    toast.error(`Failed to summarize: ${error.message || "Unknown error"}`);
    return null;
  }
};
