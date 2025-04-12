
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Star, Building, User, ArrowRight, Sparkles } from 'lucide-react';

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-resume-blue/5 to-resume-teal/5 z-0"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-resume-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-resume-teal/5 rounded-full blur-3xl"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center rounded-full bg-resume-blue/10 px-3 py-1 text-sm text-resume-blue max-w-fit mb-2">
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            <span>Flexible Options</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-gradient-to-br from-resume-gray-dark to-resume-blue bg-clip-text text-transparent">Choose Your Plan</h2>
          <p className="max-w-[700px] text-resume-gray md:text-lg">
            Select the perfect plan that suits your career needs and goals
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 z-10">
          {/* Free Plan */}
          <div className="flex flex-col p-8 bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 group-hover:bg-gray-300 transition-colors duration-300"></div>
            <div className="mb-5">
              <h3 className="text-xl font-semibold">Free</h3>
              <div className="mt-2 flex items-baseline">
                <span className="text-4xl font-bold">$0</span>
                <span className="ml-1 text-resume-gray">/month</span>
              </div>
              <p className="mt-4 text-resume-gray">Perfect for students or first-time job seekers</p>
            </div>
            <ul className="space-y-4 py-6 flex-grow">
              <li className="flex">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-gray-100 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-gray-dark" />
                </div>
                <span>1 resume template</span>
              </li>
              <li className="flex">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-gray-100 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-gray-dark" />
                </div>
                <span>Basic AI suggestions</span>
              </li>
              <li className="flex">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-gray-100 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-gray-dark" />
                </div>
                <span>PDF export</span>
              </li>
              <li className="flex text-resume-gray">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-gray-100/50 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-gray/40" />
                </div>
                <span>Limited to 1 resume</span>
              </li>
            </ul>
            <Button variant="outline" className="mt-auto group-hover:bg-gray-100 transition-colors duration-300">
              Get Started
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="flex flex-col p-8 rounded-xl shadow-xl relative border border-resume-blue/20 bg-white scale-105 z-20">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-resume-blue to-resume-teal"></div>
            <div className="absolute -top-4 left-0 w-full flex justify-center">
              <div className="bg-gradient-to-r from-resume-blue to-resume-teal text-white text-sm font-medium px-4 py-1 rounded-full flex items-center shadow-md">
                <Star className="mr-1 h-3.5 w-3.5" />
                Popular Choice
              </div>
            </div>
            <div className="mb-5">
              <h3 className="text-xl font-semibold text-resume-blue">Pro</h3>
              <div className="mt-2 flex items-baseline">
                <span className="text-4xl font-bold">$15</span>
                <span className="ml-1 text-resume-gray">/month</span>
              </div>
              <p className="mt-4 text-resume-gray">Ideal for professionals actively job hunting</p>
            </div>
            <ul className="space-y-4 py-6 text-resume-gray-dark flex-grow">
              <li className="flex">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-blue/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-blue" />
                </div>
                <span>10 premium templates</span>
              </li>
              <li className="flex">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-blue/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-blue" />
                </div>
                <span>Advanced AI job matching</span>
              </li>
              <li className="flex">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-blue/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-blue" />
                </div>
                <span>Multiple export formats</span>
              </li>
              <li className="flex">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-blue/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-blue" />
                </div>
                <span>Up to 5 different resumes</span>
              </li>
              <li className="flex">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-blue/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-blue" />
                </div>
                <span>Cover letter assistance</span>
              </li>
            </ul>
            <Button className="mt-auto bg-gradient-to-r from-resume-blue to-resume-teal hover:from-resume-blue-dark hover:to-resume-teal shadow-lg shadow-resume-blue/20 transition-all duration-300 hover:shadow-xl hover:shadow-resume-blue/30 group">
              Subscribe Now
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div className="flex flex-col p-8 bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-resume-gray-dark/20 group-hover:bg-resume-gray-dark/30 transition-colors duration-300"></div>
            <div className="mb-5">
              <h3 className="text-xl font-semibold">Enterprise</h3>
              <div className="mt-2 flex items-baseline">
                <span className="text-4xl font-bold bg-gradient-to-r from-resume-gray-dark to-resume-gray bg-clip-text text-transparent">Custom</span>
              </div>
              <p className="mt-4 text-resume-gray">For teams and career service organizations</p>
            </div>
            <ul className="space-y-4 py-6 flex-grow">
              <li className="flex">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-gray-dark/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-gray-dark" />
                </div>
                <span>All Pro features</span>
              </li>
              <li className="flex">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-gray-dark/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-gray-dark" />
                </div>
                <span>Unlimited resumes & templates</span>
              </li>
              <li className="flex">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-gray-dark/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-gray-dark" />
                </div>
                <span>Team management dashboard</span>
              </li>
              <li className="flex">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-gray-dark/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-gray-dark" />
                </div>
                <span>Analytics and reporting</span>
              </li>
              <li className="flex">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-gray-dark/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-gray-dark" />
                </div>
                <span>API access</span>
              </li>
              <li className="flex">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-gray-dark/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-gray-dark" />
                </div>
                <span>Dedicated support</span>
              </li>
            </ul>
            <Button variant="outline" className="flex items-center justify-center gap-2 mt-auto group-hover:bg-resume-gray-dark/5 border-resume-gray-dark/20 hover:border-resume-gray-dark/30 transition-colors duration-300">
              <Building className="h-4 w-4" />
              <span>Contact Sales</span>
            </Button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-resume-gray mb-4">Not sure which plan is right for you?</p>
          <Button variant="link" className="text-resume-blue hover:text-resume-blue-dark">View Full Comparison</Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
