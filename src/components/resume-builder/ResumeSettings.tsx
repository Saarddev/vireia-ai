
import React from 'react';
import { Settings, PaintBucket, FileUp, Download, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

const ResumeSettings = () => {
  const form = useForm({
    defaultValues: {
      fontFamily: "inter",
      fontSize: [12],
      primaryColor: "#9b87f5",
      paperSize: "a4",
      margins: "normal",
      includePhoto: true,
      headerStyle: "standard",
      showContactIcons: true,
      enableATS: true
    }
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Settings className="mr-2 h-5 w-5 text-resume-purple" />
        Resume Settings
      </h2>
      <p className="text-sm text-resume-gray mb-6">
        Customize the appearance and settings of your resume
      </p>

      <Form {...form}>
        <form className="space-y-6">
          <div>
            <h3 className="text-base font-medium mb-4 flex items-center">
              <PaintBucket className="mr-2 h-4 w-4 text-resume-purple" />
              Styling Options
            </h3>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="fontFamily"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Font Family</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a font" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="helvetica">Helvetica</SelectItem>
                        <SelectItem value="georgia">Georgia</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="lato">Lato</SelectItem>
                        <SelectItem value="merriweather">Merriweather</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="fontSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Font Size: {field.value}pt</FormLabel>
                    <FormControl>
                      <Slider
                        min={9}
                        max={14}
                        step={0.5}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="primaryColor"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel>Primary Color</FormLabel>
                      <div 
                        className="h-6 w-6 rounded-full border shadow-sm" 
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                    <FormControl>
                      <div className="grid grid-cols-5 gap-2">
                        {['#9b87f5', '#4a6cf7', '#0ea5e9', '#f97316', '#f43f5e', '#8b5cf6', '#059669', '#0f172a'].map((color) => (
                          <div 
                            key={color}
                            className={`h-8 w-8 rounded-full cursor-pointer transition-all ${
                              field.value === color ? 'ring-2 ring-offset-2 ring-resume-purple' : 'hover:scale-110'
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => field.onChange(color)}
                          />
                        ))}
                        <div className="relative h-8 w-8">
                          <Input
                            type="color"
                            value={field.value}
                            onChange={field.onChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center text-white text-xs">
                            +
                          </div>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="paperSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paper Size</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select paper size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="a4">A4 (210 × 297 mm)</SelectItem>
                        <SelectItem value="letter">US Letter (8.5 × 11 in)</SelectItem>
                        <SelectItem value="legal">US Legal (8.5 × 14 in)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="margins"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Margins</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-1"
                      >
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="narrow" />
                          </FormControl>
                          <FormLabel className="cursor-pointer text-sm font-normal">Narrow</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="normal" />
                          </FormControl>
                          <FormLabel className="cursor-pointer text-sm font-normal">Normal</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="wide" />
                          </FormControl>
                          <FormLabel className="cursor-pointer text-sm font-normal">Wide</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-base font-medium mb-4">Layout Options</h3>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="includePhoto"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base font-normal">Include Photo</FormLabel>
                      <FormDescription>
                        Display your profile photo on the resume
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="headerStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Header Style</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select header style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="centered">Centered</SelectItem>
                        <SelectItem value="modern">Modern with Accent</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="showContactIcons"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base font-normal">Contact Icons</FormLabel>
                      <FormDescription>
                        Show icons next to contact information
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-base font-medium mb-4">ATS Optimization</h3>
            
            <FormField
              control={form.control}
              name="enableATS"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base font-normal">ATS-Friendly Format</FormLabel>
                    <FormDescription>
                      Optimize resume for Applicant Tracking Systems
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-base font-medium">File Options</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button variant="outline" className="justify-start">
                <FileUp className="mr-2 h-4 w-4" /> Upload Resume
              </Button>
              <Button variant="outline" className="justify-start">
                <Download className="mr-2 h-4 w-4" /> Export as PDF
              </Button>
              <Button variant="outline" className="justify-start">
                <Download className="mr-2 h-4 w-4" /> Export as DOCX
              </Button>
              <Button variant="outline" className="justify-start">
                <Eye className="mr-2 h-4 w-4" /> Preview
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResumeSettings;
