
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { scanResumeWithATS, optimizeResumeForATS, ATSScanResult } from '@/utils/resumeATSScanner';
import { ResumeData } from '@/types/resume';
import ATSAnalysisResult from './ATSAnalysisResult';
import { Wand2, FileInput, FileQuestion, FileSearch, FileCheck } from 'lucide-react';
import { toast } from 'sonner';

interface ATSScannerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resumeData: ResumeData;
  onUpdateResume?: (updatedResume: ResumeData) => void;
}

const ATSScannerDialog: React.FC<ATSScannerDialogProps> = ({
  open,
  onOpenChange,
  resumeData,
  onUpdateResume
}) => {
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [scanResult, setScanResult] = useState<ATSScanResult | null>(null);
  const [activeTab, setActiveTab] = useState('scan');
  const [isLoading, setIsLoading] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleScan = async () => {
    if (!resumeData) {
      toast.error('No resume data available to analyze');
      return;
    }

    try {
      setIsLoading(true);
      const result = await scanResumeWithATS(resumeData, jobDescription);
      setScanResult(result);
      setActiveTab('results');
      toast.success('ATS analysis completed successfully!');
    } catch (error) {
      console.error('Error scanning resume:', error);
      toast.error('Failed to complete ATS analysis');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptimize = async () => {
    if (!jobDescription) {
      toast.error('Please enter a job description to optimize against');
      return;
    }

    try {
      setIsOptimizing(true);
      const { optimizedResume, changes } = await optimizeResumeForATS(resumeData, jobDescription);
      
      if (onUpdateResume) {
        onUpdateResume(optimizedResume);
        toast.success('Resume optimized for ATS!', {
          description: `${changes.length} improvements applied to your resume`
        });
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Error optimizing resume:', error);
      toast.error('Failed to optimize resume');
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center">
            <FileSearch className="mr-2 h-5 w-5 text-purple-600" />
            ATS Resume Scanner
          </DialogTitle>
          <DialogDescription>
            Analyze how your resume performs against Applicant Tracking Systems and optimize it for job applications
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="scan" className="flex items-center gap-1">
              <FileQuestion className="h-4 w-4" />
              Scan Setup
            </TabsTrigger>
            <TabsTrigger value="results" disabled={!scanResult} className="flex items-center gap-1">
              <FileCheck className="h-4 w-4" />
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scan" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="job-title">Job Title</Label>
                <input
                  id="job-title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Senior Software Engineer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1 text-sm"
                />
              </div>
              
              <div>
                <Label htmlFor="job-description">Job Description (Optional)</Label>
                <Textarea
                  id="job-description"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here to get more targeted ATS analysis..."
                  className="min-h-[200px] mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Adding a job description will improve the accuracy of the ATS analysis by matching keywords and requirements.
                </p>
              </div>

              <div className="flex justify-between items-center bg-purple-50 p-3 rounded-md">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-purple-900">How does the ATS scanner work?</h4>
                  <p className="text-xs text-purple-800">
                    Our AI scans your resume like an ATS would, checking format, content, and keyword matches.
                    You'll get detailed feedback and optimization tips.
                  </p>
                </div>
                <Wand2 className="h-8 w-8 text-purple-500" />
              </div>
            </div>

            <DialogFooter>
              <Button 
                onClick={handleScan} 
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FileSearch className="mr-2 h-4 w-4" />
                    Scan Resume
                  </>
                )}
              </Button>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="results">
            {scanResult && (
              <ATSAnalysisResult 
                result={scanResult} 
                jobTitle={jobTitle}
                onOptimize={handleOptimize}
                loading={isOptimizing}
              />
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ATSScannerDialog;
