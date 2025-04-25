
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

  // Extract username from LinkedIn URL if needed
  let username = linkedinUrl;
  if (linkedinUrl.includes('linkedin.com/in/')) {
    const parts = linkedinUrl.split('linkedin.com/in/');
    username = parts[1].split('/')[0].split('?')[0];
  }

  const encodedUrl = encodeURIComponent(linkedinUrl);
  
  try {
    const response = await fetch(
      `https://fresh-linkedin-profile-data.p.rapidapi.com/get-linkedin-profile?linkedin_url=${encodedUrl}&include_skills=true&include_certifications=true`,
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
  } catch (error) {
    console.error('Error fetching LinkedIn profile:', error);
    
    // For testing/dev purposes, return mock data
    return getMockLinkedInData(username);
  }
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
        startDate: formatDate(exp.start_date || exp.start_month, exp.start_year),
        endDate: exp.is_current ? 'Present' : formatDate(exp.end_date || exp.end_month, exp.end_year),
        description: exp.description || ''
      }))
    : [];

  const education = Array.isArray(data.education)
    ? data.education.map((edu: any, index: number) => ({
        id: `edu${index + 1}`,
        degree: edu.degree || '',
        institution: edu.school || '',
        location: edu.location || '',
        startDate: formatDate(edu.start_month, edu.start_year),
        endDate: formatDate(edu.end_month, edu.end_year),
        description: edu.description || edu.activities || ''
      }))
    : [];

  const skills = {
    technical: Array.isArray(data.skills) ? 
      data.skills
        .filter((skill: any) => skill?.name)
        .map((skill: any) => skill.name)
        .slice(0, 10) : [],
    soft: []
  };

  const certifications = Array.isArray(data.certifications) ?
    data.certifications
      .filter((cert: any) => cert?.name)
      .map((cert: any) => cert.name) : [];

  return {
    personal,
    summary,
    experience,
    education,
    skills,
    languages: [],
    certifications,
    projects: []
  };
};

// Helper function to format dates from LinkedIn format to our format
const formatDate = (month?: string, year?: string): string => {
  if (!month && !year) return '';
  if (!month) return year || '';
  if (!year) return month || '';
  
  // Map numeric or full month names to abbreviated format
  const monthMap: {[key: string]: string} = {
    '1': 'Jan', '01': 'Jan', 'january': 'Jan', 'January': 'Jan',
    '2': 'Feb', '02': 'Feb', 'february': 'Feb', 'February': 'Feb',
    '3': 'Mar', '03': 'Mar', 'march': 'Mar', 'March': 'Mar',
    '4': 'Apr', '04': 'Apr', 'april': 'Apr', 'April': 'Apr',
    '5': 'May', '05': 'May', 'may': 'May', 'May': 'May',
    '6': 'Jun', '06': 'Jun', 'june': 'Jun', 'June': 'Jun',
    '7': 'Jul', '07': 'Jul', 'july': 'Jul', 'July': 'Jul',
    '8': 'Aug', '08': 'Aug', 'august': 'Aug', 'August': 'Aug',
    '9': 'Sep', '09': 'Sep', 'september': 'Sep', 'September': 'Sep',
    '10': 'Oct', 'october': 'Oct', 'October': 'Oct',
    '11': 'Nov', 'november': 'Nov', 'November': 'Nov',
    '12': 'Dec', 'december': 'Dec', 'December': 'Dec'
  };
  
  const formattedMonth = monthMap[month.toLowerCase()] || month;
  return `${formattedMonth} ${year}`;
};

// Mock data for testing when API fails
const getMockLinkedInData = (username: string) => {
  return {
    full_name: "Sample Professional",
    headline: "Software Engineer | Web Developer | UX Designer",
    location: "San Francisco, California",
    profile_url: `https://linkedin.com/in/${username}`,
    about: "Passionate software engineer with a focus on creating intuitive user experiences. Skilled in modern web technologies and design principles.",
    experiences: [
      {
        title: "Senior Software Engineer",
        company: "Tech Innovations Inc.",
        location: "San Francisco, CA",
        start_month: "January",
        start_year: "2021",
        is_current: true,
        description: "Lead developer for the company's flagship product. Architected and implemented key features that increased user engagement by 40%. Mentored junior developers and established coding standards."
      },
      {
        title: "Web Developer",
        company: "Digital Solutions",
        location: "San Jose, CA",
        start_month: "June",
        start_year: "2018",
        end_month: "December",
        end_year: "2020",
        description: "Developed responsive web applications using React and Node.js. Collaborated with UX designers to implement intuitive user interfaces. Improved site performance by 35%."
      }
    ],
    education: [
      {
        school: "University of California, Berkeley",
        degree: "Master of Science",
        field_of_study: "Computer Science",
        start_year: "2016",
        end_year: "2018",
        activities: "Focus on Human-Computer Interaction. GPA: 3.8/4.0. Member of the Web Development Club."
      },
      {
        school: "Stanford University",
        degree: "Bachelor of Science",
        field_of_study: "Software Engineering",
        start_year: "2012",
        end_year: "2016",
        activities: "Graduated cum laude. Completed senior project on AI-assisted web design tools."
      }
    ],
    skills: [
      { name: "JavaScript" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "Node.js" },
      { name: "UI/UX Design" },
      { name: "CSS" },
      { name: "HTML" },
      { name: "API Development" },
      { name: "Git" },
      { name: "Agile Methodology" }
    ],
    certifications: [
      { name: "AWS Certified Developer" },
      { name: "Google UX Design Professional Certificate" }
    ]
  };
};
