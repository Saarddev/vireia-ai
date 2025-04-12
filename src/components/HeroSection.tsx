
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="inline-flex items-center rounded-lg bg-resume-blue/10 px-3 py-1 text-sm text-resume-blue max-w-fit">
              <Sparkles className="mr-1 h-3 w-3" />
              <span>AI-Powered Resume Builder</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Build Your <span className="text-resume-blue">Perfect Resume</span> with AI
            </h1>
            <p className="max-w-[600px] text-resume-gray-dark md:text-xl">
              Create professional, ATS-friendly resumes in minutes. Our AI analyzes job descriptions to tailor your resume for higher interview success rates.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-resume-blue hover:bg-resume-blue-dark">Create Your Resume</Button>
              <Button size="lg" variant="outline">View Examples</Button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Check className="mr-1 h-4 w-4 text-resume-blue" />
                <span>ATS-Friendly</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-1 h-4 w-4 text-resume-blue" />
                <span>Job-Specific</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-1 h-4 w-4 text-resume-blue" />
                <span>5-Min Setup</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px]">
              <div className="rounded-lg border bg-background shadow-lg p-6 relative z-10">
                <div className="space-y-4">
                  <div className="h-8 w-[80%] rounded-md bg-resume-blue/10 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-[90%] rounded bg-muted"></div>
                    <div className="h-4 w-[70%] rounded bg-muted"></div>
                    <div className="h-4 w-[80%] rounded bg-muted"></div>
                  </div>
                  <div className="h-6 w-[60%] rounded-md bg-resume-blue/20 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-[85%] rounded bg-muted"></div>
                    <div className="h-4 w-[90%] rounded bg-muted"></div>
                    <div className="h-4 w-[75%] rounded bg-muted"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-[90%] h-[90%] rounded-lg border bg-resume-teal/5 z-0 animate-float"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
