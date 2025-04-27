import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { format, addDays, isBefore, isToday } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

// UI components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Calendar as CalendarIcon,
  Info,
  Video,
  Users,
  AlertCircle,
  CheckCheck,
  Check,
  CheckCircle,
  Circle,
  BookOpen,
  Heart,
  ArrowRight,
  HelpCircle,
  ChevronRight,
  Clock,
  CalendarDays,
  ClipboardList,
  Mail,
} from "lucide-react";

// Interfaces for tracking pre-course requirements
interface PreCourseRequirement {
  id: string;
  title: string;
  description: string;
  completed: {
    user: boolean;
    coParent: boolean;
  };
  required: boolean;
  icon: React.ReactNode;
  action: string;
}

// Mock data interfaces
interface CourseDate {
  scheduledDate: Date | null;
  proposedDate: Date | null;
  proposedTime?: string; // Time in "HH:MM" format
  proposedBy: string | null;
  approved: boolean;
}

interface Waiver {
  id: string;
  title: string;
  description: string;
  signed: {
    user: boolean;
    coParent: boolean;
  };
  signedDate?: {
    user: Date | null;
    coParent: Date | null;
  };
}

interface HolidayPreference {
  id: string;
  title: string;
  completed: {
    user: boolean;
    coParent: boolean;
  };
}

