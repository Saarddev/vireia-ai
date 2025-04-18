
import React from 'react';
import { cn } from "@/lib/utils";

interface ModernTemplateProps {
  data: any;
  settings?: any;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data, settings = {} }) => {
  return (
    <div className={cn(
      "p-4",
      settings.fontFamily && `font-[${settings.fontFamily}]`,
      settings.fontSize && `text-[${settings.fontSize}pt]`
    )}>
      <div className="p-4">
        <div className="border-b border-resume-purple pb-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">{data.personal.name}</h1>
          <p className="text-resume-purple font-medium">{data.personal.title}</p>
          <div className="flex flex-wrap mt-2 text-sm text-gray-600 gap-3">
            <span>{data.personal.email}</span>
            <span>|</span>
            <span>{data.personal.phone}</span>
            <span>|</span>
            <span>{data.personal.location}</span>
            {data.personal.linkedin && (
              <>
                <span>|</span>
                <span>{data.personal.linkedin}</span>
              </>
            )}
            {data.personal.website && (
              <>
                <span>|</span>
                <span>{data.personal.website}</span>
              </>
            )}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">Summary</h2>
          <p className="text-sm text-gray-700">{data.summary}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">Experience</h2>
          {data.experience.map((exp: any) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="text-sm font-medium text-resume-purple">{exp.company}, {exp.location}</div>
              <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">Education</h2>
          {data.education.map((edu: any) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
              </div>
              <div className="text-sm font-medium text-resume-purple">{edu.institution}, {edu.location}</div>
              <p className="text-sm text-gray-700 mt-1">{edu.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">Skills</h2>
          <div className="mb-2">
            <h3 className="font-semibold text-gray-800 text-sm">Technical Skills</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {data.skills.technical.map((skill: string, index: number) => (
                <span key={index} className="inline-block bg-purple-100 text-resume-purple rounded px-2 py-1 text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">Soft Skills</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {data.skills.soft.map((skill: string, index: number) => (
                <span key={index} className="inline-block bg-gray-100 text-gray-700 rounded px-2 py-1 text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
