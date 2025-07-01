
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, ArrowRight, Award, Clock, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const navigate = useNavigate();
  
  // Typewriter content sections
  const typewriterSections = [
    {
      name: "Sarah Johnson",
      title: "Senior Software Engineer",
      lines: [
        "Experienced full-stack developer with 6+ years in web development",
        "Led cross-functional teams to deliver scalable solutions",
        "Expertise in React, Node.js, and cloud technologies"
      ]
    },
    {
      name: "Michael Chen",
      title: "Product Manager",
      lines: [
        "Strategic product leader with proven track record",
        "Launched 3 successful products generating $2M+ revenue",
        "Expert in user research and data-driven decision making"
      ]
    },
    {
      name: "Alex Rivera",
      title: "UX Designer",
      lines: [
        "Creative designer focused on user-centered solutions",
        "Improved user engagement by 40% through redesign",
        "Skilled in Figma, user research, and prototyping"
      ]
    }
  ];

  const currentContent = typewriterSections[currentSection];
  
  // Check authentication status
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsSignedIn(!!session);
    });
    
    // Initial check
    supabase.auth.getSession().then(({ data: { session }}) => {
      setIsSignedIn(!!session);
    });
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!isVisible) return;
    
    const fullText = currentContent.name + currentContent.title + currentContent.lines.join('');
    
    const typewriterTimer = setInterval(() => {
      setTypewriterIndex(prev => {
        if (prev >= fullText.length) {
          // Move to next section after a pause
          setTimeout(() => {
            setCurrentSection(prevSection => (prevSection + 1) % typewriterSections.length);
            setTypewriterIndex(0);
          }, 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(typewriterTimer);
  }, [isVisible, currentSection]);

  // Reset typewriter when section changes
  useEffect(() => {
    setTypewriterIndex(0);
  }, [currentSection]);

  const getTypedText = (text: string, maxLength: number) => {
    return text.slice(0, Math.min(maxLength, text.length));
  };

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate('/dashboard');
    } else {
      navigate('/sign-up');
    }
  };

  // Calculate text lengths for typewriter progression
  const nameLength = currentContent.name.length;
  const titleLength = currentContent.title.length;
  const line1Length = currentContent.lines[0].length;
  const line2Length = currentContent.lines[1].length;
  const line3Length = currentContent.lines[2].length;

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-resume-purple/5 to-resume-violet/5 z-0"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-resume-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-resume-violet/10 rounded-full blur-3xl"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-6">
            <div className={`inline-flex items-center rounded-full bg-resume-purple/10 px-3 py-1 text-sm text-resume-purple max-w-fit transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Sparkles className="mr-1 h-3 w-3" />
              <span>Vireia AI-Powered Resume Builder</span>
            </div>
            <h1 className={`text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Build Your <span className="bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">Perfect Resume</span> with Vireia AI
            </h1>
            <p className={`max-w-[600px] text-resume-gray-dark md:text-xl transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Create professional, ATS-friendly resumes in minutes. Our Vireia AI analyzes job descriptions to tailor your resume for higher interview success rates.
            </p>
            
            <div className={`flex items-center p-3 rounded-lg bg-gradient-to-r from-resume-purple/10 to-resume-violet/10 border border-resume-purple/20 transition-all duration-700 delay-250 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Award className="h-5 w-5 text-resume-purple mr-2 flex-shrink-0" />
              <p className="text-sm font-medium">
                <span className="text-resume-purple font-bold">Special Launch Offer:</span> Get full Pro access completely FREE - All premium features unlocked for everyone
              </p>
            </div>
            
            <div className={`flex flex-col gap-3 min-[400px]:flex-row transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Button 
                size="lg" 
                className="bg-resume-purple hover:bg-resume-purple-dark shadow-lg shadow-resume-purple/20 transition-all duration-300 hover:shadow-xl hover:shadow-resume-purple/30 group"
                onClick={handleGetStarted}
              >
                Create Your Resume
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-resume-purple text-resume-purple hover:bg-resume-purple/5">View Examples</Button>
            </div>
            
            <div className={`flex flex-wrap items-center gap-4 text-sm pt-2 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center">
                <div className="mr-2 h-5 w-5 flex items-center justify-center rounded-full bg-resume-purple/10">
                  <Check className="h-3 w-3 text-resume-purple" />
                </div>
                <span>ATS-Friendly</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-5 w-5 flex items-center justify-center rounded-full bg-resume-purple/10">
                  <Check className="h-3 w-3 text-resume-purple" />
                </div>
                <span>Job-Specific</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-5 w-5 flex items-center justify-center rounded-full bg-resume-purple/10">
                  <Check className="h-3 w-3 text-resume-purple" />
                </div>
                <span>5-Min Setup</span>
              </div>
            </div>
            
            <div className={`grid grid-cols-3 gap-4 pt-4 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="text-center">
                <div className="text-2xl font-bold text-resume-purple">85%</div>
                <div className="text-xs text-resume-gray-dark">Interview Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-resume-purple">200k+</div>
                <div className="text-xs text-resume-gray-dark">Resumes Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-resume-purple">4.9/5</div>
                <div className="text-xs text-resume-gray-dark">User Rating</div>
              </div>
            </div>
          </div>
          
          <div className={`flex items-center justify-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative w-full max-w-[500px]">
              <div className={`rounded-xl border bg-white shadow-xl p-6 relative z-10 backdrop-blur-sm bg-white/90 transition-all duration-500 ${scrolled ? 'scale-105' : 'hover:scale-105'}`}>
                <div className="space-y-5">
                  {/* Name with typewriter effect */}
                  <div className="h-8 flex items-center">
                    <div className="text-xl font-bold text-gray-900 leading-tight tracking-tight">
                      {getTypedText(currentContent.name, typewriterIndex)}
                      {typewriterIndex > 0 && typewriterIndex <= nameLength && (
                        <span className="animate-pulse">|</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Title with typewriter effect */}
                  <div className="h-6 flex items-center">
                    <div className="text-lg font-medium text-resume-purple">
                      {typewriterIndex > nameLength && (
                        <>
                          {getTypedText(currentContent.title, Math.max(0, typewriterIndex - nameLength))}
                          {typewriterIndex > nameLength && typewriterIndex <= nameLength + titleLength && (
                            <span className="animate-pulse">|</span>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Contact info placeholder */}
                  <div className="space-y-2">
                    <div className="h-3 w-[70%] rounded-full bg-muted opacity-60"></div>
                    <div className="h-3 w-[60%] rounded-full bg-muted opacity-60"></div>
                  </div>
                  
                  {/* Summary section */}
                  <div className="space-y-3">
                    <div className="h-4 w-[40%] rounded bg-resume-purple/20"></div>
                    <div className="space-y-2">
                      {/* Line 1 */}
                      <div className="h-3 flex items-center">
                        <div className="text-sm text-gray-700 leading-relaxed">
                          {typewriterIndex > nameLength + titleLength && (
                            <>
                              {getTypedText(currentContent.lines[0], Math.max(0, typewriterIndex - nameLength - titleLength))}
                              {typewriterIndex > nameLength + titleLength && typewriterIndex <= nameLength + titleLength + line1Length && (
                                <span className="animate-pulse">|</span>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      
                      {/* Line 2 */}
                      <div className="h-3 flex items-center">
                        <div className="text-sm text-gray-700 leading-relaxed">
                          {typewriterIndex > nameLength + titleLength + line1Length && (
                            <>
                              {getTypedText(currentContent.lines[1], Math.max(0, typewriterIndex - nameLength - titleLength - line1Length))}
                              {typewriterIndex > nameLength + titleLength + line1Length && typewriterIndex <= nameLength + titleLength + line1Length + line2Length && (
                                <span className="animate-pulse">|</span>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      
                      {/* Line 3 */}
                      <div className="h-3 flex items-center">
                        <div className="text-sm text-gray-700 leading-relaxed">
                          {typewriterIndex > nameLength + titleLength + line1Length + line2Length && (
                            <>
                              {getTypedText(currentContent.lines[2], Math.max(0, typewriterIndex - nameLength - titleLength - line1Length - line2Length))}
                              {typewriterIndex > nameLength + titleLength + line1Length + line2Length && typewriterIndex <= nameLength + titleLength + line1Length + line2Length + line3Length && (
                                <span className="animate-pulse">|</span>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 border-t pt-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <BarChart className="h-4 w-4 text-resume-purple mr-1" />
                        <span className="text-xs font-medium">ATS Score</span>
                      </div>
                      <span className="text-xs font-bold text-resume-purple">98%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-resume-purple to-resume-violet rounded-full transition-all duration-1000 ease-out" 
                        style={{ 
                          width: typewriterIndex > nameLength + titleLength + line1Length + line2Length + line3Length ? '98%' : '0%'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`absolute -bottom-6 -right-6 w-[90%] h-[90%] rounded-xl bg-gradient-to-br from-resume-purple/20 to-resume-violet/20 z-0 transition-all duration-1000 ${scrolled ? 'animate-float' : ''}`}></div>
              <div className="absolute -top-3 -left-3 w-24 h-24 bg-resume-purple/10 rounded-full blur-xl"></div>
              
              {/* AI Generation indicator */}
              <div className="absolute -top-2 -right-2 bg-resume-purple text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  AI Generating...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
