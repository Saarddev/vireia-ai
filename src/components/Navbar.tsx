
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="py-4 border-b backdrop-blur-md bg-white/80 sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-resume-blue rounded-lg p-1.5">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-resume-blue to-resume-teal bg-clip-text text-transparent">ResumeAI</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-resume-gray hover:text-resume-blue transition-colors font-medium">Features</a>
          <a href="#how-it-works" className="text-resume-gray hover:text-resume-blue transition-colors font-medium">How It Works</a>
          <a href="#pricing" className="text-resume-gray hover:text-resume-blue transition-colors font-medium">Pricing</a>
        </div>
        <div className="flex space-x-3">
          <Button variant="ghost" className="hidden md:inline-flex hover:bg-resume-blue/10 text-resume-gray hover:text-resume-blue">Sign In</Button>
          <Button className="bg-resume-blue hover:bg-resume-blue-dark shadow-lg shadow-resume-blue/20 transition-all duration-300 hover:shadow-xl hover:shadow-resume-blue/30">Get Started</Button>
          <Button variant="ghost" size="icon" className="md:hidden text-resume-gray"><Menu className="h-5 w-5" /></Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
