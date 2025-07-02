import React from 'react';
import { ResumeData, ResumeSettings } from '@/types/resume';

interface ModernTemplateProps {
  data: ResumeData;
  settings: ResumeSettings;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data, settings }) => {
  const { personal, summary, experience, education, skills, languages, certifications, projects } = data;
  const { fontFamily, fontSize, primaryColor, secondaryColor } = settings;

  const containerStyle = {
    fontFamily: fontFamily || 'Arial, sans-serif',
    fontSize: `${fontSize || 12}pt`,
    color: secondaryColor || '#333',
    width: '8.5in',
    minHeight: '11in',
    margin: '0 auto',
    padding: '0.5in',
    backgroundColor: '#fff',
  };

  const sectionStyle = {
    marginBottom: '0.25in',
  };

  const headingStyle = {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: primaryColor || '#007bff',
    marginBottom: '0.1in',
  };

  const subHeadingStyle = {
    fontSize: '1.2em',
    fontWeight: 'bold',
    marginBottom: '0.1in',
  };

  const detailStyle = {
    marginBottom: '0.1in',
  };

  const listStyle = {
    paddingLeft: '20px',
  };

  return (
    <div style={containerStyle}>
      {/* Personal Information */}
      <div style={sectionStyle}>
        <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: primaryColor || '#007bff', marginBottom: '0.1in' }}>
          {personal.name}
        </h1>
        <h2 style={{ fontSize: '1.3em', fontWeight: 'normal', color: secondaryColor || '#555', marginBottom: '0.2in' }}>
          {personal.title}
        </h2>
        <p style={detailStyle}>{personal.email} | {personal.phone}</p>
        <p style={detailStyle}>{personal.location} | {personal.linkedin} | {personal.website}</p>
      </div>

      {/* Summary */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Summary</h2>
        <p style={detailStyle}>{summary}</p>
      </div>

      {/* Experience */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Experience</h2>
        {experience.map((exp) => (
          <div key={exp.id} style={sectionStyle}>
            <h3 style={subHeadingStyle}>{exp.title}, {exp.company}</h3>
            <p style={detailStyle}>{exp.location} | {exp.startDate} - {exp.endDate}</p>
            <p style={detailStyle}>{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Education */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Education</h2>
        {education.map((edu) => (
          <div key={edu.id} style={sectionStyle}>
            <h3 style={subHeadingStyle}>{edu.degree}, {edu.institution}</h3>
            <p style={detailStyle}>{edu.location} | {edu.startDate} - {edu.endDate}</p>
            <p style={detailStyle}>{edu.description}</p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Skills</h2>
        <div style={sectionStyle}>
          <h3 style={subHeadingStyle}>Technical Skills</h3>
          <ul style={listStyle}>
            {skills.technical.map((skill, index) => (
              <li key={index} style={detailStyle}>{skill}</li>
            ))}
          </ul>
        </div>
        <div style={sectionStyle}>
          <h3 style={subHeadingStyle}>Soft Skills</h3>
          <ul style={listStyle}>
            {skills.soft.map((skill, index) => (
              <li key={index} style={detailStyle}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Languages */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Languages</h2>
        <ul style={listStyle}>
          {languages.map((lang, index) => (
            <li key={index} style={detailStyle}>{lang}</li>
          ))}
        </ul>
      </div>

      {/* Certifications */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Certifications</h2>
        <ul style={listStyle}>
          {certifications.map((cert, index) => (
            <li key={index} style={detailStyle}>{cert}</li>
          ))}
        </ul>
      </div>

      {/* Projects */}
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Projects</h2>
        {projects.map((project) => (
          <div key={project.id} style={sectionStyle}>
            <h3 style={subHeadingStyle}>{project.title}</h3>
            <p style={detailStyle}>{project.description}</p>
            <p style={detailStyle}>
              {project.technologies && project.technologies.length > 0 ? `Technologies: ${project.technologies.join(', ')}` : ''}
            </p>
            <p style={detailStyle}>{project.startDate} - {project.endDate}</p>
            {project.link && <p style={detailStyle}>Link: {project.link}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModernTemplate;
