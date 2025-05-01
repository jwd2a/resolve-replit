import { createContext, ReactNode, useContext, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PaymentStatusContextType {
  paymentStatus: boolean;
  isLoading: boolean;
  error: Error | null;
  completePayment: () => void;
}

export const PaymentStatusContext = createContext<PaymentStatusContextType | null>(null);

export function PaymentStatusProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [paymentStatus, setPaymentStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const completePayment = () => {
    setIsLoading(true);
    
    // Mock payment success after a short delay
    setTimeout(() => {
      setPaymentStatus(true);
      setIsLoading(false);
      
      toast({
        title: "Payment Successful",
        description: "Thank you for your purchase. You now have full access to the course.",
        variant: "default",
      });
    }, 1500);
  };

  return (
    <PaymentStatusContext.Provider
      value={{
        paymentStatus,
        isLoading,
        error,
        completePayment,
      }}
    >
      {children}
    </PaymentStatusContext.Provider>
  );
}

export function usePaymentStatus() {
  const context = useContext(PaymentStatusContext);
  if (!context) {
    throw new Error("usePaymentStatus must be used within a PaymentStatusProvider");
  }
  return context;
}