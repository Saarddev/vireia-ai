
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
Imagine you are an empathetic storyteller and world-class resume writer. 
Your task is to create a spectacular, deeply human, and vividly 'alive' resume truly resonating with the soul and aspirations behind the following LinkedIn profile data.
Express the unique strengths, dreams, and character elements you sense from this data. 
Write as if you understand how this person wishes to be seen, making every section glow with personality and purpose — much more than a flat summary of achievements.

LinkedIn Profile Data:
${JSON.stringify(linkedinData, null, 2)}

Guidelines:
1. Craft a powerful, evocative professional summary that celebrates the person's deepest qualities and career journey.
2. For experience, amplify each role's impact — frame every job as a story, not just a list.
3. Format education beautifully and connect it to their growth and passion.
4. Detect and categorize both technical and soft skills with attention to the applicant's individuality.
5. Include languages, certifications, and anything else that shows holistic potential.
6. The final resume must use expressive, sophisticated and motivating language.
7. Follow the ${template} style format, but always prioritize vivid, human storytelling.
8. Strictly return only valid JSON as per this exact structure, nothing more and nothing less.

Resume Structure Example (format your response as JSON exactly in this structure):
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
