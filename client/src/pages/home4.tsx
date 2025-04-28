import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Mail, Check, Star, FileText, Calendar, ChevronRight, UserPlus, Zap } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { getInitials } from "@/lib/utils";

export default function Home4() {
  const { user } = useAuth();
  const [step, setStep] = useState<"welcome" | "invite-coparent" | "checklist">("welcome");
  const [loading, setLoading] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Mock data
  const currentStep = 0;
  const totalSteps = 4;
  const progress = Math.round((currentStep / totalSteps) * 100);

  const handleStartFirstStep = () => {
    setStep("invite-coparent");
  };

  const handleSendInvite = () => {
    setLoading(true);
    // Simulate sending invitation
    setTimeout(() => {
      setLoading(false);
      setInviteSent(true);
      toast({
        title: "Invitation Sent!",
        description: "Your co-parent has been invited to join Resolve.",
      });
    }, 1500);
  };

  const handleContinue = () => {
    setStep("checklist");
  };

  const handleSkip = () => {
    toast({
      description: "You can invite your co-parent later from the dashboard.",
    });
    setStep("checklist");
  };

  const renderWelcomeScreen = () => (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto mt-8 text-center">
      <div className="w-20 h-20 rounded-full bg-[#2e1a87] text-white flex items-center justify-center mb-6">
        <Zap size={40} />
      </div>
      
      <h1 className="text-3xl font-bold mb-3 text-[#2e1a87]">Welcome to Resolve!</h1>
      <p className="text-xl mb-8">You're in! Let's build your family's future together.</p>
      
      <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left w-full">
        <h3 className="font-medium text-lg text-blue-800 mb-2">First Step: Invite your Co-Parent</h3>
        <p className="text-blue-700">Completing this journey together will help create the best possible parenting plan for your family.</p>
      </div>
      
      <Button 
        onClick={handleStartFirstStep}
        className="w-full h-14 text-lg bg-[#2e1a87] hover:bg-[#25156d]"
      >
        Start First Step
        <ChevronRight className="ml-2" />
      </Button>
    </div>
  );

  const renderInviteCoParentStep = () => (
    <div className="max-w-md mx-auto mt-8">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-full bg-[#2e1a87] text-white flex items-center justify-center mr-3">
          <span className="text-sm font-medium">1</span>
        </div>
        <h2 className="text-xl font-bold">Invite Your Co-Parent</h2>
      </div>
      
      <Progress value={25} className="mb-6 h-2" />
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <p className="mb-4">
            You and your co-parent will take this course together. They'll need to register as well.
          </p>
          
          {inviteSent ? (
            <div className="bg-green-50 rounded-md p-4 text-green-800 flex items-center mb-4">
              <Check className="h-5 w-5 mr-2 text-green-600" />
              <span>Invitation sent successfully!</span>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 mb-4">
              <div className="flex items-center p-3 border rounded-md">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback>{user?.displayName ? getInitials(user.displayName) : "CP"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Your Co-Parent</p>
                  <p className="text-sm text-gray-500">Not yet specified</p>
                </div>
              </div>
              
              <Button 
                onClick={handleSendInvite}
                variant="outline"
                className="border-[#2e1a87] text-[#2e1a87] hover:bg-[#f5f3ff]"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#2e1a87]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Invite Email
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        {inviteSent ? (
          <Button 
            onClick={handleContinue}
            className="w-full bg-[#2e1a87] hover:bg-[#25156d]"
          >
            Continue to Next Step
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <>
            <Button 
              onClick={handleSkip}
              variant="ghost"
              className="text-gray-500"
            >
              Skip for now
            </Button>
            
            <Button 
              onClick={handleContinue}
              disabled={!inviteSent}
              className="bg-[#2e1a87] hover:bg-[#25156d]"
            >
              Continue
            </Button>
          </>
        )}
      </div>
    </div>
  );

  const renderChecklist = () => {
    const checklistItems = [
      { id: 1, title: "Invite co-parent", completed: inviteSent, icon: <UserPlus size={18} /> },
      { id: 2, title: "Sign waivers", completed: false, icon: <FileText size={18} /> },
      { id: 3, title: "Select holidays", completed: false, icon: <Calendar size={18} /> },
      { id: 4, title: "Complete orientation", completed: false, icon: <Star size={18} /> },
    ];

    return (
      <div className="max-w-4xl mx-auto mt-4 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Welcome to Resolve</h1>
          <p className="text-gray-600">Track your progress through the program</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Getting Started</h2>
                <p className="text-gray-600 mb-4">Complete these items to begin your journey</p>
                
                <div className="space-y-3">
                  {checklistItems.map((item) => (
                    <div key={item.id} className="flex items-center p-3 border rounded-md">
                      <div className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center ${
                        item.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                      }`}>
                        {item.completed ? <Check size={16} /> : item.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                      </div>
                      <Button 
                        variant={item.completed ? "ghost" : "outline"}
                        size="sm"
                        className={item.completed ? "text-green-600" : ""}
                      >
                        {item.completed ? "Completed" : "Start"}
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Setup Progress</span>
                    <span className="text-sm font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Your Course</h2>
                <p className="text-gray-600 mb-4">Begin your parenting course when you're ready</p>
                
                <div className="bg-[#f5f3ff] rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Module 1: Introduction</h3>
                      <p className="text-sm text-gray-600">25 minutes</p>
                    </div>
                    <Button className="bg-[#2e1a87] hover:bg-[#25156d]">
                      Start Course
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="pt-6">
                <h2 className="font-bold mb-4">Upcoming Session</h2>
                <div className="bg-orange-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-orange-800">No session scheduled yet</p>
                  <Button variant="link" className="text-[#2e1a87] p-0 h-auto text-sm">
                    Schedule Now
                  </Button>
                </div>
                
                <div className="mt-6">
                  <h2 className="font-bold mb-4">Resources</h2>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-md">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                          <FileText size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Parenting Handbook</p>
                          <p className="text-xs text-gray-500">PDF • 15 min read</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {step === "welcome" && renderWelcomeScreen()}
      {step === "invite-coparent" && renderInviteCoParentStep()}
      {step === "checklist" && renderChecklist()}
    </div>
  );
}