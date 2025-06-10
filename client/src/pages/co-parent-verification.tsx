import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Check, RefreshCw, Users, Mail, Clock3, Send } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { NavigationMenu } from "@/components/NavigationMenu";

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
      setIsResending(false);
      setCodeSent(true);
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
      
      // Accept any 6-digit code for now
      if (code.length === 6 && /^\d{6}$/.test(code)) {
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
    <div className="min-h-screen bg-gray-50">
      <NavigationMenu />
      
      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 text-[#2e1a87] mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Co-Parent Verification Required</h1>
          </div>
          <p className="text-gray-700 text-lg max-w-3xl">
            To begin the course, we need to confirm that both parents are present and participating.
          </p>
        </div>

        {/* Why This Step Matters Section */}
        <Card className="mb-8 border-0 shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Why This Step Matters</h2>
            <p className="text-gray-700 leading-relaxed">
              Each parent must verify their presence to prevent one person from completing the process alone. This 
              ensures both of you are making decisions together and that all agreements are valid.
            </p>
          </CardContent>
        </Card>

        {/* Email Verification Section */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Mail className="h-5 w-5 text-[#2e1a87] mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Verify Co-Parent's Email</h2>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-2">
                We'll send a 6-digit code to your co-parent at <span className="font-medium text-blue-600">{coParentEmail}</span>.
              </p>
              <p className="text-gray-700">
                They must be present to enter the code and proceed with you.
              </p>
            </div>
          
            <div className="space-y-6">
              {!codeSent ? (
                <div className="text-center">
                  <Button
                    onClick={sendVerificationCode}
                    disabled={isResending}
                    className={`px-8 py-3 text-sm font-medium ${
                      isResending 
                        ? 'bg-[#2e1a87]/60'
                        : 'bg-[#2e1a87] hover:bg-[#3d2a9b] text-white'
                    }`}
                    size="lg"
                  >
                    {isResending ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                        Sending Code...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        [Send Verification Code]
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className={cn("space-y-6", isSuccess ? "opacity-50" : "opacity-100")}>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-blue-600 mr-2" />
                      <p className="text-sm text-blue-800">
                        A verification code has been sent to your co-parent's email.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-900">Enter Verification Code</h3>
                      {timeRemaining > 0 && (
                        <div className="flex items-center text-amber-600 text-sm">
                          <Clock3 className="h-4 w-4 mr-1" />
                          <span>{formatTime(timeRemaining)}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-center gap-3 mb-6">
                      {verificationCode.map((digit, index) => (
                        <Input
                          key={index}
                          id={`code-${index}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleCodeChange(index, e.target.value)}
                          className="w-12 h-12 text-center text-lg font-medium border-gray-300 focus:border-[#2e1a87] focus:ring-[#2e1a87]/20 rounded-md"
                          disabled={isSuccess || verifying}
                        />
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center mb-6">
                      <button
                        onClick={sendVerificationCode}
                        disabled={isResending || timeRemaining > 270 || isSuccess || verifying}
                        className={`text-sm ${
                          isResending || timeRemaining > 270 || isSuccess || verifying
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-[#2e1a87] hover:underline'
                        }`}
                      >
                        {isResending ? "Sending..." : "Resend Code"}
                      </button>
                      
                      <p className="text-sm text-gray-600">
                        Code sent to {coParentEmail}
                      </p>
                    </div>
                    
                    <Button
                      onClick={verifyCode}
                      disabled={verificationCode.some(digit => digit === "") || isSuccess || verifying}
                      className={`w-full py-3 text-sm font-medium ${
                        verifying 
                          ? 'bg-[#2e1a87]/60' 
                          : isSuccess 
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-[#2e1a87] hover:bg-[#3d2a9b] text-white'
                      }`}
                    >
                      {verifying ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                          Verifying...
                        </>
                      ) : isSuccess ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Verified! Redirecting to Course...
                        </>
                      ) : (
                        "Verify & Continue to Course"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}