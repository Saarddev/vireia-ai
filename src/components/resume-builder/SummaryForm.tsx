
import React, { useState } from 'react';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileText, Wand2, Loader, List } from 'lucide-react';
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import AIHoverToolkit from "@/components/AIHoverToolkit";
import { useToast } from "@/hooks/use-toast";

interface SummaryFormProps {
  data: string;
  onChange: (data: string) => void;
  onGenerateWithAI: () => Promise<string>;
  isGenerating?: boolean;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ 
  data, 
  onChange,
  onGenerateWithAI,
  isGenerating = false
}) => {
  const [showToolkit, setShowToolkit] = useState(false);
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      summary: data
    }
  });

  const handleSubmit = (formData: { summary: string }) => {
    onChange(formData.summary);
  };

  // Format summary to display bullet points properly in the preview
  const formatSummaryPreview = (text: string) => {
    if (!text) return <p className="text-gray-400 italic">No summary yet</p>;

    if (text.includes('•') || text.includes('-') || text.includes('\n')) {
      // This is a bulleted list, render with proper HTML
      const lines = text.split('\n').map(line => line.trim()).filter(line => line);
      
      return (
        <ul className="list-disc pl-5 space-y-1 mt-2">
          {lines.map((line, idx) => {
            let bulletText = line;
            
            // Remove bullet characters if they exist
            if (bulletText.startsWith('•') || bulletText.startsWith('-')) {
              bulletText = bulletText.substring(1).trim();
            }
            
            if (!bulletText) return null;
            
            return (
              <li key={idx} className="relative flex items-start">
                <span className="absolute left-[-1.5rem] top-[0.5rem] w-1.5 h-1.5 rounded-full bg-resume-purple"></span>
                <span className="text-gray-700">{bulletText}</span>
              </li>
            );
          })}
        </ul>
      );
    }
    
    // Regular text
    return <p className="text-gray-700 whitespace-pre-line mt-2">{text}</p>;
  };

  // Add bullet points to the text area
  const addBulletPoints = () => {
    const currentText = form.getValues("summary");
    
    // If text is empty or doesn't end with a newline, add a bullet point at the end
    if (!currentText.endsWith('\n') && currentText.length > 0) {
      const updatedText = currentText + '\n- ';
      form.setValue("summary", updatedText);
      onChange(updatedText);
    } else {
      // Add a bullet point at the start or after the last newline
      const updatedText = currentText + '- ';
      form.setValue("summary", updatedText);
      onChange(updatedText);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FileText className="mr-2 h-5 w-5 text-resume-purple" />
        Professional Summary
      </h2>
      <p className="text-sm text-resume-gray mb-6">
        Write a compelling summary that highlights your experience and skills
      </p>

      <Card className="p-4 bg-purple-50 border-resume-purple mb-6">
        <div className="flex items-start">
          <Wand2 className="h-5 w-5 text-resume-purple mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-resume-purple">AI Summary Assistant</h3>
            <p className="text-xs text-resume-gray mt-1">
              Let our AI help you craft a compelling professional summary based on your experience and skills.
              The AI will create bullet points highlighting your key strengths.
            </p>
            <Button 
              size="sm" 
              variant="outline" 
              className="mt-2 border-resume-purple text-resume-purple hover:bg-resume-purple hover:text-white transition-all duration-300"
              onClick={async () => {
                try {
                  const result = await onGenerateWithAI();
                  if (result) {
                    form.setValue("summary", result);
                    onChange(result);
                  }
                } catch (error) {
                  console.error("Error generating summary:", error);
                  toast({
                    title: "Error",
                    description: "Failed to generate summary. Please try again.",
                    variant: "destructive"
                  });
                }
                return "";
              }}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader className="mr-2 h-3 w-3 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-3 w-3" />
                  Generate Summary
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      <Form {...form}>
        <form onChange={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Professional Summary*</FormLabel>
                <div 
                  className="relative group"
                  onMouseEnter={() => setShowToolkit(true)}
                  onMouseLeave={() => setShowToolkit(false)}
                >
                  <div className={`absolute -top-12 right-0 z-10 transform transition-opacity transition-transform duration-300 ease-out ${showToolkit ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                    <AIHoverToolkit 
                      onComplete={async () => {
                        try {
                          const result = await onGenerateWithAI();
                          if (result) {
                            form.setValue("summary", result);
                            onChange(result);
                          }
                          return result || "";
                        } catch (error) {
                          console.error("Error generating summary:", error);
                          return "";
                        }
                      }}
                      onAddChanges={async () => {
                        const currentText = form.getValues("summary");
                        const newText = currentText + "\n- ";
                        form.setValue("summary", newText);
                        onChange(newText);
                        return "";
                      }}
                    />
                  </div>
                  <FormControl>
                    <Textarea 
                      placeholder="Summarize your professional background, key skills, and career achievements in bullet points"
                      className="min-h-[150px] resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 text-gray-400 hover:text-resume-purple"
                    onClick={addBulletPoints}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                <FormDescription>
                  Use bullet points (- ) to highlight your key achievements and skills. The AI can help format this for you.
                </FormDescription>
              </FormItem>
            )}
          />
          
          {data && (
            <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
              <h4 className="text-sm font-medium mb-2">Summary Preview:</h4>
              {formatSummaryPreview(data)}
            </div>
          )}
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-resume-gray">
              <span className={form.watch("summary").length > 50 ? "text-resume-purple" : "text-resume-gray"}>
                {form.watch("summary").length}
              </span> / 200 recommended
            </div>
            <Button 
              type="button" 
              variant="outline"
              size="sm"
              onClick={() => {
                form.reset({ summary: "" });
                onChange("");
              }}
              className="text-resume-gray hover:text-resume-purple"
            >
              Clear
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SummaryForm;
