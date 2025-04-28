
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const summarizeText = async (text: string): Promise<string> => {
  try {
    if (!text || text.trim() === '') {
      toast.error('No content to summarize. Please add some text first.');
      return '';
    }

    const { data, error } = await supabase.functions.invoke('enhance-resume', {
      body: {
        type: 'summarize',
        text
      }
    });

    if (error) throw error;
    
    // Process the summary to ensure proper bullet point formatting
    let summary = data?.summary || '';
    
    if (!summary || summary.trim() === '') {
      toast.error('AI could not generate a summary. Try with more detailed content.');
      return text;
    }
    
    // Make sure we have a response from AI before proceeding
    if (!summary.includes('•') && !summary.includes('-')) {
      // If the response doesn't have any bullet points, let's format it into bullet points
      const sentences = summary.split(/[.!?]\s+/).filter(s => s.trim().length > 0);
      if (sentences.length > 0) {
        summary = sentences.map(s => `• ${s.trim()}`).join('\n');
      }
    }
    
    // Clean up the format to ensure each bullet point is properly displayed
    summary = summary
      .replace(/•\s*/g, '• ') // Standardize bullet points
      .replace(/[-*]\s+/g, '• ') // Replace markdown bullets with •
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0) // Remove empty lines
      .map(line => line.startsWith('•') ? line : `• ${line}`) // Ensure each line starts with a bullet
      .join('\n');
      
    // Clean up extra spaces and ensure no double bullets
    summary = summary.replace(/•\s+•/g, '•');
    
    // Remove any extra newlines at beginning and end
    summary = summary.replace(/^\n+|\n+$/g, '');
    
    return summary;
  } catch (error) {
    console.error('Error summarizing text:', error);
    toast.error('Failed to summarize text. Please try again.');
    return '';
  }
};
