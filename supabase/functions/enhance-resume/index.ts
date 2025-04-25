
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, linkedinData, resumeTemplate, experience, skills, description, educationContext, experienceContext } = await req.json();
    
    let prompt = "";
    let requestType = type || 'full-resume'; // Default to full resume if type isn't specified
    
    if (requestType.startsWith('education-')) {
      prompt = generateEducationPrompt(requestType, educationContext);
    } else if (requestType === "summary") {
      prompt = generateSummaryPrompt(experience, skills);
    } else if (requestType === "skills") {
      prompt = generateSkillsPrompt(experience);
    } else if (requestType === "improve") {
      prompt = generateImprovementPrompt(description);
    } else if (requestType === "experience-description") {
      prompt = generateExperiencePrompt(experienceContext);
    } else {
      // Full resume enhancement
      prompt = generateFullResumePrompt(linkedinData, resumeTemplate || "modern");
    }

    console.log(`Generating ${requestType} with Gemini API`);

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Gemini API error: ${response.status} ${errorData}`);
      throw new Error(`Gemini API error: ${response.status} ${errorData}`);
    }

    const data = await response.json();
    const result = parseGeminiResponse(data, requestType);
    
    console.log(`Successfully generated ${requestType}`);
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in enhance-resume function:', error);
    return new Response(JSON.stringify({ error: error.message || "Unknown error occurred" }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateSummaryPrompt(experience: string[], skills: string[]) {
  return `
As a thoughtful resume writer with empathy for job seekers, help create a warm, engaging professional summary that feels genuinely human. Consider:

1. The real person behind these experiences and their unique journey
2. Their personal blend of skills and how they've applied them
3. The story of their career progression and aspirations
4. Use natural language that resonates with both the person and potential employers

Current experience context:
${experience ? experience.join('\n') : 'Not provided'}

Skills highlight:
${skills ? skills.join(', ') : 'Not provided'}

Write a brief, authentic summary that feels conversational and human while still highlighting professional achievements. Avoid corporate jargon when possible. Show the person behind the professional.

Return only the summary text.`;
}

function generateSkillsPrompt(experience: string[]) {
  return `
Extract technical and soft skills from the following experience, focusing on what makes this person unique:

${experience ? experience.join('\n') : 'Not provided'}

Return as JSON in this format - be specific and include skills that reveal both professional expertise and personal strengths:
{
  "technical": ["skill1", "skill2"],
  "soft": ["skill1", "skill2"]
}`;
}

function generateImprovementPrompt(description: string) {
  return `
As an experienced resume writer who cares about helping people tell their authentic story, enhance this description to be more engaging and impactful:

1. Use warm, natural language that reflects real human experiences and personality
2. Incorporate specific achievements that showcase the person's unique contributions
3. Balance professional accomplishments with hints of personal investment and passion
4. Maintain a confident but humble tone that feels authentic
5. Keep the voice active and engaging while preserving their unique voice

Original description:
${description || 'Not provided'}

Enhance this while keeping it genuine and distinctly human. The result should sound like something the person would actually say about themselves, not generic corporate speak.

Return only the improved description.`;
}

function generateExperiencePrompt(context: any = {}) {
  return `
As an empathetic resume writer, help craft a compelling description for this work experience that feels authentic and human:

Job Title: ${context?.title || 'Not specified'}
Company: ${context?.company || 'Not specified'}
Location: ${context?.location || 'Not specified'}
Duration: ${context?.startDate || 'Not specified'} to ${context?.endDate || 'Present'}

Current description (if any):
${context?.description || ''}

Please create or enhance this description to:
1. Use natural language that feels like how a real person would talk about their work
2. Include specific achievements and metrics when possible
3. Show both professional impact and personal growth
4. Highlight transferable skills and problem-solving abilities
5. Keep it concise but meaningful - around 2-3 sentences
6. Maintain the person's authentic voice and avoid corporate jargon when possible

Return only the description text.`;
}

function generateFullResumePrompt(linkedinData: any, template: string = 'modern') {
  // Ensure linkedinData is valid
  if (!linkedinData) {
    linkedinData = {};
  }
  
  return `
