import { useState } from "react";
import { useLocation } from "wouter";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Info, 
  ArrowLeft, 
  ArrowRight, 
  Gift, 
  CalendarDays, 
  Sparkles, 
  CheckCircle
} from "lucide-react";

interface Holiday {
  id: string;
  name: string;
  selected: boolean;
  allocation: "alternate-years" | "shared" | "parent1" | "parent2" | "none";
}

export default function HolidayPreferences() {
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  
  const [holidays, setHolidays] = useState<Holiday[]>([
    { 
      id: "christmas", 
      name: "Christmas", 
      selected: true, 
      allocation: "alternate-years" 
    },
    { 
      id: "thanksgiving", 
      name: "Thanksgiving", 
      selected: true, 
      allocation: "alternate-years" 
    },
    { 
      id: "easter", 
      name: "Easter", 
      selected: false, 
      allocation: "none" 
    },
    { 
      id: "newyear", 
      name: "New Year's Day", 
      selected: false, 
      allocation: "none" 
    },
    { 
      id: "july4th", 
      name: "Independence Day", 
      selected: false, 
      allocation: "none" 
    },
    { 
      id: "laborday", 
      name: "Labor Day", 
      selected: false, 
      allocation: "none" 
    },
    { 
      id: "memorial", 
      name: "Memorial Day", 
      selected: false, 
      allocation: "none" 
    },
    { 
      id: "spring", 
      name: "Spring Break", 
      selected: true, 
      allocation: "alternate-years" 
    },
    { 
      id: "summer", 
      name: "Summer Break", 
      selected: true, 
      allocation: "shared" 
    },
    { 
      id: "winter", 
      name: "Winter Break", 
      selected: true, 
      allocation: "shared" 
    }
  ]);
  
  const [specialDays, setSpecialDays] = useState([
    { 
      id: "child-bday", 
      name: "Child's Birthday", 
      allocation: "shared" 
    },
    { 
      id: "mothers-day", 
      name: "Mother's Day", 
      allocation: "parent2" 
    },
    { 
      id: "fathers-day", 
      name: "Father's Day", 
      allocation: "parent1" 
    },
    { 
      id: "parent1-bday", 
      name: "Your Birthday", 
      allocation: "parent1" 
    },
    { 
      id: "parent2-bday", 
      name: "Co-Parent's Birthday", 
      allocation: "parent2" 
    }
  ]);
  
  const [familyTraditions, setFamilyTraditions] = useState<string>("Our family has a yearly reunion in August that the children should attend. We also celebrate cultural holidays such as Diwali.");
  
  const toggleHoliday = (id: string) => {
    setHolidays(holidays.map(holiday => 
      holiday.id === id 
        ? {...holiday, selected: !holiday.selected, allocation: !holiday.selected ? "alternate-years" : "none"} 
        : holiday
    ));
  };
  
  const updateAllocation = (id: string, allocation: string) => {
    setHolidays(holidays.map(holiday => 
      holiday.id === id 
        ? {...holiday, allocation: allocation as any} 
        : holiday
    ));
  };
  
  const updateSpecialDayAllocation = (id: string, allocation: string) => {
    setSpecialDays(specialDays.map(day => 
      day.id === id 
        ? {...day, allocation: allocation as any} 
        : day
    ));
  };
  
  const atLeastOneHolidaySelected = holidays.some(holiday => holiday.selected);
  
  const handleSave = () => {
    if (!atLeastOneHolidaySelected) {
      toast({
        title: "Selection Required",
        description: "Please select at least one holiday.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Preferences Saved",
      description: "Your holiday preferences have been saved successfully."
    });
    
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-[#f9f7fe]">
      <NavigationMenu />
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="text-[#2e1a87] hover:text-[#2e1a87]/80 hover:bg-[#f5f0ff]"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#6c54da]/20 p-6 shadow-sm">
            <div className="flex items-start gap-3 mb-5">
              <div className="bg-[#f5f0ff] p-2 rounded-md">
                <Calendar className="h-5 w-5 text-[#6c54da]" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#2e1a87]">Holiday Preferences</h1>
                <p className="text-gray-600 text-sm mt-1">
                  Select and allocate holidays for your parenting schedule.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <Info className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <p className="text-sm text-blue-700">
                  Select holidays that are important to your family and indicate how you'd like to share them. 
                  You can always modify these preferences later in the process.
                </p>
              </div>
            </div>
            
            {/* Holidays selection section */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-lg font-medium text-[#2e1a87] mb-4">
                Major Holidays & School Breaks
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {holidays.map((holiday) => (
                  <div key={holiday.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3 mb-3">
                      <Checkbox 
                        id={holiday.id} 
                        checked={holiday.selected}
                        onCheckedChange={() => toggleHoliday(holiday.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={holiday.id}
                          className="text-sm font-medium"
                        >
                          {holiday.name}
                        </label>
                        
                        {holiday.selected && (
                          <div className="mt-3">
                            <Label className="text-xs text-gray-500 mb-1">Allocation</Label>
                            <Select 
                              value={holiday.allocation} 
                              onValueChange={(value) => updateAllocation(holiday.id, value)}
                            >
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue placeholder="Choose allocation" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="alternate-years">Alternate Years</SelectItem>
                                <SelectItem value="shared">Shared Time</SelectItem>
                                <SelectItem value="parent1">Always with You</SelectItem>
                                <SelectItem value="parent2">Always with Co-Parent</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>
                      
                      {holiday.selected && (
                        <div className="flex-shrink-0">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Special days section */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex items-center mb-4">
                <Gift className="h-5 w-5 text-pink-500 mr-2" />
                <h2 className="text-lg font-medium text-[#2e1a87]">Special Days</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specialDays.map((day) => (
                  <div key={day.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium">
                        {day.name}
                      </label>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-gray-500 mb-1">Allocation</Label>
                      <Select 
                        value={day.allocation} 
                        onValueChange={(value) => updateSpecialDayAllocation(day.id, value)}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Choose allocation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="alternate-years">Alternate Years</SelectItem>
                          <SelectItem value="shared">Shared Time</SelectItem>
                          <SelectItem value="parent1">Always with You</SelectItem>
                          <SelectItem value="parent2">Always with Co-Parent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* School break specific allocations */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex items-center mb-4">
                <CalendarDays className="h-5 w-5 text-blue-500 mr-2" />
                <h2 className="text-lg font-medium text-[#2e1a87]">Family Traditions</h2>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                Describe any special family traditions or events that should be included in your parenting plan.
              </p>
              
              <Textarea 
                placeholder="Family reunions, cultural celebrations, annual vacations, etc."
                className="min-h-24"
                value={familyTraditions}
                onChange={(e) => setFamilyTraditions(e.target.value)}
              />
            </div>
            
            {/* Seasonal activities */}
            <div>
              <div className="flex items-center mb-4">
                <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
                <h2 className="text-lg font-medium text-[#2e1a87]">Additional Notes</h2>
              </div>
              
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <Info className="h-4 w-4 text-amber-500 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-sm text-amber-700">
                    These preferences help us create an initial draft of your holiday schedule. 
                    You'll be able to refine this further with your co-parent as you complete your parenting plan.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between">
              <Button 
                variant="ghost" 
                className="text-[#2e1a87]"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <Button 
                className="bg-[#2e1a87] hover:bg-[#25156d]"
                onClick={handleSave}
                disabled={!atLeastOneHolidaySelected}
              >
                Save Preferences
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            
            {!atLeastOneHolidaySelected && (
              <p className="text-center text-amber-600 text-xs mt-3">
                Please select at least one holiday
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}