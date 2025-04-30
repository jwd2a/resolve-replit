import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { 
  Mail, 
  Check, 
  Star, 
  FileText, 
  Calendar, 
  ChevronRight, 
  UserPlus, 
  Zap,
  Clock,
  BookOpen,
  Heart,
  AlertCircle
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { NavigationMenu } from "@/components/NavigationMenu";

export default function Home4() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coparentEmail, setCoparentEmail] = useState("");

  // Mock data
  const completedModules = 0;
  const totalModules = 5;
  const progress = Math.round((completedModules / totalModules) * 100);
  
  // Mock co-parent status
  const coParentJoined = false;
  
  const handleSendInvite = () => {
    if (!coparentEmail || !coparentEmail.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    // Simulate sending invitation
    setTimeout(() => {
      setLoading(false);
      setShowInviteModal(false);
      toast({
        title: "Invitation Sent!",
        description: `Your co-parent (${coparentEmail}) has been invited to join Resolve.`,
      });
    }, 1000);
  };
  
  const upcomingDeadlines = [
    {
      id: 1,
      title: "Sign Waivers",
      dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      priority: "high",
      icon: <FileText className="h-4 w-4" />
    },
    {
      id: 2,
      title: "Complete Module 1",
      dueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
      priority: "medium",
      icon: <Star className="h-4 w-4" />
    }
  ];
  
  // This is needed for the Header component
  const onMenuClick = () => {
    // Placeholder
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <NavigationMenu />
      
      <div className="max-w-6xl mx-auto pt-6 px-4">
        <div className="flex flex-col space-y-6">
          {/* Welcome/Overview Banner */}
          <Card className="bg-gradient-to-r from-[#2e1a87] to-[#5a43c6] text-white border-none">
            <CardContent className="pt-6 pb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Welcome, Linda!</h1>
                  <p className="opacity-90 mb-2">Your co-parenting journey starts here</p>
                  <div className="flex items-center mt-2">
                    <div className="w-full max-w-xs">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Course Progress</span>
                        <span>{completedModules}/{totalModules} Modules</span>
                      </div>
                      <Progress value={progress} className="h-2 bg-white/20" />
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4 mt-4 md:mt-0">
                  <Button 
                    variant="secondary" 
                    className="bg-white text-[#2e1a87] hover:bg-white/90"
                    onClick={() => setLocation("/course")}
                  >
                    Start Course
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white text-white bg-transparent hover:bg-white/10"
                    style={{ color: 'white' }}
                    onClick={() => setLocation("/parenting-plan")}
                  >
                    View Parenting Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Main Content Area */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Modules</CardTitle>
                  <CardDescription>
                    Your guided learning journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: 1, title: "Introduction to Co-Parenting", duration: "25 min", locked: false },
                      { id: 2, title: "Communication Strategies", duration: "40 min", locked: true },
                      { id: 3, title: "Creating a Parenting Plan", duration: "35 min", locked: true },
                      { id: 4, title: "Conflict Resolution", duration: "30 min", locked: true },
                      { id: 5, title: "Moving Forward", duration: "20 min", locked: true }
                    ].map((module) => (
                      <div key={module.id} className={`border rounded-lg p-4 ${module.locked ? 'opacity-70' : ''}`}>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className={`mr-3 h-8 w-8 rounded-full flex items-center justify-center ${
                              module.locked ? 'bg-gray-100' : 'bg-[#2e1a87]/10 text-[#2e1a87]'
                            }`}>
                              {module.id}
                            </div>
                            <div>
                              <h3 className="font-medium">{module.title}</h3>
                              <p className="text-sm text-gray-500">{module.duration}</p>
                            </div>
                          </div>
                          <Button 
                            variant={module.locked ? "outline" : "default"} 
                            className={module.locked ? "opacity-50 cursor-not-allowed" : "bg-[#2e1a87]"}
                            disabled={module.locked}
                            onClick={() => setLocation("/course")}
                          >
                            {module.locked ? "Locked" : "Start"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => setLocation("/course")}
                  >
                    View All Modules
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Co-Parent Status */}
              <Card className={coParentJoined ? "border-green-200" : "border-amber-200"}>
                <CardHeader className={coParentJoined ? "bg-green-50" : "bg-amber-50"}>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Co-Parent Status</CardTitle>
                    {coParentJoined ? (
                      <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        Joined
                      </div>
                    ) : (
                      <div className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">
                        Pending
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {coParentJoined ? (
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback className="bg-green-100 text-green-800">JP</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">Jane Parker</h3>
                        <p className="text-sm text-gray-500">Joined 2 days ago</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center mb-4">
                        <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                        <p className="text-sm">Your co-parent hasn't joined yet</p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setShowInviteModal(true)}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Send Invitation
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Upcoming Deadlines */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingDeadlines.map((deadline) => (
                      <div key={deadline.id} className="flex items-start p-3 border rounded-md">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                          deadline.priority === 'high' 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-amber-100 text-amber-600'
                        }`}>
                          {deadline.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{deadline.title}</h4>
                          <p className="text-xs text-gray-500">
                            Due {format(deadline.dueDate, 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-md hover:border-[#2e1a87]/50 cursor-pointer transition-all">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Parenting Handbook</h4>
                          <p className="text-xs text-gray-500">PDF • 15 pages</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border rounded-md hover:border-[#2e1a87]/50 cursor-pointer transition-all">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Co-Parenting Guide</h4>
                          <p className="text-xs text-gray-500">Article • 10 min read</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button 
                    variant="ghost" 
                    className="w-full text-[#2e1a87]"
                  >
                    View All Resources
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Co-Parent Invite Modal */}
      <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Your Co-Parent</DialogTitle>
            <DialogDescription>
              Working together will help create the best possible parenting plan for your family.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Co-Parent's Email</label>
              <input 
                type="email"
                placeholder="email@example.com"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2e1a87]"
                value={coparentEmail}
                onChange={(e) => setCoparentEmail(e.target.value)}
              />
            </div>
            <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700">
              <div className="flex items-start">
                <Heart className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <p>Your co-parent will need to create their own account. They'll receive an email with instructions.</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowInviteModal(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSendInvite}
              disabled={loading}
              className="bg-[#2e1a87]"
            >
              {loading ? "Sending..." : "Send Invitation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}