import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { format, addDays, isBefore, isToday } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
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
import { Button } from "@/components/ui/button";
import {
  FileText,
  Calendar as CalendarIcon,
  Info,
  Video,
  Users,
  AlertCircle,
  CheckCheck,
  BookOpen,
  Heart,
  ArrowRight,
  HelpCircle,
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
  const [showInviteDialog, setShowInviteDialog] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f5ff] via-white to-white">
      {/* Header */}
      <Header 
        title="Family Dashboard"
        onMenuClick={() => {}}
      />

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-8">
        {/* Warm welcome message - small and centered */}
        <section className="text-center">
          <h1 className="text-xl font-medium text-[#2e1a87] mb-2">
            Welcome back, {user?.displayName || "Friend"}
          </h1>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            You're making thoughtful decisions for your family's future.
          </p>
        </section>
        
        {/* Main card with combined progress + forms */}
        <section className="relative">
          {/* Co-Parent micro-banner */}
          {coParentSignupStatus === "pending" && (
            <div className="absolute -top-5 left-0 right-0 mx-auto w-fit bg-white rounded-full px-4 py-1.5 shadow-sm border border-amber-100 z-10">
              <button 
                onClick={() => setShowInviteDialog(true)}
                className="flex items-center text-xs text-amber-700 hover:text-amber-800 gap-1.5"
              >
                <Heart className="h-3.5 w-3.5 text-amber-500" />
                <span>Want to invite your co-parent to join you?</span>
                <span className="underline font-medium">Send Invitation</span>
              </button>
            </div>
          )}
          
          {/* Main progress card */}
          <div className="bg-white rounded-xl p-8 border border-[#6c54da]/20 shadow-sm relative overflow-hidden">
            {/* Soft background illustration */}
            <div className="absolute -right-24 -bottom-24 w-64 h-64 rounded-full bg-gradient-to-br from-[#f5f0ff] to-transparent opacity-50 pointer-events-none"></div>
            
            <div className="flex flex-col">
              {/* Combined progress section */}
              <div className="mb-7">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#f5f0ff] rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-[#6c54da]" />
                  </div>
                  <div>
                    <h2 className="font-medium text-[#2e1a87] text-lg">You're {courseProgress}% of the way there!</h2>
                    <p className="text-gray-600 text-sm">Complete your required forms to continue building your parenting plan.</p>
                  </div>
                </div>
                
                {/* Visual progress */}
                <div className="mb-4 mt-5">
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                    <span>Getting Started</span>
                    <span>Complete</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#f5f0ff] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#2e1a87] to-[#6c54da] rounded-full" 
                      style={{ width: `${courseProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs">
                    <div className="flex items-center text-amber-700">
                      <AlertCircle className="h-3.5 w-3.5 mr-1" />
                      <span>{waivers.length - completedWaivers} forms remaining</span>
                    </div>
                    <div className="flex items-center text-[#2e1a87]">
                      <CheckCheck className="h-3.5 w-3.5 mr-1" />
                      <span>{completedWaivers} completed</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Primary CTA Button */}
              <Button className="bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4] border-none px-5 py-6 h-auto">
                <span className="text-base">Start Now</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Minimalist footer with support links */}
        <footer className="mt-8 text-center">
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
            "Every step you take today creates a more peaceful tomorrow for your children."
          </p>
        </footer>

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
                Working together can help create better outcomes for your children.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-[#f9f5ff] p-4 rounded-lg mb-4 text-sm text-[#2e1a87]">
                <div className="flex gap-2">
                  <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>Their information will remain private and they'll receive a gentle invitation to join.</span>
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
                    placeholder="I've started creating our parenting plan. It would be great if we could work on this together."
                  ></textarea>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowInviteDialog(false)} 
                className="border-[#6c54da]/20 text-[#2e1a87]">
                Not Now
              </Button>
              <Button
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