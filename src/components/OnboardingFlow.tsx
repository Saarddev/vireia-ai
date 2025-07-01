
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, User, Briefcase, Zap, ArrowRight, Check, Sparkles, Brain, Target, Wand2, Eye, Download, Bot, Layers, Palette } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      title: "Welcome to ResumeAI",
      subtitle: "Your AI-Powered Resume Builder",
      icon: Sparkles,
      description: "Create stunning, ATS-optimized resumes that get you hired. Let our AI guide you through every step of the process.",
      features: [
        { icon: Brain, text: "AI-powered content generation", highlight: "Generate compelling job descriptions instantly" },
        { icon: Target, text: "ATS optimization built-in", highlight: "Beat applicant tracking systems" },
        { icon: Eye, text: "Professional templates", highlight: "Stand out with modern designs" }
      ],
      preview: "WELCOME"
    },
    {
      title: "AI Writing Assistant",
      subtitle: "Let AI craft your perfect content",
      icon: Bot,
      description: "Our intelligent assistant analyzes your experience and generates tailored content that showcases your skills effectively.",
      features: [
        { icon: Wand2, text: "Smart content generation", highlight: "AI writes professional descriptions" },
        { icon: Target, text: "Keyword optimization", highlight: "Match job requirements perfectly" },
        { icon: Sparkles, text: "Industry-specific suggestions", highlight: "Tailored for your field" }
      ],
      preview: "AI_WRITING"
    },
    {
      title: "Resume Builder & Canvas",
      subtitle: "Build and customize with ease",
      icon: Layers,
      description: "Use our intuitive builder to add sections, or switch to canvas mode for pixel-perfect design control.",
      features: [
        { icon: FileText, text: "Drag & drop builder", highlight: "Easy section management" },
        { icon: Palette, text: "Visual canvas editor", highlight: "Fine-tune every detail" },
        { icon: Eye, text: "Real-time preview", highlight: "See changes instantly" }
      ],
      preview: "BUILDER"
    },
    {
      title: "Professional Templates",
      subtitle: "Choose your perfect design",
      icon: Eye,
      description: "Select from our collection of modern, ATS-friendly templates designed by professionals to make you stand out.",
      features: [
        { icon: Briefcase, text: "Multiple template styles", highlight: "Modern, classic, and creative designs" },
        { icon: User, text: "Fully customizable", highlight: "Colors, fonts, and layouts" },
        { icon: Download, text: "Export to PDF", highlight: "Professional quality output" }
      ],
      preview: "TEMPLATES"
    },
    {
      title: "Ready to Build!",
      subtitle: "Start creating your perfect resume",
      icon: Zap,
      description: "Everything is set up! Begin crafting your professional resume with AI assistance and watch your career prospects soar.",
      features: [
        { icon: Sparkles, text: "AI guidance at every step", highlight: "Never get stuck again" },
        { icon: Target, text: "ATS-friendly formatting", highlight: "Pass screening systems" },
        { icon: Check, text: "Export when ready", highlight: "Download your masterpiece" }
      ],
      preview: "SUCCESS"
    }
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep(step + 1);
        setIsAnimating(false);
      }, 400);
    } else {
      onComplete();
    }
  };

  const progress = ((step + 1) / steps.length) * 100;
  const currentStep = steps[step];

  const renderPreview = (previewType: string) => {
    if (previewType === "WELCOME") {
      return (
        <div className="bg-resume-purple/10 backdrop-blur-sm rounded-xl p-6 border border-resume-purple/20">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-resume-purple/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-resume-purple animate-pulse" />
            </div>
            <div className="text-resume-purple font-semibold">AI-Powered Resume Builder</div>
            <div className="text-sm text-resume-gray">Transform your career with intelligent resume creation</div>
          </div>
        </div>
      );
    }

    if (previewType === "AI_WRITING") {
      return (
        <div className="bg-resume-purple/10 backdrop-blur-sm rounded-xl p-6 border border-resume-purple/20 space-y-4">
          <div className="flex items-center gap-3">
            <Bot className="w-5 h-5 text-resume-purple" />
            <span className="text-resume-purple font-medium">AI Assistant</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-resume-purple rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-resume-purple/60 rounded-full animate-pulse animate-delay-200"></div>
              <div className="w-2 h-2 bg-resume-purple/40 rounded-full animate-pulse animate-delay-300"></div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-resume-purple/10">
            <div className="text-sm text-resume-gray space-y-2">
              <div className="font-medium text-resume-purple">Generated Content:</div>
              <div className="italic text-resume-gray-dark">
                "Led a cross-functional team of 8 developers to deliver a high-impact e-commerce platform, resulting in 40% increase in user engagement and $2M revenue growth..."
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (previewType === "BUILDER") {
      return (
        <div className="space-y-4">
          <div className="bg-resume-purple/10 backdrop-blur-sm rounded-xl p-4 border border-resume-purple/20">
            <div className="text-sm text-resume-purple font-medium mb-3">Resume Builder</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-white rounded border">
                <User className="w-4 h-4 text-resume-purple" />
                <span className="text-sm text-resume-gray">Personal Information</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white rounded border">
                <Briefcase className="w-4 h-4 text-resume-purple" />
                <span className="text-sm text-resume-gray">Work Experience</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-resume-purple/20 rounded border border-resume-purple">
                <FileText className="w-4 h-4 text-resume-purple" />
                <span className="text-sm text-resume-purple font-medium">Skills & Achievements</span>
              </div>
            </div>
          </div>
          <div className="bg-resume-purple/10 backdrop-blur-sm rounded-xl p-4 border border-resume-purple/20">
            <div className="text-sm text-resume-purple font-medium mb-3">Canvas Editor</div>
            <div className="bg-white rounded p-3 border aspect-[4/3] relative overflow-hidden">
              <div className="absolute inset-2 border-2 border-dashed border-resume-purple/30 rounded flex items-center justify-center">
                <Palette className="w-6 h-6 text-resume-purple/60" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (previewType === "TEMPLATES") {
      return (
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg border border-resume-purple/20 p-3 aspect-[3/4] relative overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-full bg-gradient-to-b from-resume-purple/5 to-transparent rounded flex flex-col space-y-2">
                <div className="h-3 bg-resume-purple/20 rounded"></div>
                <div className="h-1.5 bg-resume-purple/15 rounded w-3/4"></div>
                <div className="space-y-1 flex-1">
                  <div className="h-1 bg-resume-purple/10 rounded w-full"></div>
                  <div className="h-1 bg-resume-purple/10 rounded w-2/3"></div>
                  <div className="h-1 bg-resume-purple/10 rounded w-3/4"></div>
                </div>
              </div>
              <div className="absolute top-2 right-2 w-4 h-4 bg-resume-purple rounded-full opacity-80"></div>
            </div>
          ))}
        </div>
      );
    }

    if (previewType === "SUCCESS") {
      return (
        <div className="bg-resume-purple/10 backdrop-blur-sm rounded-xl p-6 border border-resume-purple/20 text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-resume-purple/20 rounded-full flex items-center justify-center">
            <Check className="w-10 h-10 text-resume-purple animate-bounce" />
          </div>
          <div className="space-y-2">
            <div className="text-resume-purple font-bold text-lg">You're All Set!</div>
            <div className="text-resume-gray">Ready to create your professional resume</div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-4xl my-8">
        <Card className={`w-full overflow-hidden transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-resume-purple to-resume-violet p-8 text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <currentStep.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/80 mb-2">Step {step + 1} of {steps.length}</div>
                  <Progress className="h-2 w-32 bg-white/20" value={progress} indicatorClassName="bg-white" />
                </div>
              </div>
              
              <CardTitle className="text-3xl font-bold mb-3">
                {currentStep.title}
              </CardTitle>
              <p className="text-xl text-white/90 font-medium">
                {currentStep.subtitle}
              </p>
            </div>
          </div>

          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Content */}
              <div className="space-y-6">
                <p className="text-resume-gray text-lg leading-relaxed">
                  {currentStep.description}
                </p>

                {/* Features */}
                <div className="space-y-4">
                  {currentStep.features.map((feature, index) => (
                    <div 
                      key={index} 
                      className="group p-4 rounded-xl bg-resume-purple/5 border border-resume-purple/10 hover:bg-resume-purple/10 hover:border-resume-purple/20 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-resume-purple/20 flex items-center justify-center flex-shrink-0 group-hover:bg-resume-purple/30 transition-colors">
                          <feature.icon className="w-5 h-5 text-resume-purple" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-resume-gray font-semibold">{feature.text}</div>
                          <div className="text-sm text-resume-gray/70">{feature.highlight}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Preview */}
              <div className="space-y-4">
                <div className="text-lg font-semibold text-resume-purple text-center">Preview</div>
                <div className="min-h-[300px]">
                  {renderPreview(currentStep.preview)}
                </div>
              </div>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === step 
                      ? 'bg-resume-purple scale-125 shadow-lg shadow-resume-purple/30' 
                      : index < step
                      ? 'bg-resume-purple/60'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </CardContent>

          <CardFooter className="p-8 pt-0">
            <Button 
              onClick={nextStep}
              className="w-full bg-resume-purple hover:bg-resume-purple-dark text-white shadow-lg shadow-resume-purple/20 transition-all duration-300 group h-14 text-lg font-medium rounded-xl"
            >
              {step < steps.length - 1 ? (
                <>
                  Continue Journey
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              ) : (
                <>
                  Start Building Now
                  <Sparkles className="ml-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingFlow;
