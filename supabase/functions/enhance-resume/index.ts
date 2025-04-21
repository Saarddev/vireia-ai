
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
You are a professional resume writer. Create a comprehensive resume based on the following LinkedIn profile data. 
Format the response as a JSON object following the exact structure provided at the end of this prompt.

LinkedIn Profile Data:
${JSON.stringify(linkedinData, null, 2)}

Important Guidelines:
1. Generate a compelling professional summary that highlights key strengths and career trajectory.
2. Extract all relevant experience details, enhancing descriptions with achievement-oriented bullets.
3. Format education history appropriately.
4. Identify and categorize both technical and soft skills from the profile.
5. Include languages mentioned in the profile.
6. Extract any certifications mentioned.
7. The resume should follow a ${template} style format.
8. Keep your tone professional and impactful.

Return ONLY a valid JSON object with this exact structure:
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