You are creating a natural-sounding, professional resume that feels genuinely human.

Requirements:
1. Use warm, conversational language
2. Include specific achievements and metrics
3. Focus on impact and value rather than just responsibilities
4. Balance professionalism with personality
5. Avoid generic corporate language
6. Highlight relevant skills that tell a story

LinkedIn Data:
${JSON.stringify(linkedinData, null, 2)}

Return only a valid JSON resume with the following structure:
{
  "personal": {
    "name": "",
    "title": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "summary": "",
  "experience": [
    {
      "id": "exp1",
      "title": "",
      "company": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "description": ""
    }
  ],
  "education": [
    {
      "id": "edu1",
      "institution": "",
      "degree": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "description": ""
    }
  ],
  "skills": {
    "technical": [],
    "soft": []
  },
  "languages": [],
  "certifications": [],
  "projects": []
}`;
}

function generateEducationPrompt(type: string, context: any = {}) {
  const field = type.replace('education-', '');
  
  switch (field) {
    case 'degree':
      return `Generate an academic degree name based on this context:
- Institution: ${context?.institution || 'Not specified'}
- Field: ${context?.field || 'Not specified'}
- Level: ${context?.level || "Bachelor's"}

Requirements:
1. Be specific and formal
2. Use standard degree nomenclature
3. Include concentration if relevant
4. Be concise but complete

Return only the degree name.`;

    case 'institution':
      return `Suggest a prestigious educational institution name based on this context:
- Degree: ${context?.degree || 'Not specified'}
- Location: ${context?.location || 'Not specified'}
- Field: ${context?.field || 'Not specified'}

Requirements:
1. Use the official institution name
2. Be accurate and specific
3. Include location if part of the name
4. Focus on well-known institutions

Return only the institution name.`;

    case 'description':
      return `Write a warm, personal academic description based on this educational experience:
- Degree: ${context?.degree || 'Not specified'}
- Institution: ${context?.institution || 'Not specified'}
- Field: ${context?.field || 'Not specified'}

Create a description that:
1. Highlights key achievements in a natural way
2. Mentions relevant coursework that shows passion or interest
3. Includes honors or awards with personal context
4. Adds a touch of personality to the academic experience
5. Is specific but conversational
6. Keeps to 2-3 lines while remaining engaging
7. Shows the human behind the degree

Return only the description.`;

    case 'dates':
      return `Generate education dates based on:
- Degree Level: ${context?.degree || "Bachelor's"}
- Current Status: ${context?.status || 'Graduated'}

Requirements:
1. Use MM YYYY format
2. Be realistic for the degree type
3. Consider typical duration
4. If recent, use current year

Return in format: "MM YYYY - MM YYYY"`;

    default:
      return "";
  }
}

function parseGeminiResponse(response: any, type: string) {
  if (!response?.candidates?.[0]?.content?.parts?.[0]?.text) {
    throw new Error('Invalid response format from Gemini API');
  }
  
  const text = response.candidates[0].content.parts[0].text;
  
  try {
    if (type === "experience-description") {
      return { description: text.trim() };
    }
    
    if (type.startsWith('education-')) {
      const field = type.replace('education-', '');
      if (field === 'dates') {
        const [startDate, endDate] = text.trim().split(' - ');
        return { startDate, endDate };
      }
      return { [field]: text.trim() };
    }
    
    if (type === "summary" || type === "improve") {
      return { [type === "summary" ? "summary" : "improved"]: text.trim() };
    }
    
    if (type === "skills") {
      const skillsMatch = text.match(/\{[\s\S]*\}/);
      if (skillsMatch) {
        return JSON.parse(skillsMatch[0]);
      }
      throw new Error('No valid JSON found in skills response');
    }
    
    // For full resume enhancement
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedResume = JSON.parse(jsonMatch[0]);
      
      // Ensure projects array exists
      if (!parsedResume.projects) {
        parsedResume.projects = [];
      }
      
      return { enhancedResume: parsedResume };
    }
    
    throw new Error('No valid JSON found in response');
  } catch (error) {
    console.error('Error parsing Gemini response:', error);
    throw new Error('Failed to parse the AI-generated data');
  }
}
