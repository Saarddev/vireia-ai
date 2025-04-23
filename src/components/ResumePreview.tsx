
import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import ModernTemplate from './resume-preview/ModernTemplate';
import PreviewControls from './resume-preview/PreviewControls';

interface ResumePreviewProps {
  data: any;
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

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${data.personal.name} - Resume</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          ${settings.fontFamily ?
        `<link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily}:wght@400;500;600;700&display=swap" rel="stylesheet">`
        : ''
      }
          <style>
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
            }
            @media print {
              body { margin: 0; }
              .resume-content { padding: 0; }
            }
            .text-resume-purple { color: ${settings.primaryColor}; }
            .border-resume-purple { border-color: ${settings.primaryColor}; }
            .bg-purple-100 { background-color: ${settings.primaryColor}20; }
          </style>
        </head>
        <body class="p-0 m-0">
          <div class="resume-content">
            ${document.querySelector('.resume-content')?.innerHTML || ''}
          </div>
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

  console.log("color", document.querySelector('.resume-content')?.innerHTML || '');
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  return (
    <div className="relative h-full  flex flex-col">
      <PreviewControls
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onDownload={handleDownloadPDF}
      >
        <div className="resume-content">
          {template === 'modern' ? (
            <ModernTemplate
              data={data}
              settings={settings}
              onUpdateData={onDataChange}
              onGenerateWithAI={handleGenerateWithAI}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">{template.charAt(0).toUpperCase() + template.slice(1)} template preview</p>
            </div>
          )}
        </div>
      </PreviewControls>

      <div className="flex-1 overflow-auto relative p-4">
        <Card
          className={cn(
            "resume-content bg-white rounded-lg shadow-md p-0 transition-all duration-200 mx-auto",
            "border border-gray-200"
          )}
          style={{
            width: '100%',
            maxWidth: '720px',
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center top',
            background: '#fff',
          }}
        >
          <div ref={resumeContentRef} className="resume-content">
            {template === 'modern' ? (
              <ModernTemplate
                data={data}
                settings={settings}
                onUpdateData={onDataChange}
                onGenerateWithAI={handleGenerateWithAI}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">{template.charAt(0).toUpperCase() + template.slice(1)} template preview</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResumePreview;
