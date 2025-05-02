
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, text, resume, jobDescription } = await req.json();

    if (type === 'summarize') {
      // Handle summary generation
      const summary = await generateSummary(text);
      return new Response(
        JSON.stringify({ summary }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } 
    else if (type === 'ats-scan') {
      // Handle ATS scanning
      const result = await scanResumeWithATS(resume, jobDescription);
      return new Response(
        JSON.stringify(result),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    else if (type === 'ats-optimize') {
      // Handle ATS optimization
      const result = await optimizeResumeForATS(resume, jobDescription);
      return new Response(
        JSON.stringify(result),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    else {
      throw new Error("Unknown operation type");
    }
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

// Function to generate a summary using AI
async function generateSummary(text: string): Promise<string> {
  // Generate a summary with bullet points for the text
  // Ensure each bullet point starts with an action verb
  // Format as ATS-friendly bullet points
  
  try {
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set");
    }

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=" + GEMINI_API_KEY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Please summarize the following text into 3-5 concise, action-oriented bullet points that would be ATS-friendly for a resume. Each bullet point should start with a strong action verb, be quantifiable where possible, and highlight achievements rather than just responsibilities. Format each bullet point starting with "• " (bullet point symbol followed by a space).

Here's the text to summarize:
${text}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 800,
        }
      })
    });

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error("Invalid response from Gemini API");
    }
    
    const summary = data.candidates[0].content.parts[0].text;
    
    // Clean up the summary format
    const formattedSummary = summary
      .replace(/^[\s\n]*|[\s\n]*$/g, '') // Trim whitespace/newlines
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => {
        if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
          return line.replace(/^[-*]\s*/, '• ');
        }
        return `• ${line}`;
      })
      .join('\n');
    
    return formattedSummary;
  } catch (error) {
    console.error("Error generating summary:", error);
    throw new Error("Failed to generate summary");
  }
}

// Function to scan a resume with ATS
async function scanResumeWithATS(resume: any, jobDescription?: string): Promise<any> {
  try {
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set");
    }
    
    // Extract relevant content from resume for analysis
    const resumeContent = {
      personal: resume.personal || {},
      summary: resume.summary || "",
      experience: resume.experience || [],
      education: resume.education || [],
      skills: resume.skills || { technical: [], soft: [] },
      projects: resume.projects || []
    };
    
    // Construct prompt for ATS analysis
    let prompt = `You are an expert ATS (Applicant Tracking System) analyzer and resume optimization specialist. 
    
Please analyze the following resume content and provide detailed feedback on how well it would perform with modern ATS systems.`;

    if (jobDescription) {
      prompt += `\n\nAnalyze this resume specifically for the following job description:
${jobDescription}`;
    }

    prompt += `\n\nResume Content:
- Name: ${resumeContent.personal.name || "Not provided"}
- Title: ${resumeContent.personal.title || "Not provided"}
- Summary: ${resumeContent.summary || "Not provided"}
- Experience: ${JSON.stringify(resumeContent.experience)}
- Education: ${JSON.stringify(resumeContent.education)}
- Skills - Technical: ${resumeContent.skills.technical.join(", ")}
- Skills - Soft: ${resumeContent.skills.soft.join(", ")}
- Projects: ${JSON.stringify(resumeContent.projects)}

Provide your analysis in the following JSON format:
{
  "score": 0-100,
  "feedback": ["+ positive point 1", "- negative point 1", "- suggestion 1"],
  "improvements": ["improvement suggestion 1", "improvement suggestion 2"],
  "keywordMatch": {
    "found": ["keyword1", "keyword2"],
    "missing": ["keyword3", "keyword4"],
    "score": 0-100
  },
  "formatScore": 0-100,
  "contentScore": 0-100,
  "overallScore": 0-100
}

Your analysis should be thorough, honest, and practical. Include specific suggestions for improvement. Only return the JSON, no additional text.`;

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=" + GEMINI_API_KEY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 2048,
          responseMimeType: "application/json"
        }
      })
    });

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error("Invalid response from Gemini API");
    }
    
    const resultText = data.candidates[0].content.parts[0].text;
    // Extract JSON from the response (sometimes the API returns additional text)
    const jsonMatch = resultText.match(/{[\s\S]*}/);
    
    if (!jsonMatch) {
      throw new Error("Invalid JSON response from AI");
    }
    
    const result = JSON.parse(jsonMatch[0]);
    return result;
  } catch (error) {
    console.error("Error analyzing resume with ATS:", error);
    throw new Error("Failed to analyze resume");
  }
}

// Function to optimize a resume based on ATS analysis and job description
async function optimizeResumeForATS(resume: any, jobDescription: string): Promise<any> {
  try {
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set");
    }
    
    // Extract relevant content from resume
    const resumeContent = {
      personal: resume.personal || {},
      summary: resume.summary || "",
      experience: resume.experience || [],
      education: resume.education || [],
      skills: resume.skills || { technical: [], soft: [] },
      projects: resume.projects || []
    };
    
    // Construct prompt for ATS optimization
    const prompt = `You are an expert ATS (Applicant Tracking System) optimizer. 
    
Your task is to optimize the following resume to maximize its chances of passing through ATS filters for the provided job description.

Job Description:
${jobDescription}

Resume Content:
${JSON.stringify(resumeContent, null, 2)}

Please optimize this resume by:
1. Enhancing the summary to include relevant keywords from the job description
2. Rewording experience bullet points to highlight relevant skills
3. Suggesting additional technical and soft skills that match the job description
4. Prioritizing the most relevant experiences and education
5. Using ATS-friendly formatting throughout

Return the optimized resume in exactly the same JSON structure as the input, along with a list of changes you made.

Your response should be a valid JSON object with the following structure:
{
  "optimizedResume": {
    // The complete optimized resume in the same format as the input
  },
  "changes": [
    {
      "section": "section name (e.g., summary, experience, skills)",
      "before": "original content",
      "after": "optimized content"
    }
  ]
}

Only return the JSON, no additional text.`;

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=" + GEMINI_API_KEY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 4096,
          responseMimeType: "application/json"
        }
      })
    });

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error("Invalid response from Gemini API");
    }
    
    const resultText = data.candidates[0].content.parts[0].text;
    // Extract JSON from the response
    const jsonMatch = resultText.match(/{[\s\S]*}/);
    
    if (!jsonMatch) {
      throw new Error("Invalid JSON response from AI");
    }
    
    const result = JSON.parse(jsonMatch[0]);
    return result;
  } catch (error) {
    console.error("Error optimizing resume:", error);
    throw new Error("Failed to optimize resume");
  }
}
