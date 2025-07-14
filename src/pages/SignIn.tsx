
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import ResetPasswordDialog from '@/components/auth/ResetPasswordDialog';

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back! 🎉",
        description: "Successfully signed in to your account",
        variant: "default",
      });
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message || "An error occurred during sign in");
      toast({
        title: "Sign in failed",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 p-4 relative overflow-hidden">
      {/* Animated background elements - adjusted for app theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-resume-purple/20 to-resume-violet/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-resume-violet/20 to-resume-purple/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Logo - consistent with app branding */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate('/')}
        >
          <div className="bg-gradient-to-r from-resume-purple to-resume-violet rounded-xl p-2 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            <FileText className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </div>
          <span className="font-bold text-lg md:text-xl bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">
            Vireia AI
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        <Card className="backdrop-blur-xl bg-white/90 border-0 shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm"></div>

          <CardHeader className="relative z-10 text-center pb-6 pt-6 md:pb-8 md:pt-8 px-6 md:px-8">
            <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-resume-purple to-resume-violet rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Lock className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600 text-base md:text-lg">
              Sign in to continue your journey
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10 px-6 md:px-8 pb-6 md:pb-8">
            <form onSubmit={handleSignIn} className="space-y-5 md:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium text-sm md:text-base">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-resume-purple transition-colors duration-200" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="pl-12 h-11 md:h-12 border-2 border-gray-200 rounded-xl focus:border-resume-purple focus:ring-4 focus:ring-resume-purple/20 transition-all duration-200 bg-white/70 backdrop-blur-sm text-sm md:text-base"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium text-sm md:text-base">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-resume-purple transition-colors duration-200" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="pl-12 pr-12 h-11 md:h-12 border-2 border-gray-200 rounded-xl focus:border-resume-purple focus:ring-4 focus:ring-resume-purple/20 transition-all duration-200 bg-white/70 backdrop-blur-sm text-sm md:text-base"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-resume-purple transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 md:p-4 text-center">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 md:h-12 bg-gradient-to-r from-resume-purple to-resume-violet hover:from-resume-purple/90 hover:to-resume-violet/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group text-sm md:text-base"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 md:mt-8 text-center space-y-4">
              <button
                onClick={() => setShowResetDialog(true)}
                className="text-resume-purple hover:text-resume-violet font-medium transition-colors duration-200 hover:underline text-sm md:text-base"
                type="button"
              >
                Forgot your password?
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs md:text-sm">
                  <span className="px-4 bg-white/80 text-gray-500 rounded-full">Don't have an account?</span>
                </div>
              </div>

              <Link to="/sign-up">
                <Button variant="outline" className="w-full h-11 md:h-12 border-2 border-gray-200 hover:border-resume-purple/30 hover:bg-resume-purple/5 rounded-xl font-semibold transition-all duration-300 group text-sm md:text-base">
                  Create Account
                  <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <ResetPasswordDialog open={showResetDialog} onClose={() => setShowResetDialog(false)} />
    </div>
  );
};

export default SignIn;
