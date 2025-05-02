
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ResumeData } from '@/types/resume';

export interface ATSScanResult {
  score: number;
  feedback: string[];
  improvements: string[];
  keywordMatch: {
    found: string[];
    missing: string[];
    score: number;
  };
  formatScore: number;
  contentScore: number;
  overallScore: number;
}

/**
 * Scans a resume against ATS algorithms and provides feedback
 * @param resume The resume data to scan
 * @param jobDescription Optional job description to match against
 */
export const scanResumeWithATS = async (
  resume: ResumeData,
  jobDescription?: string
): Promise<ATSScanResult> => {
  try {
    const { data, error } = await supabase.functions.invoke('enhance-resume', {
      body: {
        type: 'ats-scan',
        resume,
        jobDescription
      }
    });

    if (error) {
      console.error('ATS scan error:', error);
      toast.error('Failed to analyze resume with ATS scanner');
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error during ATS scan:', error);
    toast.error('An error occurred while analyzing your resume');
    throw error;
  }
};

/**
 * Optimizes a resume based on ATS analysis and job description
 * @param resume The resume data to optimize
 * @param jobDescription The job description to optimize against
 */
export const optimizeResumeForATS = async (
  resume: ResumeData,
  jobDescription: string
): Promise<{
  optimizedResume: ResumeData;
  changes: { section: string; before: string; after: string }[];
}> => {
  try {
    const { data, error } = await supabase.functions.invoke('enhance-resume', {
      body: {
        type: 'ats-optimize',
        resume,
        jobDescription
      }
    });

    if (error) {
      console.error('ATS optimization error:', error);
      toast.error('Failed to optimize resume for ATS');
      throw error;
    }

    return {
      optimizedResume: data.optimizedResume,
      changes: data.changes
    };
  } catch (error) {
    console.error('Error during ATS optimization:', error);
    toast.error('An error occurred while optimizing your resume');
    throw error;
  }
};
