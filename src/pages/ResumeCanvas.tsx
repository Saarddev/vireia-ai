import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ResumePreview from '@/components/ResumePreview';
import { supabaseClient } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Printer, Download, Share2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from 'lucide-react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useResume } from '@/hooks/use-resume';
import { useNavigate } from 'react-router-dom';
import { AIAssistant } from '@/components/resume-builder/AIAssistant';

const ResumeCanvas = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [template, setTemplate] = useState('modern');
  const [settings, setSettings] = useState({
    fontFamily: 'Inter',
    fontSize: 10,
    primaryColor: '#5d4dcd',
    margins: 'normal'
  });
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast()
  const { deleteResume } = useResume();

  useEffect(() => {
    if (!resumeId) {
      setError(new Error("Resume ID is missing."));
      setLoading(false);
      return;
    }

    const fetchResumeData = async () => {
      try {
        setLoading(true);
        const { data: resumeData, error: resumeError } = await supabaseClient
          .from('resumes')
          .select('*')
          .eq('id', resumeId)
          .single();

        if (resumeError) {
          throw resumeError;
        }

        if (resumeData) {
          setData(resumeData.data);
          setTemplate(resumeData.template || 'modern');
          setSettings(resumeData.settings || {
            fontFamily: 'Inter',
            fontSize: 10,
            primaryColor: '#5d4dcd',
            margins: 'normal'
          });
        } else {
          setError(new Error("Resume not found."));
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [resumeId]);

  const handleDataChange = async (section: string, newData: any) => {
    setData(prevData => ({
      ...prevData,
      [section]: newData
    }));

    try {
      const { error } = await supabaseClient
        .from('resumes')
        .update({ data: { ...data, [section]: newData } })
        .eq('id', resumeId);

      if (error) {
        throw error;
      }
    } catch (err: any) {
      toast({
        title: "Error updating resume",
        description: err.message,
        variant: "destructive",
      })
    }
  };

  const handleTemplateChange = async (newTemplate: string) => {
    setTemplate(newTemplate);

    try {
      const { error } = await supabaseClient
        .from('resumes')
        .update({ template: newTemplate })
        .eq('id', resumeId);

      if (error) {
        throw error;
      }
    } catch (err: any) {
      toast({
        title: "Error updating template",
        description: err.message,
        variant: "destructive",
      })
    }
  };

  const handleSettingsChange = async (newSettings: any) => {
    setSettings(newSettings);

    try {
      const { error } = await supabaseClient
        .from('resumes')
        .update({ settings: newSettings })
        .eq('id', resumeId);

      if (error) {
        throw error;
      }
    } catch (err: any) {
      toast({
        title: "Error updating settings",
        description: err.message,
        variant: "destructive",
      })
    }
  };

  const handleGenerateWithAI = async (section: string): Promise<string> => {
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section: section,
          data: data[section] || '',
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate content: ${response.statusText}`);
      }

      const result = await response.json();
      return result.content;
    } catch (error: any) {
      console.error("Error generating content:", error);
      toast({
        title: "Error generating content",
        description: error.message,
        variant: "destructive",
      })
      return '';
    }
  };

  const handleDeleteResume = async () => {
    if (!resumeId) {
      toast({
        title: "Error deleting resume",
        description: "Resume ID is missing.",
        variant: "destructive",
      })
      return;
    }

    try {
      await deleteResume(resumeId);
      toast({
        title: "Resume deleted",
        description: "Your resume has been successfully deleted.",
      })
      navigate('/resumes');
    } catch (error: any) {
      toast({
        title: "Error deleting resume",
        description: error.message,
        variant: "destructive",
      })
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">
      <Card className="p-4 space-y-4">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
        <Skeleton className="h-[500px]" />
      </Card>
    </div>;
  }

  if (error) {
    return <div className="container mx-auto p-4">
      <Card className="p-4">
        <h2 className="text-lg font-semibold">Error:</h2>
        <p>{error.message}</p>
      </Card>
    </div>;
  }

  if (!data) {
    return <div className="container mx-auto p-4">
      <Card className="p-4">
        <p>No data found for this resume.</p>
      </Card>
    </div>;
  }

  return (
    <div className="container max-w-5xl mx-auto my-8 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Resume Builder</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open dropdown menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigate(`/resume/builder/${resumeId}?section=settings`)}
              >
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDeleteResume}
                className="text-red-500 focus:text-red-500"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ResumePreview
            data={data}
            template={template}
            settings={settings}
            resumeId={resumeId}
            onDataChange={handleDataChange}
            onGenerateWithAI={handleGenerateWithAI}
          />
        </div>
        <div className="space-y-4">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-2">Template</h2>
            <div className="flex gap-2">
              <Button
                variant={template === 'modern' ? 'default' : 'outline'}
                onClick={() => handleTemplateChange('modern')}
              >
                Modern
              </Button>
              <Button
                variant={template === 'professional' ? 'default' : 'outline'}
                onClick={() => handleTemplateChange('professional')}
              >
                Professional
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-2">Settings</h2>
            <div className="space-y-2">
              <div>
                <Label htmlFor="fontFamily">Font Family</Label>
                <Input
                  type="text"
                  id="fontFamily"
                  defaultValue={settings.fontFamily}
                  onChange={(e) => handleSettingsChange({ ...settings, fontFamily: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="fontSize">Font Size</Label>
                <Input
                  type="number"
                  id="fontSize"
                  defaultValue={settings.fontSize}
                  onChange={(e) => handleSettingsChange({ ...settings, fontSize: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <Input
                  type="color"
                  id="primaryColor"
                  defaultValue={settings.primaryColor}
                  onChange={(e) => handleSettingsChange({ ...settings, primaryColor: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="margins">Margins</Label>
                <Textarea
                  id="margins"
                  defaultValue={settings.margins}
                  onChange={(e) => handleSettingsChange({ ...settings, margins: e.target.value })}
                />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h2 className="text-lg font-semibold">AI Assistant</h2>
                <p className="text-sm text-muted-foreground">
                  Get help from AI to improve your resume.
                </p>
              </div>
              <Switch id="ai" checked={aiAssistantEnabled} onCheckedChange={(checked) => setAiAssistantEnabled(checked)} />
            </div>
          </Card>

          {aiAssistantEnabled && (
            <Card className="p-4">
              <AIAssistant resumeData={data} enabled={aiAssistantEnabled} />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeCanvas;
