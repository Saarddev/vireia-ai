
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Eye, Download, ZoomIn, ZoomOut } from 'lucide-react';

interface PreviewControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onDownload: () => void;
  children: React.ReactNode;
}

const PreviewControls: React.FC<PreviewControlsProps> = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onDownload,
  children
}) => {
  return (
    <div className="flex justify-between items-center mb-4 sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl py-3 px-4 rounded-xl z-10 shadow-sm">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="hover:border-resume-purple hover:text-resume-purple transition-all duration-300"
          >
            <Eye className="h-4 w-4 mr-2" /> Preview
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-7xl w-[95vw] h-[90vh] overflow-y-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
          <div className="flex justify-end gap-2 mb-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onDownload}
              className="hover:border-resume-purple hover:text-resume-purple transition-all duration-300"
            >
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </div>
          <Card className="h-full bg-white p-8 shadow-md overflow-y-auto">
            {children}
          </Card>
        </DialogContent>
      </Dialog>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onZoomOut}
          disabled={zoomLevel <= 0.5}
          className="hover:border-resume-purple hover:text-resume-purple transition-all duration-300"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="text-xs font-medium w-16 text-center">{Math.round(zoomLevel * 100)}%</span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onZoomIn}
          disabled={zoomLevel >= 2}
          className="hover:border-resume-purple hover:text-resume-purple transition-all duration-300"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onDownload}
          className="ml-2 hover:border-resume-purple hover:text-resume-purple transition-all duration-300"
        >
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
      </div>
    </div>
  );
};

export default PreviewControls;
