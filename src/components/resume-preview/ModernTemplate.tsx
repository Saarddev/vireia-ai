
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
        <h1>{data.personal.name}</h1>
        <p className="title">{data.personal.title}</p>
        {/* Contact Information */}
        <div className="contact-info">
          <p>Email: {data.personal.email}</p>
          <p>Phone: {data.personal.phone}</p>
          <p>LinkedIn: {data.personal.linkedin}</p>
          <p>Location: {data.personal.location}</p>
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
            <p className="school">{edu.institution} | {edu.location}</p>
            <p className="dates">{edu.startDate} - {edu.endDate}</p>
            <p>{edu.description}</p>
          </div>
        ))}
      </section>

      {/* Skills Section */}
      <section className="skills">
        <h2>Skills</h2>
        <ul className="skills-list">
          {Array.isArray(data.skills) ? data.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          )) : (
            <li>{data.skills}</li>
          )}
        </ul>
      </section>

      {/* Projects Section */}
      <section className="projects">
        <h2>Projects</h2>
        {data.projects.map((project, index) => (
          <div key={index} className="project-item">
            <h3>{project.title}</h3>
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
            <h3>{cert}</h3>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ModernTemplate;
