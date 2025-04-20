
import React from 'react';
import { SignUp as ClerkSignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50/80 via-background to-purple-50/60">
      <div className="p-4 border-b">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="bg-resume-purple rounded-lg p-1.5">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">ResumeAI</span>
        </div>
      </div>
      
      <div className="flex-1 flex justify-center items-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">
            Create Your ResumeAI Account
          </h1>
          <ClerkSignUp 
            routing="path" 
            path="/sign-up"
            redirectUrl="/dashboard"
            signInUrl="/sign-in"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
