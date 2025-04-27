
export interface Personal {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
}

export interface Experience {
  id?: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  field?: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Skills {
  technical: string[];
  soft: string[];
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  technologies?: string[];
  link?: string;
  startDate: string;
  endDate: string;
}

export interface LinkedInData {
  full_name?: string;
  headline?: string;
  location?: string;
  linkedin_url?: string;
  experience?: any[];
  education?: any[];
}

export interface ResumeSettings {
  fontFamily: string;
  fontSize: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  paperSize: "a4" | "letter" | "legal";
  margins: "narrow" | "normal" | "wide";
}

export interface ResumeData {
  personal: Personal;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  languages: string[];
  certifications: string[];
  projects: Project[];
}

export type { Project };
