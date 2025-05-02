import React, { useState } from "react";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Volume2, 
  Subtitles, 
  Settings, 
  Maximize,
  Lightbulb
} from "lucide-react";
import logoPath from "@assets/@Resolve Primary Logo - Main Color 02.png";

// Mock module data
const modules = [
  {
    id: 1,
    title: "Welcome to Resolve",
    isActive: false,
    isExpanded: false,
  },
  {
    id: 2,
    title: "Parental Responsibility and Decision Making",
    isActive: false,
    isExpanded: false,
  },
  {
    id: 3,
    title: "Timesharing Schedule",
    isActive: true,
    isExpanded: true,
    sections: [
      { id: 1, title: "Overview", isActive: false },
      { id: 2, title: "Travel & Work Restrictions", isActive: true },
      { id: 3, title: "Regular Timesharing Schedule", isActive: false },
    ]
  },
  {
    id: 4,
    title: "Educational Decisions",
    isActive: false,
    isExpanded: false,
  },
  {
    id: 5,
    title: "Introduction to Final Considerations",
    isActive: false,
    isExpanded: false,
  },
];

export default function CoursePage() {
  const [activeModule, setActiveModule] = useState(3);
  const [expandedModules, setExpandedModules] = useState([3]);
  const [radius, setRadius] = useState("");
  const [infoToShare, setInfoToShare] = useState({
    destination: false,
    contactDetails: false,
    itinerary: false
  });
  const [approvalDistance, setApprovalDistance] = useState("");
  const [foreignTravelDays, setForeignTravelDays] = useState("30");

  const toggleModule = (moduleId: number) => {
    if (expandedModules.includes(moduleId)) {
      setExpandedModules(expandedModules.filter(id => id !== moduleId));
    } else {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  const activateModule = (moduleId: number) => {
    setActiveModule(moduleId);
  };

  return (
    <div className="min-h-screen bg-white">
      <NavigationMenu />
      
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
        {/* Left Column - Module Navigation */}
        <div className="w-full md:w-1/4 border-r border-gray-200 p-4">
          <div className="sticky top-20">
            <div className="overflow-auto max-h-[calc(100vh-120px)]">
              {modules.map(module => (
                <div key={module.id} className="mb-4">
                  <div 
                    className={`flex justify-between items-start p-3 rounded-md cursor-pointer ${
                      module.isActive ? 'border-l-4 border-[#2e1a87] bg-[#f5f0ff]' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => toggleModule(module.id)}
                  >
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Module {module.id}</div>
                      <div className="font-medium text-[#2e1a87]">{module.title}</div>
                    </div>
                    {expandedModules.includes(module.id) ? (
                      <ChevronUp className="h-4 w-4 text-gray-500 flex-shrink-0 mt-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0 mt-1" />
                    )}
                  </div>
                  
                  {/* Module Sections */}
                  {expandedModules.includes(module.id) && module.sections && (
                    <div className="ml-6 mt-2 space-y-2">
                      {module.sections.map(section => (
                        <div
                          key={section.id}
                          className={`p-2 rounded-md text-sm cursor-pointer ${
                            section.isActive ? 'bg-blue-50 text-[#2e1a87] font-medium' : 'text-gray-600 hover:bg-gray-50'
                          }`}
                          onClick={() => {/* Handle section click */}}
                        >
                          {section.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Middle Column - Content */}
        <div className="w-full md:w-2/4 p-6 border-r border-gray-200">
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="mb-4 text-gray-500"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1">
                <path d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
              Back
            </Button>
            <h1 className="text-2xl font-semibold text-[#2e1a87]">Travel & Work Restrictions</h1>
          </div>
          
          {/* Video Player */}
          <div className="relative bg-[#181652] rounded-xl overflow-hidden mb-8 aspect-video">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-white text-center">
                <div className="uppercase tracking-wider mb-2 text-sm">Timesharing</div>
                <div className="uppercase tracking-wider text-2xl font-semibold mb-2">
                  TRAVEL AND
                </div>
                <div className="uppercase tracking-wider text-2xl font-semibold">
                  WORK RESTRICTIONS
                </div>
              </div>
            </div>
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 flex justify-between items-center">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="text-white h-8 w-8 rounded-full">
                  <Play className="h-4 w-4" />
                </Button>
                <span className="text-white text-xs ml-2">04:10</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-white h-8 w-8">
                  <Volume2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white h-8 w-8">
                  <Subtitles className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white h-8 w-8">
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Tip Box */}
          <div className="bg-blue-50 rounded-xl p-5 mb-6">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Lightbulb className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="ml-2 font-semibold text-blue-800">Things to keep in mind</h3>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-blue-800">
              <li>Set clear notice requirements for travel plans.</li>
              <li>Share itineraries and emergency contacts.</li>
              <li>Discuss any restrictions on international travel.</li>
              <li>Consider cultural and logistical factors when approving trips.</li>
            </ul>
          </div>
        </div>
        
        {/* Right Column - Form */}
        <div className="w-full md:w-1/4 p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#2e1a87] mb-4">Travel & Work Restrictions</h2>
            
            <p className="text-gray-700 mb-6">
              Previously, you agreed to a right of first refusal, meaning whenever one of you is unable to care for the child(ren) during your time, the other parent should be the first one to ask for childcare.
              To change this policy, please go to <span className="text-blue-600 underline cursor-pointer">section 2.7 (Child Care)</span>.
            </p>
            
            <p className="text-gray-700 mb-6">
              In situations where one parent needs to travel, the following apply:
            </p>
            
            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="radius" className="block mb-2">
                  Notices are required for travel how far away? <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="radius" 
                  placeholder="Enter radius or 'not required'" 
                  value={radius} 
                  onChange={(e) => setRadius(e.target.value)} 
                  className="w-full"
                />
              </div>
              
              <div>
                <Label className="block mb-2">
                  What information needs to be shared? <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox 
                      id="destination" 
                      checked={infoToShare.destination} 
                      onCheckedChange={(checked) => 
                        setInfoToShare({...infoToShare, destination: checked === true})
                      } 
                    />
                    <Label htmlFor="destination" className="ml-2">Destination</Label>
                  </div>
                  
                  <div className="flex items-center">
                    <Checkbox 
                      id="contactDetails" 
                      checked={infoToShare.contactDetails}
                      onCheckedChange={(checked) => 
                        setInfoToShare({...infoToShare, contactDetails: checked === true})
                      }
                    />
                    <Label htmlFor="contactDetails" className="ml-2">Contact details</Label>
                  </div>
                  
                  <div className="flex items-center">
                    <Checkbox 
                      id="itinerary" 
                      checked={infoToShare.itinerary}
                      onCheckedChange={(checked) => 
                        setInfoToShare({...infoToShare, itinerary: checked === true})
                      }
                    />
                    <Label htmlFor="itinerary" className="ml-2">Itinerary</Label>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="approvalDistance" className="block mb-2">
                  Approval from the non-traveling parent is required for trips how far away? <span className="text-red-500">*</span>
                </Label>
                <Select value={approvalDistance} onValueChange={setApprovalDistance}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50 miles">50 miles</SelectItem>
                    <SelectItem value="100 miles">100 miles</SelectItem>
                    <SelectItem value="200 miles">200 miles</SelectItem>
                    <SelectItem value="out of state">Out of state</SelectItem>
                    <SelectItem value="out of country">Out of country</SelectItem>
                    <SelectItem value="not required">Not required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="foreignTravelDays" className="block mb-2">
                  Foreign Travel – Days notice required before travel
                </Label>
                <Select value={foreignTravelDays} onValueChange={setForeignTravelDays}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="30" />
                  </SelectTrigger>
                  <SelectContent>
                    {[7, 14, 21, 30, 45, 60, 90].map(days => (
                      <SelectItem key={days} value={days.toString()}>{days}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}