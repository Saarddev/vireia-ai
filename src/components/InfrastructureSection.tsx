
import React from 'react';
import { 
  Brain, 
  FileText, 
  Sparkles, 
  Search, 
  LineChart, 
  CheckCircle,
  Zap,
  Database,
  Code
} from 'lucide-react';

const InfrastructureSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-resume-gray-light relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
      
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center rounded-full bg-resume-teal/10 px-3 py-1 text-sm text-resume-teal max-w-fit mb-2">
            <Zap className="mr-1 h-3.5 w-3.5" />
            <span>AI Technology</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-gradient-to-br from-resume-gray-dark to-resume-blue/90 bg-clip-text text-transparent">How Our AI Technology Works</h2>
          <p className="max-w-[700px] text-resume-gray md:text-lg">
            Our advanced AI infrastructure analyzes thousands of successful resumes and job descriptions to create the perfect match for your career goals
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-resume-blue/5 rounded-bl-full -mr-10 -mt-10 group-hover:bg-resume-blue/10 transition-colors duration-300"></div>
            <div className="w-16 h-16 rounded-full bg-resume-blue/10 flex items-center justify-center mb-5 group-hover:bg-resume-blue/20 transition-colors duration-300 relative z-10">
              <Search className="h-8 w-8 text-resume-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Job Analysis</h3>
            <p className="text-resume-gray">Our AI scans the job description to identify key skills, requirements, and preferences</p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-resume-blue/5 rounded-bl-full -mr-10 -mt-10 group-hover:bg-resume-blue/10 transition-colors duration-300"></div>
            <div className="w-16 h-16 rounded-full bg-resume-blue/10 flex items-center justify-center mb-5 group-hover:bg-resume-blue/20 transition-colors duration-300 relative z-10">
              <Brain className="h-8 w-8 text-resume-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Content Optimization</h3>
            <p className="text-resume-gray">AI generates tailored content that highlights your relevant skills and experience</p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-resume-blue/5 rounded-bl-full -mr-10 -mt-10 group-hover:bg-resume-blue/10 transition-colors duration-300"></div>
            <div className="w-16 h-16 rounded-full bg-resume-blue/10 flex items-center justify-center mb-5 group-hover:bg-resume-blue/20 transition-colors duration-300 relative z-10">
              <CheckCircle className="h-8 w-8 text-resume-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-3">ATS Verification</h3>
            <p className="text-resume-gray">Your resume is tested against ATS systems to ensure maximum visibility to employers</p>
          </div>
        </div>

        <div className="mt-20 bg-white rounded-xl p-8 md:p-10 shadow-xl border border-gray-100 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-resume-teal/5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-resume-blue/5 rounded-full blur-2xl"></div>
          
          <div className="grid gap-8 md:grid-cols-2 items-center relative">
            <div className="space-y-5">
              <div className="inline-flex items-center rounded-full bg-resume-teal/10 px-3 py-1 text-sm text-resume-teal">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                <span>Smart Technology</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-resume-gray-dark to-resume-blue bg-clip-text text-transparent">Powered by Advanced ML Models</h3>
              <p className="text-resume-gray">
                Our proprietary machine learning models are trained on millions of successful resumes and job placements to identify patterns that lead to interview callbacks.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-teal/10 shrink-0 mt-0.5">
                    <CheckCircle className="h-3.5 w-3.5 text-resume-teal" />
                  </div>
                  <span>Natural language processing for keyword optimization</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-teal/10 shrink-0 mt-0.5">
                    <CheckCircle className="h-3.5 w-3.5 text-resume-teal" />
                  </div>
                  <span>Predictive analytics for skills relevance</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-teal/10 shrink-0 mt-0.5">
                    <CheckCircle className="h-3.5 w-3.5 text-resume-teal" />
                  </div>
                  <span>ATS simulation testing for maximum visibility</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-resume-gray-light/50 to-white rounded-xl overflow-hidden flex items-center justify-center p-6 border border-gray-100 shadow-inner">
                <div className="grid grid-cols-2 gap-4 w-full max-w-[400px]">
                  <div className="space-y-4">
                    <div className="h-24 bg-white rounded-lg p-3 shadow-md">
                      <div className="h-4 w-1/2 bg-gradient-to-r from-resume-blue/30 to-resume-teal/30 rounded mb-2"></div>
                      <div className="h-3 w-full bg-resume-gray-light rounded mb-1"></div>
                      <div className="h-3 w-3/4 bg-resume-gray-light rounded"></div>
                    </div>
                    <div className="h-24 bg-white rounded-lg p-3 shadow-md">
                      <LineChart className="h-6 w-6 text-resume-blue mb-2" />
                      <div className="h-3 w-full bg-resume-gray-light rounded mb-1"></div>
                      <div className="h-3 w-2/3 bg-resume-gray-light rounded"></div>
                    </div>
                  </div>
                  <div className="h-[180px] bg-white rounded-lg p-3 shadow-md flex flex-col">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-resume-blue" />
                      <div className="h-3 w-1/2 bg-resume-blue/20 rounded"></div>
                    </div>
                    <div className="space-y-1.5 flex-grow mt-3">
                      <div className="h-2.5 w-full bg-resume-gray-light rounded"></div>
                      <div className="h-2.5 w-3/4 bg-resume-gray-light rounded"></div>
                      <div className="h-2.5 w-5/6 bg-resume-gray-light rounded"></div>
                      <div className="h-2.5 w-2/3 bg-resume-gray-light rounded"></div>
                    </div>
                    <div className="h-6 w-full bg-gradient-to-r from-resume-blue/20 to-resume-teal/20 rounded-full mt-auto"></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shadow-md">
                <Database className="h-5 w-5 text-resume-blue" />
              </div>
              
              <div className="absolute -bottom-5 -right-5 w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center shadow-md">
                <Code className="h-5 w-5 text-resume-teal" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
