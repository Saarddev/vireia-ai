
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
            
            {/* AI/ML Node Network Visualization */}
            <div className="relative h-96 bg-gradient-to-br from-gray-900/5 to-slate-900/10 rounded-2xl overflow-hidden border border-gray-200/50 backdrop-blur-sm">
              {/* Background grid pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              {/* Central AI Core */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-resume-purple to-resume-violet rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20 animate-pulse">
                <Brain className="h-10 w-10 text-white" />
                <div className="absolute inset-0 rounded-full bg-resume-purple/20 animate-ping"></div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-resume-purple whitespace-nowrap">AI Core</div>
              </div>

              {/* ML Component Nodes */}
              {/* Natural Language Processing */}
              <div className="absolute top-8 left-8 w-14 h-14 bg-gradient-to-br from-blue-500/80 to-blue-600/90 rounded-xl flex items-center justify-center shadow-lg border border-blue-300/30 animate-float">
                <FileText className="h-7 w-7 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-blue-700 whitespace-nowrap">NLP Engine</div>
              </div>

              {/* Pattern Recognition */}
              <div className="absolute top-8 right-8 w-14 h-14 bg-gradient-to-br from-green-500/80 to-green-600/90 rounded-xl flex items-center justify-center shadow-lg border border-green-300/30 animate-float" style={{ animationDelay: '0.5s' }}>
                <Target className="h-7 w-7 text-white" />
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-green-700 whitespace-nowrap">Pattern AI</div>
              </div>

              {/* Data Pipeline */}
              <div className="absolute bottom-8 left-8 w-14 h-14 bg-gradient-to-br from-purple-500/80 to-purple-600/90 rounded-xl flex items-center justify-center shadow-lg border border-purple-300/30 animate-float" style={{ animationDelay: '1s' }}>
                <Database className="h-7 w-7 text-white" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-purple-700 whitespace-nowrap">Data Pipeline</div>
              </div>

              {/* Optimization Engine */}
              <div className="absolute bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-orange-500/80 to-orange-600/90 rounded-xl flex items-center justify-center shadow-lg border border-orange-300/30 animate-float" style={{ animationDelay: '1.5s' }}>
                <Zap className="h-7 w-7 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-orange-700 whitespace-nowrap">Optimizer</div>
              </div>

              {/* Skill Analyzer */}
              <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-pink-500/80 to-pink-600/90 rounded-lg flex items-center justify-center shadow-lg border border-pink-300/30 animate-float" style={{ animationDelay: '2s' }}>
                <Layers className="h-6 w-6 text-white" />
                <div className="absolute -right-1 -bottom-1 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-pink-700 whitespace-nowrap">Skills AI</div>
              </div>

              {/* ATS Simulator */}
              <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-teal-500/80 to-teal-600/90 rounded-lg flex items-center justify-center shadow-lg border border-teal-300/30 animate-float" style={{ animationDelay: '2.5s' }}>
                <Shield className="h-6 w-6 text-white" />
                <div className="absolute -left-1 -top-1 w-2 h-2 bg-teal-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-teal-700 whitespace-nowrap">ATS Sim</div>
              </div>

              {/* Dynamic Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="connectionLine1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3"/>
                  </linearGradient>
                  <linearGradient id="connectionLine2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.3"/>
                  </linearGradient>
                  <filter id="lineGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Central hub connections */}
                <g className="animate-pulse" style={{ animationDuration: '3s' }}>
                  <line x1="50%" y1="50%" x2="15%" y2="15%" stroke="url(#connectionLine1)" strokeWidth="2" filter="url(#lineGlow)" opacity="0.8" />
                  <line x1="50%" y1="50%" x2="85%" y2="15%" stroke="url(#connectionLine2)" strokeWidth="2" filter="url(#lineGlow)" opacity="0.8" />
                  <line x1="50%" y1="50%" x2="15%" y2="85%" stroke="url(#connectionLine1)" strokeWidth="2" filter="url(#lineGlow)" opacity="0.8" />
                  <line x1="50%" y1="50%" x2="85%" y2="85%" stroke="url(#connectionLine2)" strokeWidth="2" filter="url(#lineGlow)" opacity="0.8" />
                  <line x1="50%" y1="50%" x2="50%" y2="25%" stroke="url(#connectionLine1)" strokeWidth="2" filter="url(#lineGlow)" opacity="0.8" />
                  <line x1="50%" y1="50%" x2="50%" y2="75%" stroke="url(#connectionLine2)" strokeWidth="2" filter="url(#lineGlow)" opacity="0.8" />
                </g>
                
                {/* Inter-node connections */}
                <g className="animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                  <path d="M 15% 15% Q 50% 10% 85% 15%" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.5" filter="url(#lineGlow)" fill="none" />
                  <path d="M 15% 85% Q 50% 90% 85% 85%" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5" filter="url(#lineGlow)" fill="none" />
                </g>
                
                {/* Data flow particles */}
                <g>
                  <circle r="2" fill="#8B5CF6" opacity="0.8">
                    <animateMotion dur="3s" repeatCount="indefinite">
                      <path d="M 15,15 L 50,50" />
                    </animateMotion>
                  </circle>
                  <circle r="2" fill="#10B981" opacity="0.8">
                    <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.5s">
                      <path d="M 85,15 L 50,50" />
                    </animateMotion>
                  </circle>
                  <circle r="2" fill="#F59E0B" opacity="0.8">
                    <animateMotion dur="4s" repeatCount="indefinite" begin="1s">
                      <path d="M 15,85 L 50,50" />
                    </animateMotion>
                  </circle>
                  <circle r="2" fill="#EF4444" opacity="0.8">
                    <animateMotion dur="3.2s" repeatCount="indefinite" begin="1.5s">
                      <path d="M 85,85 L 50,50" />
                    </animateMotion>
                  </circle>
                </g>
              </svg>

              {/* Processing indicators */}
              <div className="absolute top-16 left-16 w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-ping"></div>
              <div className="absolute top-16 right-16 w-1.5 h-1.5 bg-green-400/60 rounded-full animate-ping" style={{ animationDelay: '0.8s' }}></div>
              <div className="absolute bottom-16 left-16 w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-ping" style={{ animationDelay: '1.6s' }}></div>
              <div className="absolute bottom-16 right-16 w-1.5 h-1.5 bg-orange-400/60 rounded-full animate-ping" style={{ animationDelay: '2.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