export default function DashboardSimplified() {
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const [showChecklistDetail, setShowChecklistDetail] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showWaiverDialog, setShowWaiverDialog] = useState(false);
  const [showHolidayDialog, setShowHolidayDialog] = useState(false);
  const [showSupportDialog, setShowSupportDialog] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [courseScheduled, setCourseScheduled] = useState(false);
  const [prevCompletionStatus, setPrevCompletionStatus] = useState(false);
  
  // Course scheduling state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    addDays(new Date(), 7)
  );
  const [selectedTime, setSelectedTime] = useState<string>("10:00");
  
  // Co-parent status
  const [coParentRegistered, setCoParentRegistered] = useState(false);
  
  // Waiver and holiday preferences state
  const [waivers] = useState<Waiver[]>([
    {
      id: "confidentiality",
      title: "Confidentiality Agreement",
      description: "Agreement to keep all shared information confidential during the course and parenting plan development.",
      signed: { user: true, coParent: false },
      signedDate: { 
        user: new Date(2024, 3, 15), 
        coParent: null 
      },
    },
    {
      id: "mediation",
      title: "Terms & Conditions",
      description: "Agreement to participate in good faith in the mediation process if needed during the course.",
      signed: { user: false, coParent: false },
      signedDate: { 
        user: null, 
        coParent: null 
      },
    },
  ]);
  
  const [holidayPreferences] = useState<HolidayPreference[]>([
    {
      id: "holidays",
      title: "Holiday Selection Form",
      completed: { user: false, coParent: false },
    }
  ]);
  
  // Send invitation to co-parent
  const sendInvitation = () => {
    // In a real implementation, this would send an email invitation
    setShowInviteDialog(false);
    setCoParentRegistered(true); // For demo purposes, we'll simulate co-parent registering
  };

  // Schedule course session
  const scheduleCourse = () => {
    setCourseScheduled(true);
    setShowScheduleDialog(false);
  };

  // Complete waiver
  const completeWaiver = (waiverId: string) => {
    const updatedWaivers = waivers.map(waiver => {
      if (waiver.id === waiverId) {
        return {
          ...waiver,
          signed: { ...waiver.signed, user: true },
          signedDate: { ...waiver.signedDate, user: new Date() }
        };
      }
      return waiver;
    });
    
    // In a real implementation, this would update the waivers state
    setShowWaiverDialog(false);
  };

  // Complete holiday preferences
  const completeHolidayPreferences = () => {
    // In a real implementation, this would update the holiday preferences
    const updatedHolidayPreferences = holidayPreferences.map(pref => ({
      ...pref,
      completed: { ...pref.completed, user: true }
    }));
    
    setShowHolidayDialog(false);
  };

  // Pre-course requirements
  const preCourseRequirements: PreCourseRequirement[] = [
    {
      id: "co-parent",
      title: "Co-Parent Registration",
      description: "Invite your co-parent to join the platform.",
      // Mark the item as not completed by the user until the co-parent registers
      // This ensures the action link is still shown
      completed: { user: coParentRegistered, coParent: coParentRegistered },
      required: true,
      icon: <Users className="h-4 w-4" />,
      action: "Invite Co-Parent"
    },
    {
      id: "waivers",
      title: "Waivers & Agreements",
      description: "Review and sign the required legal agreements.",
      completed: { 
        user: waivers.every(w => w.signed.user), 
        coParent: waivers.every(w => w.signed.coParent) 
      },
      required: true,
      icon: <FileText className="h-4 w-4" />,
      action: "Review & Sign"
    },
    {
      id: "holidays",
      title: "Holiday Preferences",
      description: "Select your preferences for holiday schedules.",
      completed: { 
        user: holidayPreferences[0].completed.user, 
        coParent: holidayPreferences[0].completed.coParent 
      },
      required: true,
      icon: <CalendarDays className="h-4 w-4" />,
      action: "Select Preferences"
    },
    {
      id: "schedule",
      title: "Schedule Course Session",
      description: "Pick a date and time to complete the course with your co-parent.",
      completed: { user: courseScheduled, coParent: courseScheduled },
      required: false,
      icon: <Clock className="h-4 w-4" />,
      action: "Schedule Now"
    }
  ];

  // Calculate completion status
  const requiredItemsCompleted = preCourseRequirements
    .filter(item => item.required)
    .every(item => item.completed.user);
    
  const requiredItemsCount = preCourseRequirements.filter(item => item.required).length;
  const completedRequiredItems = preCourseRequirements
    .filter(item => item.required)
    .filter(item => item.completed.user)
    .length;
    
  // Calculate progress percentage
  const progressPercentage = Math.round((completedRequiredItems / requiredItemsCount) * 100);
  
  // Calculate if both parents have completed requirements
  const bothParentsCompleted = preCourseRequirements
    .filter(item => item.required)
    .every(item => item.completed.user && item.completed.coParent);
    
  // Handle action click for pre-course requirements
  const handleRequirementAction = (requirementId: string) => {
    switch(requirementId) {
      case "co-parent":
        setShowInviteDialog(true);
        break;
      case "waivers":
        setShowWaiverDialog(true);
        break;
      case "holidays":
        setShowHolidayDialog(true);
        break;
      case "schedule":
        setShowScheduleDialog(true);
        break;
      default:
        break;
    }
  };

  // Show success toast when all required items are completed
  useEffect(() => {
    // Check if the completion status has changed from incomplete to complete
    if (requiredItemsCompleted && !prevCompletionStatus) {
      toast({
        title: "You're ready to start!",
        description: "You've completed all required items for your Parenting Plan course.",
        variant: "default",
      });
    }
    
    // Update the previous completion status
    setPrevCompletionStatus(requiredItemsCompleted);
  }, [requiredItemsCompleted, prevCompletionStatus, toast]);
  
  // Get status icon for checklist item - always use themed icon
  const getStatusIcon = (item: PreCourseRequirement) => {
    // Always use themed icons based on requirement type, regardless of completion status
    switch (item.id) {
      case "co-parent":
        return (
          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#f0e6ff] border-2 border-[#6c54da]/50">
            <Users className="h-4 w-4 text-[#6c54da]" />
          </div>
        );
        
      case "waivers":
        return (
          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#f0e6ff] border-2 border-[#6c54da]/50">
            <FileText className="h-4 w-4 text-[#6c54da]" />
          </div>
        );
        
      case "holidays":
        return (
          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#f0e6ff] border-2 border-[#6c54da]/50">
            <CalendarDays className="h-4 w-4 text-[#6c54da]" />
          </div>
        );
        
      case "schedule":
        return (
          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 border border-gray-200">
            <Clock className="h-4 w-4 text-gray-500" />
          </div>
        );
        
      default:
        return (
          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#f0e6ff] border-2 border-[#6c54da]/50">
            <Circle className="h-4 w-4 text-[#6c54da]" />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f5ff] via-white to-white">
      {/* Header */}
      <Header 
        title="Family Dashboard"
        onMenuClick={() => {}}
      />

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-4">
        {/* Warm welcome message - small and centered */}
        <section className="text-center mb-2">
          <h1 className="text-lg font-medium text-[#2e1a87] mb-1">
            Welcome back, {user?.displayName || "Friend"}
          </h1>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            You're taking important steps for your family's future.
          </p>
        </section>
        
        {/* Main card with pre-course checklist */}
        <section className="relative">
          {/* Main card */}
          <div className="bg-white rounded-xl p-6 border border-[#6c54da]/20 shadow-sm relative overflow-hidden">
            {/* Soft background illustration */}
            <div className="absolute -right-24 -bottom-24 w-64 h-64 rounded-full bg-gradient-to-br from-[#f5f0ff] to-transparent opacity-50 pointer-events-none"></div>
            
            <div className="flex flex-col relative z-10">
              {/* Combined progress section */}
              <div className="mb-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 bg-[#f5f0ff] rounded-full flex items-center justify-center flex-shrink-0">
                    <ClipboardList className="h-4.5 w-4.5 text-[#6c54da]" />
                  </div>
                  <div>
                    <h2 className="font-medium text-[#2e1a87] text-base">
                      Before you start your parenting plan
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Please complete these preparation steps for the best experience.
                    </p>
                  </div>
                </div>
                
                {/* Space instead of visual progress */}
                <div className="mb-3 mt-3">
                  {bothParentsCompleted && (
                    <div className="bg-green-50 border border-green-100 rounded-lg p-2.5 mb-2">
                      <p className="text-sm text-green-700 flex items-center">
                        <CheckCheck className="h-4 w-4 mr-2 text-green-600" />
                        You and your co-parent have completed all required steps!
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Pre-course checklist */}
                <div className="bg-[#f9f5ff]/80 rounded-lg p-4 mb-5">
                  <h3 className="font-medium text-[#2e1a87] mb-2.5 flex items-center text-sm">
                    <CheckCheck className="h-4 w-4 mr-2" />
                    Pre-Course Checklist
                  </h3>
                  
                  <ul className="space-y-2">
                    {preCourseRequirements.map((item) => (
                      <li 
                        key={item.id} 
                        className={`rounded-md p-3 ${
                          item.completed.user ? 'bg-white/60' : 'bg-white'
                        }`}
                      >
                        {/* Use flexbox instead of grid for better vertical alignment */}
                        <div className="flex items-center gap-3">
                          {/* Column 1: Icon */}
                          <div className="flex-shrink-0">
                            {getStatusIcon(item)}
                          </div>
                          
                          {/* Column 2: Title and description */}
                          <div className="flex-grow">
                            <h4 className="text-sm font-medium text-[#2e1a87] flex items-center flex-wrap gap-2">
                              {item.title}
                              {item.required ? (
                                <span className="text-xs bg-[#f0e6ff] text-[#2e1a87] px-2 py-0.5 rounded-full">
                                  Required
                                </span>
                              ) : (
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                  Optional
                                </span>
                              )}
                            </h4>
                            
                            <p className="text-xs text-gray-600 mt-1.5">
                              {item.description}
                            </p>
                            
                            {/* Status text */}
                            <div className="mt-2">
                              {item.id !== "schedule" ? (
                                <div className="flex flex-wrap text-xs text-gray-600">
                                  <span className="whitespace-nowrap">
                                    You: <span className={item.id === "co-parent" || item.completed.user ? 'text-green-600 font-medium' : ''}>
                                      {item.id === "co-parent" || item.completed.user ? 'Completed' : 'Pending'}
                                    </span>
                                  </span>
                                  
                                  <>
                                    <span className="mx-1 hidden sm:inline">•</span>
                                    <span className="sm:hidden">&nbsp;/&nbsp;</span>
                                    <span className="whitespace-nowrap">
                                      Co-Parent: <span className={item.completed.coParent ? 'text-green-600 font-medium' : ''}>
                                        {item.completed.coParent ? 'Completed' : 'Pending'}
                                      </span>
                                    </span>
                                  </>
                                </div>
                              ) : (
                                <div className="text-xs text-gray-600">
                                  {courseScheduled ? 'Session scheduled' : 'No session scheduled'}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Status text - moved from below to be next to action links */}
                          <div className="flex-shrink-0 flex items-center h-full ml-auto">
                            {item.id !== "schedule" ? (
                              <div className="flex items-center text-xs text-gray-500">
                                {/* Special handling for co-parent registration which needs both sides */}
                                {item.id === "co-parent" && !coParentRegistered ? (
                                  <button
                                    className="font-semibold text-[#3B82F6] hover:text-[#2563EB] hover:underline flex items-center mr-3"
                                    onClick={() => handleRequirementAction(item.id)}
                                  >
                                    {item.action}
                                    <ArrowRight className="h-3 w-3 ml-1" />
                                  </button>
                                ) : !item.completed.user ? (
                                  <button
                                    className="font-semibold text-[#3B82F6] hover:text-[#2563EB] hover:underline flex items-center mr-3"
                                    onClick={() => handleRequirementAction(item.id)}
                                  >
                                    {item.action}
                                    <ArrowRight className="h-3 w-3 ml-1" />
                                  </button>
                                ) : (
                                  /* Show completed status with check icon when item is completed */
                                  <div className="flex items-center text-green-600 font-medium">
                                    <Check className="h-4 w-4 mr-1.5" />
                                    <span>Completed</span>
                                  </div>
                                )}
                              </div>
                            ) : (
                              /* Schedule action */
                              <div className="flex items-center text-xs">
                                {!courseScheduled ? (
                                  <button
                                    className="font-semibold text-[#3B82F6] hover:text-[#2563EB] hover:underline flex items-center"
                                    onClick={() => handleRequirementAction(item.id)}
                                  >
                                    {item.action}
                                    <ArrowRight className="h-3 w-3 ml-1" />
                                  </button>
                                ) : (
                                  /* Show completed status with check icon when scheduled */
                                  <div className="flex items-center text-green-600 font-medium">
                                    <Check className="h-4 w-4 mr-1.5" />
                                    <span>Scheduled</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Primary CTA Button */}
              <Button
                className={`px-5 py-6 h-auto ${
                  requiredItemsCompleted 
                    ? 'bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4] border-none'
                    : 'bg-gradient-to-r from-[#6c54da]/60 to-[#9a8ae6]/60 text-white border-none cursor-not-allowed opacity-80'
                }`}
                disabled={!requiredItemsCompleted}
              >
                <span className="text-base">
                  {requiredItemsCompleted 
                    ? "Start Course" 
                    : "Complete Required Items to Start"
                  }
                </span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              {!requiredItemsCompleted && (
                <p className="text-xs text-center text-amber-600 mt-2">
                  Please complete all required items before continuing
                </p>
              )}
              
              {bothParentsCompleted && (
                <div className="mt-4 bg-green-50 border border-green-100 rounded-lg p-3">
                  <p className="text-sm text-green-700 flex items-center">
                    <CheckCheck className="h-4 w-4 mr-2 text-green-600" />
                    Both you and your co-parent have completed all required preparations!
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Minimalist footer with support links */}
        <footer className="mt-4 text-center">
          <div className="flex justify-center items-center gap-6 text-xs text-gray-500">
            <button 
              onClick={() => setShowSupportDialog(true)}
              className="flex items-center hover:text-[#2e1a87] transition-colors"
            >
              <HelpCircle className="h-3.5 w-3.5 mr-1.5" />
              <span>Get Support</span>
            </button>
            <a href="#" className="hover:text-[#2e1a87] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#2e1a87] transition-colors">Terms of Service</a>
          </div>
          
          <p className="text-xs text-gray-500 mt-8 max-w-md mx-auto font-light italic">
            "Every thoughtful decision you make today creates a more supportive tomorrow for your children."
          </p>
        </footer>

        {/* Schedule dialog */}
        <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
          <DialogContent className="bg-white rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-[#2e1a87]">Schedule Your Course Session</DialogTitle>
              <DialogDescription>
                Choose a date and time when both you and your co-parent can focus together.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-[#f9f5ff] p-4 rounded-lg mb-4 text-sm text-[#2e1a87]">
                <div className="flex gap-2">
                  <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>Setting aside dedicated time to complete this course together often leads to better outcomes.</span>
                </div>
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => isBefore(date, new Date()) && !isToday(date)}
                className="rounded-md border border-[#6c54da]/20 mx-auto"
              />
              <div className="mt-4">
                <div className="text-sm font-medium mb-2 text-[#2e1a87]">Choose a Time</div>
                <div className="flex flex-wrap gap-2">
                  {["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`px-3 py-1.5 rounded-md text-sm ${
                        selectedTime === time
                          ? "bg-gradient-to-r from-[#2e1a87] to-[#6c54da] text-white"
                          : "bg-[#f5f0ff] text-[#2e1a87] hover:bg-[#e8deff]"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 bg-blue-50 p-3 rounded-md text-sm text-blue-700">
                <div className="flex gap-2">
                  <Mail className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>You'll both receive an email reminder 24 hours before your scheduled time.</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowScheduleDialog(false)} 
                className="border-[#6c54da]/20 text-[#2e1a87]">
                Skip for Now
              </Button>
              <Button onClick={scheduleCourse} 
                className="bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4] border-none">
                Schedule Session
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Waiver dialog */}
        <Dialog open={showWaiverDialog} onOpenChange={setShowWaiverDialog}>
          <DialogContent className="bg-white rounded-lg max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-[#2e1a87]">Review & Sign Agreements</DialogTitle>
              <DialogDescription>
                Please review these documents carefully before signing.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 max-h-[60vh] overflow-y-auto">
              {waivers.map((waiver) => (
                <div key={waiver.id} className="mb-6 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <h3 className="text-[#2e1a87] font-medium mb-2 text-base">{waiver.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{waiver.description}</p>
                  
                  <div className="bg-gray-50 p-4 rounded-md mb-4 text-sm text-gray-700 h-32 overflow-y-auto">
                    <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-xs">
                        <div className={`h-2 w-2 rounded-full ${
                          waiver.signed.user ? 'bg-green-500' : 'bg-gray-300'
                        } mr-1.5`}></div>
                        <span className="text-gray-600">
                          {waiver.signed.user 
                            ? `You signed on ${format(waiver.signedDate?.user || new Date(), 'MMMM d, yyyy')}` 
                            : 'Your signature required'}
                        </span>
                      </div>
                      
                      {coParentRegistered && (
                        <div className="flex items-center text-xs">
                          <div className={`h-2 w-2 rounded-full ${
                            waiver.signed.coParent ? 'bg-green-500' : 'bg-gray-300'
                          } mr-1.5`}></div>
                          <span className="text-gray-600">
                            {waiver.signed.coParent 
                              ? `Co-parent signed on ${format(waiver.signedDate?.coParent || new Date(), 'MMMM d, yyyy')}` 
                              : 'Co-parent signature pending'}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {!waiver.signed.user && (
                      <Button
                        size="sm"
                        onClick={() => completeWaiver(waiver.id)}
                        className="bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4] border-none h-8 px-3"
                      >
                        Sign Agreement
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowWaiverDialog(false)}
                className="border-[#6c54da]/20 text-[#2e1a87]"
              >
                Review Later
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Holiday preferences dialog */}
        <Dialog open={showHolidayDialog} onOpenChange={setShowHolidayDialog}>
          <DialogContent className="bg-white rounded-lg max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-[#2e1a87]">Holiday Schedule Preferences</DialogTitle>
              <DialogDescription>
                Choose your preferences for holidays and special occasions.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-[#f9f5ff] p-4 rounded-lg mb-6 text-sm text-[#2e1a87]">
                <div className="flex gap-2">
                  <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>Your selections here will help create a starting point for your holiday schedule. You can always adjust these later.</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Sample holiday categories */}
                <div>
                  <h3 className="text-sm font-medium text-[#2e1a87] mb-3">Major Holidays</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {["Thanksgiving", "Christmas Eve", "Christmas Day", "New Year's Eve", "New Year's Day", "Fourth of July"].map((holiday) => (
                      <div key={holiday} className="flex items-center justify-between border border-gray-200 rounded-md p-3">
                        <span className="text-sm">{holiday}</span>
                        <select className="text-xs border border-gray-200 rounded px-2 py-1 bg-white text-gray-700">
                          <option>Alternating years</option>
                          <option>Shared equally</option>
                          <option>Always with you</option>
                          <option>Always with co-parent</option>
                          <option>Other arrangement</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-[#2e1a87] mb-3">Special Days</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {["Child's Birthday", "Mother's Day", "Father's Day", "Your Birthday", "Co-Parent's Birthday"].map((day) => (
                      <div key={day} className="flex items-center justify-between border border-gray-200 rounded-md p-3">
                        <span className="text-sm">{day}</span>
                        <select className="text-xs border border-gray-200 rounded px-2 py-1 bg-white text-gray-700">
                          <option>Naturally assigned</option>
                          <option>Alternating years</option>
                          <option>Shared equally</option>
                          <option>Always with you</option>
                          <option>Always with co-parent</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-[#2e1a87] mb-3">School Breaks</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {["Spring Break", "Summer Break", "Winter Break", "Other School Holidays"].map((break_) => (
                      <div key={break_} className="flex items-center justify-between border border-gray-200 rounded-md p-3">
                        <span className="text-sm">{break_}</span>
                        <select className="text-xs border border-gray-200 rounded px-2 py-1 bg-white text-gray-700">
                          <option>Alternating years</option>
                          <option>Split equally</option>
                          <option>Regular schedule applies</option>
                          <option>Custom arrangement</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowHolidayDialog(false)}
                className="border-[#6c54da]/20 text-[#2e1a87]"
              >
                Save for Later
              </Button>
              <Button
                onClick={completeHolidayPreferences}
                className="bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4] border-none"
              >
                Save Preferences
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Support Dialog */}
        <Dialog open={showSupportDialog} onOpenChange={setShowSupportDialog}>
          <DialogContent className="bg-white rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-[#2e1a87]">How Can We Help?</DialogTitle>
              <DialogDescription>
                We're here to support you through your co-parenting journey.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="flex flex-col gap-3">
                <Button 
                  variant="outline" 
                  className="justify-start bg-[#f5f0ff] text-[#2e1a87] border-[#6c54da]/20 hover:bg-[#e8deff]"
                >
                  <Video className="mr-2 h-4 w-4" /> Schedule a Support Call
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start border-[#6c54da]/20 text-[#2e1a87]"
                >
                  <Info className="mr-2 h-4 w-4" /> View Our Resources
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start border-[#6c54da]/20 text-[#2e1a87]"
                >
                  <AlertCircle className="mr-2 h-4 w-4" /> Report a Problem
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowSupportDialog(false)}
                className="border-[#6c54da]/20 text-[#2e1a87]"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Invite Dialog */}
        <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
          <DialogContent className="bg-white rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-[#2e1a87]">Invite Your Co-Parent</DialogTitle>
              <DialogDescription>
                Working together creates better outcomes for your children.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-[#f9f5ff] p-4 rounded-lg mb-4 text-sm text-[#2e1a87]">
                <div className="flex gap-2">
                  <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>Your co-parent will need to register and complete their own forms for the best results.</span>
                </div>
              </div>
              <div className="space-y-3 mt-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#2e1a87]">Co-Parent's Email</label>
                  <input 
                    type="email" 
                    className="border border-[#6c54da]/20 rounded-md p-2 text-sm"
                    placeholder="email@example.com"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#2e1a87]">Add a Personal Note (Optional)</label>
                  <textarea 
                    className="border border-[#6c54da]/20 rounded-md p-2 text-sm h-24 resize-none"
                    placeholder="I've started creating our parenting plan. It would help if we could both complete our forms and work on this together."
                  ></textarea>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowInviteDialog(false)}
                className="border-[#6c54da]/20 text-[#2e1a87]"
              >
                Not Now
              </Button>
              <Button
                onClick={sendInvitation}
                className="bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4] border-none"
              >
                <Users className="mr-2 h-4 w-4" /> Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}