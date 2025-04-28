
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const summarizeText = async (text: string): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('enhance-resume', {
      body: {
        type: 'summarize',
        text
      }
    });

    if (error) throw error;
    
    // Process the summary to ensure proper bullet point formatting
    let summary = data?.summary || '';
    
    // If the summary doesn't contain line breaks but has bullet points, format them
    if (summary) {
      // If there are no line breaks but has bullet points or dashes
      if (!summary.includes('\n') && (summary.includes('•') || /[-*]\s/.test(summary))) {
        // Replace bullet points or dashes followed by a space with newline and bullet
        summary = summary.replace(/[•-]\s*/g, '\n• ').trim();
        if (!summary.startsWith('•') && !summary.startsWith('\n')) {
          summary = '• ' + summary;
        }
      }
      
      // Clean up any markdown bullet points
      summary = summary.replace(/^\s*[-*]\s+/gm, '• ');
      
      // Make sure each bullet point is on a new line
      summary = summary.split('\n').map(line => 
        line.trim().startsWith('•') ? line.trim() : (line.trim() ? '• ' + line.trim() : line)
      ).join('\n');
      
      // Remove any extra newlines at beginning
      summary = summary.replace(/^\n+/, '');
    }
    
    return summary;
  } catch (error) {
    console.error('Error summarizing text:', error);
    toast.error('Failed to summarize text. Please try again.');
    return '';
  }
};

