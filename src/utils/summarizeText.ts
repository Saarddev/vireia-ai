
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

    if (error) {
      console.error('Supabase function error:', error);
      toast.error(`Failed to summarize: ${error.message || "Unknown error"}`);
      return text;
    }
    
    let summary = data?.summary || '';
    
    if (!summary || summary.trim() === '') {
      toast.error('AI could not generate a summary. Try with more detailed content.');
      return text;
    }
    
    // Format the text into proper ATS-friendly bullet points
    if (!summary.includes('•') && !summary.includes('-')) {
      const sentences = summary
        .split(/[.!?]\s+/)
        .filter(s => s.trim().length > 0)
        .map(s => {
          // Ensure each bullet point starts with an action verb
          let point = s.trim();
          if (!/^[A-Z][a-z]+ed|^[A-Z][a-z]+ing|^[A-Z][a-z]+s\b/.test(point)) {
            // If it doesn't start with an action verb, try to rephrase it
            point = point.charAt(0).toUpperCase() + point.slice(1);
          }
          return point;
        });
      
      if (sentences.length > 0) {
        summary = sentences.map(s => `• ${s}`).join('\n');
      }
    }
    
    // Clean up and standardize bullet points
    summary = summary
      .replace(/•\s*/g, '• ') // Standardize bullet points
      .replace(/[-*]\s+/g, '• ') // Replace markdown bullets with •
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => line.startsWith('•') ? line : `• ${line}`)
      .join('\n');
    
    // Clean up extra spaces and ensure no double bullets
    summary = summary
      .replace(/•\s+•/g, '•')
      .replace(/^\n+|\n+$/g, '');
    
    console.log('Summarized text:', summary);
    toast.success('Text summarized successfully');
    return summary;
  } catch (error) {
    console.error('Error summarizing text:', error);
    toast.error('Failed to summarize text. Please try again.');
    return text;
  }
};
