
import React, { useEffect, useRef } from 'react';
import { 
  Brain, 
  FileText, 
  Sparkles, 
  Search, 
  LineChart, 
  CheckCircle,
  Zap,
  Database,
  Code,
  Timer,
  Network,
  Cpu,
  Globe,
  Cloud,
  Activity
} from 'lucide-react';

const InfrastructureSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const techRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up', 'opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (cardsRef.current) {
      cardsRef.current.forEach(card => {
        if (card) observer.observe(card);
      });
    }
    if (techRef.current) observer.observe(techRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (cardsRef.current) {
        cardsRef.current.forEach(card => {
          if (card) observer.unobserve(card);
        });
      }
      if (techRef.current) observer.unobserve(techRef.current);
    };
  }, []);

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-resume-gray-light relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
      
      <div className="container px-4 md:px-6 relative">
        <div ref={titleRef} className="flex flex-col items-center text-center space-y-4 mb-16 opacity-0 translate-y-10 transition-all duration-700">
          <div className="inline-flex items-center rounded-full bg-resume-violet/10 px-3 py-1 text-sm text-resume-violet max-w-fit mb-2">
            <Zap className="mr-1 h-3.5 w-3.5" />
            <span>AI Technology</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-gradient-to-br from-resume-gray-dark to-resume-purple/90 bg-clip-text text-transparent">How Our AI Technology Works</h2>
          <p className="max-w-[700px] text-resume-gray md:text-lg">
            Our advanced AI infrastructure analyzes thousands of successful resumes and job descriptions to create the perfect match for your career goals
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div 
            ref={el => cardsRef.current[0] = el}
            className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group relative overflow-hidden opacity-0 translate-y-10 transition-all duration-700"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-resume-purple/5 rounded-bl-full -mr-10 -mt-10 group-hover:bg-resume-purple/10 transition-colors duration-300"></div>
            <div className="w-16 h-16 rounded-full bg-resume-purple/10 flex items-center justify-center mb-5 group-hover:bg-resume-purple/20 transition-colors duration-300 relative z-10">
              <Search className="h-8 w-8 text-resume-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Job Analysis</h3>
            <p className="text-resume-gray">Our AI scans the job description to identify key skills, requirements, and preferences</p>
          </div>

          <div 
            ref={el => cardsRef.current[1] = el}
            className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group relative overflow-hidden opacity-0 translate-y-10 transition-all duration-700 delay-100"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-resume-purple/5 rounded-bl-full -mr-10 -mt-10 group-hover:bg-resume-purple/10 transition-colors duration-300"></div>
            <div className="w-16 h-16 rounded-full bg-resume-purple/10 flex items-center justify-center mb-5 group-hover:bg-resume-purple/20 transition-colors duration-300 relative z-10">
              <Brain className="h-8 w-8 text-resume-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Content Optimization</h3>
            <p className="text-resume-gray">AI generates tailored content that highlights your relevant skills and experience</p>
          </div>

          <div 
            ref={el => cardsRef.current[2] = el}
            className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group relative overflow-hidden opacity-0 translate-y-10 transition-all duration-700 delay-200"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-resume-purple/5 rounded-bl-full -mr-10 -mt-10 group-hover:bg-resume-purple/10 transition-colors duration-300"></div>
            <div className="w-16 h-16 rounded-full bg-resume-purple/10 flex items-center justify-center mb-5 group-hover:bg-resume-purple/20 transition-colors duration-300 relative z-10">
              <CheckCircle className="h-8 w-8 text-resume-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-3">ATS Verification</h3>
            <p className="text-resume-gray">Your resume is tested against ATS systems to ensure maximum visibility to employers</p>
          </div>
        </div>

        <div 
          ref={techRef} 
          className="mt-20 bg-white rounded-xl p-8 md:p-10 shadow-xl border border-gray-100 backdrop-blur-sm relative overflow-hidden opacity-0 translate-y-10 transition-all duration-700 delay-300"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-resume-violet/5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-resume-purple/5 rounded-full blur-2xl"></div>
          
          <div className="grid gap-8 md:grid-cols-2 items-center relative">
            <div className="space-y-5">
              <div className="inline-flex items-center rounded-full bg-resume-violet/10 px-3 py-1 text-sm text-resume-violet">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                <span>Smart Technology</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-resume-gray-dark to-resume-purple bg-clip-text text-transparent">Powered by Advanced ML Models</h3>
              <p className="text-resume-gray">
                Our proprietary machine learning models are trained on millions of successful resumes and job placements to identify patterns that lead to interview callbacks.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-violet/10 shrink-0 mt-0.5">
                    <CheckCircle className="h-3.5 w-3.5 text-resume-violet" />
                  </div>
                  <span>Natural language processing for keyword optimization</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-violet/10 shrink-0 mt-0.5">
                    <CheckCircle className="h-3.5 w-3.5 text-resume-violet" />
                  </div>
                  <span>Predictive analytics for skills relevance</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-violet/10 shrink-0 mt-0.5">
                    <CheckCircle className="h-3.5 w-3.5 text-resume-violet" />
                  </div>
                  <span>ATS simulation testing for maximum visibility</span>
                </li>
              </ul>
            </div>
            
            {/* AI Connection Animation */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-resume-gray-light/50 to-white rounded-xl overflow-hidden flex items-center justify-center p-6 border border-gray-100 shadow-inner">
                
                {/* Central AI Brain */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-resume-purple to-resume-violet rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Brain className="h-10 w-10 text-white" />
                  </div>
                  
                  {/* Pulsing rings around central brain */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-2 border-resume-purple/20 rounded-full animate-ping"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-44 h-44 border border-resume-violet/10 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </div>

                {/* Orbiting AI Components */}
                <div className="absolute inset-0">
                  {/* Database Component */}
                  <div className="absolute top-8 left-8 w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center animate-float">
                    <Database className="h-5 w-5 text-resume-purple" />
                  </div>
                  
                  {/* Cloud Component */}
                  <div className="absolute top-8 right-8 w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                    <Cloud className="h-5 w-5 text-resume-violet" />
                  </div>
                  
                  {/* Network Component */}
                  <div className="absolute bottom-8 left-8 w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
                    <Network className="h-5 w-5 text-resume-purple" />
                  </div>
                  
                  {/* CPU Component */}
                  <div className="absolute bottom-8 right-8 w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center animate-float" style={{ animationDelay: '1.5s' }}>
                    <Cpu className="h-5 w-5 text-resume-violet" />
                  </div>
                  
                  {/* Globe Component */}
                  <div className="absolute top-1/2 left-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
                    <Globe className="h-4 w-4 text-resume-purple" />
                  </div>
                  
                  {/* Activity Component */}
                  <div className="absolute top-1/2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center animate-float" style={{ animationDelay: '2.5s' }}>
                    <Activity className="h-4 w-4 text-resume-violet" />
                  </div>
                </div>

                {/* Connecting Lines (animated) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9b87f5" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  
                  {/* Animated connection lines */}
                  <line x1="50%" y1="50%" x2="15%" y2="20%" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse">
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
                  </line>
                  <line x1="50%" y1="50%" x2="85%" y2="20%" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '0.5s' }}>
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" begin="0.5s" />
                  </line>
                  <line x1="50%" y1="50%" x2="15%" y2="80%" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '1s' }}>
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" begin="1s" />
                  </line>
                  <line x1="50%" y1="50%" x2="85%" y2="80%" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '1.5s' }}>
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" begin="1.5s" />
                  </line>
                  <line x1="50%" y1="50%" x2="5%" y2="50%" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '2s' }}>
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" begin="2s" />
                  </line>
                  <line x1="50%" y1="50%" x2="95%" y2="50%" stroke="url(#connectionGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '2.5s' }}>
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" begin="2.5s" />
                  </line>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
