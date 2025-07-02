
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
}

export interface ResumeSettings {
  template: 'modern' | 'professional' | 'creative';
  primaryColor: string;
  fontSize: 'small' | 'medium' | 'large';
  spacing: 'compact' | 'normal' | 'relaxed';
  showPhoto: boolean;
}

export interface Resume {
  id: string;
  title: string;
  data: ResumeData;
  settings: ResumeSettings;
  createdAt: string;
  updatedAt: string;
}
