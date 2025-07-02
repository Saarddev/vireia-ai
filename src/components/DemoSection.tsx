
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from '@/components/ui/image';
import { 
  FileText, 
  Palette, 
  Bot, 
  Layout, 
  Sparkles, 
  ArrowRight,
  Zap,
  Target,
  Layers
} from 'lucide-react';

const DemoSection = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate demos every 4 seconds
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % demoFeatures.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const demoFeatures = [
    {
      id: 'templates',
      title: 'Template Library',
      description: 'Choose from professional, modern, and customizable resume templates',
      icon: Layout,
      gradient: 'from-blue-500 to-purple-600',
      features: ['ATS-Optimized', 'Professional Design', 'Instant Preview'],
      image: '/placeholder.svg'
    },
    {
      id: 'builder',
      title: 'Resume Builder',
      description: 'Intuitive drag-and-drop interface with real-time preview',
      icon: FileText,
      gradient: 'from-resume-purple to-resume-violet',
      features: ['Drag & Drop', 'Real-time Preview', 'Auto-Save'],
      image: '/placeholder.svg'
    },
    {
      id: 'ai',
      title: 'AI-Powered Enhancement',
      description: 'Vireia AI analyzes and optimizes your resume for maximum impact',
      icon: Bot,
      gradient: 'from-green-500 to-emerald-600',
      features: ['Content Analysis', 'ATS Optimization', 'Smart Suggestions'],
      image: '/placeholder.svg'
    },
    {
      id: 'canvas',
      title: 'Visual Canvas Editor',
      description: 'Advanced editing with precise control over every element',
      icon: Palette,
      gradient: 'from-orange-500 to-red-600',
      features: ['Pixel Perfect', 'Custom Styling', 'Live Editing'],
      image: '/placeholder.svg'
    }
  ];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-br from-gray-50 to-purple-50/30">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-resume-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-resume-violet/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center rounded-full bg-resume-purple/10 px-4 py-2 text-sm text-resume-purple mb-6">
            <Sparkles className="mr-2 h-4 w-4" />
            <span>See Vireia AI in Action</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Experience the Power of{' '}
            <span className="bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">
              AI-Driven
            </span>{' '}
            Resume Building
          </h2>
          
          <p className="text-lg md:text-xl text-resume-gray max-w-3xl mx-auto">
            From template selection to AI optimization, see how Vireia transforms the resume creation process
          </p>
        </div>

        {/* Demo Navigation */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {demoFeatures.map((feature, index) => (
            <button
              key={feature.id}
              onClick={() => setActiveDemo(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                activeDemo === index
                  ? 'bg-resume-purple text-white shadow-lg scale-105'
                  : 'bg-white text-resume-gray hover:bg-resume-purple/5 hover:text-resume-purple'
              }`}
            >
              <feature.icon className="h-4 w-4" />
              <span className="font-medium">{feature.title}</span>
            </button>
          ))}
        </div>

        {/* Main Demo Display */}
        <div className={`grid lg:grid-cols-2 gap-12 items-center mb-16 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Feature Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${demoFeatures[activeDemo].gradient} flex items-center justify-center`}>
                  <demoFeatures[activeDemo].icon className="h-6 w-6 text-white" />
                </div>
                <Badge variant="secondary" className="bg-resume-purple/10 text-resume-purple">
                  Live Demo
                </Badge>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-resume-gray-dark">
                {demoFeatures[activeDemo].title}
              </h3>
              
              <p className="text-lg text-resume-gray leading-relaxed">
                {demoFeatures[activeDemo].description}
              </p>
            </div>

            {/* Feature highlights */}
            <div className="space-y-3">
              {demoFeatures[activeDemo].features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-resume-purple/10 flex items-center justify-center">
                    <Zap className="h-3 w-3 text-resume-purple" />
                  </div>
                  <span className="text-resume-gray-dark font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="bg-gradient-to-r from-resume-purple to-resume-violet hover:from-resume-purple-dark hover:to-purple-700 shadow-lg shadow-resume-purple/20 group"
            >
              Try it Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Demo Preview */}
          <div className="relative">
            <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200">
                  <Image
                    src={demoFeatures[activeDemo].image}
                    alt={`${demoFeatures[activeDemo].title} Demo`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Demo overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  
                  {/* Live indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">Live Preview</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating feature cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 border border-gray-100 animate-float">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-resume-purple" />
                <div>
                  <div className="text-sm font-medium text-gray-900">ATS Score</div>
                  <div className="text-lg font-bold text-resume-purple">98%</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 border border-gray-100 animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-sm font-medium text-gray-900">AI Enhanced</div>
                  <div className="text-sm font-bold text-green-600">Ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {demoFeatures.map((feature, index) => (
            <Card 
              key={feature.id}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                activeDemo === index ? 'ring-2 ring-resume-purple shadow-lg' : ''
              }`}
              onClick={() => setActiveDemo(index)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-resume-gray-dark mb-2">{feature.title}</h4>
                <p className="text-sm text-resume-gray">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
