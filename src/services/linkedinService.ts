
/**
 * Service for handling LinkedIn API integration
 */

/**
 * Fetches LinkedIn profile data from the RapidAPI endpoint
 * @param linkedinUrl The LinkedIn profile URL to fetch data for
 * @returns The parsed LinkedIn profile data
 */
export const fetchLinkedInProfile = async (linkedinUrl: string) => {
  if (!linkedinUrl) {
    throw new Error('LinkedIn URL is required');
  }

  const encodedUrl = encodeURIComponent(linkedinUrl);
  const response = await fetch(
    `https://fresh-linkedin-profile-data.p.rapidapi.com/get-linkedin-profile?linkedin_url=${encodedUrl}&include_skills=false&include_certifications=false&include_publications=false&include_honors=false&include_volunteers=false&include_projects=false&include_patents=false&include_courses=false&include_organizations=false&include_profile_status=false&include_company_public_url=false`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'fresh-linkedin-profile-data.p.rapidapi.com',
        'x-rapidapi-key': '0e8903e27emsh2333e866a960be6p1d76cbjsn8250ba0b208d'
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch LinkedIn data: ${response.status} ${response.statusText}`);
  }

  return await response.json();
};

/**
 * Transform LinkedIn data into resume format
 * @param data The LinkedIn profile data
 * @returns Transformed data in resume format
 */
export const transformLinkedInData = (data: any) => {
  if (!data) return null;

  const personal = {
    name: data.full_name || '',
    title: data.headline || '',
    email: '',
    phone: '',
    location: data.location || '',
    linkedin: data.profile_url || '',
    website: ''
  };

  const summary = data.about || '';

  const experience = Array.isArray(data.experiences) 
    ? data.experiences.map((exp: any, index: number) => ({
        id: `exp${index + 1}`,
        title: exp.title || '',
        company: exp.company || '',
        location: exp.location || '',
        startDate: exp.start_date || '',
        endDate: exp.end_date || 'Present',
        description: exp.description || ''
      }))
    : [];

  const education = Array.isArray(data.education)
    ? data.education.map((edu: any, index: number) => ({
        id: `edu${index + 1}`,
        degree: edu.degree || '',
        institution: edu.school || '',
        location: edu.location || '',
        startDate: edu.start_date || '',
        endDate: edu.end_date || '',
        description: edu.description || ''
      }))
    : [];

  return {
    personal,
    summary,
    experience,
    education,
    skills: {
      technical: [],
      soft: []
    },
    languages: [],
    certifications: [],
    projects: []
  };
};
