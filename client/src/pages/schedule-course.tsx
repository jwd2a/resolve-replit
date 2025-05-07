import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { format, addDays, isBefore, isSameDay, differenceInCalendarDays } from "date-fns";
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
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Info, 
  Calendar as CalendarIcon, 
  Users, 
  Check, 
  AlertCircle, 
  Edit, 
  CheckCircle 
} from "lucide-react";
import { SessionState } from "@/components/CourseSessionStatusBlock";

export default function ScheduleCourse() {
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(addDays(today, 7));
  const [selectedTime, setSelectedTime] = useState<string | undefined>("18:00");
  const [sessionState, setSessionState] = useState<SessionState>('none');
  const [isProcessing, setIsProcessing] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState<number | undefined>(undefined);
  
  // Check if there's an existing session state in localStorage
  useEffect(() => {
    const storedState = localStorage.getItem('courseSessionState');
    const storedDate = localStorage.getItem('courseSessionDate');
    
    if (storedState) {
      setSessionState(storedState as SessionState);
    }
    
    if (storedDate) {
      const date = new Date(storedDate);
      setSelectedDate(date);
      
      // Calculate days remaining
      if (date) {
        const days = differenceInCalendarDays(date, new Date());
        setDaysRemaining(days > 0 ? days : undefined);
      }
    }
  }, []);
  
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
  
  // Propose a new session
  const handleProposeSession = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Selection Required",
        description: "Please select both a date and time.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Save the session state and date to localStorage so both pages can access it
      localStorage.setItem('courseSessionState', 'proposed');
      localStorage.setItem('courseSessionDate', selectedDate.toISOString());
      localStorage.setItem('courseSessionTime', selectedTime);
      
      setSessionState('proposed');
      setIsProcessing(false);
      
      toast({
        title: "Session Proposed",
        description: "Your course session proposal has been sent to your co-parent."
      });
    }, 800);
  };
  
  // Accept a proposed session
  const handleAcceptSession = () => {
    setIsProcessing(true);
    
    // Simulate API delay
    setTimeout(() => {
      localStorage.setItem('courseSessionState', 'scheduled');
      
      // Calculate days remaining for countdown
      if (selectedDate) {
        const days = differenceInCalendarDays(selectedDate, new Date());
        setDaysRemaining(days > 0 ? days : undefined);
      }
      
      setSessionState('scheduled');
      setIsProcessing(false);
      
      toast({
        title: "Session Scheduled",
        description: "The course session has been confirmed."
      });
    }, 800);
  };
  
  // Cancel or reset a session
  const handleCancelSession = () => {
    setIsProcessing(true);
    
    // Simulate API delay
    setTimeout(() => {
      localStorage.removeItem('courseSessionState');
      localStorage.removeItem('courseSessionDate');
      localStorage.removeItem('courseSessionTime');
      
      setSessionState('none');
      setIsProcessing(false);
      
      toast({
        title: "Session Cancelled",
        description: "Your session has been cancelled."
      });
    }, 800);
  };
  
  // Main action handler based on current state
  const handleSubmit = () => {
    if (sessionState === 'scheduled') {
      // If scheduled, go back to dashboard
      navigate('/');
    } else if (sessionState === 'proposed') {
      // If proposed, accept the session
      handleAcceptSession();
    } else {
      // If none, propose a new session
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
                  {sessionState === 'none' ? 'Choose a time when both you and your co-parent can participate in the course together.' :
                   sessionState === 'proposed' ? 'Your proposed session is waiting for confirmation.' :
                   'Your scheduled session has been confirmed.'}
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
            
            {/* Proposed State */}
            {sessionState === 'proposed' && (
              <div className="space-y-6">
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-amber-800 text-sm">Session Proposed</h3>
                      <p className="text-amber-700 text-sm mt-1">
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
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline"
                    className="border-gray-200"
                    onClick={handleCancelSession}
                    disabled={isProcessing}
                  >
                    Cancel Proposal
                  </Button>
                  <Button
                    className="bg-[#2e1a87] hover:bg-[#25156d]"
                    onClick={handleAcceptSession}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Processing...
                      </>
                    ) : "Accept Session"}
                  </Button>
                </div>
              </div>
            )}
            
            {/* Scheduled State */}
            {sessionState === 'scheduled' && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-green-800 text-sm">Session Confirmed</h3>
                      <p className="text-green-700 text-sm mt-1">
                        Your course session has been scheduled and confirmed with your co-parent.
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
                        <p className="text-sm text-green-600">Co-parent (Confirmed)</p>
                      </div>
                    </div>
                  </div>
                  
                  {daysRemaining !== undefined && (
                    <div className="flex items-center mt-5 pt-5 border-t border-gray-100">
                      <div className="flex-shrink-0 bg-green-100 text-green-800 font-medium text-xs rounded-full px-3 py-1 mr-2">
                        {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} remaining
                      </div>
                      <p className="text-xs text-gray-500">
                        Make sure to set aside this time and find a quiet place to attend.
                      </p>
                    </div>
                  )}
                </div>
                
                <Button 
                  variant="outline"
                  className="w-full border-gray-200"
                  onClick={handleCancelSession}
                  disabled={isProcessing}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isProcessing ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-[#2e1a87] border-t-transparent rounded-full mr-2"></div>
                      Processing...
                    </>
                  ) : "Reschedule Session"}
                </Button>
              </div>
            )}
            
            {/* Initial State (None) */}
            {sessionState === 'none' && (
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
              
              {sessionState === 'none' && (
                <Button 
                  className="bg-[#2e1a87] hover:bg-[#25156d]"
                  onClick={handleProposeSession}
                  disabled={!selectedDate || !selectedTime || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Propose Session
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
              
              {sessionState !== 'none' && (
                <Button 
                  className="bg-[#2e1a87] hover:bg-[#25156d]"
                  onClick={() => navigate('/')}
                >
                  Return to Dashboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}