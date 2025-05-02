import { useState } from "react";
import { useNavigate } from "wouter";
import { format, addDays, isBefore, isSameDay } from "date-fns";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Clock, Info, Calendar as CalendarIcon, Users, Check } from "lucide-react";

export default function ScheduleCourse() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(addDays(today, 7));
  const [selectedTime, setSelectedTime] = useState<string | undefined>("18:00");
  const [isProposed, setIsProposed] = useState(false);
  
  const availableTimes = [
    "09:00", "10:00", "11:00", "12:00", "13:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00", 
    "19:00", "20:00"
  ];
  
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };
  
  const handleProposeSession = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Selection Required",
        description: "Please select both a date and time.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send a proposal to the co-parent
    setIsProposed(true);
    toast({
      title: "Session Proposed",
      description: "Your course session proposal has been sent to your co-parent."
    });
  };
  
  const handleSubmit = () => {
    if (isProposed) {
      navigate('/');
    } else {
      handleProposeSession();
    }
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
                <Clock className="h-5 w-5 text-[#6c54da]" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#2e1a87]">Schedule Course Session</h1>
                <p className="text-gray-600 text-sm mt-1">
                  Choose a time when both you and your co-parent can participate in the course together.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <Info className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <p className="text-sm text-blue-700">
                  Finding time together helps build a collaborative foundation for your parenting plan. 
                  The session will last approximately 90 minutes.
                </p>
              </div>
            </div>
            
            {isProposed ? (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-green-800 text-sm">Session Proposed</h3>
                      <p className="text-green-700 text-sm mt-1">
                        Your co-parent will be notified of this proposed time. We'll let you know once it's confirmed.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <h3 className="text-[#2e1a87] font-medium mb-4">Session Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-3">
                      <CalendarIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Date</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Time</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {selectedTime && formatTime(selectedTime)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 mt-6">
                    <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Participants</h4>
                      <div className="flex flex-col space-y-1 mt-1">
                        <p className="text-sm text-gray-600">You (Confirmed)</p>
                        <p className="text-sm text-amber-600">Co-parent (Pending)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date selection */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Select Date</Label>
                  <div className="border border-gray-200 rounded-lg p-3 bg-white">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => isBefore(date, today) || isSameDay(date, today)}
                      className="mx-auto"
                    />
                  </div>
                </div>
                
                {/* Time selection */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Select Time</Label>
                  <div className="border border-gray-200 rounded-lg p-5 bg-white h-full">
                    <div className="mb-6">
                      <Select
                        value={selectedTime}
                        onValueChange={setSelectedTime}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTimes.map((time) => (
                            <SelectItem key={time} value={time}>
                              {formatTime(time)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-[#f5f0ff] rounded-lg p-4">
                      <h3 className="text-sm font-medium text-[#2e1a87] mb-2">Selected Session</h3>
                      
                      {selectedDate && selectedTime ? (
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <CalendarIcon className="h-4 w-4 mr-2 text-[#6c54da]" />
                            <span>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-[#6c54da]" />
                            <span>{formatTime(selectedTime)}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-2 text-[#6c54da]" />
                            <span>You + Co-parent</span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">
                          Please select both a date and time.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
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
                onClick={handleSubmit}
                disabled={!selectedDate || !selectedTime}
              >
                {isProposed ? 'Return to Dashboard' : 'Propose Session'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}