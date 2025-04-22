export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  languages: string[];
  certifications: string[];
  projects: Project[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website?: string;
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

export interface Skills {
  technical: string[];
  soft: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
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

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}
