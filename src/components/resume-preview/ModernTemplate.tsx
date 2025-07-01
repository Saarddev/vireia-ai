import React from 'react';
import { ResumeData, ResumeSettings } from '@/types/resume';

interface ModernTemplateProps {
  data: ResumeData;
  settings: ResumeSettings;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data, settings }) => {
  return (
    <div className="modern-template">
      {/* Header Section */}
      <header className="header">
        <h1>{data.personalInfo.name}</h1>
        <p className="title">{data.personalInfo.title}</p>
        {/* Contact Information */}
        <div className="contact-info">
          <p>Email: {data.personalInfo.email}</p>
          <p>Phone: {data.personalInfo.phone}</p>
          <p>LinkedIn: {data.personalInfo.linkedin}</p>
          <p>Location: {data.personalInfo.location}</p>
        </div>
      </header>

      {/* Summary Section */}
      <section className="summary">
        <h2>Summary</h2>
        <p>{data.summary}</p>
      </section>

      {/* Experience Section */}
      <section className="experience">
        <h2>Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <h3>{exp.title}</h3>
            <p className="company">{exp.company} | {exp.location}</p>
            <p className="dates">{exp.startDate} - {exp.endDate}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section className="education">
        <h2>Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="education-item">
            <h3>{edu.degree}</h3>
            <p className="school">{edu.school} | {edu.location}</p>
            <p className="dates">{edu.startDate} - {edu.endDate}</p>
            <p>{edu.description}</p>
          </div>
        ))}
      </section>

      {/* Skills Section */}
      <section className="skills">
        <h2>Skills</h2>
        <ul className="skills-list">
          {data.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>

      {/* Projects Section */}
      <section className="projects">
        <h2>Projects</h2>
        {data.projects.map((project, index) => (
          <div key={index} className="project-item">
            <h3>{project.name}</h3>
            <p className="dates">{project.startDate} - {project.endDate}</p>
            <p>{project.description}</p>
            <p>Link: {project.link}</p>
          </div>
        ))}
      </section>

      {/* Certifications Section */}
      <section className="certifications">
        <h2>Certifications</h2>
        {data.certifications.map((cert, index) => (
          <div key={index} className="certification-item">
            <h3>{cert.name}</h3>
            <p className="issuer">{cert.issuer}</p>
            <p className="dates">{cert.date}</p>
            <p>Link: {cert.link}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ModernTemplate;
