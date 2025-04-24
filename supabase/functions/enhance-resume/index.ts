
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
    const { type, linkedinData, resumeTemplate, experience, skills, description, educationContext } = await req.json();
    
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
Generate a concise, professional summary for a resume. Be brief, ATS friendly:
1. Use 2-3 sentences maximum
2. Include quantifiable achievements
3. Use clear, factual language without fluff
4. Focus on impact and concrete skills
5. Humanize the summary, avoid generic phrases

Experience context:
${experience ? experience.join('\n') : 'Not provided'}

Skills context:
${skills ? skills.join(', ') : 'Not provided'}

Return only the summary text.`;
}

function generateSkillsPrompt(experience: string[]) {
  return `
Extract technical and soft skills from the following experience:

${experience ? experience.join('\n') : 'Not provided'}

Return as JSON in this format - be concise and specific:
{
  "technical": ["skill1", "skill2"],
  "soft": ["skill1", "skill2"]
}`;
}

function generateImprovementPrompt(description: string) {
  return `
Improve this job description to be more concise and achievement-focused:
1. Use strong action verbs
2. Add specific metrics and numbers
3. Be brief and to the point
4. Remove any fluffy language
5. Focus only on accomplishments and skills

Original description:
${description || 'Not provided'}

Return only the improved description.`;
}

function generateFullResumePrompt(linkedinData: any, template: string = 'modern') {
  // Ensure linkedinData is valid
  if (!linkedinData) {
    linkedinData = {};
  }
  
  return `
You are creating a precise, professional resume.

Requirements:
1. Be concise and direct
2. Use numbers and metrics
3. Focus on achievements, not responsibilities
4. Use simple, clear language
5. No fluffy or generic statements
6. Focus on relevant skills only

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
      return `Write an academic description based on this context:
- Degree: ${context?.degree || 'Not specified'}
- Institution: ${context?.institution || 'Not specified'}
- Field: ${context?.field || 'Not specified'}

Requirements:
1. Highlight key achievements
2. Mention relevant coursework
3. Include GPA if noteworthy
4. List honors or awards
5. Be specific and quantifiable
6. Keep it to 2-3 lines
7. Focus on relevant skills and knowledge gained

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
