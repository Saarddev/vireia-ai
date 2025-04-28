
import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import InfrastructureSection from '@/components/InfrastructureSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';
import GitHubLatestCommit from '@/components/GitHubLatestCommit';

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <InfrastructureSection />
        
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-resume-purple/5 to-resume-violet/5 z-0"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl bg-gradient-to-br from-resume-gray-dark to-resume-purple bg-clip-text text-transparent">
                Latest Updates
              </h2>
              <p className="max-w-[700px] text-resume-gray md:text-lg">
                Stay current with our most recent development changes
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <GitHubLatestCommit owner="yourusername" repo="your-repo-name" />
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
