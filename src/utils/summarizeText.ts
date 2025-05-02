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
        // Limit to 3 bullet points for summary sections
        summary = sentences.slice(0, 3).map(s => `• ${s}`).join('\n');
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
      // Limit to 3 bullet points for summary
      .slice(0, 3)
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

    toast.loading('Optimizing your resume for ATS systems...');

    const { data, error } = await supabase.functions.invoke('enhance-resume', {
      body: {
        type: 'ats-scan',
        text: resumeText,
        plainText: resumeData.plainTextVersion || ''
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
    
    // Process and enhance the ATS results
    const enhancedResults = enhanceATSResults(data, resumeData);
    
    console.log('Enhanced ATS scan results:', enhancedResults);
    toast.success('ATS optimization complete!');
    return enhancedResults;
  } catch (error) {
    console.error('Error scanning resume with ATS:', error);
    toast.error('Failed to analyze resume with ATS. Please try again.');
    return null;
  }
};

// Function to enhance and optimize ATS results
const enhanceATSResults = (data: any, resumeData: any): any => {
  // Start with the original data
  let enhancedData = { ...data };
  
  // Ensure we have arrays for strengths, improvements and keywords
  enhancedData.strengths = Array.isArray(data.strengths) ? data.strengths : [];
  enhancedData.improvements = Array.isArray(data.improvements) ? data.improvements : [];
  enhancedData.keywords = Array.isArray(data.keywords) ? data.keywords : [];
  
  // Deduplicate and clean up strengths
  enhancedData.strengths = [...new Set(enhancedData.strengths)]
    .filter(strength => typeof strength === 'string' && strength.trim().length > 0)
    .map(strength => {
      let str = strength.toString().trim();
      // Ensure it starts with a capital letter
      return str.charAt(0).toUpperCase() + str.slice(1);
    });
  
  // Deduplicate and clean up improvements
  enhancedData.improvements = [...new Set(enhancedData.improvements)]
    .filter(improvement => typeof improvement === 'string' && improvement.trim().length > 0)
    .map(improvement => {
      let imp = improvement.toString().trim();
      // Ensure it starts with a capital letter
      return imp.charAt(0).toUpperCase() + imp.slice(1);
    });
  
  // Deduplicate and sort keywords by relevance
  enhancedData.keywords = [...new Set(enhancedData.keywords)]
    .filter(keyword => typeof keyword === 'string' && keyword.trim().length > 0)
    .sort((a, b) => {
      // Prioritize keywords that appear in the resume
      const aInResume = resumeData.plainTextVersion?.toLowerCase().includes(a.toLowerCase()) ? 1 : 0;
      const bInResume = resumeData.plainTextVersion?.toLowerCase().includes(b.toLowerCase()) ? 1 : 0;
      return bInResume - aInResume;
    });
  
  // Ensure we have reasonable metrics
  if (!Array.isArray(enhancedData.metrics) || enhancedData.metrics.length === 0) {
    enhancedData.metrics = [
      { name: "Content Quality", score: calculateMetricScore(resumeData, "content") },
      { name: "ATS Compatibility", score: calculateMetricScore(resumeData, "ats") },
      { name: "Keyword Optimization", score: calculateMetricScore(resumeData, "keywords") },
      { name: "Impact Statements", score: calculateMetricScore(resumeData, "impact") }
    ];
  }
  
  // Calculate overall score if not provided
  if (!enhancedData.score || isNaN(enhancedData.score)) {
    enhancedData.score = Math.round(
      enhancedData.metrics.reduce((acc: number, metric: any) => acc + metric.score, 0) / 
      enhancedData.metrics.length
    );
  }
  
  return enhancedData;
};

// Helper function to calculate metric scores based on the resume content
const calculateMetricScore = (resumeData: any, metricType: string): number => {
  switch (metricType) {
    case "content":
      // Check for comprehensive content
      return calculateContentQualityScore(resumeData);
    case "ats":
      // Check for ATS-friendly formatting
      return calculateATSCompatibilityScore(resumeData);
    case "keywords":
      // Check for industry-relevant keywords
      return calculateKeywordScore(resumeData);
    case "impact":
      // Check for quantifiable achievements
      return calculateImpactScore(resumeData);
    default:
      return 70; // Default baseline score
  }
};

const calculateContentQualityScore = (resumeData: any): number => {
  let score = 70; // Start with a baseline score
  
  // Check for comprehensive sections
  if (resumeData.personal && Object.keys(resumeData.personal).length > 3) score += 5;
  if (resumeData.summary && resumeData.summary.length > 50) score += 5;
  if (Array.isArray(resumeData.experience) && resumeData.experience.length > 0) score += 5;
  if (Array.isArray(resumeData.education) && resumeData.education.length > 0) score += 5;
  if (resumeData.skills && 
     (Array.isArray(resumeData.skills.technical) || Array.isArray(resumeData.skills.soft))) score += 5;
  
  // Check for detailed descriptions
  const hasDetailedExperience = Array.isArray(resumeData.experience) && 
    resumeData.experience.some((exp: any) => exp.description && exp.description.length > 100);
  if (hasDetailedExperience) score += 5;
  
  return Math.min(score, 100); // Cap at 100
};

const calculateATSCompatibilityScore = (resumeData: any): number => {
  let score = 75; // Start with a decent baseline score for ATS
  
  // Check for ATS-friendly structure
  if (resumeData.plainTextVersion) score += 10;
  
  // Check for standard section headers
  const textToCheck = resumeData.plainTextVersion || JSON.stringify(resumeData);
  const standardHeaders = ['EXPERIENCE', 'EDUCATION', 'SKILLS', 'SUMMARY'];
  const hasHeaders = standardHeaders.every(header => 
    textToCheck.includes(header) || textToCheck.includes(header.toLowerCase())
  );
  if (hasHeaders) score += 5;
  
  // Check for clean formatting (no tables, columns, etc.)
  if (resumeData.plainTextVersion && 
      !resumeData.plainTextVersion.includes('|') && 
      !resumeData.plainTextVersion.includes('===')) {
    score += 5;
  }
  
  return Math.min(score, 100); // Cap at 100
};

const calculateKeywordScore = (resumeData: any): number => {
  let score = 65; // Start with a moderate baseline score
  
  // Check for technical skills
  if (resumeData.skills && 
      Array.isArray(resumeData.skills.technical) && 
      resumeData.skills.technical.length > 5) {
    score += 10;
  }
  
  // Check for soft skills
  if (resumeData.skills && 
      Array.isArray(resumeData.skills.soft) && 
      resumeData.skills.soft.length > 3) {
    score += 5;
  }
  
  // Check for industry keywords in experience
  const textToCheck = resumeData.plainTextVersion || JSON.stringify(resumeData);
  const industryKeywords = ['managed', 'developed', 'created', 'implemented', 'led', 'analyzed'];
  const keywordCount = industryKeywords.filter(keyword => 
    textToCheck.toLowerCase().includes(keyword)
  ).length;
  
  score += keywordCount * 3; // Add points for each industry keyword
  
  return Math.min(score, 100); // Cap at 100
};

const calculateImpactScore = (resumeData: any): number => {
  let score = 60; // Start with a lower baseline score for impact statements
  
  // Check for quantifiable achievements
  const textToCheck = resumeData.plainTextVersion || JSON.stringify(resumeData);
  const hasNumbers = /\d+%|\d+ percent|\d+ million|\d+k|\$\d+|\d+ users/i.test(textToCheck);
  if (hasNumbers) score += 15;
  
  // Check for impact verbs
  const impactVerbs = ['increased', 'decreased', 'improved', 'reduced', 'saved', 'generated'];
  const impactVerbCount = impactVerbs.filter(verb => 
    textToCheck.toLowerCase().includes(verb)
  ).length;
  
  score += impactVerbCount * 4; // Add points for each impact verb
  
  return Math.min(score, 100); // Cap at 100
};

// Helper function to extract all text from resume data
const extractResumeText = (resumeData: any): string => {
  const textParts: string[] = [];
  
  // If we already have a plain text version, use it
  if (resumeData.plainTextVersion) {
    return resumeData.plainTextVersion;
  }
  
  // Otherwise extract from structure
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
  
  // Extract summary - limit to 3 bullet points
  if (resumeData.summary) {
    textParts.push('SUMMARY:');
    const summaryPoints = resumeData.summary.split('\n')
      .filter((line: string) => line.trim())
      .slice(0, 3); // Strict limit to 3 bullet points
    textParts.push(summaryPoints.join('\n'));
  }
  
  // Extract experience
  if (Array.isArray(resumeData.experience) && resumeData.experience.length > 0) {
    textParts.push('EXPERIENCE:');
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
    textParts.push('EDUCATION:');
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
    textParts.push('SKILLS:');
    if (Array.isArray(resumeData.skills.technical)) {
      textParts.push(`Technical Skills: ${resumeData.skills.technical.join(', ')}`);
    }
    if (Array.isArray(resumeData.skills.soft)) {
      textParts.push(`Soft Skills: ${resumeData.skills.soft.join(', ')}`);
    }
  }
  
  // Extract projects
  if (Array.isArray(resumeData.projects) && resumeData.projects.length > 0) {
    textParts.push('PROJECTS:');
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
