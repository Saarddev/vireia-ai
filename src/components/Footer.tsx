
import React from 'react';
import { FileText, Twitter, Linkedin, Instagram, Mail, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 bg-gradient-to-br from-resume-gray-dark to-resume-gray-dark/95 text-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-resume-blue rounded-lg p-1.5">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-resume-blue-light to-resume-teal bg-clip-text text-transparent">ResumeAI</span>
            </div>
            <p className="text-resume-gray-light text-sm">
              AI-powered resume builder helping job seekers stand out and get hired faster.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-resume-gray-light hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="text-resume-gray-light hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="text-resume-gray-light hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="text-resume-gray-light hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                <span className="sr-only">Github</span>
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-3 text-resume-gray-light">
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Templates</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Testimonials</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-3 text-resume-gray-light">
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Career Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Resume Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Interview Tips</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Job Search</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3 text-resume-gray-light">
              <li><a href="#" className="hover:text-white transition-colors hover:underline">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-resume-gray-light text-sm">
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-resume-gray-light" />
            <a href="mailto:support@resumeai.com" className="text-resume-gray-light hover:text-white transition-colors text-sm hover:underline">
              support@resumeai.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
