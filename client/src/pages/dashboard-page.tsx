import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, addDays, isBefore, isToday, isSameDay } from "date-fns";
import Header from "@/components/Header";

// UI components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CheckCircle2,
  Clock,
  FileText,
  Calendar as CalendarIcon,
  Info,
  ChevronRight,
  Video,
  Download,
  AlertCircle,
  Users,
  CheckCheck,
  XCircle,
  PlayCircle,
  BookOpen,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  signed: boolean;
  signedDate?: Date;
}

interface Resource {
  id: string;
  title: string;
  type: "video" | "pdf" | "article";
  url: string;
  duration?: string;
  completed: boolean;
}

// Sample waivers
const waivers: Waiver[] = [
  {
    id: "confidentiality",
    title: "Confidentiality Agreement",
    description: "Agreement to keep all shared information confidential during the course and parenting plan development.",
    signed: false,
  },
  {
    id: "mediation",
    title: "Mediation Participation",
    description: "Agreement to participate in good faith in the mediation process if needed during the course.",
    signed: false,
  },
  {
    id: "terms",
    title: "Terms of Service",
    description: "Agreement to the platform terms of service and usage guidelines.",
    signed: true,
    signedDate: new Date(2024, 3, 15),
  },
];

// Sample preparatory resources
const resources: Resource[] = [
  {
    id: "video1",
    title: "Introduction to Co-Parenting",
    type: "video",
    url: "#",
    duration: "15 min",
    completed: true,
  },
  {
    id: "pdf1",
    title: "Preparing for Your Co-Parenting Journey",
    type: "pdf",
    url: "#",
    completed: false,
  },
  {
    id: "video2",
    title: "Effective Communication Strategies",
    type: "video",
    url: "#",
    duration: "22 min",
    completed: false,
  },
  {
    id: "article1",
    title: "Understanding Children's Needs During Separation",
    type: "article",
    url: "#",
    completed: false,
  },
];

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const [courseDate, setCourseDate] = useState<CourseDate>({
    scheduledDate: null,
    proposedDate: null,
    proposedTime: "10:00",
    proposedBy: null,
    approved: false,
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    addDays(new Date(), 7)
  );
  const [selectedTime, setSelectedTime] = useState<string>("10:00");
  const [showDateDialog, setShowDateDialog] = useState(false);
  const [coParentSignupStatus, setCoParentSignupStatus] = useState("pending"); // "pending", "completed"
  const [completedWaivers, setCompletedWaivers] = useState(1); // Number of signed waivers
  const [completedResources, setCompletedResources] = useState(1); // Number of completed resources

  // For demonstration purposes, we've temporarily disabled these auth checks
  // In production, these redirects would be active
  /*
  if (!user) {
    return <Redirect to="/auth" />;
  }

  if (!user.onboardingComplete) {
    return <Redirect to="/onboarding" />;
  }
  */

  const proposeDate = () => {
    setCourseDate({
      ...courseDate,
      proposedDate: selectedDate || null,
      proposedTime: selectedTime,
      proposedBy: "You",
      approved: false,
    });
    setShowDateDialog(false);
  };

  const acceptProposedDate = () => {
    setCourseDate({
      ...courseDate,
      scheduledDate: courseDate.proposedDate,
      proposedDate: null,
      proposedBy: null,
      approved: true,
    });
  };

  const rejectProposedDate = () => {
    setCourseDate({
      ...courseDate,
      proposedDate: null,
      proposedBy: null,
      approved: false,
    });
  };

  // Calculate courseDateStatus
  const getCourseDateStatus = () => {
    if (courseDate.scheduledDate) {
      const today = new Date();
      if (isSameDay(courseDate.scheduledDate, today)) {
        return "today";
      } else if (isBefore(courseDate.scheduledDate, today)) {
        return "past";
      } else {
        return "scheduled";
      }
    } else if (courseDate.proposedDate) {
      return courseDate.proposedBy === "You" ? "awaiting" : "proposed";
    } else {
      return "none";
    }
  };

  const courseDateStatus = getCourseDateStatus();
  const waiversProgress = (completedWaivers / waivers.length) * 100;
  const resourcesProgress = (completedResources / resources.length) * 100;

  // Function to format the date and time together
  const formatDateTime = (date: Date | null, time: string = "10:00") => {
    if (!date) return "";
    return `${format(date, "MMMM d, yyyy")} at ${time}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f0ff] to-[#fff8fd]">
      {/* Header */}
      <Header 
        title="Family Dashboard"
        onMenuClick={() => {}}
      />

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Encouraging message banner */}
        <div className="mb-8 bg-gradient-to-r from-[#2e1a87]/10 to-[#6c54da]/10 rounded-xl p-5 border border-[#6c54da]/20">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="p-3 bg-white rounded-full">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 10.5C19.6569 10.5 21 9.15685 21 7.5C21 5.84315 19.6569 4.5 18 4.5C16.3431 4.5 15 5.84315 15 7.5C15 9.15685 16.3431 10.5 18 10.5Z" fill="#6246ea"/>
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="#6246ea"/>
                <path d="M24 15C25.6569 15 27 13.6569 27 12C27 10.3431 25.6569 9 24 9C22.3431 9 21 10.3431 21 12C21 13.6569 22.3431 15 24 15Z" fill="#6246ea"/>
                <path d="M18 31.5C19.6569 31.5 21 30.1569 21 28.5C21 26.8431 19.6569 25.5 18 25.5C16.3431 25.5 15 26.8431 15 28.5C15 30.1569 16.3431 31.5 18 31.5Z" fill="#6246ea"/>
                <path d="M12 25.5C13.6569 25.5 15 24.1569 15 22.5C15 20.8431 13.6569 19.5 12 19.5C10.3431 19.5 9 20.8431 9 22.5C9 24.1569 10.3431 25.5 12 25.5Z" fill="#6246ea"/>
                <path d="M24 25.5C25.6569 25.5 27 24.1569 27 22.5C27 20.8431 25.6569 19.5 24 19.5C22.3431 19.5 21 20.8431 21 22.5C21 24.1569 22.3431 25.5 24 25.5Z" fill="#6246ea"/>
                <path d="M15.5 18C15.5 17.1716 14.8284 16.5 14 16.5C13.1716 16.5 12.5 17.1716 12.5 18C12.5 18.8284 13.1716 19.5 14 19.5C14.8284 19.5 15.5 18.8284 15.5 18Z" fill="#6246ea"/>
                <path d="M22 16.5C22.8284 16.5 23.5 17.1716 23.5 18C23.5 18.8284 22.8284 19.5 22 19.5C21.1716 19.5 20.5 18.8284 20.5 18C20.5 17.1716 21.1716 16.5 22 16.5Z" fill="#6246ea"/>
                <path d="M18.5 13.5C18.5 12.6716 17.8284 12 17 12C16.1716 12 15.5 12.6716 15.5 13.5C15.5 14.3284 16.1716 15 17 15C17.8284 15 18.5 14.3284 18.5 13.5Z" fill="#6246ea"/>
                <path d="M19 12C19.8284 12 20.5 12.6716 20.5 13.5C20.5 14.3284 19.8284 15 19 15C18.1716 15 17.5 14.3284 17.5 13.5C17.5 12.6716 18.1716 12 19 12Z" fill="#6246ea"/>
                <path d="M18.5 22.5C18.5 21.6716 17.8284 21 17 21C16.1716 21 15.5 21.6716 15.5 22.5C15.5 23.3284 16.1716 24 17 24C17.8284 24 18.5 23.3284 18.5 22.5Z" fill="#6246ea"/>
                <path d="M19 21C19.8284 21 20.5 21.6716 20.5 22.5C20.5 23.3284 19.8284 24 19 24C18.1716 24 17.5 23.3284 17.5 22.5C17.5 21.6716 18.1716 21 19 21Z" fill="#6246ea"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-medium text-[#2e1a87]">Welcome to your family journey, {user?.displayName || "Friend"}!</h1>
              <p className="text-sm text-gray-600 mt-1">Every step you take here is helping build a more harmonious future for your children. You're doing important work.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left column - Journey overview */}
          <div className="lg:col-span-1 space-y-5">
            {/* Journey visualization */}
            <div className="bg-white rounded-lg shadow-sm border border-[#6c54da]/20 p-5 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-[#2e1a87]">Your Journey</h3>
                  <div className="bg-purple-100 text-[#2e1a87] text-xs px-2 py-1 rounded-full">
                    Step 2 of 8
                  </div>
                </div>
                
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-100">
                    <div 
                      style={{ width: "25%" }} 
                      className="flex relative shadow-md rounded-r-none justify-center bg-gradient-to-r from-[#2e1a87] to-[#6c54da] transition-all duration-500"
                    ></div>
                  </div>
                  <div className="mt-5 flex items-center space-x-1">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((step) => (
                      <div key={step} className="flex-1 flex flex-col items-center">
                        <div 
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${
                            step < 2 ? 'bg-[#2e1a87] text-white' : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {step < 2 ? '✓' : ''}
                        </div>
                        {step === 2 && (
                          <span className="text-[9px] text-[#2e1a87] font-medium mt-1">Now</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="flex items-center">
                        <BookOpen className="w-3 h-3 mr-1 text-[#6c54da]" /> Course Progress
                      </span>
                      <span className="text-[#2e1a87] font-medium">25%</span>
                    </div>
                    <div className="h-2 w-full bg-purple-100 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#2e1a87] to-[#6c54da] rounded" style={{ width: '25%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="flex items-center">
                        <FileText className="w-3 h-3 mr-1 text-[#6c54da]" /> Parenting Plan
                      </span>
                      <span className="text-[#2e1a87] font-medium">15%</span>
                    </div>
                    <div className="h-2 w-full bg-purple-100 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#2e1a87] to-[#6c54da] rounded" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="flex items-center">
                        <CheckCheck className="w-3 h-3 mr-1 text-[#6c54da]" /> Required Forms
                      </span>
                      <span className="text-[#2e1a87] font-medium">{completedWaivers}/{waivers.length}</span>
                    </div>
                    <div className="h-2 w-full bg-purple-100 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#2e1a87] to-[#6c54da] rounded" style={{ width: `${waiversProgress}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4] border-none" size="sm">
                  Continue Your Journey <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Co-parent connection */}
            <div className="bg-white rounded-lg shadow-sm border border-[#6c54da]/20 p-5 space-y-4">
              <h3 className="font-medium text-[#2e1a87]">Co-Parent Connection</h3>
              {coParentSignupStatus === "pending" ? (
                <div className="space-y-3">
                  <div className="px-3 py-2 bg-amber-50 border border-amber-100 rounded-lg text-sm text-amber-700">
                    <div className="flex gap-2 items-center">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span>Your co-parent hasn't joined yet</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Inviting your co-parent helps you both work together for your child's wellbeing.</p>
                  <Button className="w-full bg-gradient-to-r from-white to-amber-50 text-amber-700 border border-amber-200 hover:from-amber-50 hover:to-amber-100" size="sm">
                    <Users className="mr-2 h-3 w-3" /> Send a Gentle Invitation
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-green-100 text-green-800 text-xs">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">Jane Doe</p>
                    <p className="text-xs text-gray-500">Joined April 10, 2024</p>
                  </div>
                  <Badge className="ml-auto bg-green-100 text-green-800 text-xs">Connected</Badge>
                </div>
              )}
            </div>

            {/* Child Focus */}
            <div className="bg-gradient-to-br from-[#f9f5ff] to-white rounded-lg shadow-sm border border-[#6c54da]/20 p-5 space-y-3">
              <h3 className="font-medium text-[#2e1a87] flex items-center">
                <svg width="18" height="18" className="mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 10C15.5 12.2091 13.7091 14 11.5 14C9.29086 14 7.5 12.2091 7.5 10C7.5 7.79086 9.29086 6 11.5 6C13.7091 6 15.5 7.79086 15.5 10Z" fill="#6c54da"/>
                  <path d="M11.5 15.5C7.5 15.5 4 17.5 4 20V22H19V20C19 17.5 15.5 15.5 11.5 15.5Z" fill="#6c54da"/>
                  <path d="M19.5 8C19.5 9.10457 18.6046 10 17.5 10C16.3954 10 15.5 9.10457 15.5 8C15.5 6.89543 16.3954 6 17.5 6C18.6046 6 19.5 6.89543 19.5 8Z" fill="#6c54da"/>
                  <path d="M17.5 11.5C16 11.5 14.5 12 14 13C15 13.5 16 14.5 16.5 15.5H20V14C20 12.5 19 11.5 17.5 11.5Z" fill="#6c54da"/>
                </svg>
                Child Focus
              </h3>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-600">Remember, all of this work is centered on creating the best environment for your children to thrive.</p>
                <Button className="w-full justify-start text-left bg-white hover:bg-[#f5f0ff]" size="sm" variant="outline">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#6c54da" strokeWidth="2"/>
                    <path d="M12 17V17.01" stroke="#6c54da" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 14C12 12 14 12 14 10C14 8 12 8 12 8C10 8 10 10 10 10" stroke="#6c54da" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Child Development Resources
                </Button>
                <Button className="w-full justify-start text-left bg-white hover:bg-[#f5f0ff]" size="sm" variant="outline">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M3 20.29V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15C21 16.1046 20.1046 17 19 17H7.96125C7.35368 17 6.77906 17.2762 6.39951 17.7506L4.06852 20.6882C3.79158 21.0408 3.2423 21.0777 2.92003 20.7671C3.00586 20.6774 2.96481 20.7303 3 20.29Z" stroke="#6c54da" strokeWidth="2"/>
                    <path d="M8 8H16M8 12H13" stroke="#6c54da" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Communication Toolkit
                </Button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-white rounded-lg shadow-sm border border-[#6c54da]/20 p-5 space-y-3">
              <h3 className="font-medium text-[#2e1a87]">We're Here For You</h3>
              <p className="text-xs text-gray-600">You don't have to do this alone. Our team is ready to support you.</p>
              <div className="flex flex-col gap-2">
                <Button className="w-full justify-start bg-gradient-to-r from-white to-[#f5f0ff] text-[#2e1a87] hover:from-[#f5f0ff] hover:to-[#e8deff] border border-[#6c54da]/20" size="sm">
                  <Video className="mr-2 h-3.5 w-3.5" /> Schedule a Support Call
                </Button>
                <Button className="w-full justify-start bg-white text-[#2e1a87] hover:bg-[#f5f0ff]" size="sm" variant="outline">
                  <Info className="mr-2 h-3.5 w-3.5" /> Resources & Support
                </Button>
              </div>
            </div>
          </div>

          {/* Main content - Schedule and materials */}
          <div className="lg:col-span-3 space-y-8">
            {/* Course Schedule Section */}
            <div className="bg-white rounded-lg shadow-sm border border-[#6c54da]/20 overflow-hidden">
              <div className="p-5 border-b border-[#6c54da]/10">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-[#2e1a87] flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-[#6c54da]" />
                    Learning Together Sessions
                  </h3>
                  {courseDate.scheduledDate && (
                    <Badge className="bg-green-100 text-green-800 border border-green-200">
                      {Math.ceil((courseDate.scheduledDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days to go
                    </Badge>
                  )}
                </div>
              </div>

              <div className="p-5">
                {courseDateStatus === "none" && (
                  <div className="bg-gradient-to-r from-[#f9f5ff] to-white border border-[#6c54da]/20 rounded-lg p-5">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-[#6c54da]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <CalendarIcon className="h-5 w-5 text-[#6c54da]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#2e1a87]">Schedule Your First Session</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Choose a time that works for both you and your co-parent to begin your learning journey together.
                        </p>
                        <Dialog open={showDateDialog} onOpenChange={setShowDateDialog}>
                          <DialogTrigger asChild>
                            <Button className="mt-3 bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4] border-none" size="sm">
                              Find a Time Together
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-white rounded-lg">
                            <DialogHeader>
                              <DialogTitle className="text-[#2e1a87]">Choose a Comfortable Time</DialogTitle>
                              <DialogDescription>
                                Select a date and time that gives both you and your co-parent space to focus on building a positive future for your children.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <div className="bg-[#f9f5ff] p-4 rounded-lg mb-4 text-sm text-[#2e1a87]">
                                <div className="flex gap-2">
                                  <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                  <span>These sessions work best when both parents can be fully present and in a calm environment.</span>
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
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setShowDateDialog(false)} 
                                className="border-[#6c54da]/20 text-[#2e1a87]">
                                Not Now
                              </Button>
                              <Button onClick={proposeDate} 
                                className="bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4] border-none">
                                Suggest This Time
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                )}

                {courseDateStatus === "awaiting" && (
                  <div className="bg-gradient-to-r from-[#e8f4ff] to-white border border-blue-200 rounded-lg p-5">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium text-blue-700">Waiting for Response</p>
                        <p className="text-sm text-blue-600 mt-1">
                          You suggested {formatDateTime(courseDate.proposedDate, courseDate.proposedTime)} for your learning session.
                          We'll notify you when your co-parent responds.
                        </p>
                        <Dialog open={showDateDialog} onOpenChange={setShowDateDialog}>
                          <DialogTrigger asChild>
                            <Button className="mt-3 bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200" size="sm">
                              Suggest a Different Time
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-white rounded-lg">
                            <DialogHeader>
                              <DialogTitle className="text-[#2e1a87]">Adjust Your Suggestion</DialogTitle>
                              <DialogDescription>
                                Finding a time that works for both parties can take a few tries. That's completely normal.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
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
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setShowDateDialog(false)} 
                                className="border-[#6c54da]/20 text-[#2e1a87]">
                                Keep Current Suggestion
                              </Button>
                              <Button onClick={proposeDate} 
                                className="bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4] border-none">
                                Update Suggestion
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                )}

                {courseDateStatus === "proposed" && (
                  <div className="bg-gradient-to-r from-[#e8f4ff] to-white border border-blue-200 rounded-lg p-5">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Info className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium text-blue-700">Your Co-Parent Suggested a Time</p>
                        <p className="text-sm text-blue-600 mt-1">
                          Your co-parent suggested {formatDateTime(courseDate.proposedDate, courseDate.proposedTime)} for your learning session together.
                        </p>
                        <div className="mt-3 flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={acceptProposedDate}
                            className="bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4] border-none"
                          >
                            Accept This Time
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={rejectProposedDate}
                            className="border-[#6c54da]/20 text-[#2e1a87] hover:bg-[#f5f0ff]"
                          >
                            Suggest Another Time
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {courseDateStatus === "scheduled" && (
                  <div className="bg-gradient-to-r from-[#edfbf0] to-white border border-green-200 rounded-lg p-5">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-green-700">Your Session is Confirmed</p>
                        <p className="text-sm text-green-600 mt-1">
                          You and your co-parent will meet on {formatDateTime(courseDate.scheduledDate, courseDate.proposedTime)}.
                        </p>
                        <div className="mt-3 flex gap-2">
                          <Button 
                            size="sm"
                            className="bg-green-100 text-green-700 hover:bg-green-200 border border-green-200"
                          >
                            Add to Calendar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-green-200 text-green-700 hover:bg-green-50"
                          >
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {courseDateStatus === "today" && (
                  <div className="bg-gradient-to-r from-[#f4ebff] to-white border border-[#6c54da]/30 rounded-lg p-5">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-[#6c54da]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-[#6c54da]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#2e1a87]">Your Session is Today!</p>
                        <p className="text-sm text-[#6c54da] mt-1">
                          Your learning session starts at {courseDate.proposedTime} today. Find a quiet space where you can focus on this important work.
                        </p>
                        <Button 
                          className="mt-3 bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4] border-none"
                        >
                          Join Your Session Now
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {courseDateStatus === "past" && (
                  <div className="bg-gradient-to-r from-[#f8f9fa] to-white border border-gray-200 rounded-lg p-5">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCheck className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Session Completed</p>
                        <p className="text-sm text-gray-600 mt-1">
                          You attended your session on {formatDateTime(courseDate.scheduledDate, courseDate.proposedTime)}. Great job taking this important step!
                        </p>
                        <div className="mt-3 flex gap-2">
                          <Button 
                            size="sm"
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                          >
                            View Session Notes
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-gray-200 text-gray-600 hover:bg-gray-50"
                          >
                            Schedule Next Session
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Required Documents / Agreements */}
            <div className="bg-white rounded-lg shadow-sm border border-[#6c54da]/20 overflow-hidden">
              <div className="p-5 border-b border-[#6c54da]/10">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-[#2e1a87] flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-[#6c54da]" />
                    Important Agreements
                  </h3>
                  <Badge className={waiversProgress === 100 
                    ? "bg-green-100 text-green-700 border border-green-200" 
                    : "bg-amber-50 text-amber-700 border border-amber-200"}>
                    {completedWaivers}/{waivers.length} Acknowledged
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <div className="bg-[#f9f5ff] border border-[#6c54da]/20 rounded-lg p-4 mb-4">
                  <div className="flex gap-2 text-sm text-[#2e1a87]">
                    <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <p>These agreements help create a safe space for both parents, ensuring we're all aligned on expectations.</p>
                  </div>
                </div>
                
                <ul className="space-y-4">
                  {waivers.map((waiver) => (
                    <li key={waiver.id} className="border border-gray-100 rounded-lg overflow-hidden hover:border-[#6c54da]/20 transition-colors">
                      <div className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              waiver.signed ? 'bg-green-100' : 'bg-amber-50'
                            }`}>
                              {waiver.signed ? 
                                <CheckCircle2 className="h-4 w-4 text-green-600" /> : 
                                <AlertCircle className="h-4 w-4 text-amber-600" />
                              }
                            </div>
                            <div>
                              <p className="font-medium text-[#2e1a87]">{waiver.title}</p>
                              <p className="text-sm text-gray-600 mt-0.5">{waiver.description}</p>
                              
                              {waiver.signed && (
                                <p className="text-xs text-green-600 mt-1 flex items-center">
                                  <CheckCheck className="h-3 w-3 mr-1" />
                                  Acknowledged on {waiver.signedDate ? format(waiver.signedDate, "MMMM d, yyyy") : ""}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="ml-11 sm:ml-0">
                            {!waiver.signed && (
                              <Button 
                                size="sm" 
                                className="bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4] border-none"
                              >
                                Review & Acknowledge
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Learning Resources */}
            <div className="bg-white rounded-lg shadow-sm border border-[#6c54da]/20 overflow-hidden">
              <div className="p-5 border-b border-[#6c54da]/10">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-[#2e1a87] flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-[#6c54da]" />
                    Helpful Resources
                  </h3>
                  <Badge className={resourcesProgress === 100 
                    ? "bg-green-100 text-green-700 border border-green-200" 
                    : "bg-blue-50 text-blue-700 border border-blue-200"}>
                    {completedResources}/{resources.length} Explored
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <div className="bg-[#f9f5ff] border border-[#6c54da]/20 rounded-lg p-4 mb-4">
                  <div className="flex gap-2 text-sm text-[#2e1a87]">
                    <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <p>These materials are carefully selected to help you develop the skills and understanding needed for effective co-parenting.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map((resource) => (
                    <div 
                      key={resource.id} 
                      className={`border rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                        resource.completed 
                          ? 'border-green-200 bg-gradient-to-r from-green-50 to-white' 
                          : 'border-[#6c54da]/10 hover:border-[#6c54da]/30'
                      }`}
                    >
                      <div className="p-5 flex flex-col h-full">
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            resource.type === "video" ? "bg-blue-100" :
                            resource.type === "pdf" ? "bg-red-100" : 
                            "bg-[#f5f0ff]"
                          }`}>
                            {resource.type === "video" && <Video className="h-4 w-4 text-blue-600" />}
                            {resource.type === "pdf" && <FileText className="h-4 w-4 text-red-600" />}
                            {resource.type === "article" && <BookOpen className="h-4 w-4 text-[#6c54da]" />}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-[#2e1a87]">{resource.title}</h4>
                              {resource.completed && (
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                              )}
                            </div>
                            
                            {resource.duration && (
                              <div className="flex items-center mt-1 text-gray-500 text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                {resource.duration}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-auto pt-3 flex flex-col sm:flex-row items-center gap-2">
                          <Button 
                            className={`w-full sm:w-auto ${
                              resource.type === "video" 
                                ? "bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200" :
                              resource.type === "pdf" 
                                ? "bg-red-100 text-red-700 hover:bg-red-200 border border-red-200" : 
                                "bg-[#f5f0ff] text-[#2e1a87] hover:bg-[#e8deff] border border-[#6c54da]/20"
                            }`}
                            size="sm"
                          >
                            {resource.type === "video" ? "Watch Video" : resource.type === "pdf" ? "Open PDF" : "Read Article"}
                          </Button>
                          
                          {!resource.completed ? (
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="w-full sm:w-auto text-[#2e1a87] hover:bg-[#f5f0ff]"
                            >
                              Mark as Explored
                            </Button>
                          ) : (
                            <span className="text-xs text-green-600 flex items-center">
                              <CheckCheck className="h-3 w-3 mr-1" />
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}