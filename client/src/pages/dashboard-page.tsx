import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
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
                <div className="flex items-center">
                  <h3 className="font-medium text-[#2e1a87]">Your Journey</h3>
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
                </div>
                
                <Button className="w-full bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4] border-none" size="sm">
                  {completedWaivers > 0 ? "Continue Course" : "Start Course"} <ChevronRight className="ml-2 h-4 w-4" />
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
          <div className="lg:col-span-3 space-y-6">
            {/* Course Schedule Section */}
            <div className="bg-white rounded-lg shadow-sm border border-[#6c54da]/20 overflow-hidden">
              <div className="p-4 border-b border-[#6c54da]/10">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-medium text-[#2e1a87] flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-[#6c54da]" />
                    Scheduled Course Date
                  </h3>
                  {courseDate.scheduledDate && (
                    <Badge className="bg-green-100 text-green-800 border border-green-200">
                      {Math.ceil((courseDate.scheduledDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days to go
                    </Badge>
                  )}
                </div>
              </div>

              <div className="p-4">
                {courseDateStatus === "none" && (
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 bg-[#6c54da]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <CalendarIcon className="h-4 w-4 text-[#6c54da]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#2e1a87] text-sm">No dates scheduled yet</p>
                      <p className="text-xs text-gray-600">Schedule a time for your course session</p>
                    </div>
                    <Dialog open={showDateDialog} onOpenChange={setShowDateDialog}>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4] border-none text-xs px-3 h-8">
                          Schedule
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white rounded-lg">
                        <DialogHeader>
                          <DialogTitle className="text-[#2e1a87]">Choose a Course Date</DialogTitle>
                          <DialogDescription>
                            Select a date and time for your course session
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
                            Cancel
                          </Button>
                          <Button onClick={proposeDate} 
                            className="bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4] border-none">
                            Suggest Time
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            </div>

            {/* Required Pre-Course Items */}
            <div className="bg-white rounded-lg shadow-sm border border-[#6c54da]/20 overflow-hidden">
              <div className="p-4 border-b border-[#6c54da]/10">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-medium text-[#2e1a87] flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-[#6c54da]" />
                    Required Pre-Course Items
                  </h3>
                  <Badge className={waiversProgress === 100 
                    ? "bg-green-100 text-green-700 border border-green-200" 
                    : "bg-amber-50 text-amber-700 border border-amber-200"}>
                    {completedWaivers}/{waivers.length} Completed
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Required documents and agreements that need your attention.</p>
                    <div className="flex items-center mt-2">
                      {completedWaivers === waivers.length ? (
                        <div className="flex items-center text-green-600 text-sm">
                          <CheckCheck className="h-4 w-4 mr-1.5" />
                          <span>All items completed</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-amber-600 text-sm">
                          <AlertCircle className="h-4 w-4 mr-1.5" />
                          <span>{waivers.length - completedWaivers} item{waivers.length - completedWaivers !== 1 ? 's' : ''} remaining</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button 
                    className="bg-[#f5f0ff] text-[#2e1a87] hover:bg-[#e8deff] border border-[#6c54da]/20 h-8 px-3"
                  >
                    View All Items
                  </Button>
                </div>
              </div>
            </div>

            {/* Learning Resources */}
            <div className="bg-white rounded-lg shadow-sm border border-[#6c54da]/20 overflow-hidden">
              <div className="p-4 border-b border-[#6c54da]/10">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-medium text-[#2e1a87] flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-[#6c54da]" />
                    Helpful Resources
                  </h3>
                  <Badge className={resourcesProgress === 100 
                    ? "bg-green-100 text-green-700 border border-green-200" 
                    : "bg-blue-50 text-blue-700 border border-blue-200"}>
                    {completedResources}/{resources.length} Explored
                  </Badge>
                </div>
              </div>
              <div className="p-4">
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
                      <div className="p-4 flex items-start gap-3">
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
                            <div>
                              <h4 className="font-medium text-[#2e1a87] text-sm">{resource.title}</h4>
                              {resource.duration && (
                                <div className="flex items-center mt-1 text-gray-500 text-xs">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {resource.duration}
                                </div>
                              )}
                            </div>
                            {resource.completed && (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                          
                          <div className="mt-3 flex items-center gap-2">
                            <Button 
                              className={`text-xs px-3 py-1 h-7 ${
                                resource.type === "video" 
                                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200" :
                                resource.type === "pdf" 
                                  ? "bg-red-100 text-red-700 hover:bg-red-200 border border-red-200" : 
                                  "bg-[#f5f0ff] text-[#2e1a87] hover:bg-[#e8deff] border border-[#6c54da]/20"
                              }`}
                              size="sm"
                            >
                              {resource.type === "video" ? "Watch" : resource.type === "pdf" ? "Open" : "Read"}
                            </Button>
                          </div>
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