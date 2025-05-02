
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
      throw error;
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
    
    // Clean up and standardize bullet points - making sure not to duplicate them
    summary = summary
      .replace(/•\s*/g, '• ') // Standardize bullet points
      .replace(/[-*]\s+/g, '• ') // Replace markdown bullets with •
      .replace(/\n+/g, '\n') // Remove extra line breaks
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => line.startsWith('•') ? line : `• ${line}`)
      .join('\n');
    
    // Ensure we have proper spacing around bullet points for display
    summary = summary
      .replace(/•\s+•/g, '•')
      .replace(/^\n+|\n+$/g, '')
      .replace(/([.!?])\s*(?=•)/g, '$1\n'); // Add newline before bullet points
    
    console.log('Summarized text:', summary);
    return summary;
  } catch (error) {
    console.error('Error summarizing text:', error);
    toast.error('Failed to summarize text. Please try again.');
    return text;
  }
};

// ATS scan function
export const scanResumeWithATS = async (resumeData: any): Promise<any> => {
  try {
    // Extract all relevant text from resume sections
    const resumeText = extractResumeText(resumeData);
    
    if (!resumeText || resumeText.trim() === '') {
      toast.error('No resume content to analyze. Please add some content first.');
      return null;
    }

    toast.loading('Analyzing your resume with ATS scanner...');

    const { data, error } = await supabase.functions.invoke('enhance-resume', {
      body: {
        type: 'ats-scan',
        text: resumeText
      }
    });

    toast.dismiss();

    if (error) {
      console.error('Supabase function error:', error);
      toast.error('Failed to analyze resume with ATS. Please try again.');
      throw error;
    }
    
    if (!data) {
      toast.error('AI could not analyze your resume. Please try again later.');
      return null;
    }
    
    console.log('ATS scan results:', data);
    toast.success('ATS analysis complete!');
    return data;
  } catch (error) {
    console.error('Error scanning resume with ATS:', error);
    toast.error('Failed to analyze resume with ATS. Please try again.');
    return null;
  }
};

// Helper function to extract all text from resume data
const extractResumeText = (resumeData: any): string => {
  const textParts: string[] = [];
  
  // Extract personal info
  if (resumeData.personal) {
    const { name, title, email, phone, location, linkedin, website } = resumeData.personal;
    if (name) textParts.push(`Name: ${name}`);
    if (title) textParts.push(`Title: ${title}`);
    if (email) textParts.push(`Email: ${email}`);
    if (phone) textParts.push(`Phone: ${phone}`);
    if (location) textParts.push(`Location: ${location}`);
    if (linkedin) textParts.push(`LinkedIn: ${linkedin}`);
    if (website) textParts.push(`Website: ${website}`);
  }
  
  // Extract summary
  if (resumeData.summary) {
    textParts.push('Summary:');
    textParts.push(resumeData.summary);
  }
  
  // Extract experience
  if (Array.isArray(resumeData.experience) && resumeData.experience.length > 0) {
    textParts.push('Experience:');
    resumeData.experience.forEach((exp: any) => {
      if (exp.title) textParts.push(`Title: ${exp.title}`);
      if (exp.company) textParts.push(`Company: ${exp.company}`);
      if (exp.location) textParts.push(`Location: ${exp.location}`);
      if (exp.startDate && exp.endDate) textParts.push(`Duration: ${exp.startDate} - ${exp.endDate}`);
      if (exp.description) textParts.push(exp.description);
    });
  }
  
  // Extract education
  if (Array.isArray(resumeData.education) && resumeData.education.length > 0) {
    textParts.push('Education:');
    resumeData.education.forEach((edu: any) => {
      if (edu.institution) textParts.push(`Institution: ${edu.institution}`);
      if (edu.degree) textParts.push(`Degree: ${edu.degree}`);
      if (edu.field) textParts.push(`Field: ${edu.field}`);
      if (edu.location) textParts.push(`Location: ${edu.location}`);
      if (edu.startDate && edu.endDate) textParts.push(`Duration: ${edu.startDate} - ${edu.endDate}`);
      if (edu.description) textParts.push(edu.description);
    });
  }
  
  // Extract skills
  if (resumeData.skills) {
    textParts.push('Skills:');
    if (Array.isArray(resumeData.skills.technical)) {
      textParts.push(`Technical Skills: ${resumeData.skills.technical.join(', ')}`);
    }
    if (Array.isArray(resumeData.skills.soft)) {
      textParts.push(`Soft Skills: ${resumeData.skills.soft.join(', ')}`);
    }
  }
  
  // Extract projects
  if (Array.isArray(resumeData.projects) && resumeData.projects.length > 0) {
    textParts.push('Projects:');
    resumeData.projects.forEach((proj: any) => {
      if (proj.title) textParts.push(`Project: ${proj.title}`);
      if (proj.description) textParts.push(proj.description);
      if (Array.isArray(proj.technologies)) {
        textParts.push(`Technologies: ${proj.technologies.join(', ')}`);
      }
    });
  }
  
  return textParts.join('\n\n');
};
