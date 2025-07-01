
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, User, Briefcase, Zap, ArrowRight, Check, Sparkles, Target, Users, TrendingUp, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [animation, setAnimation] = useState('animate-scale-up');
  const [showConfetti, setShowConfetti] = useState(false);

  const steps = [
    {
      title: "Welcome to ResumeAI!",
      subtitle: "Your Career Journey Starts Here",
      icon: FileText,
      description: "Transform your career with AI-powered resumes that get noticed by top employers and pass ATS systems effortlessly.",
      features: ["ATS-Optimized Templates", "AI-Powered Content", "Real-time Feedback"],
      color: "from-resume-purple to-resume-violet",
      bgGradient: "from-purple-50 via-blue-50 to-violet-50"
    },
    {
      title: "Tell Your Story",
      subtitle: "Showcase Your Professional Journey",
      icon: User,
      description: "Our AI analyzes your experience and crafts compelling narratives that highlight your unique strengths and achievements.",
      features: ["Smart Content Suggestions", "Industry-Specific Keywords", "Achievement Quantification"],
      color: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 via-cyan-50 to-teal-50"
    },
    {
      title: "Target Your Goals",
      subtitle: "Land Your Dream Job",
      icon: Target,
      description: "Customize resumes for specific roles and industries. Our platform helps you stand out in competitive job markets.",
      features: ["Role-Specific Optimization", "Industry Insights", "Interview Preparation"],
      color: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 via-teal-50 to-green-50"
    },
    {
      title: "You're All Set!",
      subtitle: "Ready to Accelerate Your Career",
      icon: Zap,
      description: "Join thousands of professionals who've transformed their careers. Your success story starts now!",
      features: ["24/7 AI Assistant", "Unlimited Revisions", "Export to Multiple Formats"],
      color: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50 via-orange-50 to-yellow-50"
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
      setShowConfetti(true);
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  };

  const progress = ((step + 1) / steps.length) * 100;
  const currentStep = steps[step];

  // Floating elements animation
  useEffect(() => {
    const interval = setInterval(() => {
      // This will trigger re-renders for floating animations
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br ${currentStep.color}/20 rounded-full blur-3xl animate-float`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br ${currentStep.color}/15 rounded-full blur-3xl animate-float`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br ${currentStep.color}/10 rounded-full blur-2xl animate-float`} style={{ animationDelay: '4s' }}></div>
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-20 animate-float">
          <Star className="w-6 h-6 text-yellow-400 opacity-60" />
        </div>
        <div className="absolute top-32 right-32 animate-float" style={{ animationDelay: '1s' }}>
          <Sparkles className="w-8 h-8 text-purple-400 opacity-50" />
        </div>
        <div className="absolute bottom-40 left-1/3 animate-float" style={{ animationDelay: '3s' }}>
          <TrendingUp className="w-5 h-5 text-green-400 opacity-40" />
        </div>
        <div className="absolute bottom-20 right-20 animate-float" style={{ animationDelay: '2.5s' }}>
          <Users className="w-6 h-6 text-blue-400 opacity-50" />
        </div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-gradient-to-r ${currentStep.color} rounded-full animate-ping`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <Card className={`w-full max-w-2xl ${animation} backdrop-blur-xl bg-white/95 border-0 shadow-2xl rounded-3xl overflow-hidden`}>
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
          <div 
            className={`h-full bg-gradient-to-r ${currentStep.color} transition-all duration-700 ease-out`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <CardHeader className="relative text-center pb-4 pt-8 px-8">
          {/* Main Icon with Glow Effect */}
          <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${currentStep.color} flex items-center justify-center mx-auto mb-6 shadow-2xl`}>
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${currentStep.color} animate-pulse opacity-40`}></div>
            <currentStep.icon className="w-10 h-10 text-white relative z-10" />
          </div>

          <CardTitle className={`text-3xl font-bold bg-gradient-to-r ${currentStep.color} bg-clip-text text-transparent mb-2`}>
            {currentStep.title}
          </CardTitle>
          <p className="text-lg text-gray-600 font-medium">{currentStep.subtitle}</p>
        </CardHeader>

        <CardContent className="px-8 pb-6">
          <p className="text-gray-700 text-center text-lg leading-relaxed mb-6">
            {currentStep.description}
          </p>

          {/* Feature List */}
          <div className="grid grid-cols-1 gap-3 mb-6">
            {currentStep.features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-md transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${currentStep.color} flex items-center justify-center flex-shrink-0`}>
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center gap-3 pt-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`relative transition-all duration-500 ${
                  index === step 
                    ? `w-8 h-3 rounded-full bg-gradient-to-r ${currentStep.color} shadow-lg` 
                    : index < step
                    ? 'w-3 h-3 rounded-full bg-green-400'
                    : 'w-3 h-3 rounded-full bg-gray-200'
                }`}
              >
                {index === step && (
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${currentStep.color} animate-pulse opacity-60`}></div>
                )}
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="px-8 pb-8 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Step {step + 1} of {steps.length}
          </div>
          
          <Button 
            onClick={nextStep}
            className={`bg-gradient-to-r ${currentStep.color} hover:opacity-90 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group text-lg`}
            disabled={showConfetti}
          >
            {step < steps.length - 1 ? (
              <>
                Continue Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            ) : (
              <>
                Start Creating
                <Sparkles className="ml-2 h-5 w-5 animate-pulse" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
