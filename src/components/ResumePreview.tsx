import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import ModernTemplate from './resume-preview/ModernTemplate';
import PreviewControls from './resume-preview/PreviewControls';

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
    if (!printWindow || !resumeContentRef.current) return;

    const resumeHTMLContent = resumeContentRef.current.outerHTML;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${data.personal.name} - Resume</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            @page {
              size: ${settings.paperSize || 'a4'} portrait;
              margin: 0;
            }
            html, body {
              margin: 0;
              padding: 0;
              font-family: ${settings.fontFamily || 'Inter'}, system-ui, sans-serif;
              font-size: ${settings.fontSize || 10}pt;
              line-height: 1.5;
              color: #000;
              background: #fff;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            * {
              box-sizing: border-box;
            }
            .resume-content {
              width: 210mm;
              min-height: 297mm;
              padding: 25mm;
              margin: 0 auto;
              background: white;
            }
            a {
              color: inherit;
              text-decoration: none;
            }
            @media print {
              html, body {
                width: 210mm;
                height: 297mm;
              }
              .resume-content {
                padding: 25mm;
              }
            }
          </style>
          ${settings.fontFamily ?
        `<link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily}:wght@400;500;600;700&display=swap" rel="stylesheet">`
        : ''
      }
        </head>
        <body>
          <div class="resume-content">
            ${resumeHTMLContent}
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
      />

      <div className="flex-1 overflow-auto relative p-4">
        <Card
          className={cn(
            "resume-content mx-auto transition-all duration-200",
            "border border-gray-200"
          )}
          style={{
            width: '100%',
            maxWidth: '720px',
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center top',
          }}
        >
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
