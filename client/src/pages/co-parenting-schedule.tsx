import React, { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, Printer, Calendar, Gift, Snowflake, Flower, Sun, AlertTriangle, 
  Home, School, Utensils, Moon, Heart, Star, ArrowRight, ChevronLeft, ChevronRight,
  Repeat, ArrowRightLeft
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Label } from "@/components/ui/label";
import { PrintStyles, PrintButton } from "@/styles/printStyles";
import { DayPicker } from 'react-day-picker';
import { format, addMonths, isSameMonth, isSameDay, parseISO, addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameWeek, getDate, getDay } from 'date-fns';

// Define the structure for custody calendar entry
interface CustodyCalendarEntry {
  parent: string;
  exchange: boolean;
  school: boolean;
}

// Type for the custody calendar object
interface CustodyCalendar {
  [date: string]: CustodyCalendarEntry;
}

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
  
  // New custody calendar data structure - formatted for our visual calendar
  custodyCalendar: {
    "2025-05-01": { parent: "Mom", exchange: false, school: false },
    "2025-05-02": { parent: "Dad", exchange: true, school: true },
    "2025-05-03": { parent: "Dad", exchange: false, school: false },
    "2025-05-04": { parent: "Dad", exchange: false, school: false },
    "2025-05-05": { parent: "Mom", exchange: true, school: true },
    "2025-05-06": { parent: "Mom", exchange: false, school: true },
    "2025-05-07": { parent: "Mom", exchange: false, school: true },
    "2025-05-08": { parent: "Dad", exchange: true, school: true },
    "2025-05-09": { parent: "Dad", exchange: false, school: true },
    "2025-05-10": { parent: "Dad", exchange: false, school: false },
    "2025-05-11": { parent: "Dad", exchange: false, school: false },
    "2025-05-12": { parent: "Mom", exchange: true, school: true },
    "2025-05-13": { parent: "Mom", exchange: false, school: true },
    "2025-05-14": { parent: "Mom", exchange: false, school: true },
    "2025-05-15": { parent: "Dad", exchange: true, school: true },
    "2025-05-16": { parent: "Dad", exchange: false, school: true },
    "2025-05-17": { parent: "Dad", exchange: false, school: false },
    "2025-05-18": { parent: "Dad", exchange: false, school: false },
    "2025-05-19": { parent: "Mom", exchange: true, school: true },
    "2025-05-20": { parent: "Mom", exchange: false, school: true },
    "2025-05-21": { parent: "Mom", exchange: false, school: true },
    "2025-05-22": { parent: "Dad", exchange: true, school: true },
    "2025-05-23": { parent: "Dad", exchange: false, school: true },
    "2025-05-24": { parent: "Dad", exchange: false, school: false },
    "2025-05-25": { parent: "Dad", exchange: false, school: false },
    "2025-05-26": { parent: "Mom", exchange: true, school: false },
    "2025-05-27": { parent: "Mom", exchange: false, school: true },
    "2025-05-28": { parent: "Mom", exchange: false, school: true },
    "2025-05-29": { parent: "Dad", exchange: true, school: true },
    "2025-05-30": { parent: "Dad", exchange: false, school: true },
    "2025-05-31": { parent: "Dad", exchange: false, school: false }
  },
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
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date(2025, 4, 1)); // May 2025
  const [custodyViewMonth, setCustodyViewMonth] = useState<Date>(new Date(2025, 4, 1)); // May 2025
  
  // Define custom CSS classes for the react-day-picker and the custody calendar
  const css = `
  .rdp {
    --rdp-cell-size: 40px;
    --rdp-accent-color: #6c54da;
    --rdp-background-color: #f5f0ff;
    margin: 0;
  }
  .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
    background-color: var(--rdp-accent-color);
    color: white;
  }
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
    background-color: #f5f0ff;
  }
  .schedule-mom {
    background-color: rgba(244, 114, 182, 0.2);
    border-radius: 0;
  }
  .schedule-dad {
    background-color: rgba(59, 130, 246, 0.2);
    border-radius: 0;
  }
  .transition-day {
    position: relative;
    overflow: hidden;
  }
  .transition-day::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(244, 114, 182, 0.2) 0%, rgba(244, 114, 182, 0.2) 50%, rgba(59, 130, 246, 0.2) 50%, rgba(59, 130, 246, 0.2) 100%);
    z-index: -1;
  }
  
  /* Visual custody calendar styles */
  .custody-calendar {
    font-family: 'Inter', system-ui, sans-serif;
  }
  
  .custody-day {
    min-height: 90px;
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    transition: transform 0.15s ease;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }
  
  .custody-day:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  }
  
  .custody-day-mom {
    background-color: #FDD5E5;
    border: 1px solid #F8B4D9;
  }
  
  .custody-day-dad {
    background-color: #D4E5FF;
    border: 1px solid #B4D4FF;
  }
  
  .custody-day-header {
    padding: 4px;
    display: flex;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }
  
  .custody-day-mom .custody-day-header {
    background-color: #FACDE1;
    color: #97266D;
  }
  
  .custody-day-dad .custody-day-header {
    background-color: #C6DEFF;
    color: #1E429F;
  }
  
  .custody-day-content {
    padding: 8px 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  
  .custody-day-date {
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
  }
  
  .custody-day-mom .custody-day-date {
    color: #97266D;
  }
  
  .custody-day-dad .custody-day-date {
    color: #1E429F;
  }
  
  .custody-day-parent {
    font-size: 14px;
    font-weight: 500;
  }
  
  .custody-day-icon {
    margin-top: 2px;
  }
  
  .custody-day-indicators {
    position: absolute;
    bottom: 6px;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 8px;
  }
  
  .custody-legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    padding: 12px;
    background-color: #F8F9FC;
    border-radius: 8px;
    margin-top: 16px;
  }
  
  .custody-legend-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    padding: 4px 10px;
    border-radius: 16px;
  }
  
  .mom-legend {
    background-color: #FDD5E5;
    color: #97266D;
  }
  
  .dad-legend {
    background-color: #D4E5FF;
    color: #1E429F;
  }
  
  .exchange-legend {
    background-color: #FFF1CD;
    color: #92400E;
  }
  
  .school-legend {
    background-color: #E2F2E9;
    color: #046C4E;
  }
  
  /* Other day states */
  .custody-day-exchange::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: #FBBF24;
  }
  
  .custody-day-outside-month {
    opacity: 0.4;
  }
  `;
  
  // Convert string dates to real dates for the calendar
  const scheduleDates = mockData.weeklySchedule.map(day => {
    // For demo purposes, we'll use the current month and year
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    // Use the date string as the day of month (simplified for the example)
    const dayNum = parseInt(day.date);
    return {
      ...day,
      fullDate: new Date(year, month, dayNum)
    };
  });
  
  // Function to determine which parent has the child on a given date
  const getParentForDate = (date: Date) => {
    const dayEntry = scheduleDates.find(day => 
      isSameDay(day.fullDate, date)
    );
    
    if (dayEntry) {
      return dayEntry.overnight;
    }
    
    // Default pattern for days not explicitly defined
    // This is a simplified example - real app would have more complex logic
    const dayOfWeek = date.getDay();
    // Monday, Tuesday, Friday, Saturday with mom
    if ([1, 2, 5, 6].includes(dayOfWeek)) {
      return "Sarah";
    }
    // Wednesday, Thursday, Sunday with dad
    return "Eric";
  };
  
  // Function to determine if a day is a transition day (exchange between parents)
  const determineIfTransitionDay = (date: Date) => {
    // Check if it has a dropoff entry
    const dayEntry = scheduleDates.find(day => 
      isSameDay(day.fullDate, date)
    );
    
    return dayEntry?.dropoff !== "—" && dayEntry?.dropoff !== undefined;
  };
  
  // Modifiers for the DayPicker to highlight days by parent
  const modifiers = {
    mom: (date: Date) => getParentForDate(date) === "Sarah",
    dad: (date: Date) => getParentForDate(date) === "Eric",
    transition: (date: Date) => {
      // Days with dropoffs/exchanges
      const dayEntry = scheduleDates.find(day => 
        isSameDay(day.fullDate, date)
      );
      return dayEntry?.dropoff !== "—" && dayEntry?.dropoff !== undefined;
    }
  };
  
  const modifiersClassNames = {
    mom: 'schedule-mom',
    dad: 'schedule-dad',
    transition: 'transition-day'
  };
  
  // Helper functions for the custody calendar
  const getCustodyDayInfo = (dateString: string) => {
    const calendar = mockData.custodyCalendar as CustodyCalendar;
    return calendar[dateString] || { 
      parent: "Mom", // Default to Mom if no data
      exchange: false,
      school: false
    };
  };
  
  // Generate days for the custody calendar
  const generateCalendarDays = (month: Date) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }); // Start from Sunday
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 }); // End on Saturday
    
    return eachDayOfInterval({ start: startDate, end: endDate });
  };
  
  // Group days into weeks
  const groupIntoWeeks = (days: Date[]) => {
    return days.reduce((weeks: Date[][], date: Date, i: number) => {
      if (i % 7 === 0) {
        weeks.push([date]);
      } else {
        weeks[weeks.length - 1].push(date);
      }
      return weeks;
    }, []);
  };
  
  // Generate calendar data for the selected month
  const calendarDays = generateCalendarDays(custodyViewMonth);
  const calendarWeeks = groupIntoWeeks(calendarDays);
  
  // Format date as YYYY-MM-DD for custody calendar data lookup
  const formatDateString = (date: Date) => {
    return format(date, 'yyyy-MM-dd');
  };
  
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
          <div className="flex gap-2 no-print">
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
                  Calendar showing where I'll be each day
                </p>
              </div>
              
              {/* Visual Custody Calendar (Fridge-friendly) */}
              <div className="bg-white border border-[#6c54da]/20 rounded-lg p-6 shadow-sm">
                <style>{css}</style>
                
                {/* Tabs for different calendar views */}
                <div className="flex mb-6 border-b border-gray-200">
                  <button 
                    className="mr-4 py-2 px-4 text-sm font-medium text-[#2e1a87] border-b-2 border-[#6c54da]"
                  >
                    Fridge Calendar
                  </button>
                  <button 
                    className="mr-4 py-2 px-4 text-sm font-medium text-gray-500"
                  >
                    Traditional View
                  </button>
                </div>
                
                {/* Month navigation */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-[#2e1a87] font-medium text-xl">
                    {format(custodyViewMonth, 'MMMM yyyy')}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-[#6c54da]/30 text-[#2e1a87]" 
                      onClick={() => setCustodyViewMonth(current => addMonths(current, -1))}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      <span>Previous</span>
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm" 
                      className="border-[#6c54da]/30 text-[#2e1a87]" 
                      onClick={() => setCustodyViewMonth(current => addMonths(current, 1))}
                    >
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
                
                {/* Visual Custody Calendar (Fridge-friendly calendar) */}
                <div className="custody-calendar">
                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 gap-2 mb-2 text-center font-semibold">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                      <div key={`header-${day}-${index}`} className="bg-gray-50 py-2 rounded text-gray-700 text-sm">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar grid */}
                  <div className="grid grid-cols-1 gap-2">
                    {calendarWeeks.map((week, weekIndex) => (
                      <div key={`week-${weekIndex}`} className="grid grid-cols-7 gap-2">
                        {week.map((day, dayIndex) => {
                          const dateStr = formatDateString(day);
                          const dayInfo = getCustodyDayInfo(dateStr);
                          const isExchange = dayInfo.exchange;
                          const hasSchool = dayInfo.school;
                          const isWithMom = dayInfo.parent === "Mom";
                          const isWithDad = dayInfo.parent === "Dad";
                          const isOutsideMonth = !isSameMonth(day, custodyViewMonth);
                          
                          return (
                            <div 
                              key={`day-${weekIndex}-${dayIndex}`} 
                              className={`
                                custody-day 
                                ${isWithMom ? 'custody-day-mom' : ''}
                                ${isWithDad ? 'custody-day-dad' : ''}
                                ${isExchange ? 'custody-day-exchange' : ''}
                                ${isOutsideMonth ? 'custody-day-outside-month' : ''}
                              `}
                            >
                              <div className="custody-day-header">
                                {format(day, 'EEE')}
                              </div>
                              <div className="custody-day-content">
                                <div className="custody-day-date">
                                  {format(day, 'd')}
                                </div>
                                <div className="custody-day-parent">
                                  {isWithMom ? 'Mom' : 'Dad'}
                                </div>
                                <div className="custody-day-icon">
                                  {isWithMom ? (
                                    <Home className="h-5 w-5 text-pink-700" />
                                  ) : (
                                    <Home className="h-5 w-5 text-blue-700" />
                                  )}
                                </div>
                                {/* Indicators at the bottom */}
                                <div className="custody-day-indicators">
                                  {isExchange && (
                                    <ArrowRightLeft className="h-3.5 w-3.5 text-amber-600" />
                                  )}
                                  {hasSchool && (
                                    <School className="h-3.5 w-3.5 text-emerald-600" />
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  
                  {/* Legend */}
                  <div className="custody-legend">
                    <div className="custody-legend-item mom-legend">
                      <Home className="h-4 w-4" />
                      <span>Mom's House</span>
                    </div>
                    <div className="custody-legend-item dad-legend">
                      <Home className="h-4 w-4" />
                      <span>Dad's House</span>
                    </div>
                    <div className="custody-legend-item exchange-legend">
                      <ArrowRightLeft className="h-4 w-4" />
                      <span>Exchange Day</span>
                    </div>
                    <div className="custody-legend-item school-legend">
                      <School className="h-4 w-4" />
                      <span>School Pickup/Dropoff</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Holiday Schedule Tab */}
            <TabsContent value="holidays" className="border-none p-0 m-0">
              <div className="mb-4">
                <h2 className="text-lg font-medium text-[#2e1a87] mb-2">Holiday Schedule</h2>
                <p className="text-gray-600 text-sm">
                  Where I'll be during holidays and special days
                </p>
              </div>
              
              {true ? (
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
                  My winter vacation schedule
                </p>
              </div>
              
              {true ? (
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
                  My spring vacation schedule
                </p>
              </div>
              
              {true ? (
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
                  My summer vacation adventures
                </p>
              </div>
              
              {true ? (
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