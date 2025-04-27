
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
    
    // If the summary doesn't contain line breaks, add them for each bullet point
    if (summary && !summary.includes('\n')) {
      summary = summary.replace(/•\s*/g, '\n• ').trim();
      if (!summary.startsWith('•')) {
        summary = '• ' + summary;
      }
    }
    
    return summary;
  } catch (error) {
    console.error('Error summarizing text:', error);
    toast.error('Failed to summarize text. Please try again.');
    return '';
  }
};
