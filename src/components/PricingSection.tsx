
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Star, Building, User, ArrowRight, Sparkles, Clock, AlertCircle, Gift } from 'lucide-react';

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
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-resume-purple/10 to-resume-violet/10 border border-resume-purple/20 px-4 py-2 text-sm text-resume-purple max-w-fit mb-2">
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            <span className="font-medium">Flexible Options</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-gradient-to-br from-resume-gray-dark to-resume-purple bg-clip-text text-transparent">Choose Your Plan</h2>
          <p className="max-w-[700px] text-resume-gray md:text-lg">
            Select the perfect plan that suits your career needs and goals
          </p>
        </div>

        <div className="mb-10 bg-gradient-to-r from-resume-purple/10 to-resume-violet/10 border border-resume-purple/20 rounded-xl p-6 shadow-lg backdrop-blur-sm flex items-center justify-between animate-pulse">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-resume-purple to-resume-violet flex items-center justify-center mr-4">
              <Gift className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-semibold text-resume-gray-dark text-lg">
                🎉 Special Launch Offer
              </span>
              <p className="text-resume-purple font-bold">FREE Pro Access for all early users!</p>
            </div>
          </div>
          <div className="flex items-center bg-white/80 rounded-lg px-4 py-2">
            <Clock className="h-5 w-5 text-resume-purple mr-2" />
            <span className="font-medium text-resume-gray-dark">Limited time: <span ref={timerRef} className="text-resume-purple font-bold">30:00</span></span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 z-10">
          <div 
            ref={el => plansRef.current[0] = el}
            className="flex flex-col p-8 bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-resume-purple/20 group relative overflow-hidden opacity-0 translate-y-10 transition-all duration-700"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 to-gray-300"></div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-resume-gray-dark">Free</h3>
              <div className="mt-3 flex items-baseline">
                <span className="text-4xl font-bold text-resume-gray-dark">$0</span>
                <span className="ml-1 text-resume-gray">/month</span>
              </div>
              <p className="mt-4 text-resume-gray">Perfect for students or first-time job seekers</p>
            </div>
            <ul className="space-y-4 py-6 flex-grow">
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-gray-100 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-gray-dark" />
                </div>
                <span className="text-resume-gray-dark">1 resume template</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-gray-100 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-gray-dark" />
                </div>
                <span className="text-resume-gray-dark">Basic AI suggestions</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-gray-100 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-gray-dark" />
                </div>
                <span className="text-resume-gray-dark">PDF export</span>
              </li>
              <li className="flex items-start opacity-60">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-gray-100/50 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-gray/40" />
                </div>
                <span className="text-resume-gray">Limited to 1 resume</span>
              </li>
            </ul>
            <Button variant="outline" className="mt-auto border-gray-200 hover:border-resume-purple/30 hover:bg-resume-purple/5 transition-all duration-300">
              Get Started
            </Button>
          </div>

          <div 
            ref={el => plansRef.current[1] = el}
            className="flex flex-col p-8 rounded-xl shadow-2xl relative border-2 border-resume-purple bg-white scale-105 z-20 opacity-0 translate-y-10 transition-all duration-700 delay-100 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-resume-purple to-resume-violet"></div>
            <div className="absolute -top-4 left-0 w-full flex justify-center">
              <div className="bg-gradient-to-r from-resume-purple to-resume-violet text-white text-sm font-semibold px-6 py-2 rounded-full flex items-center shadow-lg">
                <Gift className="mr-2 h-4 w-4" />
                FREE Launch Offer!
              </div>
            </div>
            <div className="mb-6 pt-2">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">Pro</h3>
              <div className="mt-3 flex items-baseline">
                <span className="text-4xl font-bold bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">$0</span>
                <span className="ml-2 text-resume-gray line-through text-lg">$0</span>
                <span className="ml-1 text-resume-gray">/month</span>
              </div>
              <p className="mt-4 text-resume-gray">Ideal for professionals actively job hunting</p>
            </div>
            <ul className="space-y-4 py-6 text-resume-gray-dark flex-grow">
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-gradient-to-r from-resume-purple/10 to-resume-violet/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-purple" />
                </div>
                <span>10 premium templates</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-gradient-to-r from-resume-purple/10 to-resume-violet/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-purple" />
                </div>
                <span>Advanced Cadina AI job matching</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-gradient-to-r from-resume-purple/10 to-resume-violet/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-purple" />
                </div>
                <span>Multiple export formats</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-gradient-to-r from-resume-purple/10 to-resume-violet/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-purple" />
                </div>
                <span>Up to 5 different resumes</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-gradient-to-r from-resume-purple/10 to-resume-violet/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-purple" />
                </div>
                <span>Cover letter assistance</span>
              </li>
            </ul>
            <div className="absolute top-16 right-0 bg-gradient-to-r from-resume-purple to-resume-violet text-white text-xs font-bold px-4 py-2 rounded-l-full shadow-lg transform transition-transform group-hover:scale-105">
              100% FREE
            </div>
            <Button className="mt-auto bg-gradient-to-r from-resume-purple to-resume-violet hover:from-resume-purple-dark hover:to-resume-violet shadow-xl shadow-resume-purple/25 transition-all duration-300 hover:shadow-2xl hover:shadow-resume-purple/30 group text-white font-semibold">
              Claim Free Access
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div 
            ref={el => plansRef.current[2] = el}
            className="flex flex-col p-8 bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-resume-purple/20 group relative overflow-hidden opacity-0 translate-y-10 transition-all duration-700 delay-200"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-resume-gray to-resume-gray-dark"></div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-resume-gray-dark">Enterprise</h3>
              <div className="mt-3 flex items-baseline">
                <span className="text-4xl font-bold bg-gradient-to-r from-resume-gray-dark to-resume-gray bg-clip-text text-transparent">Custom</span>
              </div>
              <p className="mt-4 text-resume-gray">For teams and career service organizations</p>
            </div>
            <ul className="space-y-4 py-6 flex-grow">
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-gray-dark/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-gray-dark" />
                </div>
                <span className="text-resume-gray-dark">All Pro features</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-gray-dark/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-gray-dark" />
                </div>
                <span className="text-resume-gray-dark">Unlimited resumes & templates</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-gray-dark/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-gray-dark" />
                </div>
                <span className="text-resume-gray-dark">Team management dashboard</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-gray-dark/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-gray-dark" />
                </div>
                <span className="text-resume-gray-dark">Analytics and reporting</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-gray-dark/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-gray-dark" />
                </div>
                <span className="text-resume-gray-dark">API access</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-resume-gray-dark/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-resume-gray-dark" />
                </div>
                <span className="text-resume-gray-dark">Dedicated support</span>
              </li>
            </ul>
            <Button variant="outline" className="flex items-center justify-center gap-2 mt-auto border-resume-gray-dark/20 hover:border-resume-gray-dark/30 hover:bg-resume-gray-dark/5 transition-all duration-300">
              <Building className="h-4 w-4" />
              <span>Contact Sales</span>
            </Button>
          </div>
        </div>

        <div 
          ref={ctaRef} 
          className="mt-16 text-center opacity-0 translate-y-10 transition-all duration-700 delay-300"
        >
          <div className="bg-white rounded-xl p-8 shadow-xl border border-resume-purple/10 max-w-4xl mx-auto backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-resume-gray-dark to-resume-purple bg-clip-text text-transparent">Ready to boost your career with Cadina AI-powered resumes?</h3>
            <p className="text-resume-gray mb-6 text-lg">Join thousands of professionals who've landed interviews at top companies</p>
            <div className="flex flex-wrap justify-center items-center gap-6 mt-8">
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-resume-purple/30 to-resume-violet/30 flex items-center justify-center border-3 border-white text-sm font-semibold text-resume-purple shadow-lg">JD</div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-resume-violet/30 to-resume-purple/30 flex items-center justify-center border-3 border-white text-sm font-semibold text-resume-purple shadow-lg">MK</div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-resume-purple/40 to-resume-violet/40 flex items-center justify-center border-3 border-white text-sm font-semibold text-resume-purple shadow-lg">AR</div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-resume-violet/40 to-resume-purple/40 flex items-center justify-center border-3 border-white text-sm font-semibold text-resume-purple shadow-lg">+2K</div>
              </div>
              <Button className="bg-gradient-to-r from-resume-purple to-resume-violet hover:from-resume-purple-dark hover:to-resume-violet shadow-xl shadow-resume-purple/25 transition-all duration-300 hover:shadow-2xl hover:shadow-resume-purple/30 group text-white font-semibold px-8 py-6 text-lg">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
