
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isOnDashboard = location.pathname === '/dashboard';
  
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

  if (isOnDashboard) {
    return null; // Don't show navbar on dashboard as we have sidebar
  }

  return (
    <nav className={`py-4 border-b sticky top-0 z-50 animate-fade-in transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-white/90 shadow-sm' : 'backdrop-blur-md bg-white/80'}`}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 animate-slide-in-left">
          <div className={`bg-resume-purple rounded-lg p-1.5 transition-transform duration-300 ${scrolled ? 'scale-90' : ''}`}>
            <FileText className={`h-5 w-5 text-white transition-all duration-300 ${scrolled ? 'scale-110' : ''}`} />
          </div>
          <Link to="/" className="font-bold text-xl bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">ResumeAI</Link>
        </div>
        <div className="hidden md:flex space-x-8 animate-slide-in-right animate-delay-200">
          <a href="#features" className="text-resume-gray hover:text-resume-purple transition-colors font-medium">Features</a>
          <a href="#how-it-works" className="text-resume-gray hover:text-resume-purple transition-colors font-medium">How It Works</a>
          <a href="#pricing" className="text-resume-gray hover:text-resume-purple transition-colors font-medium">Pricing</a>
          <Link to="/dashboard" className="text-resume-gray hover:text-resume-purple transition-colors font-medium">Dashboard</Link>
        </div>
        <div className="flex space-x-3 animate-slide-in-right">
          <Button variant="ghost" className="hidden md:inline-flex hover:bg-resume-purple/10 text-resume-gray hover:text-resume-purple">Sign In</Button>
          <Button className={`bg-resume-purple hover:bg-resume-purple-dark shadow-lg shadow-resume-purple/20 transition-all duration-300 hover:shadow-xl hover:shadow-resume-purple/30 ${scrolled ? 'px-5' : ''}`}>
            {scrolled ? 'Try Free' : 'Get Started'}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-resume-gray"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-md animate-fade-in">
          <div className="container py-4 flex flex-col space-y-3">
            <a href="#features" className="text-resume-gray hover:text-resume-purple transition-colors font-medium py-2">Features</a>
            <a href="#how-it-works" className="text-resume-gray hover:text-resume-purple transition-colors font-medium py-2">How It Works</a>
            <a href="#pricing" className="text-resume-gray hover:text-resume-purple transition-colors font-medium py-2">Pricing</a>
            <Link to="/dashboard" className="text-resume-gray hover:text-resume-purple transition-colors font-medium py-2">Dashboard</Link>
            <div className="pt-2 flex">
              <Button className="w-full bg-resume-purple hover:bg-resume-purple-dark shadow-lg shadow-resume-purple/20">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
