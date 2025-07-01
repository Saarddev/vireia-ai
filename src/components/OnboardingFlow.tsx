
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, User, Briefcase, Zap, ArrowRight, Check, Sparkles, Brain, Target, Wand2, Eye, Download } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [animation, setAnimation] = useState('animate-scale-up');

  const steps = [
    {
      title: "Welcome to ResumeAI",
      subtitle: "Your AI-Powered Resume Builder",
      icon: Sparkles,
      description: "Create stunning, ATS-optimized resumes that get you hired. Let our AI guide you through the process.",
      features: [
        { icon: Brain, text: "AI-powered content generation" },
        { icon: Target, text: "ATS optimization built-in" },
        { icon: Eye, text: "Professional templates" }
      ],
      gradient: "from-resume-purple via-resume-violet to-purple-600"
    },
    {
      title: "AI-Powered Writing Assistant",
      subtitle: "Let AI craft your perfect resume",
      icon: Wand2,
      description: "Our intelligent assistant helps you write compelling job descriptions, optimize keywords, and tailor content for specific roles.",
      features: [
        { icon: FileText, text: "Auto-generate job descriptions" },
        { icon: Target, text: "Keyword optimization" },
        { icon: Sparkles, text: "Industry-specific suggestions" }
      ],
      gradient: "from-blue-500 via-resume-purple to-resume-violet",
      preview: "AI_WRITING"
    },
    {
      title: "Professional Templates",
      subtitle: "Choose from stunning designs",
      icon: Eye,
      description: "Select from our collection of modern, professional templates designed to make you stand out to employers.",
      features: [
        { icon: FileText, text: "Multiple template styles" },
        { icon: User, text: "Customizable layouts" },
        { icon: Download, text: "Export to PDF instantly" }
      ],
      gradient: "from-green-500 via-teal-500 to-resume-purple",
      preview: "TEMPLATES"
    },
    {
      title: "You're Ready to Build!",
      subtitle: "Start creating your perfect resume",
      icon: Zap,
      description: "Everything is set up! Begin crafting your professional resume with AI assistance and watch your career prospects soar.",
      features: [
        { icon: Sparkles, text: "AI guidance every step" },
        { icon: Target, text: "ATS-friendly formatting" },
        { icon: Check, text: "Export when ready" }
      ],
      gradient: "from-resume-purple via-resume-violet to-pink-500"
    }
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setAnimation('animate-fade-out');
      setTimeout(() => {
        setStep(step + 1);
        setAnimation('animate-scale-up');
      }, 300);
    } else {
      onComplete();
    }
  };

  const progress = ((step + 1) / steps.length) * 100;
  const currentStep = steps[step];

  const renderPreview = (previewType: string) => {
    if (previewType === "AI_WRITING") {
      return (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <div className="text-xs text-white/80 mb-2">AI Assistant</div>
          <div className="bg-white/20 rounded p-3 text-sm text-white">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-yellow-300" />
              <span className="text-yellow-300">Generating content...</span>
            </div>
            <div className="text-white/90 italic">
              "Led a cross-functional team of 8 developers to deliver a high-impact e-commerce platform, resulting in 40% increase in user engagement..."
            </div>
          </div>
        </div>
      );
    }

    if (previewType === "TEMPLATES") {
      return (
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/10 backdrop-blur-sm rounded border border-white/20 p-2 aspect-[3/4]">
            <div className="h-full bg-gradient-to-b from-white/20 to-white/5 rounded flex flex-col">
              <div className="h-2 bg-white/30 rounded mb-1"></div>
              <div className="h-1 bg-white/20 rounded mb-2"></div>
              <div className="space-y-1 flex-1">
                <div className="h-1 bg-white/15 rounded w-3/4"></div>
                <div className="h-1 bg-white/15 rounded w-1/2"></div>
                <div className="h-1 bg-white/15 rounded w-2/3"></div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded border border-white/20 p-2 aspect-[3/4]">
            <div className="h-full bg-gradient-to-b from-white/20 to-white/5 rounded flex flex-col">
              <div className="h-2 bg-white/30 rounded mb-1"></div>
              <div className="h-1 bg-white/20 rounded mb-2"></div>
              <div className="space-y-1 flex-1">
                <div className="h-1 bg-white/15 rounded w-2/3"></div>
                <div className="h-1 bg-white/15 rounded w-3/4"></div>
                <div className="h-1 bg-white/15 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <Card className={`w-full max-w-2xl ${animation} overflow-hidden`}>
        {/* Gradient Header */}
        <div className={`bg-gradient-to-r ${currentStep.gradient} p-6 text-white relative overflow-hidden`}>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <currentStep.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                <div className="text-sm text-white/80">Step {step + 1} of {steps.length}</div>
                <Progress className="h-1.5 w-24 bg-white/20" value={progress} indicatorClassName="bg-white" />
              </div>
            </div>
            
            <CardTitle className="text-2xl font-bold mb-2">
              {currentStep.title}
            </CardTitle>
            <p className="text-lg text-white/90 font-medium">
              {currentStep.subtitle}
            </p>
          </div>
        </div>

        <CardContent className="p-6 space-y-6">
          <p className="text-resume-gray text-center text-lg leading-relaxed">
            {currentStep.description}
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-3">
            {currentStep.features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-3 rounded-lg bg-resume-purple/5 border border-resume-purple/10 hover:bg-resume-purple/10 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-resume-purple/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-4 h-4 text-resume-purple" />
                </div>
                <span className="text-resume-gray font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Preview Section */}
          {currentStep.preview && (
            <div className="mt-6">
              <div className="text-sm font-medium text-resume-gray mb-3 text-center">Preview</div>
              <div className={`bg-gradient-to-r ${currentStep.gradient} p-4 rounded-lg`}>
                {renderPreview(currentStep.preview)}
              </div>
            </div>
          )}

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 pt-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === step 
                    ? 'bg-resume-purple scale-125' 
                    : index < step
                    ? 'bg-resume-purple/60'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Button 
            onClick={nextStep}
            className="w-full bg-resume-purple hover:bg-resume-purple-dark text-white shadow-lg shadow-resume-purple/20 transition-all duration-300 group h-12 text-lg font-medium"
          >
            {step < steps.length - 1 ? (
              <>
                Continue Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            ) : (
              <>
                Start Building Now
                <Sparkles className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
