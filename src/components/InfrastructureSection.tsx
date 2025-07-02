
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
  GitBranch,
  Globe,
  Shield,
  Target,
  Layers,
  Workflow
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
              <stop offset="0%" stopColor="#9b87f5" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
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
          
          {/* AI/ML Network Nodes Animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Neural Network Processing Node */}
            <div className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/30 rounded-xl flex items-center justify-center shadow-lg border border-blue-300/20 animate-float">
              <Brain className="h-8 w-8 text-blue-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="absolute -bottom-6 text-xs font-medium text-blue-700">Neural Network</span>
            </div>
            
            {/* Natural Language Processing Node */}
            <div 
              className="absolute top-16 right-24 w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/30 rounded-lg flex items-center justify-center shadow-lg border border-green-300/20 animate-float"
              style={{ animationDelay: '0.8s' }}
            >
              <FileText className="h-6 w-6 text-green-600" />
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              <span className="absolute -bottom-6 text-xs font-medium text-green-700">NLP Engine</span>
            </div>
            
            {/* Data Processing Node */}
            <div 
              className="absolute bottom-24 left-16 w-18 h-18 bg-gradient-to-br from-purple-500/20 to-purple-600/30 rounded-xl flex items-center justify-center shadow-lg border border-purple-300/20 animate-float"
              style={{ animationDelay: '1.2s' }}
            >
              <Database className="h-7 w-7 text-purple-600" />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="absolute -bottom-8 text-xs font-medium text-purple-700">Data Pipeline</span>
            </div>
            
            {/* Pattern Recognition Node */}
            <div 
              className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/30 rounded-lg flex items-center justify-center shadow-lg border border-orange-300/20 animate-float"
              style={{ animationDelay: '1.6s' }}
            >
              <Target className="h-6 w-6 text-orange-600" />
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-orange-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <span className="absolute -bottom-6 text-xs font-medium text-orange-700">Pattern AI</span>
            </div>
            
            {/* Machine Learning Core Node */}
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-resume-purple/30 to-resume-violet/40 rounded-2xl flex items-center justify-center shadow-xl border-2 border-resume-purple/30 animate-float"
              style={{ animationDelay: '0.4s' }}
            >
              <Cpu className="h-10 w-10 text-resume-purple" />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-resume-purple rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-resume-violet rounded-full animate-ping" style={{ animationDelay: '0.7s' }}></div>
              <span className="absolute -bottom-8 text-sm font-semibold text-resume-purple">ML Core</span>
            </div>
            
            {/* Optimization Engine Node */}
            <div 
              className="absolute top-32 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-pink-500/20 to-pink-600/30 rounded-lg flex items-center justify-center shadow-lg border border-pink-300/20 animate-float"
              style={{ animationDelay: '2s' }}
            >
              <Zap className="h-5 w-5 text-pink-600" />
              <div className="absolute -right-1 -bottom-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
              <span className="absolute -bottom-6 text-xs font-medium text-pink-700">Optimizer</span>
            </div>
            
            {/* Model Validation Node */}
            <div 
              className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-teal-500/20 to-teal-600/30 rounded-lg flex items-center justify-center shadow-lg border border-teal-300/20 animate-float"
              style={{ animationDelay: '2.4s' }}
            >
              <CheckCircle className="h-5 w-5 text-teal-600" />
              <div className="absolute -left-1 -top-1 w-2 h-2 bg-teal-500 rounded-full animate-ping"></div>
              <span className="absolute -bottom-6 text-xs font-medium text-teal-700">Validator</span>
            </div>

            {/* Dynamic Connection Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-60">
              <defs>
                <linearGradient id="nodeConnection1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#9333EA" stopOpacity="0.4"/>
                </linearGradient>
                <linearGradient id="nodeConnection2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4"/>
                </linearGradient>
                <filter id="nodeGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Central Hub Connections */}
              <g className="animate-pulse" style={{ animationDuration: '3s' }}>
                <path d="M 50% 50% L 20% 20%" stroke="url(#nodeConnection1)" strokeWidth="2" filter="url(#nodeGlow)" className="animate-pulse" />
                <path d="M 50% 50% L 80% 20%" stroke="url(#nodeConnection2)" strokeWidth="2" filter="url(#nodeGlow)" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                <path d="M 50% 50% L 20% 80%" stroke="url(#nodeConnection1)" strokeWidth="2" filter="url(#nodeGlow)" className="animate-pulse" style={{ animationDelay: '1s' }} />
                <path d="M 50% 50% L 80% 80%" stroke="url(#nodeConnection2)" strokeWidth="2" filter="url(#nodeGlow)" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
                <path d="M 50% 50% L 50% 25%" stroke="url(#nodeConnection1)" strokeWidth="2" filter="url(#nodeGlow)" className="animate-pulse" style={{ animationDelay: '2s' }} />
                <path d="M 50% 50% L 50% 75%" stroke="url(#nodeConnection2)" strokeWidth="2" filter="url(#nodeGlow)" className="animate-pulse" style={{ animationDelay: '2.5s' }} />
              </g>
              
              {/* Inter-node Connections */}
              <g className="animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <path d="M 20% 20% Q 50% 15% 80% 20%" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.6" filter="url(#nodeGlow)" />
                <path d="M 20% 80% Q 50% 85% 80% 80%" stroke="#3B82F6" strokeWidth="1.5" opacity="0.6" filter="url(#nodeGlow)" />
              </g>
              
              {/* Data Flow Particles */}
              <g>
                <circle r="3" fill="#9333EA" opacity="0.8">
                  <animateMotion dur="4s" repeatCount="indefinite" path="M 20,20 Q 50,15 80,20" />
                </circle>
                <circle r="2" fill="#3B82F6" opacity="0.6">
                  <animateMotion dur="3s" repeatCount="indefinite" path="M 80,80 L 50,50" begin="0.5s" />
                </circle>
                <circle r="2.5" fill="#10B981" opacity="0.7">
                  <animateMotion dur="3.5s" repeatCount="indefinite" path="M 20,80 Q 50,85 80,80" begin="1s" />
                </circle>
              </g>
            </svg>
            
            {/* Processing Indicators */}
            <div className="absolute top-24 left-32 w-2 h-2 bg-blue-500/60 rounded-full animate-ping"></div>
            <div className="absolute top-28 right-36 w-1.5 h-1.5 bg-green-500/60 rounded-full animate-ping" style={{ animationDelay: '0.8s' }}></div>
            <div className="absolute bottom-32 left-28 w-2.5 h-2.5 bg-purple-500/60 rounded-full animate-ping" style={{ animationDelay: '1.6s' }}></div>
            <div className="absolute bottom-28 right-32 w-1.5 h-1.5 bg-orange-500/60 rounded-full animate-ping" style={{ animationDelay: '2.4s' }}></div>
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
              
              <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-resume-purple/10 backdrop-blur-md flex items-center justify-center shadow-md animate-float animate-delay-100">
                <Database className="h-6 w-6 text-resume-purple" />
              </div>
              
              <div className="absolute -bottom-5 -right-5 w-12 h-12 rounded-full bg-resume-violet/10 backdrop-blur-md flex items-center justify-center shadow-md animate-float animate-delay-500">
                <Code className="h-6 w-6 text-resume-violet" />
              </div>
              
              <div className="absolute top-1/2 -left-8 w-10 h-10 rounded-full bg-resume-purple/15 backdrop-blur-md flex items-center justify-center shadow-md animate-float animate-delay-300">
                <Network className="h-5 w-5 text-resume-purple" />
              </div>
              
              <div className="absolute top-1/4 -right-8 w-10 h-10 rounded-full bg-resume-violet/15 backdrop-blur-md flex items-center justify-center shadow-md animate-float animate-delay-700">
                <Cpu className="h-5 w-5 text-resume-violet" />
              </div>
              
              <div className="absolute bottom-1/4 -left-6 w-8 h-8 rounded-full bg-blue-500/15 backdrop-blur-md flex items-center justify-center shadow-md animate-float animate-delay-900">
                <Workflow className="h-4 w-4 text-blue-600" />
              </div>
              
              <div className="absolute top-3/4 -right-6 w-8 h-8 rounded-full bg-green-500/15 backdrop-blur-md flex items-center justify-center shadow-md animate-float animate-delay-1100">
                <GitBranch className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
