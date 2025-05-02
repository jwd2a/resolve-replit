import React, { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, Printer, Calendar, Gift, Snowflake, Flower, Sun, AlertTriangle, 
  Home, School, Utensils, Moon, Heart, Star, ArrowRight
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PrintStyles, PrintButton } from "@/styles/printStyles";

// Mock data - replace with actual data from the parenting plan
const mockData = {
  familyName: "Smith Family",
  weeklySchedule: [
    // Week 1
    { week: 1, day: "Monday", date: "1", overnight: "Sarah", dropoff: "Eric drops off at school" },
    { week: 1, day: "Tuesday", date: "2", overnight: "Sarah", dropoff: "—" },
    { week: 1, day: "Wednesday", date: "3", overnight: "Eric", dropoff: "Sarah picks up at 3pm" },
    { week: 1, day: "Thursday", date: "4", overnight: "Eric", dropoff: "—" },
    { week: 1, day: "Friday", date: "5", overnight: "Sarah", dropoff: "Eric drops off at 6pm" },
    { week: 1, day: "Saturday", date: "6", overnight: "Sarah", dropoff: "—" },
    { week: 1, day: "Sunday", date: "7", overnight: "Eric", dropoff: "Sarah drops off at 5pm" },
    
    // Week 2
    { week: 2, day: "Monday", date: "8", overnight: "Sarah", dropoff: "Eric drops off at school" },
    { week: 2, day: "Tuesday", date: "9", overnight: "Sarah", dropoff: "—" },
    { week: 2, day: "Wednesday", date: "10", overnight: "Eric", dropoff: "Sarah picks up at 3pm" },
    { week: 2, day: "Thursday", date: "11", overnight: "Eric", dropoff: "—" },
    { week: 2, day: "Friday", date: "12", overnight: "Sarah", dropoff: "Eric drops off at 6pm" },
    { week: 2, day: "Saturday", date: "13", overnight: "Sarah", dropoff: "—" },
    { week: 2, day: "Sunday", date: "14", overnight: "Eric", dropoff: "Sarah drops off at 5pm" },
    
    // Week 3
    { week: 3, day: "Monday", date: "15", overnight: "Sarah", dropoff: "Eric drops off at school" },
    { week: 3, day: "Tuesday", date: "16", overnight: "Sarah", dropoff: "—" },
    { week: 3, day: "Wednesday", date: "17", overnight: "Eric", dropoff: "Sarah picks up at 3pm" },
    { week: 3, day: "Thursday", date: "18", overnight: "Eric", dropoff: "—" },
    { week: 3, day: "Friday", date: "19", overnight: "Sarah", dropoff: "Eric drops off at 6pm" },
    { week: 3, day: "Saturday", date: "20", overnight: "Sarah", dropoff: "—" },
    { week: 3, day: "Sunday", date: "21", overnight: "Eric", dropoff: "Sarah drops off at 5pm" },
    
    // Week 4
    { week: 4, day: "Monday", date: "22", overnight: "Sarah", dropoff: "Eric drops off at school" },
    { week: 4, day: "Tuesday", date: "23", overnight: "Sarah", dropoff: "—" },
    { week: 4, day: "Wednesday", date: "24", overnight: "Eric", dropoff: "Sarah picks up at 3pm" },
    { week: 4, day: "Thursday", date: "25", overnight: "Eric", dropoff: "—" },
    { week: 4, day: "Friday", date: "26", overnight: "Sarah", dropoff: "Eric drops off at 6pm" },
    { week: 4, day: "Saturday", date: "27", overnight: "Sarah", dropoff: "—" },
    { week: 4, day: "Sunday", date: "28", overnight: "Eric", dropoff: "Sarah drops off at 5pm" }
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
  const [kidFriendly, setKidFriendly] = useState(false);
  
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
  
  // Add print-specific styles
  const printStyles = `
    @media print {
      .no-print {
        display: none !important;
      }
      
      body {
        background: white !important;
        font-size: 12pt;
      }
      
      .print-container {
        background: white !important;
        box-shadow: none !important;
        border: none !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      
      .page-break {
        page-break-after: always;
      }
      
      .print-title {
        font-size: 18pt !important;
        color: black !important;
      }
      
      table {
        width: 100% !important;
        border-collapse: collapse !important;
      }
      
      th, td {
        border: 1px solid #ccc !important;
        padding: 0.25rem !important;
      }
      
      .print-enlarge {
        transform: scale(1.1);
        transform-origin: top center;
      }
      
      .print-full-width {
        width: 100% !important;
        max-width: 100% !important;
      }
    }
  `;

  return (
    <div className="min-h-screen bg-[#f9f7fe]">
      <PrintStyles />
      <div className="no-print">
        <NavigationMenu />
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8 print-container">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#2e1a87] print-title">Your Co-Parenting Schedule</h1>
            <p className="text-gray-600 mt-2">
              View your family's parenting time by category. You can download or print any section.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start md:items-center gap-3 no-print">
            <div className="flex items-center gap-2 bg-[#f5f0ff] px-3 py-1.5 rounded-lg border border-[#6c54da]/20">
              <Label htmlFor="kid-friendly" className="text-sm font-medium cursor-pointer flex items-center gap-2">
                <Heart className="h-4 w-4 text-pink-500" />
                Kid-Friendly View
              </Label>
              <Switch 
                id="kid-friendly" 
                checked={kidFriendly} 
                onCheckedChange={setKidFriendly} 
                className="data-[state=checked]:bg-[#6c54da]"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-[#6c54da]/30 text-[#2e1a87]"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download</span> PDF
              </Button>
              <PrintButton>
                <Printer className="h-4 w-4" />
                <span className="hidden sm:inline">Print</span> View
              </PrintButton>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-8 border border-[#6c54da]/20 shadow-sm mb-6">
          <Tabs defaultValue="weekly" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-full mb-6 bg-[#f5f0ff] border border-[#6c54da]/20 rounded-lg p-1 flex flex-wrap sm:flex-nowrap gap-1">
              <TabsTrigger value="weekly" className="flex-1 flex items-center justify-center gap-1 text-xs sm:text-sm md:text-base data-[state=active]:bg-white">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>Weekly</span>
              </TabsTrigger>
              <TabsTrigger value="holidays" className="flex-1 flex items-center justify-center gap-1 text-xs sm:text-sm md:text-base data-[state=active]:bg-white">
                <Gift className="h-4 w-4 flex-shrink-0" />
                <span>Holidays</span>
              </TabsTrigger>
              <TabsTrigger value="winter" className="flex-1 flex items-center justify-center gap-1 text-xs sm:text-sm md:text-base data-[state=active]:bg-white">
                <Snowflake className="h-4 w-4 flex-shrink-0" />
                <span>Winter</span>
              </TabsTrigger>
              <TabsTrigger value="spring" className="flex-1 flex items-center justify-center gap-1 text-xs sm:text-sm md:text-base data-[state=active]:bg-white">
                <Flower className="h-4 w-4 flex-shrink-0" />
                <span>Spring</span>
              </TabsTrigger>
              <TabsTrigger value="summer" className="flex-1 flex items-center justify-center gap-1 text-xs sm:text-sm md:text-base data-[state=active]:bg-white">
                <Sun className="h-4 w-4 flex-shrink-0" />
                <span>Summer</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Weekly Schedule Tab */}
            <TabsContent value="weekly" className="border-none p-0 m-0">
              <div className="mb-4">
                <h2 className="text-lg font-medium text-[#2e1a87] mb-2">Weekly Schedule</h2>
                <p className="text-gray-600 text-sm">
                  {kidFriendly ? "Where I'll be each day of the week" : `Your regular parenting schedule for ${mockData.familyName}.`}
                </p>
              </div>
              
              {kidFriendly ? (
                <div className="space-y-8">
                  {/* Calendar Header - Days of Week */}
                  <div className="grid grid-cols-7 gap-1 mb-1 text-center">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                      <div key={`header-${day}-${index}`} className="bg-[#f5f0ff] py-2 rounded-t-md border border-[#6c54da]/20">
                        <h3 className="font-bold text-sm text-[#2e1a87]">{day}</h3>
                      </div>
                    ))}
                  </div>
                  
                  {/* Week Grouping */}
                  {[1, 2, 3, 4].map(weekNum => (
                    <div key={weekNum} className="grid grid-cols-7 gap-1 mb-4">
                      <div className="col-span-7 -mb-2 font-medium text-[#2e1a87]">Week {weekNum}</div>
                      
                      {/* Calendar Days - By Week */}
                      {mockData.weeklySchedule
                        .filter(day => day.week === weekNum)
                        .map(day => (
                          <div 
                            key={`${day.week}-${day.day}`} 
                            className={`
                              rounded-md overflow-hidden shadow-sm border
                              ${day.overnight === "Sarah" ? "border-pink-300 bg-pink-50" : "border-blue-300 bg-blue-50"}
                            `}
                          >
                            <div className="bg-white px-2 py-1 text-center border-b flex justify-between items-center">
                              <span className="text-xs text-gray-500">{day.date}</span>
                              <h3 className="font-medium text-xs text-[#2e1a87]">{day.day.substring(0,3)}</h3>
                            </div>
                            <div className="p-2 text-center">
                              <div className={`
                                w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-1
                                ${day.overnight === "Sarah" ? "bg-pink-100" : "bg-blue-100"}
                              `}>
                                {day.overnight === "Sarah" ? (
                                  <Home className="h-6 w-6 text-pink-500" />
                                ) : (
                                  <Home className="h-6 w-6 text-blue-500" />
                                )}
                              </div>
                              <p className="font-bold text-sm">
                                <span className={day.overnight === "Sarah" ? "text-pink-600" : "text-blue-600"}>
                                  {day.overnight === "Sarah" ? "Mom" : "Dad"}
                                </span>
                              </p>
                              {day.dropoff !== "—" && (
                                <div className="mt-1">
                                  <div className="bg-white rounded py-1 px-1 text-xs text-gray-600 shadow-sm border border-gray-100">
                                    {day.dropoff.includes("school") ? (
                                      <School className="h-3 w-3 text-gray-500 mx-auto" />
                                    ) : day.dropoff.includes("pick") ? (
                                      <ArrowRight className="h-3 w-3 text-gray-500 mx-auto" />
                                    ) : (
                                      <ArrowRight className="h-3 w-3 text-gray-500 mx-auto" />
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
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
                        <tr key={`${day.week}-${day.day}`} className="hover:bg-[#f9f7fe]">
                          <td className="py-3 px-4 border border-[#6c54da]/20 font-medium">
                            {day.day} (Week {day.week}, {day.date})
                          </td>
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
              )}
            </TabsContent>
            
            {/* Holiday Schedule Tab */}
            <TabsContent value="holidays" className="border-none p-0 m-0">
              <div className="mb-4">
                <h2 className="text-lg font-medium text-[#2e1a87] mb-2">Holiday Schedule</h2>
                <p className="text-gray-600 text-sm">
                  {kidFriendly ? "Where I'll be during holidays and special days" : "Special arrangements for holidays and special occasions in 2024-2025."}
                </p>
              </div>
              
              {kidFriendly ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockData.holidaySchedule.map((holiday) => (
                    <div key={holiday.holiday} className={`
                      rounded-xl overflow-hidden shadow-md border-2
                      ${holiday.with === "Sarah" ? "border-pink-200" : 
                        holiday.with === "Eric" ? "border-blue-200" : "border-purple-200"}
                    `}>
                      <div className={`py-3 text-center border-b ${
                        holiday.with === "Sarah" ? "bg-pink-100" : 
                        holiday.with === "Eric" ? "bg-blue-100" : "bg-purple-100"
                      }`}>
                        <h3 className="font-bold text-lg text-[#2e1a87]">{holiday.holiday}</h3>
                      </div>
                      <div className="p-4 bg-white">
                        <div className="text-center">
                          <div className="mb-3 inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-800">
                            {holiday.dates}
                          </div>
                          <div className="mb-3">
                            <div className={`
                              inline-flex items-center gap-2 px-3 py-1 rounded-md
                              ${holiday.with === "Sarah" ? "bg-pink-50 text-pink-700" : 
                                holiday.with === "Eric" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"}
                            `}>
                              {holiday.with === "Both" ? (
                                <>
                                  <Star className="h-4 w-4" /> 
                                  <span>Both Mom & Dad</span>
                                </>
                              ) : (
                                <>
                                  <Heart className="h-4 w-4" /> 
                                  <span>{holiday.with === "Sarah" ? "Mom" : "Dad"}</span>
                                </>
                              )}
                            </div>
                          </div>
                          {holiday.notes && (
                            <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-md">
                              {holiday.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
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
              )}
            </TabsContent>
            
            {/* Winter Break Tab */}
            <TabsContent value="winter" className="border-none p-0 m-0">
              <div className="mb-4">
                <h2 className="text-lg font-medium text-[#2e1a87] mb-2">Winter Break</h2>
                <p className="text-gray-600 text-sm">
                  {kidFriendly ? "My winter vacation schedule" : `Winter break schedule for ${mockData.winterBreak.dateRange}.`}
                </p>
              </div>
              
              {kidFriendly ? (
                <div>
                  <div className="text-center mb-6">
                    <div className="inline-block px-4 py-2 bg-blue-50 rounded-full text-[#2e1a87] font-bold text-sm">
                      Winter Break: {mockData.winterBreak.dateRange}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    {mockData.winterBreak.blocks.map((block, index) => (
                      <div key={index} className={`
                        flex-1 rounded-xl overflow-hidden shadow-lg border-2
                        ${block.parent === "Sarah" ? "border-pink-200" : "border-blue-200"}
                      `}>
                        <div className={`
                          py-4 text-center relative
                          ${block.parent === "Sarah" ? "bg-pink-100" : "bg-blue-100"}
                        `}>
                          <Snowflake className={`
                            absolute top-2 right-2 h-6 w-6 
                            ${block.parent === "Sarah" ? "text-pink-300" : "text-blue-300"}
                          `} />
                          <h3 className="font-bold text-xl text-[#2e1a87]">
                            {block.period}
                          </h3>
                        </div>
                        <div className="p-6 bg-white text-center">
                          <div className={`
                            w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center
                            ${block.parent === "Sarah" ? "bg-pink-50" : "bg-blue-50"}
                          `}>
                            {block.parent === "Sarah" ? (
                              <Heart className="h-12 w-12 text-pink-500" />
                            ) : (
                              <Heart className="h-12 w-12 text-blue-500" />
                            )}
                          </div>
                          <p className="text-lg font-medium mb-3">
                            <span className={block.parent === "Sarah" ? "text-pink-600" : "text-blue-600"}>
                              {block.parent === "Sarah" ? "Mom's House" : "Dad's House"}
                            </span>
                          </p>
                          <div className="mt-4 px-4 py-2 bg-gray-50 rounded-md text-sm text-gray-600">
                            {block.notes}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
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
              )}
            </TabsContent>
            
            {/* Spring Break Tab */}
            <TabsContent value="spring" className="border-none p-0 m-0">
              <div className="mb-4">
                <h2 className="text-lg font-medium text-[#2e1a87] mb-2">Spring Break</h2>
                <p className="text-gray-600 text-sm">
                  {kidFriendly ? "My spring vacation schedule" : `Spring break schedule for ${mockData.springBreak.dateRange}.`}
                </p>
              </div>
              
              {kidFriendly ? (
                <div className="rounded-xl overflow-hidden shadow-lg border-2 border-green-200">
                  <div className="bg-green-50 p-5 text-center relative">
                    <div className="absolute top-4 right-4">
                      <Flower className="h-10 w-10 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#2e1a87] mt-2 mb-3">Spring Break!</h3>
                    <div className="inline-block px-4 py-2 bg-white rounded-full text-[#2e1a87] font-medium text-sm border border-green-200 shadow-sm">
                      {mockData.springBreak.dateRange}
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 text-center">
                    <div className="mb-6">
                      <div className={`
                        w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-4
                        ${mockData.springBreak.schedule.includes("Sarah") ? "bg-pink-100" : "bg-blue-100"}
                      `}>
                        {mockData.springBreak.schedule.includes("Sarah") ? (
                          <Heart className="h-16 w-16 text-pink-500" />
                        ) : (
                          <Heart className="h-16 w-16 text-blue-500" />
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        <span className={mockData.springBreak.schedule.includes("Sarah") ? "text-pink-600" : "text-blue-600"}>
                          {mockData.springBreak.schedule.replace("with", "with ")}
                        </span>
                      </h3>
                    </div>
                    
                    <div className="mt-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-700 border border-gray-100">
                      <p className="font-medium">{mockData.springBreak.notes}</p>
                    </div>
                  </div>
                </div>
              ) : (
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
              )}
            </TabsContent>
            
            {/* Summer Break Tab */}
            <TabsContent value="summer" className="border-none p-0 m-0">
              <div className="mb-4">
                <h2 className="text-lg font-medium text-[#2e1a87] mb-2">Summer Break</h2>
                <p className="text-gray-600 text-sm">
                  {kidFriendly ? "My summer vacation adventures" : `Summer schedule for ${mockData.summerBreak.dateRange}.`}
                </p>
              </div>
              
              {kidFriendly ? (
                <div>
                  <div className="text-center mb-6">
                    <div className="inline-block px-4 py-2 bg-amber-50 rounded-full text-amber-800 font-bold text-sm border border-amber-200">
                      Summer Break: {mockData.summerBreak.dateRange}
                    </div>
                  </div>
                  
                  {/* Calendar-style Summer View */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {mockData.summerBreak.blocks.map((block, index) => {
                      // Extract month from period string (e.g., "June 10–June 24" -> "June")
                      const month = block.period.split(" ")[0];
                      // Extract dates from period string
                      const dates = block.period.replace(month + " ", "").split("–");
                      const startDate = dates[0]; // "10"
                      const endDateFull = dates[1]; // "June 24"
                      const endDate = endDateFull.includes(" ") ? endDateFull.split(" ")[1] : endDateFull;
                      
                      return (
                        <div 
                          key={index} 
                          className={`
                            rounded-xl overflow-hidden shadow-md border-2
                            ${block.parent === "Sarah" ? "border-pink-200" : "border-blue-200"}
                          `}
                        >
                          <div className={`
                            py-3 text-center relative border-b
                            ${block.parent === "Sarah" ? "bg-pink-100" : "bg-blue-100"}
                          `}>
                            <Sun className={`
                              absolute top-2 right-2 h-5 w-5
                              ${block.parent === "Sarah" ? "text-pink-300" : "text-blue-300"}
                            `} />
                            <h3 className="font-bold text-[#2e1a87] text-sm">
                              {month}
                            </h3>
                            <div className="flex items-center justify-center text-[#2e1a87] gap-2 mt-1">
                              <span className="font-bold">{startDate}</span>
                              <ArrowRight className="h-3 w-3" />
                              <span className="font-bold">{endDate}</span>
                            </div>
                          </div>
                          
                          <div className="p-3 bg-white text-center">
                            <div className={`
                              w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2
                              ${block.parent === "Sarah" ? "bg-pink-50" : "bg-blue-50"}
                            `}>
                              {index % 2 === 0 ? (
                                <Sun className={`h-6 w-6 ${block.parent === "Sarah" ? "text-pink-500" : "text-blue-500"}`} />
                              ) : (
                                <Moon className={`h-6 w-6 ${block.parent === "Sarah" ? "text-pink-500" : "text-blue-500"}`} />
                              )}
                            </div>
                            
                            <p className="font-bold text-sm">
                              <span className={block.parent === "Sarah" ? "text-pink-600" : "text-blue-600"}>
                                {block.parent === "Sarah" ? "Mom's House" : "Dad's House"}
                              </span>
                            </p>
                            
                            {block.notes && (
                              <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded mt-2">
                                {block.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 text-amber-800 text-center mt-8 font-medium">
                    Back to regular schedule on August 16, 2025
                  </div>
                </div>
              ) : (
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
              )}
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