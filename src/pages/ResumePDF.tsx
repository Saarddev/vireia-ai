
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import ProfessionalTemplate from '@/components/resume-preview/ProfessionalTemplate';
import ModernTemplate from '@/components/resume-preview/ModernTemplate';
import CustomizableTemplate from '@/components/resume-preview/CustomizableTemplate';
import { ResumeData, ResumeSettings } from '@/types/resume';

const ResumePDF = () => {
  const { resumeId } = useParams();
  const [data, setData] = useState<ResumeData | null>(null);
  const [template, setTemplate] = useState<string>('professional');
  const [settings, setSettings] = useState<ResumeSettings>({
    fontFamily: 'Inter',
    fontSize: 11,
    primaryColor: '#5d4dcd',
    secondaryColor: '#333333',
    accentColor: '#f3f4f6',
    paperSize: 'letter',
    margins: 'normal',
    customStyles: {}
  });

  useEffect(() => {
    const fetchResumeData = async () => {
      if (!resumeId) return;

      try {
        const { data: resumeData, error } = await supabase
          .from('resumes')
          .select('data, title, template, settings')
          .eq('id', resumeId)
          .single();

        if (error) {
          throw error;
        }

        if (resumeData) {
          setData(resumeData.data);
          setTemplate(resumeData.template || 'professional');
          
          if (resumeData.settings) {
            setSettings({
              ...settings,
              ...resumeData.settings,
              // Ensure customStyles is present
              customStyles: resumeData.settings.customStyles || {}
            });
          }

          // Trigger print after a moment to ensure rendering is complete
          setTimeout(() => {
            window.print();
          }, 500);
        }
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };

    fetchResumeData();
  }, [resumeId]);

  const renderTemplate = () => {
    if (!data) return null;

    switch (template) {
      case 'modern':
        return <ModernTemplate data={data} settings={settings} />;
      case 'customizable':
        return <CustomizableTemplate data={data} settings={settings} segmentStyles={settings.customStyles} />;
      case 'professional':
      default:
        return <ProfessionalTemplate data={data} settings={settings} />;
    }
  };

  return (
    <div className="max-w-[21cm] mx-auto p-6 print:p-0">
      {data ? renderTemplate() : (
        <div className="flex items-center justify-center h-[29.7cm]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}
    </div>
  );
};

export default ResumePDF;
