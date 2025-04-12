
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-resume-blue/5 to-resume-teal/5 z-0"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-resume-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-resume-teal/10 rounded-full blur-3xl"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center rounded-full bg-resume-blue/10 px-3 py-1 text-sm text-resume-blue max-w-fit">
              <Sparkles className="mr-1 h-3 w-3" />
              <span>AI-Powered Resume Builder</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl leading-tight">
              Build Your <span className="bg-gradient-to-r from-resume-blue to-resume-teal bg-clip-text text-transparent">Perfect Resume</span> with AI
            </h1>
            <p className="max-w-[600px] text-resume-gray-dark md:text-xl">
              Create professional, ATS-friendly resumes in minutes. Our AI analyzes job descriptions to tailor your resume for higher interview success rates.
            </p>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button size="lg" className="bg-resume-blue hover:bg-resume-blue-dark shadow-lg shadow-resume-blue/20 transition-all duration-300 hover:shadow-xl hover:shadow-resume-blue/30 group">
                Create Your Resume
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-resume-blue text-resume-blue hover:bg-resume-blue/5">View Examples</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm pt-2">
              <div className="flex items-center">
                <div className="mr-2 h-5 w-5 flex items-center justify-center rounded-full bg-resume-blue/10">
                  <Check className="h-3 w-3 text-resume-blue" />
                </div>
                <span>ATS-Friendly</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-5 w-5 flex items-center justify-center rounded-full bg-resume-blue/10">
                  <Check className="h-3 w-3 text-resume-blue" />
                </div>
                <span>Job-Specific</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-5 w-5 flex items-center justify-center rounded-full bg-resume-blue/10">
                  <Check className="h-3 w-3 text-resume-blue" />
                </div>
                <span>5-Min Setup</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px]">
              <div className="rounded-xl border bg-white shadow-xl p-6 relative z-10 backdrop-blur-sm bg-white/70">
                <div className="space-y-5">
                  <div className="h-8 w-[80%] rounded-md bg-gradient-to-r from-resume-blue/30 to-resume-teal/30 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-[90%] rounded-full bg-muted"></div>
                    <div className="h-4 w-[70%] rounded-full bg-muted"></div>
                    <div className="h-4 w-[80%] rounded-full bg-muted"></div>
                  </div>
                  <div className="h-6 w-[60%] rounded-md bg-gradient-to-r from-resume-blue/40 to-resume-teal/40 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-[85%] rounded-full bg-muted"></div>
                    <div className="h-4 w-[90%] rounded-full bg-muted"></div>
                    <div className="h-4 w-[75%] rounded-full bg-muted"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-[90%] h-[90%] rounded-xl bg-gradient-to-br from-resume-blue/20 to-resume-teal/20 z-0 animate-float"></div>
              <div className="absolute -top-3 -left-3 w-24 h-24 bg-resume-blue/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
