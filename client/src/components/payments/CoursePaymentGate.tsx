import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronRight, Lock, Unlock, CreditCard, CheckCircle, Loader2 } from "lucide-react";

interface CoursePaymentGateProps {
  paymentCompleted: boolean;
  onPaymentComplete: () => void;
}

export function CoursePaymentGate({ paymentCompleted, onPaymentComplete }: CoursePaymentGateProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    onPaymentComplete();
    
    // Reset processing state after completion (matching the timeout in the hook)
    setTimeout(() => {
      setIsProcessing(false);
    }, 1500);
  };

  // Render different content based on payment status
  if (paymentCompleted) {
    return (
      <Card className="bg-gradient-to-r from-green-50 to-white border border-green-200 hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-medium text-green-800">Course Access Unlocked</CardTitle>
            <Unlock className="h-4 w-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="flex items-center gap-2 text-xs text-green-700">
            <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" />
            <span>Full course access enabled</span>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button className="w-full bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4] border-none" size="sm">
            Continue Course <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-lg shadow-sm border border-[#6c54da]/20">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-[#2e1a87]">Course Access</CardTitle>
          <Lock className="h-4 w-4 text-[#6c54da]" />
        </div>
        <CardDescription className="text-xs text-gray-500">
          Complete the course enrollment to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 pb-3">
        <div className="mb-3 bg-amber-50 rounded-md p-2 border border-amber-100">
          <div className="text-xs text-amber-700">
            Your course access is pending payment
          </div>
        </div>
        
        <div className="text-xs space-y-1.5 mb-3">
          <div className="flex items-center gap-2">
            <Check className="h-3 w-3 text-[#6c54da]" />
            <span className="text-gray-600">Comprehensive co-parenting course</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-3 w-3 text-[#6c54da]" />
            <span className="text-gray-600">Legal template creation tools</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-3 w-3 text-[#6c54da]" />
            <span className="text-gray-600">Lifetime access to resources</span>
          </div>
        </div>
        
        <div className="flex justify-between items-baseline text-xs text-gray-500 mb-1">
          <span>Course Enrollment</span>
          <span className="text-sm font-medium text-[#2e1a87]">$249</span>
        </div>
        <Separator className="bg-gray-200 mb-1" />
        <div className="flex justify-between items-baseline text-xs mb-1">
          <span className="font-medium">Today's Payment</span>
          <span className="text-sm font-bold text-[#2e1a87]">$249</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4] border-none"
          size="sm"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Complete Enrollment
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}