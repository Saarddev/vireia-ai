
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, ArrowRight, Award, Clock, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();
  
  // Check authentication status
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsSignedIn(!!session);
    });
    
    // Initial check
    supabase.auth.getSession().then(({ data: { session }}) => {
      setIsSignedIn(!!session);
    });
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate('/dashboard');
    } else {
      navigate('/sign-up');
    }
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-resume-purple/5 to-resume-violet/5 z-0"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-resume-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-resume-violet/10 rounded-full blur-3xl"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-6">
            <div className={`inline-flex items-center rounded-full bg-resume-purple/10 px-3 py-1 text-sm text-resume-purple max-w-fit transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Sparkles className="mr-1 h-3 w-3" />
              <span>AI-Powered Resume Builder</span>
            </div>
            <h1 className={`text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Build Your <span className="bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">Perfect Resume</span> with AI
            </h1>
            <p className={`max-w-[600px] text-resume-gray-dark md:text-xl transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Create professional, ATS-friendly resumes in minutes. Our AI analyzes job descriptions to tailor your resume for higher interview success rates.
            </p>
            
            <div className={`flex items-center p-3 rounded-lg bg-gradient-to-r from-resume-purple/10 to-resume-violet/10 border border-resume-purple/20 transition-all duration-700 delay-250 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Award className="h-5 w-5 text-resume-purple mr-2 flex-shrink-0" />
              <p className="text-sm font-medium">
                <span className="text-resume-purple font-bold">New Users Special:</span> 7-day free trial with all Pro features + Resume review by HR experts
              </p>
            </div>
            
            <div className={`flex flex-col gap-3 min-[400px]:flex-row transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Button 
                size="lg" 
                className="bg-resume-purple hover:bg-resume-purple-dark shadow-lg shadow-resume-purple/20 transition-all duration-300 hover:shadow-xl hover:shadow-resume-purple/30 group"
                onClick={handleGetStarted}
              >
                Create Your Resume
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-resume-purple text-resume-purple hover:bg-resume-purple/5">View Examples</Button>
            </div>
            
            <div className={`flex flex-wrap items-center gap-4 text-sm pt-2 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center">
                <div className="mr-2 h-5 w-5 flex items-center justify-center rounded-full bg-resume-purple/10">
                  <Check className="h-3 w-3 text-resume-purple" />
                </div>
                <span>ATS-Friendly</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-5 w-5 flex items-center justify-center rounded-full bg-resume-purple/10">
                  <Check className="h-3 w-3 text-resume-purple" />
                </div>
                <span>Job-Specific</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-5 w-5 flex items-center justify-center rounded-full bg-resume-purple/10">
                  <Check className="h-3 w-3 text-resume-purple" />
                </div>
                <span>5-Min Setup</span>
              </div>
            </div>
            
            <div className={`grid grid-cols-3 gap-4 pt-4 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="text-center">
                <div className="text-2xl font-bold text-resume-purple">85%</div>
                <div className="text-xs text-resume-gray-dark">Interview Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-resume-purple">200k+</div>
                <div className="text-xs text-resume-gray-dark">Resumes Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-resume-purple">4.9/5</div>
                <div className="text-xs text-resume-gray-dark">User Rating</div>
              </div>
            </div>
          </div>
          
          <div className={`flex items-center justify-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative w-full max-w-[500px]">
              <div className={`rounded-xl border bg-white shadow-xl p-6 relative z-10 backdrop-blur-sm bg-white/70 transition-all duration-500 ${scrolled ? 'scale-105' : 'hover:scale-105'}`}>
                <div className="space-y-5">
                  <div className="h-8 w-[80%] rounded-md bg-gradient-to-r from-resume-purple/30 to-resume-violet/30 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-[90%] rounded-full bg-muted"></div>
                    <div className="h-4 w-[70%] rounded-full bg-muted"></div>
                    <div className="h-4 w-[80%] rounded-full bg-muted"></div>
                  </div>
                  <div className="h-6 w-[60%] rounded-md bg-gradient-to-r from-resume-purple/40 to-resume-violet/40 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-[85%] rounded-full bg-muted"></div>
                    <div className="h-4 w-[90%] rounded-full bg-muted"></div>
                    <div className="h-4 w-[75%] rounded-full bg-muted"></div>
                  </div>
                  
                  <div className="mt-2 border-t pt-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <BarChart className="h-4 w-4 text-resume-purple mr-1" />
                        <span className="text-xs font-medium">ATS Score</span>
                      </div>
                      <span className="text-xs font-bold text-resume-purple">98%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-resume-purple to-resume-violet rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`absolute -bottom-6 -right-6 w-[90%] h-[90%] rounded-xl bg-gradient-to-br from-resume-purple/20 to-resume-violet/20 z-0 transition-all duration-1000 ${scrolled ? 'animate-float' : ''}`}></div>
              <div className="absolute -top-3 -left-3 w-24 h-24 bg-resume-purple/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
