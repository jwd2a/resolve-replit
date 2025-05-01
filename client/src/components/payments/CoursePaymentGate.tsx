import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, Lock, CheckCheck, Shield } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Make sure to call loadStripe outside of a component's render to avoid recreating the Stripe object on every render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CheckoutFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

// This is the actual payment form that will be shown inside the payment dialog
function CheckoutForm({ onSuccess, onCancel }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    // For the demo, let's just simulate a successful payment
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1500);

    // In a real implementation, you would use this:
    /*
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/payment-success",
      },
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message || "An unknown error occurred");
    } else {
      onSuccess();
    }
    */
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* In a real implementation, you would uncomment this:
      <PaymentElement />
      */}
      
      {/* Mock Payment UI for demo */}
      <div className="border rounded-md p-4 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="text-sm font-medium">Course Access Fee</div>
          <div className="font-bold">$149.00</div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <div className="text-sm font-medium">One-time payment</div>
              <div className="text-xs text-gray-500">No recurring charges or hidden fees</div>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <div className="text-sm font-medium">Access for both parents</div>
              <div className="text-xs text-gray-500">Your co-parent can join at no additional cost</div>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Shield className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <div className="text-sm font-medium">Secure payment</div>
              <div className="text-xs text-gray-500">Protected by Stripe's industry-leading security</div>
            </div>
          </div>
        </div>
      </div>
      
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {errorMessage}
        </div>
      )}
      
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="flex-1 bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4]"
          disabled={!stripe || isLoading}
        >
          {isLoading ? "Processing..." : "Complete Payment"}
        </Button>
      </div>
    </form>
  );
}

interface CoursePaymentGateProps {
  paymentCompleted: boolean;
  onPaymentComplete: () => void;
}

export function CoursePaymentGate({ paymentCompleted, onPaymentComplete }: CoursePaymentGateProps) {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  // For the demo, we'll use a mock client secret
  const [clientSecret] = useState("mock_client_secret");

  const handlePaymentSuccess = () => {
    setShowPaymentDialog(false);
    onPaymentComplete();
  };

  // If payment is already completed, show the success state
  if (paymentCompleted) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-green-200 p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCheck className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-[#2e1a87]">Payment Confirmed</h3>
            <p className="text-sm text-gray-600">You have full access to the course</p>
          </div>
        </div>
        
        <Button 
          className="w-full bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4] border-none" 
          size="sm"
        >
          Start Course <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }

  // Otherwise, show the payment gate
  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#6c54da]/20 p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#6c54da]/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Lock className="h-5 w-5 text-[#6c54da]" />
        </div>
        <div>
          <h3 className="font-medium text-[#2e1a87]">💳 Payment Required to Begin</h3>
          <p className="text-sm text-gray-600">To start your parenting course, please complete a secure one-time payment. This covers access for both co-parents.</p>
        </div>
      </div>
      
      <div className="space-y-3 py-1">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <span className="text-sm">One-time fee</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <span className="text-sm">Includes both parents</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <span className="text-sm">Immediate access after payment</span>
        </div>
      </div>
      
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogTrigger asChild>
          <Button 
            className="w-full bg-gradient-to-r from-[#2e1a87] to-[#6c54da] hover:from-[#25156d] hover:to-[#5744c4] border-none" 
            size="sm"
          >
            Complete Payment ➡️
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Complete Your Payment</DialogTitle>
            <DialogDescription>
              Secure one-time payment for full course access
            </DialogDescription>
          </DialogHeader>
          
          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'stripe',
                },
              }}
            >
              <CheckoutForm 
                onSuccess={handlePaymentSuccess} 
                onCancel={() => setShowPaymentDialog(false)} 
              />
            </Elements>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}