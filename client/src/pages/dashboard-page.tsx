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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Welcome, {user?.displayName || "User"}!</CardTitle>
                <CardDescription>
                  Here's your parenting partnership dashboard. Let's make positive progress together.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Course Schedule Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Course Schedule</h3>
                    {courseDate.scheduledDate && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        {Math.ceil((courseDate.scheduledDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days to go
                      </Badge>
                    )}
                  </div>

                  {courseDateStatus === "none" && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>No date scheduled</AlertTitle>
                      <AlertDescription>
                        Please propose a date for your course session with your co-parent.
                      </AlertDescription>
                    </Alert>
                  )}

                  {courseDateStatus === "awaiting" && (
                    <Alert>
                      <Clock className="h-4 w-4" />
                      <AlertTitle>Awaiting Response</AlertTitle>
                      <AlertDescription>
                        You proposed {courseDate.proposedDate && format(courseDate.proposedDate, "MMMM d, yyyy")} for your course session.
                        Waiting for your co-parent to accept.
                      </AlertDescription>
                    </Alert>
                  )}

                  {courseDateStatus === "proposed" && (
                    <Alert className="bg-blue-50 border-blue-300">
                      <Info className="h-4 w-4 text-blue-500" />
                      <AlertTitle className="text-blue-700">Date Proposed</AlertTitle>
                      <AlertDescription className="text-blue-600">
                        Your co-parent proposed {courseDate.proposedDate && format(courseDate.proposedDate, "MMMM d, yyyy")} for your course session.
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" onClick={acceptProposedDate}>Accept</Button>
                          <Button size="sm" variant="outline" onClick={rejectProposedDate}>Decline</Button>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  {courseDateStatus === "scheduled" && (
                    <Alert className="bg-green-50 border-green-300">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <AlertTitle className="text-green-700">Course Scheduled</AlertTitle>
                      <AlertDescription className="text-green-600">
                        Your course is scheduled for {courseDate.scheduledDate && format(courseDate.scheduledDate, "MMMM d, yyyy")}.
                      </AlertDescription>
                    </Alert>
                  )}

                  {courseDateStatus === "today" && (
                    <Alert className="bg-purple-50 border-purple-300">
                      <AlertCircle className="h-4 w-4 text-purple-500" />
                      <AlertTitle className="text-purple-700">Course Is Today!</AlertTitle>
                      <AlertDescription className="text-purple-600">
                        Your course is scheduled for today. Please join 5 minutes before your scheduled time.
                        <div className="mt-2">
                          <Button className="bg-purple-600 hover:bg-purple-700">
                            Join Session
                          </Button>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  {courseDateStatus === "past" && (
                    <Alert className="bg-gray-50 border-gray-300">
                      <CheckCheck className="h-4 w-4 text-gray-500" />
                      <AlertTitle className="text-gray-700">Course Completed</AlertTitle>
                      <AlertDescription className="text-gray-600">
                        You completed your course on {courseDate.scheduledDate && format(courseDate.scheduledDate, "MMMM d, yyyy")}.
                      </AlertDescription>
                    </Alert>
                  )}

                  {(courseDateStatus === "none" || courseDateStatus === "awaiting") && (
                    <Dialog open={showDateDialog} onOpenChange={setShowDateDialog}>
                      <DialogTrigger asChild>
                        <Button className="mt-2">
                          {courseDateStatus === "none" ? "Schedule Course Date" : "Change Proposed Date"}
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
                  )}

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Course Completion</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Pre-course materials</span>
                        <span>{Math.round(resourcesProgress)}% complete</span>
                      </div>
                      <Progress value={resourcesProgress} className="h-2" />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Required Waivers Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Required Waivers & Documents</h3>
                    <Badge className={waiversProgress === 100 ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                      {completedWaivers}/{waivers.length} Completed
                    </Badge>
                  </div>
                
                  <Progress value={waiversProgress} className="h-2" />
                
                  <div className="space-y-4 mt-4">
                    {waivers.map((waiver) => (
                      <Card key={waiver.id} className={cn(
                        "border-l-4",
                        waiver.signed ? "border-l-green-500" : "border-l-amber-500"
                      )}>
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              {waiver.signed ? 
                                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" /> : 
                                <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                              }
                              <CardTitle className="text-base">{waiver.title}</CardTitle>
                            </div>
                            <Badge className={waiver.signed ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                              {waiver.signed ? "Signed" : "Unsigned"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-gray-600 mb-3">{waiver.description}</p>
                          {waiver.signed ? (
                            <div className="text-xs text-gray-500">
                              Signed on {waiver.signedDate ? format(waiver.signedDate, "MMMM d, yyyy") : ""}
                            </div>
                          ) : (
                            <Button size="sm" className="mt-2">
                              Review & Sign
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Preparatory Materials Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Preparatory Materials</h3>
                    <Badge className={resourcesProgress === 100 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                      {completedResources}/{resources.length} Completed
                    </Badge>
                  </div>
                
                  <Progress value={resourcesProgress} className="h-2" />
                
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {resources.map((resource) => (
                      <Card key={resource.id} className="overflow-hidden">
                        <CardHeader className="p-4 pb-2 bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              {resource.type === "video" && <Video className="h-5 w-5 text-blue-500 mr-2" />}
                              {resource.type === "pdf" && <FileText className="h-5 w-5 text-red-500 mr-2" />}
                              {resource.type === "article" && <BookOpen className="h-5 w-5 text-purple-500 mr-2" />}
                              <CardTitle className="text-base">{resource.title}</CardTitle>
                            </div>
                            <Badge className={resource.completed ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                              {resource.completed ? "Completed" : resource.type}
                            </Badge>
                          </div>
                          {resource.duration && (
                            <div className="flex items-center mt-1 text-gray-500 text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {resource.duration}
                            </div>
                          )}
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <Button size="sm" variant="outline" className="text-sm">
                              {resource.type === "video" ? (
                                <><PlayCircle className="h-4 w-4 mr-1" /> Watch</>
                              ) : resource.type === "pdf" ? (
                                <><Download className="h-4 w-4 mr-1" /> Download</>
                              ) : (
                                <><BookOpen className="h-4 w-4 mr-1" /> Read</>
                              )}
                            </Button>
                            {!resource.completed && (
                              <Button size="sm" variant="ghost" className="text-xs">
                                Mark as Completed
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Co-parent info */}
          <div className="space-y-6">
            {/* Co-parent status card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Co-Parent Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {coParentSignupStatus === "pending" ? (
                  <div className="space-y-3">
                    <Alert className="border-amber-300 bg-amber-50">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <AlertTitle className="text-amber-800">Awaiting Co-Parent</AlertTitle>
                      <AlertDescription className="text-amber-700">
                        Your co-parent hasn't joined yet. Send them an invitation to get started.
                      </AlertDescription>
                    </Alert>
                    <Button className="w-full bg-[#2e1a87] hover:bg-[#231366]">
                      <Users className="mr-2 h-4 w-4" /> Invite Co-Parent
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-green-100 text-green-800">JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Jane Doe</p>
                      <p className="text-sm text-gray-500">Joined April 10, 2024</p>
                    </div>
                    <Badge className="ml-auto bg-green-100 text-green-800">Active</Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Course progress card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Course Completion</span>
                    <span>25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Parenting Plan</span>
                    <span>15%</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
                <Button className="w-full mt-2" variant="outline">
                  Continue Course <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Support card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Video className="mr-2 h-4 w-4" /> Schedule Consultation
                </Button>
                <Button className="w-full" variant="outline">
                  <Info className="mr-2 h-4 w-4" /> FAQs & Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}