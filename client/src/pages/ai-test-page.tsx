import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import Header from "@/components/Header";

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
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
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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
        
        {/* Top Section: Section Selection, AI Parameters, Advanced Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Section Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Section Selection</CardTitle>
              <CardDescription>
                Choose a section to test AI assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedSection}>
                <SelectTrigger>
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
          
          {/* AI Parameters */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">AI Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Temperature: {temperature}</Label>
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
              </div>
            </CardContent>
          </Card>
          
          {/* Advanced Options */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Advanced Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Middle Section: User Input Selection */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">User Input Selection</CardTitle>
            <CardDescription>Configure the user's selections for the parenting plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Decision Making Areas */}
              <div className="space-y-4">
                <h3 className="text-base font-medium text-[#6246ea]">Decision-Making Areas</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="education"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-[#2e1a87] focus:ring-[#2e1a87]"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="education" className="font-medium text-gray-700">Education (choice of schools, tutoring, etc)</label>
                      <p className="text-gray-500">Most parents include education decisions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="healthcare"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-[#2e1a87] focus:ring-[#2e1a87]"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="healthcare" className="font-medium text-gray-700">Healthcare (non-emergency medical)</label>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="religious"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-[#2e1a87] focus:ring-[#2e1a87]"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="religious" className="font-medium text-gray-700">Religious upbringing</label>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="extracurricular"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-[#2e1a87] focus:ring-[#2e1a87]"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="extracurricular" className="font-medium text-gray-700">Extracurricular activities</label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decision Making Process */}
              <div className="space-y-4">
                <h3 className="text-base font-medium text-[#6246ea]">Decision Making Process</h3>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="decision-process" className="text-sm font-medium">How will major decisions be made?</Label>
                    <Select>
                      <SelectTrigger id="decision-process" className="w-full mt-1">
                        <SelectValue placeholder="Select a process" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="joint">Joint Decision (Both parents must agree)</SelectItem>
                        <SelectItem value="primary-mother">Primary to Mother (Mother decides)</SelectItem>
                        <SelectItem value="primary-father">Primary to Father (Father decides)</SelectItem>
                        <SelectItem value="split">Split by Area (Decisions split by topic)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="communication-method" className="text-sm font-medium">Preferred communication method</Label>
                    <Select>
                      <SelectTrigger id="communication-method" className="w-full mt-1">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="app">Co-Parenting App</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="text">Text Messages</SelectItem>
                        <SelectItem value="phone">Phone Calls</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="timeframe" className="text-sm font-medium">Decision response timeframe</Label>
                    <Select>
                      <SelectTrigger id="timeframe" className="w-full mt-1">
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24h">24 Hours</SelectItem>
                        <SelectItem value="48h">48 Hours</SelectItem>
                        <SelectItem value="72h">72 Hours</SelectItem>
                        <SelectItem value="1w">1 Week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hidden field to compile all inputs into a single text value for the AI prompt */}
            <input 
              type="hidden" 
              value={userInput} 
              onChange={(e) => setUserInput(e.target.value)}
            />
            
            <Button 
              onClick={() => {
                // Compile all the form selections into a structured text
                // This is just a placeholder - in a real implementation, this would
                // gather all the form values and compile them into a structured text
                const compiledInput = `Decision Areas: Education, Healthcare, Religious
Decision Process: Joint Decision
Communication: Co-Parenting App
Timeframe: 48 Hours`;
                
                setUserInput(compiledInput);
              }}
              className="mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              Apply Selections to AI Input
            </Button>
          </CardContent>
        </Card>
        
        {/* Bottom Section: AI Prompt and AI Output side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* AI Prompt */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">AI Prompt Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea 
                  placeholder="Enter the system prompt template here..."
                  className="min-h-[200px] font-mono text-sm"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <div className="text-sm text-gray-500">
                  <p>Use <code className="bg-gray-100 p-1 rounded">{"{userInput}"}</code> to reference user content</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* AI Output */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">AI Output</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white border rounded-md p-4 min-h-[200px] whitespace-pre-wrap">
                  {aiOutput || "AI output will appear here after generation"}
                </div>
                
                <Button 
                  onClick={generateAIOutput} 
                  className="w-full bg-[#2e1a87] hover:bg-[#25156d]"
                  disabled={isGenerating || !prompt || !userInput}
                >
                  {isGenerating ? "Generating..." : "Generate Response"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}