import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, LogOut, Menu, User, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Image from './ui/image';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);

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
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      setUser(session?.user ?? null);
    }
  );


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
        <div className={user? "hidden md:flex space-x-8 mr-5 animate-slide-in-right animate-delay-200" : "hidden md:flex space-x-8 ml-20 animate-slide-in-right animate-delay-200"}>
          <a href="#features" className="text-resume-gray hover:text-resume-purple transition-colors font-medium">Features</a>
          <a href="/blog" className="text-resume-gray hover:text-resume-purple transition-colors font-medium">Blog Posts</a>
          <a href="#pricing" className="text-resume-gray hover:text-resume-purple transition-colors font-medium">Pricing</a>

        </div>
        <div className="hidden animate-slide-in-right md:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name || ''} />
                    <AvatarFallback>
                      {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {user?.user_metadata?.full_name && (
                      <p className="font-medium">{user.user_metadata.full_name}</p>
                    )}
                    {user?.email && (
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/resume" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    My Resumes
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/sign-up">
                <Button>Get Started</Button>
              </Link>
            </div>
          )}
        </div>
        <div className="md:hidden animate-slide-up">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
