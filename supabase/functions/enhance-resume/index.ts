
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { linkedinData, resumeTemplate } = await req.json();
    
    if (!linkedinData) {
      throw new Error('LinkedIn data is required');
    }

    // Generate a prompt based on the LinkedIn data
    const prompt = generatePrompt(linkedinData, resumeTemplate);

    // Call the Gemini API
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
    const enhancedResume = parseGeminiResponse(data);
    
    return new Response(JSON.stringify({ 
      enhancedResume,
      originalPrompt: prompt 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error enhancing resume:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Generate a tailored prompt for Gemini based on LinkedIn data and resume template
function generatePrompt(linkedinData: any, template: string = 'modern') {
  return `
You are an expert resume writer and career coach.

Your mission: using the provided LinkedIn profile data, generate a clean, simple, ATS-optimized resume that is concise, direct, and achievement-oriented.
Avoid any overly vivid, flowery, or excessively “human” descriptions—keep language professional, clear, and to the point.

Here are key takeaways and areas to focus on:

Overall Strengths:
- Strong Technical Skills: Proficient in programming languages, databases, frameworks, cloud technologies.
- Significant Experience: Solid history as a Software Engineer at reputable companies.
- Quantifiable Achievements: Highlight measurable results and impact.
- Breadth of Experience: Includes front-end, back-end, full-stack, microservices, and game development.
- Education and Mentorship: Strong academic background, mentoring experience.

Key Generation Guidelines:
1. Summarize strengths and experience precisely. Avoid excessive adjectives. No poetic/“vivid” language.
2. Focus on integrating skills straight into achievements and experience (ex: “Developed microservices in C#...”).
3. Quantify results wherever possible (e.g. “Reduced cloud costs by 15%”).
4. Use strong action verbs and avoid passive language.
5. Use clear, brief phrases. No fluff.
6. Optimize for ATS: clean structure, standard fonts, no tables, no images, no graphics.
7. Ensure each section is relevant, formatted for easy scanning.
8. Only output a valid JSON resume as shown. Nothing else.

Resume Structure (output exactly this JSON shape, strictly and only JSON):

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
}

LinkedIn Profile Data:
${JSON.stringify(linkedinData, null, 2)}
`;
}

// Parse the Gemini response and extract the JSON resume data
function parseGeminiResponse(response: any): any {
  try {
    // Get the text from Gemini's response
    const text = response.candidates[0].content.parts[0].text;
    
    // Find JSON in the response (it might be embedded in explanatory text)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      // Parse the JSON from the matched text
      return JSON.parse(jsonMatch[0]);
    }
    
    // If no JSON object was found, try to parse the entire response
    return JSON.parse(text);
  } catch (error) {
    console.error('Error parsing Gemini response:', error);
    
    // Return a simplified error message
    throw new Error('Failed to parse the AI-generated resume data');
  }
}
