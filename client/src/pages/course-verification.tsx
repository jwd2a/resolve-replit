import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock3, Info, RefreshCw, Send, CheckCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CourseVerification() {
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
  
  // Timer for code expiration countdown
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(time => time - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining]);
  
  // Function to send verification code
  const sendVerificationCode = () => {
    // Simulate sending a code
    setIsResending(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsResending(false);
      setCodeSent(true);
      setTimeRemaining(300); // 5 minutes to enter the code
      
      toast({
        title: "Verification Code Sent",
        description: "A 6-digit code was sent to your email",
      });
    }, 1000);
  };
  
  // Handle code input change
  const handleCodeChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    
    // Auto-focus next input after entering a digit
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
    
    // Auto-verify if all digits are entered
    if (value && index === 5 && newCode.every(digit => digit)) {
      verifyCode(newCode.join(""));
    }
  };
  
  // Verify the entered code
  const verifyCode = (code: string) => {
    setVerifying(true);
    
    // For now, any 6-digit code will pass
    setTimeout(() => {
      setVerifying(false);
      setIsSuccess(true);
      
      toast({
        title: "Verification Successful",
        description: "You can now access the course.",
      });
      
      // Redirect to course after a short delay
      setTimeout(() => {
        navigate("/course");
      }, 1500);
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
      <NavigationMenu />
      
      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-xl p-8 border border-[#6c54da]/20 shadow-sm mb-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-medium text-[#2e1a87] mb-2">
              Course Access Verification
            </h2>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              To ensure secure access to the course, please verify your email address.
            </p>
          </div>
          
          <div className="bg-[#f9f5ff]/80 rounded-lg p-5 mb-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-[#6c54da] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-[#2e1a87] text-sm mb-1">Why this step matters</h3>
                <p className="text-gray-600 text-sm">
                  This verification helps protect your parenting plan information and ensures only authorized users can access the course.
                </p>
              </div>
            </div>
          </div>
          
          {isSuccess ? (
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-green-800 mb-1">Verification Complete!</h3>
              <p className="text-green-600 mb-4">You now have access to your course materials.</p>
              <Link href="/course">
                <Button
                  className="bg-[#2e1a87] hover:bg-[#25156d]"
                  size="lg"
                >
                  Go to Course <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : !codeSent ? (
            <div>
              <p className="text-gray-600 text-sm mb-6">
                Please click the button below to send a verification code to your email.
              </p>
              
              <div className="flex justify-center">
                <Button
                  onClick={sendVerificationCode}
                  disabled={isResending}
                  className={`${
                    isResending
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4]'
                  }`}
                  size="lg"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                      Sending Code...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Verification Code
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className={cn("transition-all duration-500", isSuccess ? "opacity-50" : "opacity-100")}>
              <div className="text-center bg-blue-50 p-4 rounded-lg w-full mb-6">
                <Send className="h-5 w-5 mx-auto text-blue-500 mb-2" />
                <p className="text-sm text-blue-700">
                  A verification code has been sent to your email address.
                </p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-[#2e1a87]">Enter Verification Code</h3>
                  {timeRemaining > 0 && (
                    <div className="flex items-center text-amber-600 text-sm">
                      <Clock3 className="h-3.5 w-3.5 mr-1.5" />
                      <span>{formatTime(timeRemaining)}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center gap-3 mb-4">
                  {verificationCode.map((digit, index) => (
                    <Input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      className="w-12 h-14 text-center text-xl font-medium border-[#6c54da]/30 focus:border-[#6c54da] focus:ring-[#6c54da]/20 rounded-md"
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
                    Resend Code
                  </button>
                  
                  <p className="text-xs text-gray-500">
                    Didn't receive a code? Check your spam folder or try again.
                  </p>
                </div>
              </div>
              
              <Button
                onClick={() => verifyCode(verificationCode.join(""))}
                disabled={verificationCode.some(digit => !digit) || isSuccess || verifying}
                className={`w-full ${
                  verificationCode.some(digit => !digit) || verifying || isSuccess
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4]'
                }`}
                size="lg"
              >
                {verifying ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Continue"
                )}
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}