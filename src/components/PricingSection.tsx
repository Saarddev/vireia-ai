import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Star, Building, User, ArrowRight, Sparkles, Clock, AlertCircle } from 'lucide-react';

const PricingSection = () => {
  const titleRef = useRef(null);
  const plansRef = useRef([]);
  const ctaRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    let countdown = 1800;
    const timerInterval = setInterval(() => {
      if (countdown <= 0) {
        clearInterval(timerInterval);
        return;
      }
      
      countdown -= 1;
      if (timerRef.current) {
        const minutes = Math.floor(countdown / 60);
        const seconds = countdown % 60;
        timerRef.current.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }
    }, 1000);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up', 'opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (titleRef.current) observer.observe(titleRef.current);
    if (plansRef.current) {
      plansRef.current.forEach(plan => {
        if (plan) observer.observe(plan);
      });
    }
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => {
      clearInterval(timerInterval);
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (plansRef.current) {
        plansRef.current.forEach(plan => {
          if (plan) observer.unobserve(plan);
        });
      }
      if (ctaRef.current) observer.unobserve(ctaRef.current);
    };
  }, []);

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-resume-purple/5 to-resume-violet/5 z-0"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-resume-purple/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-resume-violet/5 rounded-full blur-3xl"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div ref={titleRef} className="flex flex-col items-center text-center space-y-4 mb-10 opacity-0 translate-y-10 transition-all duration-700">
          <div className="inline-flex items-center rounded-full bg-resume-purple/10 px-3 py-1 text-sm text-resume-purple max-w-fit mb-2">
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            <span>Flexible Options</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-gradient-to-br from-resume-gray-dark to-resume-purple bg-clip-text text-transparent">Choose Your Plan</h2>
          <p className="max-w-[700px] text-resume-gray md:text-lg">
            Select the perfect plan that suits your career needs and goals
          </p>
        </div>

        <div className="mb-10 bg-gradient-to-r from-resume-purple/20 to-resume-violet/20 rounded-lg p-4 shadow-md flex items-center justify-between animate-pulse">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-resume-purple mr-2" />
            <span className="font-medium">
              Limited Time Offer: <span className="text-resume-purple font-bold">FREE</span> Pro plan for everyone
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-resume-purple mr-2" />
            <span className="font-medium">Expires in: <span ref={timerRef} className="text-resume-purple font-bold">30:00</span></span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 z-10">
          <div 
            ref={el => plansRef.current[0] = el}
            className="flex flex-col p-8 bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl group relative overflow-hidden opacity-0 translate-y-10 transition-all duration-700"
          >
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

          <div 
            ref={el => plansRef.current[1] = el}
            className="flex flex-col p-8 rounded-xl shadow-xl relative border border-resume-purple/20 bg-white scale-105 z-20 opacity-0 translate-y-10 transition-all duration-700 delay-100"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-resume-purple to-resume-violet"></div>
            <div className="absolute -top-4 left-0 w-full flex justify-center">
              <div className="bg-gradient-to-r from-resume-purple to-resume-violet text-white text-sm font-medium px-4 py-1 rounded-full flex items-center shadow-md">
                <Star className="mr-1 h-3.5 w-3.5" />
                Popular Choice
              </div>
            </div>
            <div className="mb-5">
              <h3 className="text-xl font-semibold text-resume-purple">Pro</h3>
              <div className="mt-2 flex items-baseline">
                <span className="text-4xl font-bold">$0</span>
                <span className="ml-1 text-resume-gray">/month</span>
              </div>
              <div className="mt-1">
                <span className="text-sm text-resume-purple font-medium bg-resume-purple/10 px-2 py-1 rounded-full">
                  Limited Time Offer
                </span>
              </div>
              <p className="mt-4 text-resume-gray">Ideal for professionals actively job hunting</p>
            </div>
            <ul className="space-y-4 py-6 text-resume-gray-dark flex-grow">
              <li className="flex">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-purple/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-purple" />
                </div>
                <span>10 premium templates</span>
              </li>
              <li className="flex">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-purple/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-purple" />
                </div>
                <span>Advanced AI job matching</span>
              </li>
              <li className="flex">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-purple/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-purple" />
                </div>
                <span>Multiple export formats</span>
              </li>
              <li className="flex">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-purple/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-purple" />
                </div>
                <span>Up to 5 different resumes</span>
              </li>
              <li className="flex">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-purple/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-purple" />
                </div>
                <span>Cover letter assistance</span>
              </li>
            </ul>
            <div className="absolute top-12 right-0 bg-gradient-to-r from-resume-purple to-resume-violet text-white text-xs font-bold px-3 py-1 rounded-l-full shadow-lg transform rotate-0 transition-transform group-hover:rotate-3">
              100% FREE
            </div>
            <Button className="mt-auto bg-gradient-to-r from-resume-purple to-resume-violet hover:from-resume-purple-dark hover:to-resume-violet shadow-lg shadow-resume-purple/20 transition-all duration-300 hover:shadow-xl hover:shadow-resume-purple/30 group">
              Get Started Free
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div 
            ref={el => plansRef.current[2] = el}
            className="flex flex-col p-8 bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl group relative overflow-hidden opacity-0 translate-y-10 transition-all duration-700 delay-200"
          >
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

        <div 
          ref={ctaRef} 
          className="mt-16 text-center opacity-0 translate-y-10 transition-all duration-700 delay-300"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border border-resume-purple/10 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-3">Ready to boost your career with AI-powered resumes?</h3>
            <p className="text-resume-gray mb-4">Join thousands of professionals who've landed interviews at top companies</p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full bg-resume-purple/20 flex items-center justify-center border-2 border-white text-xs font-medium">JD</div>
                <div className="w-10 h-10 rounded-full bg-resume-violet/20 flex items-center justify-center border-2 border-white text-xs font-medium">MK</div>
                <div className="w-10 h-10 rounded-full bg-resume-purple/30 flex items-center justify-center border-2 border-white text-xs font-medium">AR</div>
                <div className="w-10 h-10 rounded-full bg-resume-violet/30 flex items-center justify-center border-2 border-white text-xs font-medium">+2K</div>
              </div>
              <Button className="bg-gradient-to-r from-resume-purple to-resume-violet hover:from-resume-purple-dark hover:to-resume-violet shadow-lg shadow-resume-purple/20 transition-all duration-300 hover:shadow-xl hover:shadow-resume-purple/30 group">
                Get Started Now
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
