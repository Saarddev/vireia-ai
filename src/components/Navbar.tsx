
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="py-4 border-b">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-resume-blue" />
          <span className="font-bold text-xl">ResumeAI</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#features" className="text-resume-gray hover:text-resume-blue transition-colors">Features</a>
          <a href="#how-it-works" className="text-resume-gray hover:text-resume-blue transition-colors">How It Works</a>
          <a href="#pricing" className="text-resume-gray hover:text-resume-blue transition-colors">Pricing</a>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="hidden md:inline-flex">Sign In</Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
