
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, User, Briefcase, Zap, ArrowRight, Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [animation, setAnimation] = useState('animate-scale-up');

  const steps = [
    {
      title: "Welcome to ResumeAI!",
      icon: FileText,
      description: "Create professional resumes that get you hired. Let's get started with a quick tour."
    },
    {
      title: "Tell us about yourself",
      icon: User,
      description: "We'll use your professional background to create personalized resume templates."
    },
    {
      title: "Set your career goals",
      icon: Briefcase,
      description: "Target specific jobs and industries with tailored resumes."
    },
    {
      title: "You're all set!",
      icon: Zap,
      description: "Your dashboard is ready. Start creating your first resume now."
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className={`w-full max-w-md ${animation}`}>
        <CardHeader className="space-y-2 text-center pb-2">
          <div className="w-16 h-16 rounded-full bg-resume-purple/10 flex items-center justify-center mx-auto mb-4">
            <currentStep.icon className="w-8 h-8 text-resume-purple" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">
            {currentStep.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-resume-gray text-center">{currentStep.description}</p>
          <Progress className="h-2" value={progress} />
          <div className="flex justify-center gap-2 pt-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === step ? 'bg-resume-purple' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={nextStep}
            className="bg-resume-purple hover:bg-resume-purple-dark shadow-lg shadow-resume-purple/20 transition-all duration-300 group"
          >
            {step < steps.length - 1 ? (
              <>
                Continue 
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            ) : (
              <>
                Get Started
                <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
