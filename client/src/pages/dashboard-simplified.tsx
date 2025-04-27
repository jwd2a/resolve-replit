import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { format, addDays, isBefore, isToday, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";

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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CheckCircle2,
  Clock,
  FileText,
  Calendar as CalendarIcon,
  Info,
  ChevronRight,
  Video,
  Users,
  AlertCircle,
  CheckCheck,
  BookOpen,
  Heart,
  ArrowRight,
} from "lucide-react";

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

// Sample data
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
  }
];

export default function DashboardSimplified() {
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
  const [showSupportDialog, setShowSupportDialog] = useState(false);

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

  // Calculate progress percentage
  const courseProgress = 25; // Example progress percentage
  const waiversProgress = Math.round((completedWaivers / waivers.length) * 100);
  const resourcesProgress = Math.round((completedResources / resources.length) * 100);

  // Format the date and time together
  const formatDateTime = (date: Date | null, time: string = "10:00") => {
    if (!date) return "";
    return `${format(date, "MMMM d, yyyy")} at ${time}`;
  };

  // Determine the focus message based on progress
  const getFocusMessage = () => {
    if (completedWaivers < waivers.length) {
      return {
        title: "Complete pre-course items",
        description: "Finalize your required forms before beginning the course",
        action: "Start Now",
        path: "/forms"
      };
    } else if (courseDate.scheduledDate === null) {
      return {
        title: "Schedule your first session",
        description: "Choose a time that works for you and your co-parent",
        action: "Find a Time",
        path: "#schedule"
      };
    } else {
      return {
        title: "Continue your parenting plan",
        description: "Pick up where you left off in your journey",
        action: "Continue",
        path: "/course"
      };
    }
  };

  const focusMessage = getFocusMessage();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header 
        title="Family Dashboard"
        onMenuClick={() => {}}
      />

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-12">
        {/* Hero section with main CTA */}
        <section className="text-center flex flex-col items-center">
          <div className="max-w-xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-medium text-[#2e1a87] mb-3">
              Welcome, {user?.displayName || "Friend"}
            </h1>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Your journey to creating a thoughtful parenting plan continues here. 
              One step at a time, you're building a better future for your children.
            </p>
            
            <div className="bg-gradient-to-r from-[#f5f0ff] to-[#fff8fd] rounded-xl p-8 border border-[#6c54da]/20 mb-8 text-left">
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#2e1a87] to-[#6c54da] rounded-full flex items-center justify-center">
                    {focusMessage.title.includes("Continue") ? (
                      <BookOpen className="h-7 w-7 text-white" />
                    ) : focusMessage.title.includes("Schedule") ? (
                      <CalendarIcon className="h-7 w-7 text-white" />
                    ) : (
                      <FileText className="h-7 w-7 text-white" />
                    )}
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-lg font-medium text-[#2e1a87] mb-1">{focusMessage.title}</h2>
                  <p className="text-gray-600 mb-4">{focusMessage.description}</p>
                  <Button className="bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4] border-none px-5">
                    {focusMessage.action} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress visualization */}
          <div className="flex flex-col items-center mt-4 mb-8">
            <div className="flex items-center justify-center mb-1">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#2e1a87] to-[#6c54da] flex items-center justify-center mr-2">
                <CheckCheck className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm text-[#2e1a87] font-medium">{courseProgress}% Complete</span>
            </div>
            <div className="w-full max-w-xs h-2 bg-[#f5f0ff] rounded-full overflow-hidden mt-1">
              <div 
                className="h-full bg-gradient-to-r from-[#2e1a87] to-[#6c54da] rounded-full" 
                style={{ width: `${courseProgress}%` }}
              />
            </div>
          </div>
        </section>

        {/* Secondary content in faded cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-80 hover:opacity-100 transition-opacity">
          {/* Co-parent connection card */}
          {coParentSignupStatus === "pending" && (
            <div className="bg-white rounded-lg shadow-sm border border-[#6c54da]/10 p-5 transition-all hover:border-[#6c54da]/30 hover:shadow">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium text-[#2e1a87]">Co-Parent Connection</h3>
                  <p className="text-sm text-gray-600 mt-1 mb-3">
                    Inviting your co-parent helps create a more collaborative journey.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-amber-200 text-amber-700 hover:bg-amber-50 text-sm"
                  >
                    Send a Gentle Invitation
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Support section */}
          <div className="bg-white rounded-lg shadow-sm border border-[#6c54da]/10 p-5 transition-all hover:border-[#6c54da]/30 hover:shadow">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-[#f5f0ff] rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="h-5 w-5 text-[#6c54da]" />
              </div>
              <div>
                <h3 className="font-medium text-[#2e1a87]">Support When You Need It</h3>
                <p className="text-sm text-gray-600 mt-1 mb-3">
                  Our team is here to help with any questions during your journey.
                </p>
                <Dialog open={showSupportDialog} onOpenChange={setShowSupportDialog}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="border-[#6c54da]/20 text-[#2e1a87] hover:bg-[#f5f0ff] text-sm"
                    >
                      Chat With Our Team
                    </Button>
                  </DialogTrigger>
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
              </div>
            </div>
          </div>
        </section>

        {/* Schedule dialog functionality */}
        <Dialog open={showDateDialog} onOpenChange={setShowDateDialog}>
          <DialogContent className="bg-white rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-[#2e1a87]">Choose a Time Together</DialogTitle>
              <DialogDescription>
                Select a date and time that works for both you and your co-parent.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-[#f9f5ff] p-4 rounded-lg mb-4 text-sm text-[#2e1a87]">
                <div className="flex gap-2">
                  <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>These sessions work best when both parents can be fully present in a calm environment.</span>
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
      </main>

      {/* Minimalist footer with encouraging message */}
      <footer className="py-6 text-center bg-[#f5f0ff]/50">
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          "Every step you take today creates a more peaceful tomorrow for your children."
        </p>
      </footer>
    </div>
  );
}