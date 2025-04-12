
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Star, Building, User } from 'lucide-react';

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Choose Your Plan</h2>
          <p className="max-w-[700px] text-resume-gray md:text-lg">
            Select the perfect plan that suits your career needs and goals
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Free Plan */}
          <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm border">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Free</h3>
              <div className="mt-2 flex items-baseline">
                <span className="text-3xl font-bold">$0</span>
                <span className="ml-1 text-resume-gray">/month</span>
              </div>
              <p className="mt-4 text-resume-gray">Perfect for students or first-time job seekers</p>
            </div>
            <ul className="space-y-3 py-4 flex-grow">
              <li className="flex">
                <Check className="h-5 w-5 text-resume-blue mr-2 shrink-0" />
                <span>1 resume template</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-resume-blue mr-2 shrink-0" />
                <span>Basic AI suggestions</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-resume-blue mr-2 shrink-0" />
                <span>PDF export</span>
              </li>
              <li className="flex text-resume-gray">
                <Check className="h-5 w-5 text-resume-gray/40 mr-2 shrink-0" />
                <span>Limited to 1 resume</span>
              </li>
            </ul>
            <Button variant="outline" className="mt-auto">Get Started</Button>
          </div>

          {/* Pro Plan */}
          <div className="flex flex-col p-6 bg-resume-blue rounded-lg shadow-lg relative">
            <div className="absolute -top-4 left-0 w-full flex justify-center">
              <div className="bg-resume-teal text-white text-sm font-medium px-3 py-1 rounded-full flex items-center">
                <Star className="mr-1 h-3.5 w-3.5" />
                Popular Choice
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white">Pro</h3>
              <div className="mt-2 flex items-baseline">
                <span className="text-3xl font-bold text-white">$15</span>
                <span className="ml-1 text-white/80">/month</span>
              </div>
              <p className="mt-4 text-white/80">Ideal for professionals actively job hunting</p>
            </div>
            <ul className="space-y-3 py-4 text-white flex-grow">
              <li className="flex">
                <Check className="h-5 w-5 text-white mr-2 shrink-0" />
                <span>10 premium templates</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-white mr-2 shrink-0" />
                <span>Advanced AI job matching</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-white mr-2 shrink-0" />
                <span>Multiple export formats</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-white mr-2 shrink-0" />
                <span>Up to 5 different resumes</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-white mr-2 shrink-0" />
                <span>Cover letter assistance</span>
              </li>
            </ul>
            <Button className="mt-auto bg-white text-resume-blue hover:bg-white/90">Subscribe Now</Button>
          </div>

          {/* Enterprise Plan */}
          <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm border">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Enterprise</h3>
              <div className="mt-2 flex items-baseline">
                <span className="text-3xl font-bold">Custom</span>
              </div>
              <p className="mt-4 text-resume-gray">For teams and career service organizations</p>
            </div>
            <ul className="space-y-3 py-4 flex-grow">
              <li className="flex">
                <Check className="h-5 w-5 text-resume-blue mr-2 shrink-0" />
                <span>All Pro features</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-resume-blue mr-2 shrink-0" />
                <span>Unlimited resumes & templates</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-resume-blue mr-2 shrink-0" />
                <span>Team management dashboard</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-resume-blue mr-2 shrink-0" />
                <span>Analytics and reporting</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-resume-blue mr-2 shrink-0" />
                <span>API access</span>
              </li>
              <li className="flex">
                <Check className="h-5 w-5 text-resume-blue mr-2 shrink-0" />
                <span>Dedicated support</span>
              </li>
            </ul>
            <Button variant="outline" className="flex items-center justify-center gap-2 mt-auto">
              <Building className="h-4 w-4" />
              <span>Contact Sales</span>
            </Button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-resume-gray mb-4">Not sure which plan is right for you?</p>
          <Button variant="link" className="text-resume-blue">View Full Comparison</Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
