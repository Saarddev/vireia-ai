
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
  Cpu
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

      {/* Animated connection lines */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-20">
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9b87f5" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M 100 200 Q 300 100 500 200 T 900 200"
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
            className="animate-pulse"
          />
          <path
            d="M 200 400 Q 400 300 600 400 T 1000 400"
            stroke="url(#connectionGradient)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>

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
            className="flex flex-col items-center text-center p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:bg-white/90 transition-all duration-300 group relative overflow-hidden opacity-0 translate-y-10 transition-all duration-700"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-resume-purple/5 rounded-bl-full -mr-10 -mt-10 group-hover:bg-resume-purple/10 transition-colors duration-300"></div>
            <div className="w-16 h-16 rounded-full bg-resume-purple/10 flex items-center justify-center mb-5 group-hover:bg-resume-purple/20 group-hover:scale-110 transition-all duration-300 relative z-10">
              <Search className="h-8 w-8 text-resume-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Job Analysis</h3>
            <p className="text-resume-gray">Our AI scans the job description to identify key skills, requirements, and preferences</p>

            {/* Floating connection indicators */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-resume-purple/20 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-resume-violet/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>

          <div
            ref={el => cardsRef.current[1] = el}
            className="flex flex-col items-center text-center p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:bg-white/90 transition-all duration-300 group relative overflow-hidden opacity-0 translate-y-10 transition-all duration-700 delay-100"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-resume-purple/5 rounded-bl-full -mr-10 -mt-10 group-hover:bg-resume-purple/10 transition-colors duration-300"></div>
            <div className="w-16 h-16 rounded-full bg-resume-purple/10 flex items-center justify-center mb-5 group-hover:bg-resume-purple/20 group-hover:scale-110 transition-all duration-300 relative z-10">
              <Brain className="h-8 w-8 text-resume-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Content Optimization</h3>
            <p className="text-resume-gray">AI generates tailored content that highlights your relevant skills and experience</p>

            {/* Neural network effect */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-resume-purple/30 rounded-full animate-ping"></div>
            <div className="absolute top-6 right-8 w-1.5 h-1.5 bg-resume-violet/30 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute top-8 right-6 w-1 h-1 bg-resume-purple/40 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
          </div>

          <div
            ref={el => cardsRef.current[2] = el}
            className="flex flex-col items-center text-center p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:bg-white/90 transition-all duration-300 group relative overflow-hidden opacity-0 translate-y-10 transition-all duration-700 delay-200"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-resume-purple/5 rounded-bl-full -mr-10 -mt-10 group-hover:bg-resume-purple/10 transition-colors duration-300"></div>
            <div className="w-16 h-16 rounded-full bg-resume-purple/10 flex items-center justify-center mb-5 group-hover:bg-resume-purple/20 group-hover:scale-110 transition-all duration-300 relative z-10">
              <CheckCircle className="h-8 w-8 text-resume-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-3">ATS Verification</h3>
            <p className="text-resume-gray">Your resume is tested against ATS systems to ensure maximum visibility to employers</p>

            {/* Verification indicators */}
            <div className="absolute bottom-4 left-4 w-3 h-3 bg-green-400/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-6 left-8 w-2 h-2 bg-green-500/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        <div
          ref={techRef}
          className="mt-20 bg-white/70 backdrop-blur-lg rounded-xl p-8 md:p-10 shadow-xl border border-gray-100 relative overflow-hidden opacity-0 translate-y-10 transition-all duration-700 delay-300"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-resume-violet/5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-resume-purple/5 rounded-full blur-2xl"></div>

          {/* Animated AI connection network */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-2 h-2 bg-resume-purple/40 rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-resume-violet/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-20 left-20 w-2.5 h-2.5 bg-resume-purple/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-10 right-10 w-1 h-1 bg-resume-violet/50 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full opacity-30">
              <line x1="40" y1="40" x2="calc(100% - 80px)" y2="80" stroke="url(#connectionGradient)" strokeWidth="1" className="animate-pulse" />
              <line x1="80" y1="calc(100% - 80px)" x2="calc(100% - 40px)" y2="calc(100% - 40px)" stroke="url(#connectionGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
            </svg>
          </div>

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
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-resume-gray-light/30 to-white/80 backdrop-blur-sm rounded-xl overflow-hidden flex items-center justify-center p-6 border border-gray-100 shadow-inner">
                <div className="grid grid-cols-2 gap-4 w-full max-w-[400px]">
                  <div className="space-y-4">
                    <div className="h-24 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md transform hover:scale-105 transition-transform duration-300">
                      <div className="h-4 w-1/2 bg-gradient-to-r from-resume-purple/30 to-resume-violet/30 rounded mb-2"></div>
                      <div className="h-3 w-full bg-resume-gray-light rounded mb-1"></div>
                      <div className="h-3 w-3/4 bg-resume-gray-light rounded"></div>
                    </div>
                    <div className="h-24 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md transform hover:scale-105 transition-transform duration-300">
                      <LineChart className="h-6 w-6 text-resume-purple mb-2" />
                      <div className="h-3 w-full bg-resume-gray-light rounded mb-1"></div>
                      <div className="h-3 w-2/3 bg-resume-gray-light rounded"></div>
                    </div>
                  </div>
                  <div className="h-[180px] bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md flex flex-col transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-resume-purple" />
                      <div className="h-3 w-1/2 bg-resume-purple/20 rounded"></div>
                    </div>
                    <div className="space-y-1.5 flex-grow mt-3">
                      <div className="h-2.5 w-full bg-resume-gray-light rounded"></div>
                      <div className="h-2.5 w-3/4 bg-resume-gray-light rounded"></div>
                      <div className="h-2.5 w-5/6 bg-resume-gray-light rounded"></div>
                      <div className="h-2.5 w-2/3 bg-resume-gray-light rounded"></div>
                    </div>
                    <div className="h-6 w-full bg-gradient-to-r from-resume-purple/20 to-resume-violet/20 rounded-full mt-auto"></div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-resume-purple/10 backdrop-blur-md flex items-center justify-center shadow-md animate-float animate-delay-100">
                <Database className="h-5 w-5 text-resume-purple" />
              </div>

              <div className="absolute -bottom-5 -right-5 w-10 h-10 rounded-full bg-resume-violet/10 backdrop-blur-md flex items-center justify-center shadow-md animate-float animate-delay-500">
                <Code className="h-5 w-5 text-resume-violet" />
              </div>

              <div className="absolute top-1/2 -left-8 w-8 h-8 rounded-full bg-resume-purple/15 backdrop-blur-md flex items-center justify-center shadow-md animate-float animate-delay-300">
                <Network className="h-4 w-4 text-resume-purple" />
              </div>

              <div className="absolute top-1/4 -right-8 w-8 h-8 rounded-full bg-resume-violet/15 backdrop-blur-md flex items-center justify-center shadow-md animate-float animate-delay-700">
                <Cpu className="h-4 w-4 text-resume-violet" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
