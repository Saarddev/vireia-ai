import React from 'react';
import { ResumeData } from '@/types/resume';
import { ResumeSettings } from '@/types/resume';

interface ModernTemplateProps {
  resumeData: ResumeData;
  resumeSettings: ResumeSettings;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ resumeData, resumeSettings }) => {
  const { personalInfo, workExperience, education, skills, projects, awards, certifications, languages, volunteerExperience } = resumeData;
  const { themeColor, fontFamily, fontSize } = resumeSettings;

  const sectionTitleStyle = {
    color: themeColor,
    fontFamily: fontFamily,
    fontSize: `${fontSize + 4}px`,
    borderBottom: `2px solid ${themeColor}`,
    paddingBottom: '5px',
    marginBottom: '10px',
  };

  const itemTitleStyle = {
    fontFamily: fontFamily,
    fontSize: `${fontSize + 2}px`,
    fontWeight: 'bold',
    color: themeColor,
  };

  const itemSubtitleStyle = {
    fontFamily: fontFamily,
    fontSize: `${fontSize}px`,
    color: '#555',
  };

  const itemDescriptionStyle = {
    fontFamily: fontFamily,
    fontSize: `${fontSize - 2}px`,
    color: '#777',
  };

  const skillStyle = {
    display: 'inline-block',
    padding: '5px 10px',
    margin: '5px',
    backgroundColor: themeColor,
    color: 'white',
    borderRadius: '5px',
    fontFamily: fontFamily,
    fontSize: `${fontSize - 2}px`,
  };

  return (
    <div style={{ fontFamily: fontFamily, fontSize: `${fontSize}px`, padding: '20px' }}>
      {/* Personal Information */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontFamily: fontFamily, fontSize: `${fontSize + 10}px`, color: themeColor }}>{personalInfo?.name}</h1>
        <p style={{ fontFamily: fontFamily, fontSize: `${fontSize + 2}px`, color: '#555' }}>{personalInfo?.title}</p>
        <p style={{ fontFamily: fontFamily, fontSize: `${fontSize - 2}px`, color: '#777' }}>
          {personalInfo?.email} | {personalInfo?.phone} | {personalInfo?.location}
        </p>
        {personalInfo?.linkedin && (
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '5px', fontFamily: fontFamily, fontSize: `${fontSize - 2}px`, color: themeColor }}>
            LinkedIn Profile
          </a>
        )}
        {personalInfo?.github && (
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '5px', fontFamily: fontFamily, fontSize: `${fontSize - 2}px`, color: themeColor }}>
            GitHub Profile
          </a>
        )}
        {personalInfo?.website && (
          <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '5px', fontFamily: fontFamily, fontSize: `${fontSize - 2}px`, color: themeColor }}>
            Personal Website
          </a>
        )}
      </div>

      {/* Summary/Objective */}
      {personalInfo?.summary && (
        <div>
          <h2 style={sectionTitleStyle}>Summary</h2>
          <p style={itemDescriptionStyle}>{personalInfo.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience && workExperience.length > 0 && (
        <div>
          <h2 style={sectionTitleStyle}>Work Experience</h2>
          {workExperience.map((item, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <h3 style={itemTitleStyle}>{item.title}</h3>
              <p style={itemSubtitleStyle}>{item.company} | {item.startDate} - {item.endDate || 'Present'}</p>
              <p style={itemDescriptionStyle}>{item.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div>
          <h2 style={sectionTitleStyle}>Education</h2>
          {education.map((item, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <h3 style={itemTitleStyle}>{item.degree}</h3>
              <p style={itemSubtitleStyle}>{item.institution} | {item.graduationDate}</p>
              <p style={itemDescriptionStyle}>{item.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div>
          <h2 style={sectionTitleStyle}>Skills</h2>
          <div>
            {skills.map((skill, index) => (
              <span key={index} style={skillStyle}>{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div>
          <h2 style={sectionTitleStyle}>Projects</h2>
          {projects.map((item, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <h3 style={itemTitleStyle}>{item.title}</h3>
              <p style={itemSubtitleStyle}>{item.startDate} - {item.endDate || 'Present'}</p>
              <p style={itemDescriptionStyle}>{item.description}</p>
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '5px', fontFamily: fontFamily, fontSize: `${fontSize - 2}px`, color: themeColor }}>
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Awards */}
      {awards && awards.length > 0 && (
        <div>
          <h2 style={sectionTitleStyle}>Awards</h2>
          {awards.map((item, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <h3 style={itemTitleStyle}>{item.title}</h3>
              <p style={itemSubtitleStyle}>{item.date} | {item.issuer}</p>
              <p style={itemDescriptionStyle}>{item.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div>
          <h2 style={sectionTitleStyle}>Certifications</h2>
          {certifications.map((item, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <h3 style={itemTitleStyle}>{item.title}</h3>
              <p style={itemSubtitleStyle}>{item.date} | {item.issuer}</p>
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '5px', fontFamily: fontFamily, fontSize: `${fontSize - 2}px`, color: themeColor }}>
                  View Certification
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <div>
          <h2 style={sectionTitleStyle}>Languages</h2>
          <div>
            {languages.map((language, index) => (
              <span key={index} style={skillStyle}>{language}</span>
            ))}
          </div>
        </div>
      )}

      {/* Volunteer Experience */}
      {volunteerExperience && volunteerExperience.length > 0 && (
        <div>
          <h2 style={sectionTitleStyle}>Volunteer Experience</h2>
          {volunteerExperience.map((item, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <h3 style={itemTitleStyle}>{item.title}</h3>
              <p style={itemSubtitleStyle}>{item.organization} | {item.startDate} - {item.endDate || 'Present'}</p>
              <p style={itemDescriptionStyle}>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;
