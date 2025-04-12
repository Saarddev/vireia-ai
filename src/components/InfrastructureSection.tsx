
import React from 'react';
import { 
  Brain, 
  FileText, 
  Sparkles, 
  Search, 
  LineChart, 
  CheckCircle 
} from 'lucide-react';

const InfrastructureSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-resume-gray-light">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How Our AI Technology Works</h2>
          <p className="max-w-[700px] text-resume-gray md:text-lg">
            Our advanced AI infrastructure analyzes thousands of successful resumes and job descriptions to create the perfect match for your career goals
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="w-12 h-12 rounded-full bg-resume-blue/10 flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-resume-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Job Analysis</h3>
            <p className="text-resume-gray">Our AI scans the job description to identify key skills, requirements, and preferences</p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="w-12 h-12 rounded-full bg-resume-blue/10 flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-resume-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Content Optimization</h3>
            <p className="text-resume-gray">AI generates tailored content that highlights your relevant skills and experience</p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border">
            <div className="w-12 h-12 rounded-full bg-resume-blue/10 flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-resume-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">ATS Verification</h3>
            <p className="text-resume-gray">Your resume is tested against ATS systems to ensure maximum visibility to employers</p>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-xl p-6 md:p-8 shadow-lg border">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-resume-teal/10 px-3 py-1 text-sm text-resume-teal">
                <Sparkles className="mr-1 h-3 w-3" />
                <span>Smart Technology</span>
              </div>
              <h3 className="text-2xl font-bold">Powered by Advanced ML Models</h3>
              <p className="text-resume-gray">
                Our proprietary machine learning models are trained on millions of successful resumes and job placements to identify patterns that lead to interview callbacks.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-resume-teal mr-2 shrink-0 mt-0.5" />
                  <span>Natural language processing for keyword optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-resume-teal mr-2 shrink-0 mt-0.5" />
                  <span>Predictive analytics for skills relevance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-resume-teal mr-2 shrink-0 mt-0.5" />
                  <span>ATS simulation testing for maximum visibility</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-video bg-resume-gray-light rounded-lg overflow-hidden flex items-center justify-center p-4">
                <div className="grid grid-cols-2 gap-4 w-full max-w-[400px]">
                  <div className="space-y-4">
                    <div className="h-24 bg-white rounded p-3 shadow-sm">
                      <div className="h-4 w-1/2 bg-resume-blue/20 rounded mb-2"></div>
                      <div className="h-3 w-full bg-resume-gray-light rounded mb-1"></div>
                      <div className="h-3 w-3/4 bg-resume-gray-light rounded"></div>
                    </div>
                    <div className="h-24 bg-white rounded p-3 shadow-sm">
                      <LineChart className="h-6 w-6 text-resume-blue mb-2" />
                      <div className="h-3 w-full bg-resume-gray-light rounded mb-1"></div>
                      <div className="h-3 w-2/3 bg-resume-gray-light rounded"></div>
                    </div>
                  </div>
                  <div className="h-[180px] bg-white rounded p-3 shadow-sm flex flex-col">
                    <FileText className="h-6 w-6 text-resume-blue mb-2" />
                    <div className="space-y-1 flex-grow">
                      <div className="h-3 w-full bg-resume-gray-light rounded"></div>
                      <div className="h-3 w-3/4 bg-resume-gray-light rounded"></div>
                      <div className="h-3 w-5/6 bg-resume-gray-light rounded"></div>
                      <div className="h-3 w-2/3 bg-resume-gray-light rounded"></div>
                    </div>
                    <div className="h-6 w-full bg-resume-blue/20 rounded-full mt-auto"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-[90%] h-[90%] rounded-lg border border-resume-teal/30 bg-white/50 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
