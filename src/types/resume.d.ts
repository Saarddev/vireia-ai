export interface Education {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate: string;
  description?: string;
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

export interface Personal {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: string;
  endDate: string;
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
