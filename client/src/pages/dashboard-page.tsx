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
    proposedBy: null,
    approved: false,
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    addDays(new Date(), 7)
  );
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        title="Dashboard"
        onMenuClick={() => {}}
      />

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left column - Progress overview */}
          <div className="lg:col-span-1 space-y-5">
            {/* User welcome */}
            <h2 className="text-xl font-semibold text-gray-900">Welcome, {user?.displayName || "User"}!</h2>
            <p className="text-sm text-gray-600">Your parenting partnership journey</p>

            {/* Progress overview */}
            <div className="bg-white rounded-lg shadow p-5 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Your Progress</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span>Course Completion</span>
                      <span>25%</span>
                    </div>
                    <Progress value={25} className="h-1.5" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span>Parenting Plan</span>
                      <span>15%</span>
                    </div>
                    <Progress value={15} className="h-1.5" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span>Required Documents</span>
                      <span>{completedWaivers}/{waivers.length}</span>
                    </div>
                    <Progress value={waiversProgress} className="h-1.5" />
                  </div>
                </div>
                
                <Button className="w-full" variant="default" size="sm">
                  Continue Course <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Co-parent status */}
            <div className="bg-white rounded-lg shadow p-5 space-y-4">
              <h3 className="font-medium">Co-Parent Status</h3>
              {coParentSignupStatus === "pending" ? (
                <div className="space-y-3">
                  <div className="px-3 py-2 bg-amber-50 border border-amber-200 rounded text-sm text-amber-700">
                    <div className="flex gap-2 items-center">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span>Co-parent hasn't joined yet</span>
                    </div>
                  </div>
                  <Button className="w-full" size="sm" variant="outline">
                    <Users className="mr-2 h-3 w-3" /> Invite Co-Parent
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
                  <Badge className="ml-auto bg-green-100 text-green-800 text-xs">Active</Badge>
                </div>
              )}
            </div>

            {/* Support */}
            <div className="bg-white rounded-lg shadow p-5 space-y-3">
              <h3 className="font-medium">Need Help?</h3>
              <div className="flex flex-col gap-2">
                <Button className="w-full justify-start" size="sm" variant="ghost">
                  <Video className="mr-2 h-3.5 w-3.5" /> Schedule Consultation
                </Button>
                <Button className="w-full justify-start" size="sm" variant="ghost">
                  <Info className="mr-2 h-3.5 w-3.5" /> FAQs & Support
                </Button>
              </div>
            </div>
          </div>

          {/* Main content - Schedule and materials */}
          <div className="lg:col-span-3 space-y-8">
            {/* Course Schedule Section */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-5 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Course Schedule</h3>
                  {courseDate.scheduledDate && (
                    <Badge className="bg-green-100 text-green-800">
                      {Math.ceil((courseDate.scheduledDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days to go
                    </Badge>
                  )}
                </div>
              </div>

              <div className="p-5">
                {courseDateStatus === "none" && (
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                    <div className="flex gap-3 items-start">
                      <AlertCircle className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-700">No date scheduled</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Please propose a date for your course session with your co-parent.
                        </p>
                        <Dialog open={showDateDialog} onOpenChange={setShowDateDialog}>
                          <DialogTrigger asChild>
                            <Button className="mt-3" size="sm">
                              Schedule Course Date
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Select Course Date</DialogTitle>
                              <DialogDescription>
                                Choose a date for your co-parenting course session. Your co-parent will need to confirm this date.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                disabled={(date) => isBefore(date, new Date()) && !isToday(date)}
                                className="rounded-md border mx-auto"
                              />
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setShowDateDialog(false)}>Cancel</Button>
                              <Button onClick={proposeDate}>Propose Date</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                )}

                {courseDateStatus === "awaiting" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <div className="flex gap-3 items-start">
                      <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-700">Awaiting Response</p>
                        <p className="text-sm text-blue-600 mt-1">
                          You proposed {courseDate.proposedDate && format(courseDate.proposedDate, "MMMM d, yyyy")} for your course session.
                          Waiting for your co-parent to accept.
                        </p>
                        <Dialog open={showDateDialog} onOpenChange={setShowDateDialog}>
                          <DialogTrigger asChild>
                            <Button className="mt-3" size="sm" variant="outline">
                              Change Proposed Date
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Select Course Date</DialogTitle>
                              <DialogDescription>
                                Choose a date for your co-parenting course session. Your co-parent will need to confirm this date.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                disabled={(date) => isBefore(date, new Date()) && !isToday(date)}
                                className="rounded-md border mx-auto"
                              />
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setShowDateDialog(false)}>Cancel</Button>
                              <Button onClick={proposeDate}>Propose Date</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                )}

                {courseDateStatus === "proposed" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <div className="flex gap-3 items-start">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-700">Date Proposed</p>
                        <p className="text-sm text-blue-600 mt-1">
                          Your co-parent proposed {courseDate.proposedDate && format(courseDate.proposedDate, "MMMM d, yyyy")} for your course session.
                        </p>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" onClick={acceptProposedDate}>Accept</Button>
                          <Button size="sm" variant="outline" onClick={rejectProposedDate}>Decline</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {courseDateStatus === "scheduled" && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <div className="flex gap-3 items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-700">Course Scheduled</p>
                        <p className="text-sm text-green-600 mt-1">
                          Your course is scheduled for {courseDate.scheduledDate && format(courseDate.scheduledDate, "MMMM d, yyyy")}.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {courseDateStatus === "today" && (
                  <div className="bg-purple-50 border border-purple-200 rounded-md p-4">
                    <div className="flex gap-3 items-start">
                      <AlertCircle className="h-5 w-5 text-purple-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-purple-700">Course Is Today!</p>
                        <p className="text-sm text-purple-600 mt-1">
                          Your course is scheduled for today. Please join 5 minutes before your scheduled time.
                        </p>
                        <Button className="mt-3 bg-purple-600 hover:bg-purple-700">
                          Join Session
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {courseDateStatus === "past" && (
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                    <div className="flex gap-3 items-start">
                      <CheckCheck className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-700">Course Completed</p>
                        <p className="text-sm text-gray-600 mt-1">
                          You completed your course on {courseDate.scheduledDate && format(courseDate.scheduledDate, "MMMM d, yyyy")}.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Required Documents / Waivers - Simplified */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-5 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Required Documents</h3>
                  <Badge className={waiversProgress === 100 ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                    {completedWaivers}/{waivers.length} Completed
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <ul className="divide-y">
                  {waivers.map((waiver) => (
                    <li key={waiver.id} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {waiver.signed ? 
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" /> : 
                            <AlertCircle className="h-5 w-5 text-amber-500 mr-3" />
                          }
                          <div>
                            <p className="font-medium">{waiver.title}</p>
                            <p className="text-sm text-gray-500 mt-0.5">{waiver.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {waiver.signed ? (
                            <span className="text-xs text-gray-500">
                              Signed {waiver.signedDate ? format(waiver.signedDate, "MMM d, yyyy") : ""}
                            </span>
                          ) : (
                            <Button size="sm" variant="outline">
                              Review & Sign
                            </Button>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Preparatory Materials - Simplified to cards */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-5 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Preparatory Resources</h3>
                  <Badge className={resourcesProgress === 100 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                    {completedResources}/{resources.length} Completed
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map((resource) => (
                    <div 
                      key={resource.id} 
                      className={`border rounded-lg overflow-hidden ${resource.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
                    >
                      <div className="p-4 flex items-start gap-3">
                        <div className={`rounded-full p-2 flex-shrink-0 ${
                          resource.type === "video" ? "bg-blue-100" :
                          resource.type === "pdf" ? "bg-red-100" : 
                          "bg-purple-100"
                        }`}>
                          {resource.type === "video" && <Video className={`h-4 w-4 ${resource.type === "video" ? "text-blue-600" : ""}`} />}
                          {resource.type === "pdf" && <FileText className="h-4 w-4 text-red-600" />}
                          {resource.type === "article" && <BookOpen className="h-4 w-4 text-purple-600" />}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{resource.title}</h4>
                            {resource.completed && (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          
                          {resource.duration && (
                            <div className="flex items-center mt-1 text-gray-500 text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {resource.duration}
                            </div>
                          )}
                          
                          <div className="mt-3 flex items-center justify-between">
                            <Button size="sm" variant="outline" className="text-xs px-2.5 py-1.5 h-7">
                              {resource.type === "video" ? "Watch" : resource.type === "pdf" ? "Download" : "Read"}
                            </Button>
                            
                            {!resource.completed && (
                              <Button size="sm" variant="ghost" className="text-xs h-7">
                                Mark Complete
                              </Button>
                            )}
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