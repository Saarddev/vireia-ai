
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches LinkedIn data from the user profile
 * @param userId The user ID to fetch LinkedIn data for
 * @returns The LinkedIn data or null if not found
 */
export const fetchLinkedInDataFromProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('linkedin_data')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    
    return data?.linkedin_data;
  } catch (error) {
    console.error('Error fetching LinkedIn data from profile:', error);
    return null;
  }
};

/**
 * Enhances a resume with AI using LinkedIn data
 * @param linkedinData The LinkedIn profile data
 * @param template The resume template name
 * @returns An enhanced resume object
 */
export const enhanceResumeWithAI = async (linkedinData: any, template: string = 'modern') => {
  try {
    if (!linkedinData) {
      throw new Error('LinkedIn data is required');
    }

    console.log('Enhancing resume with AI...');
    const response = await supabase.functions.invoke('enhance-resume', {
      body: { 
        linkedinData, 
        resumeTemplate: template,
        type: 'full-resume'
      }
    });

    if (response.error) {
      console.error('Edge function error:', response.error);
      throw new Error(`Function error: ${response.error}`);
    }

    if (!response.data?.enhancedResume) {
      console.error('Missing enhancedResume in response:', response.data);
      throw new Error('Invalid response from AI enhancement');
    }

    // Ensure projects array exists
    if (!response.data.enhancedResume.projects) {
      response.data.enhancedResume.projects = [];
    }

    return response.data.enhancedResume;
  } catch (error) {
    console.error('Error enhancing resume with AI:', error);
    throw error;
  }
};

/**
 * Creates an enhanced resume in the database
 * @param userId The user ID
 * @param resumeTitle The title of the resume
 * @returns The created resume
 */
export const createEnhancedResume = async (userId: string, resumeTitle: string) => {
  try {
    // 1. Fetch LinkedIn data from the user's profile
    const linkedinData = await fetchLinkedInDataFromProfile(userId);
    
    if (!linkedinData) {
      throw new Error('No LinkedIn data found for this user');
    }
    
    // 2. Use AI to enhance the resume
    const enhancedResume = await enhanceResumeWithAI(linkedinData);
    
    // 3. Create the resume in the database
    const { data: resume, error } = await supabase
      .from('resumes')
      .insert({
        title: resumeTitle,
        content: enhancedResume,
        template: 'modern',
        user_id: userId,
        settings: {
          fontFamily: "Inter",
          fontSize: 10,
          primaryColor: "#9b87f5",
          secondaryColor: "#6E59A5",
          accentColor: "#D6BCFA",
          paperSize: "a4",
          margins: "normal"
        }
      })
      .select()
      .single();
      
    if (error) throw error;
    
    return resume;
  } catch (error) {
    console.error('Error creating enhanced resume:', error);
    throw error;
  }
};
