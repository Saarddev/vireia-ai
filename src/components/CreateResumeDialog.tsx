
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createEnhancedResume } from '@/services/resumeEnhancementService';
import { toast } from 'sonner';
import { 
  FileText, 
  Linkedin, 
  Loader, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  AlertCircle,
  User,
  Briefcase,
  GraduationCap
} from 'lucide-react';

export interface CreateResumeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onResumeCreated?: () => Promise<void>;
}

interface CreationStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  icon: React.ReactNode;
}

export default function CreateResumeDialog({
  open,
  onOpenChange,
  onResumeCreated
}: CreateResumeDialogProps) {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const creationSteps: CreationStep[] = [
    {
      id: 'validate',
      title: 'Validating LinkedIn Profile',
      description: 'Checking profile accessibility and data quality',
      status: 'pending',
      icon: <User className="h-4 w-4" />
    },
    {
      id: 'fetch',
      title: 'Extracting Profile Data',
      description: 'Gathering your professional information',
      status: 'pending',
      icon: <Briefcase className="h-4 w-4" />
    },
    {
      id: 'enhance',
      title: 'AI Enhancement',
      description: 'Optimizing content with artificial intelligence',
      status: 'pending',
      icon: <Sparkles className="h-4 w-4" />
    },
    {
      id: 'generate',
      title: 'Generating Resume',
      description: 'Creating your professional resume',
      status: 'pending',
      icon: <FileText className="h-4 w-4" />
    }
  ];

  const [steps, setSteps] = useState(creationSteps);

  const resetForm = () => {
    setLinkedinUrl('');
    setResumeName('');
    setError(null);
    setCurrentStep(0);
    setSteps(creationSteps);
  };

  const handleOpenChange = (newOpenState: boolean) => {
    if (!newOpenState && !isCreating) {
      resetForm();
    }
    onOpenChange(newOpenState);
  };

  const updateStepStatus = (stepIndex: number, status: CreationStep['status']) => {
    setSteps(prev => prev.map((step, index) => 
      index === stepIndex ? { ...step, status } : step
    ));
  };

  const validateLinkedInUrl = (url: string): boolean => {
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-_]+\/?(\?.*)?$/;
    return linkedinRegex.test(url);
  };

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!linkedinUrl.trim()) {
      setError('Please enter your LinkedIn profile URL');
      return;
    }

    if (!validateLinkedInUrl(linkedinUrl)) {
      setError('Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/yourname)');
      return;
    }

    setError(null);
    setIsCreating(true);
    setCurrentStep(0);

    try {
      // Step 1: Validate
      updateStepStatus(0, 'processing');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate validation
      updateStepStatus(0, 'completed');
      setCurrentStep(1);

      // Step 2: Fetch LinkedIn data
      updateStepStatus(1, 'processing');
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate data fetching
      updateStepStatus(1, 'completed');
      setCurrentStep(2);

      // Step 3: AI Enhancement
      updateStepStatus(2, 'processing');
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate AI processing
      updateStepStatus(2, 'completed');
      setCurrentStep(3);

      // Step 4: Generate Resume
      updateStepStatus(3, 'processing');
      
      await createEnhancedResume(linkedinUrl, resumeName || 'My Professional Resume');
      
      updateStepStatus(3, 'completed');
      
      toast.success('🎉 Resume created successfully!', {
        description: 'Your AI-enhanced resume is ready for customization'
      });
      
      if (onResumeCreated) {
        await onResumeCreated();
      }
      
      // Wait a moment to show completion before closing
      setTimeout(() => {
        handleOpenChange(false);
      }, 1000);

    } catch (error: any) {
      console.error('Error creating resume:', error);
      const currentStepIndex = steps.findIndex(step => step.status === 'processing');
      if (currentStepIndex !== -1) {
        updateStepStatus(currentStepIndex, 'error');
      }
      
      setError(error.message || 'Failed to create resume. Please try again.');
      toast.error('Failed to create resume', {
        description: error.message || 'Please check your LinkedIn URL and try again'
      });
    } finally {
      setIsCreating(false);
    }
  };

  const getStepIcon = (step: CreationStep) => {
    switch (step.status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <Loader className="h-4 w-4 animate-spin text-blue-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return step.icon;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              Create AI-Enhanced Resume
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Transform your LinkedIn profile into a professional, ATS-optimized resume using AI
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          {!isCreating ? (
            <form onSubmit={handleCreate} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Resume Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g., Software Engineer Resume"
                    value={resumeName}
                    onChange={(e) => setResumeName(e.target.value)}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <p className="text-xs text-gray-500">
                    Give your resume a descriptive name for easy identification
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-sm font-semibold flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                    LinkedIn Profile URL
                  </Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/yourname"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Make sure your LinkedIn profile is public or accessible
                  </p>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="text-red-700 text-sm">{error}</div>
                </div>
              )}

              <Card className="border-purple-200 bg-purple-50/50">
                <div className="p-4">
                  <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    What happens next?
                  </h4>
                  <div className="space-y-2 text-sm text-purple-800">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span>Extract your professional experience and skills</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span>Enhance descriptions with AI for better impact</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span>Generate ATS-friendly formatting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span>Create multiple template options</span>
                    </div>
                  </div>
                </div>
              </Card>

              <DialogFooter>
                <Button 
                  type="submit" 
                  disabled={isCreating}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 transition-all duration-200"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Create AI Resume
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="py-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-purple-600 animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Creating Your Resume
                </h3>
                <p className="text-gray-600">
                  Please wait while we process your LinkedIn profile
                </p>
              </div>

              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                      step.status === 'completed' 
                        ? 'bg-green-50 border-green-200' 
                        : step.status === 'processing'
                        ? 'bg-blue-50 border-blue-200'
                        : step.status === 'error'
                        ? 'bg-red-50 border-red-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {getStepIcon(step)}
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium text-gray-900">{step.title}</div>
                      <div className="text-sm text-gray-600">{step.description}</div>
                    </div>
                    {step.status === 'completed' && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Done
                      </Badge>
                    )}
                    {step.status === 'processing' && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Processing
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
