
import React from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Settings, FileText } from 'lucide-react';
import ResumePreview from '@/components/ResumePreview';
import ResumeCanvasStyleTab from '@/components/resume-canvas/ResumeCanvasStyleTab';
import { useResumeData } from '@/hooks/use-resume-data';
import { toast } from '@/hooks/use-toast';

const ResumeCanvas = () => {
  const { id } = useParams<{ id: string }>();
  const {
    isLoading,
    resumeData,
    setResumeData,
    resumeTitle,
    setResumeTitle,
    selectedTemplate,
    setSelectedTemplate,
    resumeSettings,
    setResumeSettings,
    handleSave
  } = useResumeData(id);

  const handleDataChange = (section: string, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSettingsChange = (newSettings: any) => {
    setResumeSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template);
    toast({
      title: "Template changed",
      description: `Resume template updated to ${template.charAt(0).toUpperCase() + template.slice(1)}`,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{resumeTitle}</h1>
          <p className="text-gray-600">Customize your resume appearance and content</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <Tabs defaultValue="styles" className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
                  <TabsTrigger 
                    value="styles" 
                    className="flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Styles</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="content" 
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Content</span>
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex-1 overflow-auto">
                  <TabsContent value="styles" className="h-full mt-0">
                    <ResumeCanvasStyleTab
                      settings={resumeSettings}
                      onSettingsChange={handleSettingsChange}
                      selectedTemplate={selectedTemplate}
                      onTemplateChange={handleTemplateChange}
                    />
                  </TabsContent>
                  
                  <TabsContent value="content" className="h-full mt-0 p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Resume Title
                        </label>
                        <input
                          type="text"
                          value={resumeTitle}
                          onChange={(e) => setResumeTitle(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter resume title"
                        />
                      </div>
                      <button
                        onClick={handleSave}
                        className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        Save Changes
                      </button>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </Card>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <ResumePreview
                data={resumeData}
                template={selectedTemplate}
                settings={resumeSettings}
                onDataChange={handleDataChange}
                showAIAnalysis={false}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCanvas;
