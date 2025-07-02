
import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import InfrastructureSection from '@/components/InfrastructureSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';
import { Github, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Vireia AI - AI-Powered Resume Builder | Create Professional Resumes</title>
        <meta name="description" content="Create professional, ATS-friendly resumes with Vireia AI's powerful resume builder. Build standout resumes in minutes with AI assistance, multiple templates, and expert guidance." />
        <meta name="keywords" content="resume builder, AI resume, professional resume, ATS resume, job application, career builder, resume maker, CV builder" />
        <meta name="author" content="Vireia AI" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cadina.vercel.app/" />
        <meta property="og:title" content="Vireia AI - AI-Powered Resume Builder" />
        <meta property="og:description" content="Create professional, ATS-friendly resumes with our AI-powered resume builder. Get hired faster with Vireia AI." />
        <meta property="og:image" content="https://cadina.vercel.app/og-image.png" />
        <meta property="og:site_name" content="Vireia AI" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://cadina.vercel.app/" />
        <meta property="twitter:title" content="Vireia AI - AI-Powered Resume Builder" />
        <meta property="twitter:description" content="Create professional, ATS-friendly resumes with our AI-powered resume builder. Get hired faster with Vireia AI." />
        <meta property="twitter:image" content="https://cadina.vercel.app/og-image.png" />

        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://cadina.vercel.app/" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Vireia AI",
            "description": "AI-powered resume builder for creating professional, ATS-friendly resumes",
            "url": "https://cadina.vercel.app",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "creator": {
              "@type": "Organization",
              "name": "Vireia AI"
            }
          })}
        </script>
      </Helmet>
      
      <Navbar />
      <main>
        <HeroSection />
        <InfrastructureSection />
        
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-resume-purple/5 to-resume-violet/5 z-0"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl bg-gradient-to-br from-resume-gray-dark to-resume-purple bg-clip-text text-transparent">
                Developed by
              </h2>
              <p className="max-w-[700px] text-resume-gray md:text-lg">
                Meet the developer behind Vireia AI
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl border shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-resume-purple to-resume-violet rounded-full flex items-center justify-center">
                    <Github className="h-10 w-10 text-white" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-semibold text-resume-gray-dark mb-2">
                      SaarD00
                    </h3>
                    <p className="text-resume-gray mb-4">
                      Full-stack developer passionate about creating AI-powered tools that help people advance their careers.
                    </p>
                    <a
                      href="https://github.com/SaarD00"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-resume-purple hover:bg-resume-purple-dark text-white rounded-lg transition-colors duration-200"
                    >
                      <Github className="h-4 w-4" />
                      View GitHub Profile
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <PricingSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
