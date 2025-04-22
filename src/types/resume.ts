
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skills {
  technical: string[];
  soft: string[];
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  languages: string[];
  certifications: string[];
  projects: string[];
}

export interface ResumeSettings {
  fontFamily: string;
  fontSize: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  paperSize: string;
  margins: string;
}

export interface LinkedInData {
  full_name?: string;
  headline?: string;
  location?: string;
  linkedin_url?: string;
  about?: string;
  experiences?: LinkedInExperience[];
  educations?: LinkedInEducation[];
}

export interface LinkedInExperience {
  title?: string;
  company?: string;
  location?: string;
  start_month?: string;
  start_year?: string;
  end_month?: string;
  end_year?: string;
  is_current?: boolean;
  description?: string;
}

export interface LinkedInEducation {
  school?: string;
  degree?: string;
  field_of_study?: string;
  start_month?: string;
  start_year?: string;
  end_month?: string;
  end_year?: string;
  activities?: string;
}
