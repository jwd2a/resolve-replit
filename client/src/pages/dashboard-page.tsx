import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, addDays, isBefore, isToday, isSameDay } from "date-fns";
import logoSrc from "@assets/@Resolve Primary Logo - Main Color 02.png";

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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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

  // If user is not logged in, redirect to auth page
  if (!user) {
    return <Redirect to="/auth" />;
  }

  // If user hasn't completed onboarding, redirect to onboarding
  if (!user.onboardingComplete) {
    return <Redirect to="/onboarding" />;
  }

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
      <header className="bg-[#2e1a87] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={logoSrc}
                alt="Resolve Logo" 
                className="h-12 mr-4"
              />
              <h1 className="text-xl font-semibold">Parenting Partnership</h1>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" className="text-white">
                Messages
              </Button>
              <Button variant="ghost" className="text-white">
                Support
              </Button>
              <Avatar className="h-10 w-10 ml-4">
                <AvatarImage src="" />
                <AvatarFallback className="bg-purple-300">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Welcome, {user.displayName || "User"}!</CardTitle>
                <CardDescription>
                  Here's your parenting partnership dashboard. Let's make positive progress together.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="course">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="course">Course Status</TabsTrigger>
                    <TabsTrigger value="waivers">Required Waivers</TabsTrigger>
                    <TabsTrigger value="resources">Prep Resources</TabsTrigger>
                  </TabsList>
                  
                  {/* Course Status Tab */}
                  <TabsContent value="course" className="space-y-4 pt-4">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex-1 space-y-4">
                        <h3 className="text-lg font-medium">Course Schedule</h3>

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
                              <div className="mt-2">
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                                  {courseDate.scheduledDate && Math.ceil((courseDate.scheduledDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days to go
                                </Badge>
                              </div>
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
                              <div className="mt-2">
                                <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                                  Completed
                                </Badge>
                              </div>
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
                    </div>
                  </TabsContent>
                  
                  {/* Waivers Tab */}
                  <TabsContent value="waivers" className="space-y-4 pt-4">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Required Waivers & Documents</h3>
                        <Badge className={waiversProgress === 100 ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                          {completedWaivers}/{waivers.length} Completed
                        </Badge>
                      </div>
                    
                      <Progress value={waiversProgress} className="h-2" />
                    
                      <div className="space-y-4">
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
                  </TabsContent>
                  
                  {/* Resources Tab */}
                  <TabsContent value="resources" className="space-y-4 pt-4">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Preparatory Materials</h3>
                        <Badge className={resourcesProgress === 100 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                          {completedResources}/{resources.length} Completed
                        </Badge>
                      </div>
                    
                      <Progress value={resourcesProgress} className="h-2" />
                    
                      <div className="space-y-4">
                        {resources.map((resource) => (
                          <Card key={resource.id} className={cn(
                            "border-l-4",
                            resource.completed ? "border-l-green-500" : "border-l-blue-500"
                          )}>
                            <CardHeader className="p-4 pb-2">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center">
                                  {resource.type === "video" && <Video className="h-5 w-5 text-blue-500 mr-2" />}
                                  {resource.type === "pdf" && <FileText className="h-5 w-5 text-blue-500 mr-2" />}
                                  {resource.type === "article" && <BookOpen className="h-5 w-5 text-blue-500 mr-2" />}
                                  <CardTitle className="text-base">{resource.title}</CardTitle>
                                </div>
                                <Badge className={
                                  resource.completed ? "bg-green-100 text-green-800" : 
                                  resource.type === "video" ? "bg-blue-100 text-blue-800" :
                                  resource.type === "pdf" ? "bg-amber-100 text-amber-800" :
                                  "bg-purple-100 text-purple-800"
                                }>
                                  {resource.type === "video" && resource.duration}
                                  {resource.type === "pdf" && "PDF"}
                                  {resource.type === "article" && "Article"}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <div className="flex justify-between items-center">
                                <Button size="sm" className={resource.completed ? "bg-gray-100 text-gray-800 hover:bg-gray-200" : ""}>
                                  {resource.completed ? "Review Again" : 
                                   resource.type === "video" ? "Watch Now" :
                                   resource.type === "pdf" ? "Download" : "Read Now"}
                                </Button>
                                {resource.completed && 
                                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                                }
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Parenting Plan Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Parenting Plan Progress</CardTitle>
                <CardDescription>
                  Track the progress of your parenting plan development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Overall Completion</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500">Plan Sections</h3>
                    
                    <div className="grid gap-4">
                      {/* Section 1 */}
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                          <div>
                            <h4 className="font-medium">Basic Information</h4>
                            <p className="text-sm text-gray-600">Parents and children details</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      </div>
                      
                      {/* Section 2 */}
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-amber-500 mr-3" />
                          <div>
                            <h4 className="font-medium">Custody Schedule</h4>
                            <p className="text-sm text-gray-600">Regular and holiday schedule</p>
                          </div>
                        </div>
                        <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
                      </div>
                      
                      {/* Section 3 */}
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center">
                          <XCircle className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <h4 className="font-medium">Decision Making</h4>
                            <p className="text-sm text-gray-600">Education, healthcare, religion</p>
                          </div>
                        </div>
                        <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>
                      </div>
                      
                      {/* Section 4 */}
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center">
                          <XCircle className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <h4 className="font-medium">Financial Arrangements</h4>
                            <p className="text-sm text-gray-600">Child support and expenses</p>
                          </div>
                        </div>
                        <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button className="w-full">
                        Continue Parenting Plan
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            {/* Co-Parent Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Co-Parent Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarFallback className="bg-blue-300">CP</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{user?.displayName ? user.displayName + "'s Co-Parent" : "Co-Parent"}</h3>
                      <p className="text-sm text-gray-600">Email invitation pending</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Registration Status</span>
                      <Badge className={coParentSignupStatus === "completed" ? 
                        "bg-green-100 text-green-800" : 
                        "bg-amber-100 text-amber-800"}>
                        {coParentSignupStatus === "completed" ? "Registered" : "Pending"}
                      </Badge>
                    </div>
                    
                    {coParentSignupStatus !== "completed" && (
                      <Button variant="outline" className="w-full text-sm">
                        <Users className="mr-2 h-4 w-4" />
                        Resend Invitation
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Session */}
            {courseDateStatus === "scheduled" && (
              <Card>
                <CardHeader className="bg-[#2e1a87]/5 border-b">
                  <CardTitle className="text-lg">Upcoming Session</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 text-[#2e1a87] mr-3" />
                      <div>
                        <h3 className="font-medium">Co-Parenting Course</h3>
                        <p className="text-sm text-gray-600">
                          {courseDate.scheduledDate && format(courseDate.scheduledDate, "EEEE, MMMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                      <div className="flex">
                        <Info className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                        <p className="text-sm text-amber-800">
                          Complete all preparatory materials before your session for the best experience.
                        </p>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Watch Orientation Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Resources</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <a href="#" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-500 mr-3" />
                      <span>Sample Parenting Plans</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <Download className="h-5 w-5 text-gray-500 mr-3" />
                      <span>Download Course Materials</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <Video className="h-5 w-5 text-gray-500 mr-3" />
                      <span>Co-Parenting Video Library</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader className="bg-[#2e1a87]/5 border-b">
                <CardTitle className="text-lg">Need Support?</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 mb-4">
                  Our team is here to help you through this process. Reach out any time.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}