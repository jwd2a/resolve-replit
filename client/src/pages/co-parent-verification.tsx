import React, { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Check, RefreshCw, Send, Info, User, Mail, Clock3 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export default function CoParentVerification() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  // States for the verification process
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(""));
  const [isResending, setIsResending] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  
  // Mock co-parent data - in a real app, this would come from the user's profile
  const coParentEmail = "co-parent@example.com"; // In production, get this from the user's profile
  
  // Timer for code expiration countdown
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(time => time - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining]);
  
  // Function to send verification code
  const sendVerificationCode = () => {
    // In a real implementation, this would call an API to send the email
    setIsResending(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setCodeSent(true);
      setIsResending(false);
      setTimeRemaining(300); // 5 minutes to enter the code
      
      toast({
        title: "Verification Code Sent",
        description: `A 6-digit code was sent to ${coParentEmail}`,
      });
    }, 1500);
  };
  
  // Handle input change for verification code
  const handleCodeChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };
  
  // Handle code verification
  const verifyCode = () => {
    const code = verificationCode.join("");
    if (code.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter all 6 digits of the verification code",
        variant: "destructive"
      });
      return;
    }
    
    setVerifying(true);
    
    // In a real implementation, this would validate the code with your backend
    // Simulate API call with a delay
    setTimeout(() => {
      setVerifying(false);
      
      // For this demo, we'll consider "123456" as the valid code
      if (code === "123456") {
        setIsSuccess(true);
        toast({
          title: "Verification Successful",
          description: "Your co-parent has been verified successfully!",
        });
        
        // Redirect to course page after a brief delay
        setTimeout(() => {
          navigate("/course");
        }, 2000);
      } else {
        toast({
          title: "Incorrect Code",
          description: "The verification code is incorrect. Please try again.",
          variant: "destructive"
        });
      }
    }, 1500);
  };
  
  // Format remaining time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="min-h-screen bg-[#f9f7fe]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-medium text-[#2e1a87]">
              Welcome to Your Family's Parenting Plan
            </h1>
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-transparent border-[#6c54da]/20 text-[#2e1a87]"
            >
              <User className="h-3.5 w-3.5 mr-1.5" />
              Account
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-xl p-8 border border-[#6c54da]/20 shadow-sm mb-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-medium text-[#2e1a87] mb-2">
              Co-Parent Verification Required
            </h2>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              To ensure both parents are present for the course, we need to verify your co-parent's identity.
            </p>
          </div>
          
          <div className="bg-[#f9f5ff]/80 rounded-lg p-5 mb-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-[#6c54da] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-[#2e1a87] text-sm mb-1">Why this step matters</h3>
                <p className="text-gray-600 text-sm">
                  Studies show that when both parents participate together, they're more likely to develop 
                  effective co-parenting agreements and reduce future conflicts.
                </p>
                <button 
                  onClick={() => setShowInfoDialog(true)} 
                  className="text-xs text-[#6c54da] font-medium mt-1 hover:underline"
                >
                  Learn more about our approach
                </button>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {!codeSent ? (
              <div className="flex flex-col items-center">
                <div className="w-full max-w-md">
                  <div className="mb-5">
                    <h3 className="text-sm font-medium text-[#2e1a87] mb-2">Co-Parent's Email</h3>
                    <div className="flex gap-3">
                      <Input 
                        value={coParentEmail}
                        disabled
                        className="bg-gray-50 border-[#6c54da]/20"
                      />
                      <Button
                        onClick={sendVerificationCode}
                        disabled={isResending}
                        className={`flex-shrink-0 ${
                          isResending 
                            ? 'bg-[#6c54da]/60'
                            : 'bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4]'
                        }`}
                      >
                        {isResending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 mr-1.5" />}
                        {isResending ? "Sending..." : "Send Code"}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      A 6-digit verification code will be sent to your co-parent's email address.
                    </p>
                  </div>
                </div>
                
                <div className="text-center bg-blue-50 p-4 rounded-lg w-full mt-6">
                  <Mail className="h-5 w-5 mx-auto text-blue-500 mb-2" />
                  <p className="text-sm text-blue-700">
                    Your co-parent should have access to their email to receive the code.
                  </p>
                </div>
              </div>
            ) : (
              <div className={cn("transition-all duration-500", isSuccess ? "opacity-50" : "opacity-100")}>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-[#2e1a87]">Enter Verification Code</h3>
                    {timeRemaining > 0 && (
                      <div className="flex items-center text-amber-600 text-sm">
                        <Clock3 className="h-3.5 w-3.5 mr-1.5" />
                        <span>{formatTime(timeRemaining)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between gap-2 mb-3">
                    {verificationCode.map((digit, index) => (
                      <Input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        className="w-12 h-12 text-center text-lg font-medium border-[#6c54da]/30 focus:border-[#6c54da] focus:ring-[#6c54da]/20"
                        disabled={isSuccess || verifying}
                      />
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button
                      onClick={sendVerificationCode}
                      disabled={isResending || timeRemaining > 270 || isSuccess || verifying} // Don't allow resend within 30 seconds
                      className={`text-xs ${
                        isResending || timeRemaining > 270 || isSuccess || verifying
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-[#6c54da] hover:underline'
                      }`}
                    >
                      {isResending ? "Sending..." : "Resend Code"}
                    </button>
                    
                    <p className="text-xs text-gray-500">
                      Code sent to {coParentEmail}
                    </p>
                  </div>
                </div>
                
                <Button
                  onClick={verifyCode}
                  disabled={verificationCode.some(digit => digit === "") || isSuccess || verifying}
                  className={`w-full py-6 ${
                    verifying 
                      ? 'bg-[#6c54da]/60' 
                      : isSuccess 
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4]'
                  }`}
                >
                  {verifying ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                      Verifying...
                    </>
                  ) : isSuccess ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Verified! Redirecting to Course...
                    </>
                  ) : (
                    "Verify & Continue to Course"
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-[#f5f0ff] rounded-xl p-5 border border-[#6c54da]/10">
          <h3 className="font-medium text-[#2e1a87] text-sm mb-2">Don't see your co-parent?</h3>
          <p className="text-gray-600 text-sm mb-3">
            If your co-parent isn't available right now, you can:
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="text-[#6c54da] font-medium">•</span>
              <span>Reschedule for a time when you're both available</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#6c54da] font-medium">•</span>
              <span>Make sure they have access to their email to receive the code</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#6c54da] font-medium">•</span>
              <span>Check if the correct email address is being used</span>
            </li>
          </ul>
          
          <Button
            variant="outline"
            className="mt-4 w-full border-[#6c54da]/20 text-[#2e1a87] hover:bg-[#f0e6ff]"
            onClick={() => navigate("/dashboard-simplified")}
          >
            Return to Dashboard
          </Button>
        </div>
      </main>
      
      {/* Information dialog */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent className="bg-white rounded-lg max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#2e1a87]">Why Both Parents Matter</DialogTitle>
            <DialogDescription>
              Our approach is based on research about effective co-parenting.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <p className="text-sm text-gray-700">
              Research consistently shows that when both parents participate in planning and decision-making:
            </p>
            
            <ul className="space-y-3">
              <li className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Reduced Conflict</h4>
                  <p className="text-xs text-gray-600">Parents who create agreements together experience 60% fewer disagreements about implementation.</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Better Child Outcomes</h4>
                  <p className="text-xs text-gray-600">Children show improved emotional well-being when both parents are actively involved in creating parenting arrangements.</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Increased Compliance</h4>
                  <p className="text-xs text-gray-600">Parenting plans created collaboratively have an 85% higher rate of being followed by both parties.</p>
                </div>
              </li>
            </ul>
            
            <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-700 mt-4">
              <p>
                Our verification process ensures that both parents are present and engaged during critical decision-making moments in the course.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowInfoDialog(false)}
              className="border-[#6c54da]/20 text-[#2e1a87]"
            >
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}