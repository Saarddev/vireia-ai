
import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import ModernTemplate from './resume-preview/ModernTemplate';
import PreviewControls from './resume-preview/PreviewControls';
import { ResumeData } from '@/types/resume';

// Function to extract all styles applied to an element and its descendants
const getAllStyles = (element: Element): string => {
  let styles = '';
  const computedStyle = window.getComputedStyle(element);
  for (let i = 0; i < computedStyle.length; i++) {
    const propertyName = computedStyle[i];
    styles += `${propertyName}: ${computedStyle.getPropertyValue(propertyName)}; `;
  }

  for (let i = 0; i < element.children.length; i++) {
    styles += getAllStyles(element.children[i]);
  }
  return styles;
};

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
  settings?: any;
  onDataChange?: (section: string, data: any) => void;
  onGenerateWithAI?: (section: string) => Promise<string>;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  data,
  template,
  settings = {},
  onDataChange,
  onGenerateWithAI
}) => {
  // Ensure data is valid and complete with defaults
  const safeData: ResumeData = React.useMemo(() => {
    return {
      personal: data.personal || {
        name: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: ""
      },
      summary: data.summary || "",
      experience: Array.isArray(data.experience) ? data.experience : [],
      education: Array.isArray(data.education) ? data.education : [],
      skills: data.skills || { technical: [], soft: [] },
      languages: Array.isArray(data.languages) ? data.languages : [],
      certifications: Array.isArray(data.certifications) ? data.certifications : [],
      projects: Array.isArray(data.projects) ? data.projects : []
    };
  }, [data]);

  const { isMobile } = useIsMobile();
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const resumeContentRef = useRef<HTMLDivElement>(null);

  const handleGenerateWithAI = async (section: string): Promise<string> => {
    if (onGenerateWithAI) {
      return await onGenerateWithAI(section);
    }
    return '';
  };

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow || !resumeContentRef.current) {
      console.error('Failed to open print window or find resume content');
      return;
    }

    const fontFamily = settings.fontFamily || 'Inter';
    const primaryColor = settings.primaryColor || '#5d4dcd';

    // Clone the resume content node to avoid modifying the original
    const clonedResumeContent = resumeContentRef.current.cloneNode(true) as HTMLDivElement;

    // Extract all computed styles
    let allStyles = '';
    const styleElements = document.querySelectorAll('style');
    styleElements.forEach(style => {
      allStyles += style.textContent;
    });

    const resumeHTMLContent = clonedResumeContent.outerHTML;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${data.personal.name} - Resume</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            ${allStyles}
            @page {
              size: ${settings.paperSize || 'a4'};
              margin: ${settings.margins === 'narrow' ? '0.5in' :
                settings.margins === 'wide' ? '1.5in' :
                '1in'
              };
            }
            body {
              font-family: ${settings.fontFamily || 'Inter'}, sans-serif;
              font-size: ${settings.fontSize || 10}pt;
              line-height: 1.5;
              color: #000;
              background: #fff;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @media print {
              body { margin: 0; }
              .resume-content { padding: 0 !important; }
            }
          </style>
          ${settings.fontFamily ?
            `<link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily}:wght@400;500;600;700&display=swap" rel="stylesheet">`
            : ''
          }
        </head>
        <body class="p-0 m-0">
          ${resumeHTMLContent}
          <script>
            window.onload = () => {
              window.print();
              window.close();
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  return (
    <div className="relative h-full flex flex-col overflow-hidden">
      <PreviewControls
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onDownload={handleDownloadPDF}
      >
        <span className="text-sm text-gray-600 ml-2">
          {Math.round(zoomLevel * 100)}%
        </span>
      </PreviewControls>
      
      <div className="flex-1 overflow-auto p-4 relative">
        <div className="min-h-full flex items-start justify-center pb-20">
          <Card
            className={cn(
              "resume-content bg-white rounded-lg shadow-md p-6 md:p-8 transition-all duration-200 mx-auto",
              "border border-gray-200 w-full max-w-[21cm]"
            )}
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top center',
              marginBottom: `${(zoomLevel - 1) * 100}%`
            }}
          >
            <div ref={resumeContentRef} className="resume-content">
              {template === 'modern' ? (
                <ModernTemplate
                  data={safeData}
                  settings={settings}
                  onUpdateData={onDataChange}
                  onGenerateWithAI={handleGenerateWithAI}
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">
                    {template.charAt(0).toUpperCase() + template.slice(1)} template preview
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
