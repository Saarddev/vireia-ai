
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function generateSummarizationPrompt(text: string) {
  return `
Convert the following text into clear, concise bullet points that highlight key achievements and skills. Make each point:
- Start with an action verb
- Be concise and impactful (1-2 lines each)
- Include specific achievements with measurable results when possible
- Focus on the most relevant information
- Be ATS-friendly for resume scanning

Original text:
${text}

Return ONLY a clean list of 3-6 bullet points, each starting with "• " (bullet symbol followed by a space), with one bullet point per line. 
Do not include any other text, explanations, or formatting in your response. Just the bullet points.`;
}

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

function generateTailorResumePrompt(resumeData: any, jobDescription: string) {
  return `
As an experienced resume tailoring expert, optimize the following resume to match this specific job description:

JOB DESCRIPTION:
${jobDescription || 'Not provided'}

CURRENT RESUME DATA:
${JSON.stringify(resumeData, null, 2)}

Your task:
1. Identify key skills and qualifications from the job description
2. Rewrite and reorganize resume content to highlight relevant experience
3. Use ATS-friendly keywords and formatting
4. Ensure bullet points start with strong action verbs
5. Include specific achievements that match job requirements
6. Keep the tailored resume authentic to the person's experience (no fabrication)
7. Prioritize skills and experience most relevant to this position

Return a complete JSON with the same structure as the input resume, but with optimized content.
The JSON should follow this exact structure:
{
  "personal": { same structure as input },
  "summary": "tailored summary",
  "experience": [ array with tailored descriptions ],
  "education": [ same structure as input ],
  "skills": { optimized skills that match job requirements },
  "languages": [ same as input ],
  "certifications": [ same as input ],
  "projects": [ tailored if relevant or same as input ]
}

IMPORTANT: Return ONLY valid JSON with no markdown formatting or explanatory text.`;
}

function parseGeminiResponse(response: any, type: string) {
  console.log("Parsing Gemini response for type:", type);
  console.log("Response status:", response.status);
  
  if (!response?.candidates?.[0]?.content?.parts?.[0]?.text) {
    console.error("Invalid response format:", JSON.stringify(response));
    throw new Error('Invalid response format from Gemini API');
  }
  
  const text = response.candidates[0].content.parts[0].text;
  console.log("Got text response of length:", text.length);
  
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
    
    if (type === "summarize") {
      // Convert text to bullet points if it's not already
      let summary = text.trim();
      
      // If there are no bullet points in the response, format as bullet points
      if (!summary.includes('•') && !summary.includes('-')) {
        const sentences = summary
          .split(/[.!?]\s+/)
          .filter(line => line.trim().length > 0)
          .map(line => line.trim())
          .filter(line => line.length > 0);
        
        summary = sentences.map(line => `• ${line}`).join('\n');
      } else {
        // If bullet points exist but need formatting
        summary = summary
          .replace(/[-*]\s+/g, '• ') // Replace markdown bullets with •
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0) // Remove empty lines
          .map(line => line.startsWith('•') ? line : `• ${line}`) // Ensure each line starts with a bullet
          .join('\n');
      }
      
      console.log('Formatted summary:', summary);
      return { summary };
    }
    
    if (type === "skills") {
      // Look for JSON pattern in the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (e) {
          console.error("Failed to parse skills JSON:", jsonMatch[0]);
          throw new Error('Invalid JSON format in skills response');
        }
      }
      throw new Error('No valid JSON found in skills response');
    }
    
    if (type === "tailor-resume") {
      // Extract JSON from the response - the AI might wrap it in code blocks or add explanatory text
      const jsonMatch = text.match(/(\{[\s\S]*\})/);
      if (jsonMatch) {
        try {
          const tailoredResume = JSON.parse(jsonMatch[1]);
          console.log("Successfully parsed tailored resume");
          return { tailoredResume };
        } catch (e) {
          console.error("Failed to parse tailor-resume JSON:", jsonMatch[1]);
          throw new Error('Invalid JSON format in tailor-resume response');
        }
      }
      throw new Error('No valid JSON found in tailor-resume response');
    }
    
    // For full resume enhancement
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsedResume = JSON.parse(jsonMatch[0]);
        
        // Ensure projects array exists
        if (!parsedResume.projects) {
          parsedResume.projects = [];
        }
        
        return { enhancedResume: parsedResume };
      } catch (e) {
        console.error("Failed to parse resume JSON:", jsonMatch[0]);
        throw new Error('Invalid JSON format in resume enhancement response');
      }
    }
    
    throw new Error('No valid JSON found in response');
  } catch (error) {
    console.error('Error parsing Gemini response:', error);
    throw new Error('Failed to parse the AI-generated data');
  }
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Enable more detailed request logging
    console.log(`Received request: ${req.method} with URL: ${req.url}`);
    
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set. Please configure your environment variables.");
    }

    const requestData = await req.json().catch(err => {
      console.error("Invalid JSON in request body:", err);
      throw new Error(`Invalid JSON in request body: ${err.message}`);
    });
    
    console.log("Request data type:", requestData.type);
    
    const { type, text, linkedinData, resumeTemplate, experience, skills, description, educationContext, experienceContext, resumeData, jobDescription } = requestData;
    
    if (!type) {
      throw new Error("Missing 'type' parameter in request");
    }
    
    let prompt = "";
    let requestType = type || 'full-resume';
    
    if (type === "summarize") {
      if (!text) {
        throw new Error("Missing 'text' parameter for summarization");
      }
      console.log("Generating summary for text of length:", text.length);
      prompt = generateSummarizationPrompt(text);
    } else if (requestType.startsWith('education-')) {
      prompt = generateEducationPrompt(requestType, educationContext);
    } else if (requestType === "summary") {
      if (!Array.isArray(experience) || experience.length === 0) {
        throw new Error("Insufficient experience data for summary generation");
      }
      prompt = generateSummaryPrompt(experience, skills);
    } else if (requestType === "skills") {
      if (!Array.isArray(experience) || experience.length === 0) {
        throw new Error("Insufficient experience data for skills extraction");
      }
      prompt = generateSkillsPrompt(experience);
    } else if (requestType === "improve") {
      if (!description) {
        throw new Error("Missing 'description' parameter for improvement");
      }
      prompt = generateImprovementPrompt(description);
    } else if (requestType === "experience-description") {
      prompt = generateExperiencePrompt(experienceContext);
    } else if (requestType === "tailor-resume") {
      if (!resumeData || !jobDescription) {
        throw new Error("Missing 'resumeData' or 'jobDescription' parameter for resume tailoring");
      }
      console.log("Tailoring resume with job description length:", jobDescription.length);
      prompt = generateTailorResumePrompt(resumeData, jobDescription);
    } else {
      // Full resume enhancement
      if (!linkedinData) {
        throw new Error("Missing 'linkedinData' parameter for resume enhancement");
      }
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
        }],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Gemini API error: ${response.status} ${errorData}`);
      throw new Error(`Gemini API error: ${response.status} ${errorData}`);
    }

    const data = await response.json();
    console.log("Gemini API response received successfully");
    
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
