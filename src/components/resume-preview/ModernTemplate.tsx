
import React from 'react';
import { ResumeData } from '@/types/resume';

interface ModernTemplateProps {
  data: ResumeData;
  onUpdateData?: (data: ResumeData) => void;
  onGenerateWithAI?: (section: string, prompt: string) => void;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ 
  data, 
  onUpdateData = () => {}, 
  onGenerateWithAI = () => {} 
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">{data.personalInfo?.fullName || 'Your Name'}</h1>
        <p className="text-xl opacity-90">{data.personalInfo?.jobTitle || 'Your Job Title'}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          {data.personalInfo?.email && (
            <span className="flex items-center">
              📧 {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo?.phone && (
            <span className="flex items-center">
              📱 {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo?.location && (
            <span className="flex items-center">
              📍 {data.personalInfo.location}
            </span>
          )}
        </div>
      </div>

      <div className="p-8">
        {data.summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">
              Professional Summary
            </h2>
            <p className="text-gray-600 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {data.experience && data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">
              Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="border-l-3 border-blue-300 pl-4">
                  <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                  <p className="text-blue-600 font-medium">{exp.company}</p>
                  <p className="text-gray-500 text-sm mb-2">{exp.startDate} - {exp.endDate}</p>
                  <p className="text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-blue-600">{edu.institution}</p>
                  <p className="text-gray-500 text-sm">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills && data.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {typeof skill === 'string' ? skill : skill.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;
