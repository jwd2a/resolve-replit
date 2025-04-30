import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import Header from "@/components/Header";
import { 
  Mail, 
  Check, 
  FileText, 
  Calendar, 
  ChevronRight, 
  UserPlus, 
  X,
  Edit,
  Users,
  BookOpen,
  AlertCircle,
  ChevronDown,
  User,
  MessageCircle,
  ExternalLink,
  Zap
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/utils";

// Course module interface
interface Module {
  id: number;
  title: string;
  status: "completed" | "in_progress" | "not_started";
  locked: boolean;
}

// Admin task interface
interface AdminTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  type: "waiver" | "form" | "preference";
}

// Family member interface
interface FamilyMember {
  id: number;
  name: string;
  role: "parent" | "co-parent" | "child";
  status: "registered" | "pending" | "incomplete";
  age?: number;
}

export default function Home5() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [isSendingInvite, setIsSendingInvite] = useState(false);
  const [coParentEmail, setCoParentEmail] = useState("");
  
  // Mock data for the course progress
  const courseProgress = 45; // 45% complete
  
  // Mock data for the course modules
  const courseModules: Module[] = [
    { id: 1, title: "Foundations", status: "completed", locked: false },
    { id: 2, title: "Communication", status: "completed", locked: false },
    { id: 3, title: "Custody", status: "in_progress", locked: false },
    { id: 4, title: "Holidays", status: "not_started", locked: true },
    { id: 5, title: "Support & Resources", status: "not_started", locked: true }
  ];
  
  // Mock data for admin tasks
  const adminTasks: AdminTask[] = [
    { 
      id: "waiver", 
      title: "Confidentiality Waiver", 
      description: "This waiver protects your privacy during the co-parenting process.",
      completed: false,
      priority: "high",
      type: "waiver"
    },
    { 
      id: "holiday_prefs", 
      title: "Holiday Preferences", 
      description: "Define your important holiday traditions and preferences.",
      completed: false,
      priority: "medium",
      type: "preference"
    }
  ];
  
  // Mock data for family members
  const familyMembers: FamilyMember[] = [
    { id: 1, name: "Eric Robinson", role: "parent", status: "registered" },
    { id: 2, name: "Sarah Parker", role: "co-parent", status: "pending" },
    { id: 3, name: "Mila Robinson", role: "child", status: "registered", age: 6 }
  ];
  
  // Get the current parent's first name
  const parentFirstName = user?.displayName?.split(" ")[0] || familyMembers.find(m => m.role === "parent")?.name.split(" ")[0] || "Eric";
  
  // Check if there are incomplete admin tasks
  const hasIncompleteTasks = adminTasks.some(task => !task.completed);
  
  // Get the current module
  const currentModule = courseModules.find(module => module.status === "in_progress") || courseModules[0];
  
  // Determine co-parent status
  const coParent = familyMembers.find(member => member.role === "co-parent");
  const coParentPending = coParent?.status === "pending";
  
  // Handle inviting co-parent
  const handleInviteCoParent = () => {
    if (!coParentEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your co-parent's email address.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSendingInvite(true);
    
    // Simulate sending invitation
    setTimeout(() => {
      setIsSendingInvite(false);
      setInviteDialogOpen(false);
      
      toast({
        title: "Invitation Sent",
        description: `An invitation has been sent to ${coParentEmail}.`,
      });
      
      // Clear the email input
      setCoParentEmail("");
    }, 1500);
  };
  
  // Get status icon for a module
  const getModuleStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="h-4 w-4 text-green-600" />;
      case "in_progress":
        return <Zap className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Use the standard app header */}
      <Header title="Resolve" onMenuClick={() => {}}/>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome & Status Header */}
          <div className="bg-gradient-to-r from-[#2e1a87] to-[#5a43c6] rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-6 sm:px-8 sm:py-8 text-white">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="space-y-3">
                  <h1 className="text-2xl font-semibold">Welcome to Your Family's Parenting Plan</h1>
                  <p className="text-white/90">
                    To begin your course, please complete the following steps:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="h-5 w-5 rounded-full border border-white/50 flex items-center justify-center mr-2">
                        {adminTasks.find(task => task.id === "waiver")?.completed ? 
                          <Check className="h-3 w-3 text-white" /> : 
                          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                        }
                      </div>
                      <p className="text-white/90">Sign required waivers</p>
                    </div>
                    <div className="flex items-center">
                      <div className="h-5 w-5 rounded-full border border-white/50 flex items-center justify-center mr-2">
                        {adminTasks.find(task => task.id === "holiday_prefs")?.completed ? 
                          <Check className="h-3 w-3 text-white" /> : 
                          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                        }
                      </div>
                      <p className="text-white/90">Choose your family's holiday preferences</p>
                    </div>
                    <div className="flex items-center">
                      <div className="h-5 w-5 rounded-full border border-white/50 flex items-center justify-center mr-2">
                        {!coParentPending ? 
                          <Check className="h-3 w-3 text-white" /> : 
                          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                        }
                      </div>
                      <p className="text-white/90">Co-parent registration required</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm">Your progress will be saved as you go.</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <Button 
                    className="mt-4 md:mt-0 bg-white text-[#2e1a87] hover:bg-white/90"
                    onClick={() => setLocation(`/course`)}
                    disabled={!(adminTasks.every(task => task.completed) && !coParentPending)}
                  >
                    Start Course
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                  {!(adminTasks.every(task => task.completed) && !coParentPending) && (
                    <p className="text-white/80 text-xs mt-2">All items must be completed before starting.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Course Modules */}
            <div className="md:col-span-2 space-y-6">
              {/* Course Modules Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Outline</CardTitle>
                  <CardDescription>
                    Track your progress through the co-parenting curriculum
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {courseModules.map((module) => (
                      <div 
                        key={module.id} 
                        className={`p-3 border rounded-md flex items-center justify-between group transition-all ${
                          module.status === "in_progress" 
                            ? "border-amber-200 bg-amber-50" 
                            : module.status === "completed"
                            ? "border-green-200 bg-green-50"
                            : module.locked ? "opacity-60" : ""
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            module.status === "in_progress" 
                              ? "bg-amber-100 text-amber-600" 
                              : module.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-500"
                          }`}>
                            {module.status === "completed" ? (
                              <Check className="h-4 w-4" />
                            ) : module.status === "in_progress" ? (
                              <Zap className="h-4 w-4" />
                            ) : (
                              module.id
                            )}
                          </div>
                          
                          <div>
                            <h3 className="font-medium">
                              Module {module.id}: {module.title}
                            </h3>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="mr-3">
                            {getModuleStatusIcon(module.status)}
                          </div>
                          
                          {module.status === "in_progress" && (
                            <Button 
                              size="sm"
                              className="bg-[#2e1a87] hover:bg-[#25156d] h-8"
                              onClick={() => setLocation(`/course`)}
                            >
                              Continue
                            </Button>
                          )}
                          
                          {module.status === "completed" && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8"
                              onClick={() => setLocation(`/course`)}
                            >
                              Review
                            </Button>
                          )}
                          
                          {module.status === "not_started" && !module.locked && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8"
                              onClick={() => setLocation(`/course`)}
                            >
                              Start
                            </Button>
                          )}
                          
                          {module.locked && (
                            <span className="text-sm text-gray-500">Locked</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="border-t pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full text-[#2e1a87]"
                    onClick={() => setLocation("/course")}
                  >
                    View Full Outline
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Form & Admin Tasks Section - only show if there are incomplete tasks */}
              {hasIncompleteTasks && (
                <Card>
                  <CardHeader>
                    <CardTitle>Required Items</CardTitle>
                    <CardDescription>
                      Complete these items to finalize your parenting plan
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      {adminTasks.filter(task => !task.completed).map((task) => (
                        <div 
                          key={task.id} 
                          className={`p-3 border rounded-md ${
                            task.priority === "high" ? "border-red-200" : "border-amber-200"
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                              task.priority === "high" 
                                ? "bg-red-100 text-red-600" 
                                : "bg-amber-100 text-amber-600"
                            }`}>
                              <AlertCircle className="h-4 w-4" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">{task.title}</h3>
                                
                                <Button 
                                  size="sm" 
                                  className="h-7 bg-[#2e1a87]"
                                  onClick={() => {
                                    // In a real app, this would open a dialog to complete the task
                                    toast({
                                      title: "Action Required",
                                      description: `Please complete the ${task.title.toLowerCase()}.`,
                                    });
                                  }}
                                >
                                  Complete
                                </Button>
                              </div>
                              
                              <p className="text-sm text-gray-500 mt-1">
                                {task.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t pt-4">
                    <Button 
                      className="w-full bg-[#2e1a87] hover:bg-[#25156d]"
                      onClick={() => {
                        // In a real app, this would take you to a page to complete all items
                        toast({
                          title: "Action Required",
                          description: "Please complete all required items.",
                        });
                      }}
                    >
                      Complete These Items
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
            
            {/* Right Column - Family Info & Support */}
            <div className="space-y-6">
              {/* Family Information Card */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Family Information</CardTitle>
                    <Button variant="ghost" size="sm" className="h-8 text-[#2e1a87]" onClick={() => setLocation("/onboarding6step")}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Parents</h3>
                      <div className="space-y-2">
                        {familyMembers.filter(member => member.role === "parent" || member.role === "co-parent").map((member) => (
                          <div key={member.id} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarFallback className={`${
                                  member.status === "registered" 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-amber-100 text-amber-800"
                                }`}>
                                  {getInitials(member.name)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{member.name}</span>
                            </div>
                            
                            <div>
                              {member.status === "registered" ? (
                                <div className="flex items-center text-green-600 text-xs">
                                  <Check className="h-3.5 w-3.5 mr-1" />
                                  <span>Active</span>
                                </div>
                              ) : (
                                <div className="flex items-center text-amber-600 text-xs">
                                  <span>Pending</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {coParentPending && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2 text-xs h-7"
                          onClick={() => setInviteDialogOpen(true)}
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          Resend Invitation
                        </Button>
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Children</h3>
                      <div className="space-y-2">
                        {familyMembers.filter(member => member.role === "child").map((child) => (
                          <div key={child.id} className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback className="bg-blue-100 text-blue-800">
                                {getInitials(child.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{child.name}</span>
                            {child.age && (
                              <span className="text-xs text-gray-500 ml-2">({child.age} years old)</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Resources Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <a 
                      href="#"
                      className="block p-3 border rounded-md hover:border-[#2e1a87]/50 cursor-pointer transition-all"
                      onClick={(e) => {
                        e.preventDefault();
                        toast({
                          title: "Resource Opened",
                          description: "Co-Parenting Guide opened in a new tab.",
                        });
                      }}
                    >
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Co-Parenting Guide</h4>
                          <p className="text-xs text-gray-500">PDF • 15 pages</p>
                        </div>
                      </div>
                    </a>
                    
                    <a 
                      href="#"
                      className="block p-3 border rounded-md hover:border-[#2e1a87]/50 cursor-pointer transition-all"
                      onClick={(e) => {
                        e.preventDefault();
                        toast({
                          title: "Resource Opened",
                          description: "Communication Toolkit opened in a new tab.",
                        });
                      }}
                    >
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Communication Toolkit</h4>
                          <p className="text-xs text-gray-500">Article • 10 min read</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>
              
              {/* Support Banner */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-800">
                <div className="flex items-start">
                  <MessageCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Need help? Our support team is just a click away.</p>
                    <Button 
                      variant="link" 
                      className="h-auto p-0 text-blue-600 text-sm mt-1"
                      onClick={() => {
                        toast({
                          title: "Support",
                          description: "Our support team will contact you shortly.",
                        });
                      }}
                    >
                      Contact Support
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Co-Parent Invite Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Your Co-Parent</DialogTitle>
            <DialogDescription>
              Working together with your co-parent will help create the best possible parenting plan for your family.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Co-Parent's Email</label>
              <input 
                type="email"
                placeholder="email@example.com"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2e1a87]"
                value={coParentEmail}
                onChange={(e) => setCoParentEmail(e.target.value)}
              />
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700">
              <div className="flex items-start">
                <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <p>Your co-parent will need to create their own account to work with you on the parenting plan.</p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setInviteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleInviteCoParent}
              disabled={isSendingInvite}
              className="bg-[#2e1a87]"
            >
              {isSendingInvite ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full" />
                  Sending...
                </>
              ) : (
                "Send Invitation"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}