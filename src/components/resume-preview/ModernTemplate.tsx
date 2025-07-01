
import React from 'react';
import { ResumeData, ResumeSettings } from '@/types/resume';

interface ModernTemplateProps {
  data: ResumeData;
  settings: ResumeSettings;
  onUpdateData?: (section: string, data: any) => void;
  onGenerateWithAI?: (section: string) => Promise<string>;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data, settings, onUpdateData, onGenerateWithAI }) => {
  return (
    <div className="modern-template bg-white p-8 max-w-4xl mx-auto shadow-lg">
      {/* Header Section */}
      <header className="header border-b-2 border-gray-200 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.personal.name}</h1>
        <p className="title text-xl text-blue-600 mb-4">{data.personal.title}</p>
        
        {/* Contact Information */}
        <div className="contact-info grid grid-cols-2 gap-4 text-sm text-gray-600">
          <p className="flex items-center">
            <span className="font-semibold mr-2">Email:</span>
            {data.personal.email}
          </p>
          <p className="flex items-center">
            <span className="font-semibold mr-2">Phone:</span>
            {data.personal.phone}
          </p>
          <p className="flex items-center">
            <span className="font-semibold mr-2">LinkedIn:</span>
            {data.personal.linkedin}
          </p>
          <p className="flex items-center">
            <span className="font-semibold mr-2">Location:</span>
            {data.personal.location}
          </p>
        </div>
      </header>

      {/* Summary Section */}
      <section className="summary mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">Summary</h2>
        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
      </section>

      {/* Experience Section */}
      <section className="experience mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="experience-item mb-6 p-4 border-l-2 border-gray-200 hover:border-blue-400 transition-colors">
            <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
            <p className="company text-blue-600 font-medium mb-1">{exp.company} | {exp.location}</p>
            <p className="dates text-sm text-gray-500 mb-3">{exp.startDate} - {exp.endDate}</p>
            <p className="text-gray-700 leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section className="education mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="education-item mb-6 p-4 border-l-2 border-gray-200 hover:border-blue-400 transition-colors">
            <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
            <p className="school text-blue-600 font-medium mb-1">{edu.institution} | {edu.location}</p>
            <p className="dates text-sm text-gray-500 mb-3">{edu.startDate} - {edu.endDate}</p>
            <p className="text-gray-700 leading-relaxed">{edu.description}</p>
          </div>
        ))}
      </section>

      {/* Skills Section */}
      <section className="skills mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">Skills</h2>
        <div className="skills-list">
          {data.skills && typeof data.skills === 'object' ? (
            <div className="space-y-4">
              {data.skills.technical && data.skills.technical.length > 0 && (
                <div className="skill-category">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Technical Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.technical.map((skill, index) => (
                      <span key={index} className="skill-item bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data.skills.soft && data.skills.soft.length > 0 && (
                <div className="skill-category">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Soft Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.soft.map((skill, index) => (
                      <span key={index} className="skill-item bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : Array.isArray(data.skills) ? (
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="skill-item bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <span className="skill-item bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {String(data.skills || '')}
            </span>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">Projects</h2>
        {data.projects.map((project, index) => (
          <div key={index} className="project-item mb-6 p-4 border-l-2 border-gray-200 hover:border-blue-400 transition-colors">
            <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
            <p className="dates text-sm text-gray-500 mb-3">{project.startDate} - {project.endDate}</p>
            <p className="text-gray-700 leading-relaxed mb-2">{project.description}</p>
            {project.link && (
              <p className="text-blue-600 hover:text-blue-800">
                <span className="font-medium">Link: </span>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="underline">
                  {project.link}
                </a>
              </p>
            )}
          </div>
        ))}
      </section>

      {/* Certifications Section */}
      <section className="certifications">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-blue-600 pl-3">Certifications</h2>
        <div className="space-y-2">
          {data.certifications.map((cert, index) => (
            <div key={index} className="certification-item p-3 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900">{cert}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ModernTemplate;
