import React from 'react';
import { ResumeData } from '@/types/resume';

interface ModernTemplateProps {
  data: ResumeData;
  settings?: any; // Using any for now since ResumeSettings is not exported
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data, settings }) => {
  return (
    <div className="resume-content bg-white">
      <div className="p-8">
        <h1 className="text-2xl font-bold">{data.personalInfo?.name || 'Your Name'}</h1>
        <p className="text-gray-600">{data.personalInfo?.email || 'your.email@example.com'}</p>
      </div>
    </div>
  );
};

export default ModernTemplate;
