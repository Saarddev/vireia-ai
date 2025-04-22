
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
    // PDF rendering uses the exact HTML/CSS from preview by cloning resumeContentRef
    const printWindow = window.open('', '_blank');
    if (!printWindow || !resumeContentRef.current) {
      console.error('Failed to open print window or find resume content');
      return;
    }

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
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              margin: 0;
              padding: 0;
              background: #ede9f7;
            }
            @page {
              size: ${settings.paperSize || 'a4'};
              margin: ${
                settings.margins === 'narrow' ? '0.5in' :
                settings.margins === 'wide' ? '1.5in' :
                '1in'
              };
            }
            .resume-content {
              font-family: '${settings.fontFamily || 'Inter'}', sans-serif !important;
              font-size: ${settings.fontSize || 10}pt !important;
              line-height: 1.6 !important;
              color: #232323 !important;
              background: #fff !important;
              box-shadow: 0 0 0 0 #0000;
              border-radius: 16px;
              padding: 48px 56px 38px 56px !important;
              max-width: 720px;
              margin:auto;
            }
            .text-resume-purple { color: ${settings.primaryColor || '#7061e7'} !important; }
            .border-resume-purple { border-color: ${settings.primaryColor || '#7061e7'} !important; }
            .bg-purple-100 { background-color: ${settings.primaryColor || '#7061e7'}20 !important; }
            .highlight { background: ${settings.primaryColor || '#9b87f5'}22 !important; }
            .section-gap { margin-bottom: 40px !important; }
          </style>
        </head>
        <body>
          <div class="resume-content">
            ${resumeContentRef.current.innerHTML}
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

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  return (
    <div className="relative h-full flex flex-col">
      <PreviewControls
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onDownload={handleDownloadPDF}
      >
        {/* Preview in modal: uses same resume content */}
        <div ref={resumeContentRef}>
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

      {/* Main card preview (no duplication, only here) */}
      <div className="flex-1 overflow-auto relative bg-[#ede9f7] dark:bg-gray-800/30 rounded-xl p-4">
        <Card className={cn(
          "resume-content bg-white rounded-2xl shadow-xl p-0 transition-all duration-200 mx-auto",
          "hover:shadow-2xl border border-[#ede9f7]"
        )} style={{
          width: '100%',
          maxWidth: '720px',
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'center top',
          background: '#fff',
        }}>
          {/* The actual resume content */}
          <div ref={resumeContentRef}>
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
