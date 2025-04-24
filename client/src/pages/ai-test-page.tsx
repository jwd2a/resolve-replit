import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import Header from "@/components/Header";

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { FormLabel } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

// Mock course sections for testing
const MOCK_SECTIONS = [
  { id: 1, title: "Introduction to Co-Parenting" },
  { id: 2, title: "Communication Skills" },
  { id: 3, title: "Managing Conflict" },
  { id: 4, title: "Scheduling and Coordination" },
  { id: 5, title: "Financial Responsibilities" },
  { id: 6, title: "Decision Making" },
  { id: 7, title: "Child Development Needs" },
  { id: 8, title: "Legal Considerations" },
];

export default function AITestPage() {
  const { isOpen, toggleMenu } = useMobileMenu();
  const { user } = useAuth();
  
  // State for AI testing
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [temperature, setTemperature] = useState<number>(0.7);
  const [prompt, setPrompt] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [aiOutput, setAIOutput] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  // Mock function to simulate AI generation
  const generateAIOutput = () => {
    if (!prompt || !userInput) return;
    
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // This is where you would call the actual AI API
      const mockOutput = `This is a simulated AI response for section "${selectedSection}" 
with temperature ${temperature}.

Based on the prompt: 
"${prompt}"

And user input:
"${userInput}"

The AI would generate a customized response here that helps create or modify 
the parenting plan section based on the specific needs expressed in the user input.`;
      
      setAIOutput(mockOutput);
      setIsGenerating(false);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header 
        title="AI Test" 
        onMenuClick={toggleMenu}
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-[#2e1a87]">AI Test & Development Console</h1>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Section Selection</CardTitle>
            <CardDescription>
              Choose a section of the parenting plan to test AI assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setSelectedSection}>
              <SelectTrigger className="w-full md:w-1/2">
                <SelectValue placeholder="Select a section" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_SECTIONS.map((section) => (
                  <SelectItem key={section.id} value={section.title}>
                    {section.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        {selectedSection && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card className="md:col-span-1">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">AI Parameters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <FormLabel className="mb-2 block">Temperature: {temperature}</FormLabel>
                      <Slider 
                        min={0} 
                        max={1} 
                        step={0.1} 
                        value={[temperature]} 
                        onValueChange={(value) => setTemperature(value[0])}
                        className="mb-4"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>More Focused (0.0)</span>
                        <span>More Creative (1.0)</span>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        onClick={generateAIOutput} 
                        className="w-full bg-[#2e1a87] hover:bg-[#25156d]"
                        disabled={isGenerating || !prompt || !userInput}
                      >
                        {isGenerating ? "Generating..." : "Generate Response"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-3">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Testing Console</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="prompt">
                    <TabsList className="mb-4">
                      <TabsTrigger value="prompt">AI Prompt</TabsTrigger>
                      <TabsTrigger value="user">User Input</TabsTrigger>
                      <TabsTrigger value="output">AI Output</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="prompt" className="space-y-4">
                      <Label>System Prompt Template</Label>
                      <Textarea 
                        placeholder="Enter the system prompt template here..."
                        className="min-h-[200px] font-mono text-sm"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                      />
                      <div className="text-sm text-gray-500">
                        <p>Use <code className="bg-gray-100 p-1 rounded">{"{userInput}"}</code> to reference where user content should be inserted</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="user" className="space-y-4">
                      <Label>Simulated User Input</Label>
                      <Textarea 
                        placeholder="Enter test user input here..."
                        className="min-h-[200px]"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                      />
                    </TabsContent>
                    
                    <TabsContent value="output" className="space-y-4">
                      <Label>AI Generated Output</Label>
                      <div className="bg-white border rounded-md p-4 min-h-[200px] whitespace-pre-wrap">
                        {aiOutput || "AI output will appear here after generation"}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Advanced Testing Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="mb-2 block">Preset Templates</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="legal">Legal Language</SelectItem>
                        <SelectItem value="simple">Simplified Language</SelectItem>
                        <SelectItem value="detailed">Detailed Plan</SelectItem>
                        <SelectItem value="concise">Concise Plan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Save Configuration</Label>
                    <div className="flex space-x-2">
                      <Input placeholder="Configuration name" />
                      <Button variant="outline">Save</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}