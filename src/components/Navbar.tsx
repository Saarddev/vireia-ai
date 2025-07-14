import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Image from './ui/image';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const location = useLocation();
  const isOnDashboard = location.pathname === '/dashboard';

  // Check auth state
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsSignedIn(!!session);
    });

    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsSignedIn(!!session);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (isOnDashboard) {
    return null; // Don't show navbar on dashboard as we have sidebar
  }

  return (
    <nav className={`py-4 border-b sticky top-0 z-50 animate-fade-in transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-white/90 shadow-sm' : 'backdrop-blur-md bg-white/80'}`}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 animate-slide-in-left">
          <div className="bg-gradient-to-r from-resume-purple to-resume-violet rounded-xl p-2 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            <FileText className="h-5 w-5 md:h-5 md:w-5 text-white" />
          </div>
          <Link to="/" className="font-bold text-xl bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">Vireia AI</Link>
        </div>
        <div className="hidden md:flex space-x-8 ml-20 animate-slide-in-right animate-delay-200">
          <a href="#features" className="text-resume-gray hover:text-resume-purple transition-colors font-medium">Features</a>
          <a href="/blog" className="text-resume-gray hover:text-resume-purple transition-colors font-medium">Blog Posts</a>
          <a href="#pricing" className="text-resume-gray hover:text-resume-purple transition-colors font-medium">Pricing</a>

        </div>
        <div className="flex space-x-3 animate-slide-in-right">
          {isSignedIn ? (
            <div className="flex gap-2">
              <Link to="/dashboard">
                <Button variant="ghost" className="hover:bg-resume-purple/10 text-resume-gray hover:text-resume-purple">
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="outline"
                className="text-resume-gray"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link to="/sign-in">
                <Button variant="ghost" className="hidden md:inline-flex hover:bg-resume-purple/10 text-resume-gray hover:text-resume-purple">
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button className={`bg-resume-purple hover:bg-resume-purple-dark shadow-lg shadow-resume-purple/20 transition-all duration-300 hover:shadow-xl hover:shadow-resume-purple/30 ${scrolled ? 'px-5' : ''}`}>
                  {scrolled ? 'Try Free' : 'Get Started'}
                </Button>
              </Link>
            </>
          )}
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
            <a href="/blog" className="text-resume-gray hover:text-resume-purple transition-colors font-medium py-2">Blogs</a>
            <a href="#pricing" className="text-resume-gray hover:text-resume-purple transition-colors font-medium py-2">Pricing</a>
            {isSignedIn && (
              <Link to="/dashboard" className="text-resume-gray hover:text-resume-purple transition-colors font-medium py-2">Dashboard</Link>
            )}
            {!isSignedIn && (
              <div className="pt-2 flex">
                <Link to="/sign-up" className="w-full">
                  <Button className="w-full bg-resume-purple hover:bg-resume-purple-dark shadow-lg shadow-resume-purple/20">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
            {isSignedIn && (
              <div className="pt-2 flex">
                <Button
                  className="w-full text-resume-gray"
                  variant="outline"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
