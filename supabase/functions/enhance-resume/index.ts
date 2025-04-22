
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
    const { type, linkedinData, resumeTemplate, experience, skills, description } = await req.json();
    
    let prompt = "";
    
    if (type === "summary") {
      prompt = generateSummaryPrompt(experience, skills);
    } else if (type === "skills") {
      prompt = generateSkillsPrompt(experience);
    } else if (type === "improve") {
      prompt = generateImprovementPrompt(description);
    } else {
      prompt = generateFullResumePrompt(linkedinData, resumeTemplate);
    }

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
      throw new Error(`Gemini API error: ${response.status} ${errorData}`);
    }

    const data = await response.json();
    const result = parseGeminiResponse(data, type);
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateSummaryPrompt(experience: string[], skills: string[]) {
  return `
Generate a concise, professional summary for a resume. Be brief and direct:
1. Use 2-3 sentences maximum
2. Include quantifiable achievements
3. Use clear, factual language without fluff
4. Focus on impact and concrete skills
5. No flowery language or vague claims

Experience context:
${experience.join('\n')}

Skills context:
${skills.join(', ')}

Return only the summary text.`;
}

function generateSkillsPrompt(experience: string[]) {
  return `
Extract technical and soft skills from the following experience:

${experience.join('\n')}

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
${description}

Return only the improved description.`;
}

function generateFullResumePrompt(linkedinData: any, template: string = 'modern') {
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

Return only a valid JSON resume:
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
      "field": "",
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

function parseGeminiResponse(response: any, type: string) {
  const text = response.candidates[0].content.parts[0].text;
  
  try {
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
    
    // For full resume
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return { enhancedResume: JSON.parse(jsonMatch[0]) };
    }
    
    throw new Error('No valid JSON found in response');
  } catch (error) {
    console.error('Error parsing Gemini response:', error);
    throw new Error('Failed to parse the AI-generated data');
  }
}
