import React, { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Download, Printer, Calendar, Gift, Snowflake, Flower, Sun, AlertTriangle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { NavigationMenu } from "@/components/NavigationMenu";

// Mock data - replace with actual data from the parenting plan
const mockData = {
  familyName: "Smith Family",
  weeklySchedule: [
    { day: "Monday", overnight: "Sarah", dropoff: "Eric drops off at school" },
    { day: "Tuesday", overnight: "Sarah", dropoff: "—" },
    { day: "Wednesday", overnight: "Eric", dropoff: "Sarah picks up at 3pm" },
    { day: "Thursday", overnight: "Eric", dropoff: "—" },
    { day: "Friday", overnight: "Sarah", dropoff: "Eric drops off at 6pm" },
    { day: "Saturday", overnight: "Sarah", dropoff: "—" },
    { day: "Sunday", overnight: "Eric", dropoff: "Sarah drops off at 5pm" }
  ],
  holidaySchedule: [
    { holiday: "Thanksgiving", dates: "Nov 27–29", with: "Eric", notes: "Alternates annually" },
    { holiday: "Christmas Eve", dates: "Dec 24", with: "Sarah", notes: "Fixed" },
    { holiday: "Christmas Day", dates: "Dec 25", with: "Eric", notes: "Fixed" },
    { holiday: "New Year's Eve", dates: "Dec 31", with: "Sarah", notes: "Alternates – even years" },
    { holiday: "New Year's Day", dates: "Jan 1", with: "Eric", notes: "Alternates – even years" },
    { holiday: "4th of July", dates: "July 4", with: "Eric", notes: "Alternates – odd years" },
    { holiday: "Halloween", dates: "Oct 31", with: "Sarah", notes: "Alternates annually" },
    { holiday: "Child's Birthday", dates: "May 15", with: "Both", notes: "Shared celebration" }
  ],
  winterBreak: {
    dateRange: "December 20, 2024 - January 3, 2025",
    blocks: [
      { period: "Dec 20–Dec 27", parent: "Eric", notes: "Exchange on Dec 27 at 5pm" },
      { period: "Dec 27–Jan 3", parent: "Sarah", notes: "Returns to normal schedule after Jan 3" }
    ]
  },
  springBreak: {
    dateRange: "March 10 - March 17, 2025",
    schedule: "Entire week with Sarah",
    notes: "Alternates annually. Next year with Eric."
  },
  summerBreak: {
    dateRange: "June 10 - August 15, 2025",
    blocks: [
      { period: "June 10–June 24", parent: "Sarah", notes: "Exchange on June 24 at 6pm" },
      { period: "June 24–July 8", parent: "Eric", notes: "Exchange on July 8 at 6pm" },
      { period: "July 8–July 22", parent: "Sarah", notes: "Exchange on July 22 at 6pm" },
      { period: "July 22–August 5", parent: "Eric", notes: "Exchange on August 5 at 6pm" },
      { period: "August 5–August 15", parent: "Sarah", notes: "Returns to normal schedule on August 16" }
    ]
  },
  // Flag to tell if the parenting plan is complete
  isPlanComplete: true
};

export default function CoParentingSchedule() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("weekly");
  
  if (!mockData.isPlanComplete) {
    return (
      <div className="min-h-screen bg-[#f9f7fe]">
        <NavigationMenu />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl p-8 border border-[#6c54da]/20 shadow-sm text-center">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h1 className="text-2xl font-medium text-[#2e1a87] mb-4">Parenting Plan Not Complete</h1>
            <p className="text-gray-600 mb-6">
              You'll be able to view and download your full parenting schedule once your Parenting Plan is complete.
            </p>
            <Button 
              onClick={() => navigate("/parenting-plan")}
              className="bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4]"
            >
              Complete Your Parenting Plan
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  const handlePrint = () => {
    // In a real application, this would be customized to print the current tab's content
    window.print();
  };
  
  const handleDownload = () => {
    // In a real application, this would generate a PDF of the current tab's content
    toast({
      title: "Download Started",
      description: `Downloading ${getTabTitle(activeTab)} as PDF.`,
    });
    // Placeholder for PDF generation functionality
  };
  
  const getTabTitle = (tab: string) => {
    switch(tab) {
      case "weekly": return "Weekly Schedule";
      case "holidays": return "Holiday Schedule";
      case "winter": return "Winter Break";
      case "spring": return "Spring Break";
      case "summer": return "Summer Break";
      default: return "Schedule";
    }
  };
  
  return (
    <div className="min-h-screen bg-[#f9f7fe]">
      <NavigationMenu />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#2e1a87]">Your Co-Parenting Schedule</h1>
            <p className="text-gray-600 mt-2">
              View your family's parenting time by category. You can download or print any section.
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-[#6c54da]/30 text-[#2e1a87]"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-[#6c54da]/30 text-[#2e1a87]"
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4" />
              Print View
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-8 border border-[#6c54da]/20 shadow-sm mb-6">
          <Tabs defaultValue="weekly" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-full mb-6 bg-[#f5f0ff] border border-[#6c54da]/20 rounded-lg p-1">
              <TabsTrigger value="weekly" className="flex items-center gap-2 data-[state=active]:bg-white">
                <Calendar className="h-4 w-4" />
                Weekly Schedule
              </TabsTrigger>
              <TabsTrigger value="holidays" className="flex items-center gap-2 data-[state=active]:bg-white">
                <Gift className="h-4 w-4" />
                Holiday Schedule
              </TabsTrigger>
              <TabsTrigger value="winter" className="flex items-center gap-2 data-[state=active]:bg-white">
                <Snowflake className="h-4 w-4" />
                Winter Break
              </TabsTrigger>
              <TabsTrigger value="spring" className="flex items-center gap-2 data-[state=active]:bg-white">
                <Flower className="h-4 w-4" />
                Spring Break
              </TabsTrigger>
              <TabsTrigger value="summer" className="flex items-center gap-2 data-[state=active]:bg-white">
                <Sun className="h-4 w-4" />
                Summer Break
              </TabsTrigger>
            </TabsList>
            
            {/* Weekly Schedule Tab */}
            <TabsContent value="weekly" className="border-none p-0 m-0">
              <div className="mb-4">
                <h2 className="text-lg font-medium text-[#2e1a87] mb-2">Weekly Schedule</h2>
                <p className="text-gray-600 text-sm">
                  Your regular parenting schedule for {mockData.familyName}.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#f5f0ff]">
                      <th className="py-3 px-4 text-left text-[#2e1a87] font-medium border border-[#6c54da]/20">Day</th>
                      <th className="py-3 px-4 text-left text-[#2e1a87] font-medium border border-[#6c54da]/20">Overnight With</th>
                      <th className="py-3 px-4 text-left text-[#2e1a87] font-medium border border-[#6c54da]/20">Drop-off/Pick-up</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockData.weeklySchedule.map((day) => (
                      <tr key={day.day} className="hover:bg-[#f9f7fe]">
                        <td className="py-3 px-4 border border-[#6c54da]/20 font-medium">{day.day}</td>
                        <td className="py-3 px-4 border border-[#6c54da]/20">
                          <span className={day.overnight === "Sarah" ? "text-pink-600" : "text-blue-600"}>
                            {day.overnight}
                          </span>
                        </td>
                        <td className="py-3 px-4 border border-[#6c54da]/20 text-gray-600">{day.dropoff}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            {/* Holiday Schedule Tab */}
            <TabsContent value="holidays" className="border-none p-0 m-0">
              <div className="mb-4">
                <h2 className="text-lg font-medium text-[#2e1a87] mb-2">Holiday Schedule</h2>
                <p className="text-gray-600 text-sm">
                  Special arrangements for holidays and special occasions in 2024-2025.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#f5f0ff]">
                      <th className="py-3 px-4 text-left text-[#2e1a87] font-medium border border-[#6c54da]/20">Holiday</th>
                      <th className="py-3 px-4 text-left text-[#2e1a87] font-medium border border-[#6c54da]/20">Dates</th>
                      <th className="py-3 px-4 text-left text-[#2e1a87] font-medium border border-[#6c54da]/20">With</th>
                      <th className="py-3 px-4 text-left text-[#2e1a87] font-medium border border-[#6c54da]/20">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockData.holidaySchedule.map((holiday) => (
                      <tr key={holiday.holiday} className="hover:bg-[#f9f7fe]">
                        <td className="py-3 px-4 border border-[#6c54da]/20 font-medium">{holiday.holiday}</td>
                        <td className="py-3 px-4 border border-[#6c54da]/20">{holiday.dates}</td>
                        <td className="py-3 px-4 border border-[#6c54da]/20">
                          <span className={
                            holiday.with === "Sarah" ? "text-pink-600" : 
                            holiday.with === "Eric" ? "text-blue-600" : "text-purple-600"
                          }>
                            {holiday.with}
                          </span>
                        </td>
                        <td className="py-3 px-4 border border-[#6c54da]/20 text-gray-600">{holiday.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            {/* Winter Break Tab */}
            <TabsContent value="winter" className="border-none p-0 m-0">
              <div className="mb-4">
                <h2 className="text-lg font-medium text-[#2e1a87] mb-2">Winter Break</h2>
                <p className="text-gray-600 text-sm">
                  Winter break schedule for {mockData.winterBreak.dateRange}.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {mockData.winterBreak.blocks.map((block, index) => (
                  <div key={index} className="bg-[#f5f0ff] rounded-lg p-5 border border-[#6c54da]/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-[#2e1a87]">{block.period}</h3>
                        <p className="text-gray-600 mt-1">
                          With <span className={block.parent === "Sarah" ? "text-pink-600 font-medium" : "text-blue-600 font-medium"}>{block.parent}</span>
                        </p>
                      </div>
                      <Snowflake className="h-8 w-8 text-[#6c54da] opacity-50" />
                    </div>
                    <p className="text-sm text-gray-600 mt-3">{block.notes}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Spring Break Tab */}
            <TabsContent value="spring" className="border-none p-0 m-0">
              <div className="mb-4">
                <h2 className="text-lg font-medium text-[#2e1a87] mb-2">Spring Break</h2>
                <p className="text-gray-600 text-sm">
                  Spring break schedule for {mockData.springBreak.dateRange}.
                </p>
              </div>
              <div className="bg-[#f0fff5] rounded-lg p-6 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-[#2e1a87]">{mockData.springBreak.dateRange}</h3>
                    <p className="text-gray-700 mt-2 text-lg">
                      {mockData.springBreak.schedule}
                    </p>
                  </div>
                  <Flower className="h-12 w-12 text-green-400" />
                </div>
                <p className="text-sm text-gray-600 mt-4 bg-[#f9f9f9] p-3 rounded-md">
                  Note: {mockData.springBreak.notes}
                </p>
              </div>
            </TabsContent>
            
            {/* Summer Break Tab */}
            <TabsContent value="summer" className="border-none p-0 m-0">
              <div className="mb-4">
                <h2 className="text-lg font-medium text-[#2e1a87] mb-2">Summer Break</h2>
                <p className="text-gray-600 text-sm">
                  Summer schedule for {mockData.summerBreak.dateRange}.
                </p>
              </div>
              <div className="space-y-4">
                {mockData.summerBreak.blocks.map((block, index) => (
                  <div key={index} className={`rounded-lg p-5 border ${
                    block.parent === "Sarah" ? "bg-pink-50 border-pink-200" : "bg-blue-50 border-blue-200"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-[#2e1a87]">{block.period}</h3>
                        <p className={`mt-1 ${
                          block.parent === "Sarah" ? "text-pink-600" : "text-blue-600"
                        } font-medium`}>
                          With {block.parent}
                        </p>
                      </div>
                      <Sun className={`h-8 w-8 ${
                        block.parent === "Sarah" ? "text-pink-400" : "text-blue-400"
                      } opacity-70`} />
                    </div>
                    <p className="text-sm text-gray-600 mt-3">{block.notes}</p>
                  </div>
                ))}
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 text-amber-800 text-sm mt-6">
                  <p>Regular weekly schedule resumes on August 16, 2025.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="bg-[#f5f0ff] rounded-lg p-4 border border-[#6c54da]/20 text-sm text-gray-600">
          <p className="flex items-center">
            <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
            This schedule is based on your completed Parenting Plan. If you need to make changes, 
            please update your Parenting Plan and this schedule will reflect those changes.
          </p>
        </div>
      </div>
    </div>
  );
}