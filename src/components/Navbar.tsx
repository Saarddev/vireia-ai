
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Menu } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`py-4 border-b sticky top-0 z-50 animate-fade-in transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-white/90 shadow-sm' : 'backdrop-blur-md bg-white/80'}`}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 animate-slide-in-left">
          <div className={`bg-resume-purple rounded-lg p-1.5 transition-transform duration-300 ${scrolled ? 'scale-90' : ''}`}>
            <FileText className={`h-5 w-5 text-white transition-all duration-300 ${scrolled ? 'scale-110' : ''}`} />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">ResumeAI</span>
        </div>
        <div className="hidden md:flex space-x-8 animate-slide-in-right animate-delay-200">
          <a href="#features" className="text-resume-gray hover:text-resume-purple transition-colors font-medium">Features</a>
          <a href="#how-it-works" className="text-resume-gray hover:text-resume-purple transition-colors font-medium">How It Works</a>
          <a href="#pricing" className="text-resume-gray hover:text-resume-purple transition-colors font-medium">Pricing</a>
        </div>
        <div className="flex space-x-3 animate-slide-in-right">
          <Button variant="ghost" className="hidden md:inline-flex hover:bg-resume-purple/10 text-resume-gray hover:text-resume-purple">Sign In</Button>
          <Button className={`bg-resume-purple hover:bg-resume-purple-dark shadow-lg shadow-resume-purple/20 transition-all duration-300 hover:shadow-xl hover:shadow-resume-purple/30 ${scrolled ? 'px-5' : ''}`}>
            {scrolled ? 'Try Free' : 'Get Started'}
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-resume-gray"><Menu className="h-5 w-5" /></Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
