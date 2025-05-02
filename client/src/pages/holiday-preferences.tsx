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

// Categories of holidays for the preferences page
const HOLIDAY_CATEGORIES = [
  {
    title: "Major U.S. Holidays",
    holidays: [
      { id: "new_years", name: "New Year's Day" },
      { id: "mlk_day", name: "Martin Luther King Jr. Day" },
      { id: "presidents_day", name: "Presidents' Day" },
      { id: "memorial_day", name: "Memorial Day" },
      { id: "independence_day", name: "Independence Day" },
      { id: "labor_day", name: "Labor Day" },
      { id: "columbus_day", name: "Columbus Day / Indigenous Peoples' Day" },
      { id: "veterans_day", name: "Veterans Day" },
      { id: "thanksgiving", name: "Thanksgiving" },
      { id: "christmas", name: "Christmas" }
    ]
  },
  {
    title: "Major Religious Holidays",
    holidays: [
      { id: "easter", name: "Easter" },
      { id: "hanukkah", name: "Hanukkah" },
      { id: "passover", name: "Passover" },
      { id: "yom_kippur", name: "Yom Kippur" },
      { id: "rosh_hashanah", name: "Rosh Hashanah" },
      { id: "ramadan", name: "Ramadan" },
      { id: "eid_al_fitr", name: "Eid al-Fitr" },
      { id: "eid_al_adha", name: "Eid al-Adha" },
      { id: "diwali", name: "Diwali" }
    ]
  }
];

export default function HolidayPreferences() {
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  
  // Simple list of selected holiday IDs
  const [selectedHolidays, setSelectedHolidays] = useState<string[]>([
    "thanksgiving", "christmas", "new_years", "easter", "independence_day"
  ]);
  
  // Other holidays text field
  const [otherHolidays, setOtherHolidays] = useState<string>("");
  
  const toggleHoliday = (holidayId: string) => {
    setSelectedHolidays(prev => {
      if (prev.includes(holidayId)) {
        return prev.filter(id => id !== holidayId);
      } else {
        return [...prev, holidayId];
      }
    });
  };
  
  const atLeastOneHolidaySelected = selectedHolidays.length > 0;
  
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
                  Select which holidays matter to your family.
                </p>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-6">
              This is a simple form where you select the holidays that matter to your family. 
              The information will be used later in the course.
            </p>
            
            {HOLIDAY_CATEGORIES.map((category) => (
              <div key={category.title} className="mb-6">
                <h4 className="font-medium text-sm mb-3">{category.title}</h4>
                <div className="space-y-2">
                  {category.holidays.map((holiday) => {
                    const isSelected = selectedHolidays.includes(holiday.id);
                    return (
                      <div 
                        key={holiday.id} 
                        className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${isSelected ? 'bg-[#f5f0ff]' : 'hover:bg-gray-50'}`}
                        onClick={() => toggleHoliday(holiday.id)}
                      >
                        <Checkbox 
                          id={holiday.id} 
                          checked={isSelected}
                          onCheckedChange={() => toggleHoliday(holiday.id)}
                          className="mr-3"
                        />
                        <Label
                          htmlFor={holiday.id}
                          className="text-sm cursor-pointer w-full"
                        >
                          {holiday.name}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            
            {/* Other family-specific holidays text area */}
            <div className="mt-6">
              <Label htmlFor="otherHolidays" className="text-sm font-medium mb-2 block">
                Other family-specific holidays or traditions
              </Label>
              <Textarea 
                id="otherHolidays"
                placeholder="Enter any additional family-specific holidays or traditions"
                value={otherHolidays}
                onChange={(e) => setOtherHolidays(e.target.value)}
                className="resize-none min-h-[100px]"
              />
            </div>
            
            <div className="mt-6">
              <Button 
                className="bg-[#2e1a87] hover:bg-[#25156d] w-full"
                onClick={handleSave}
                disabled={!atLeastOneHolidaySelected}
              >
                Save Preferences
              </Button>
              
              {!atLeastOneHolidaySelected && (
                <p className="text-center text-amber-600 text-xs mt-3">
                  Please select at least one holiday
                </p>
              )}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button 
                variant="ghost" 
                className="text-[#2e1a87] px-0"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}