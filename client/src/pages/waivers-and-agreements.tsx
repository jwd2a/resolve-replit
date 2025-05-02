import { useState } from "react";
import { useNavigate } from "wouter";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { FileText, Info, Check, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

interface Waiver {
  id: string;
  title: string;
  description: string;
  signed: boolean;
  signedDate: Date | null;
  content: string;
}

export default function WaiversAndAgreements() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [waivers, setWaivers] = useState<Waiver[]>([
    {
      id: "confidentiality",
      title: "Confidentiality Agreement",
      description: "Agreement to keep all shared information confidential during the course and parenting plan development.",
      signed: false,
      signedDate: null,
      content: `CONFIDENTIALITY AGREEMENT

This Confidentiality Agreement (the "Agreement") is entered into by you as a participant in the Resolve Parenting Agreement Platform.

1. CONFIDENTIAL INFORMATION
   During the course of using the Resolve platform and developing your parenting plan, you will have access to sensitive information about your co-parent and children. This may include personal details, preferences, concerns, and other private information shared in good faith.

2. OBLIGATIONS
   You agree to:
   a) Keep all information shared strictly confidential
   b) Not disclose any information to third parties without explicit consent
   c) Use the information solely for the purpose of creating an effective parenting plan
   d) Take reasonable measures to protect the information from unauthorized access

3. EXCEPTIONS
   These confidentiality obligations do not apply to information that:
   a) Is required to be disclosed by law or court order
   b) Relates to potential harm to a child (which must be reported to appropriate authorities)
   c) Is necessary to share with legal counsel engaged in representing you

4. TERM
   This confidentiality obligation continues even after your participation in the platform ends or your parenting plan is finalized.

5. ACKNOWLEDGEMENT
   By signing this Agreement, you acknowledge that you understand your confidentiality obligations and the importance of maintaining privacy throughout this process.`
    },
    {
      id: "termsConditions",
      title: "Terms & Conditions",
      description: "Agreement to participate in good faith in the mediation process if needed during the course.",
      signed: false,
      signedDate: null,
      content: `TERMS AND CONDITIONS

These Terms and Conditions ("Terms") govern your use of the Resolve Parenting Agreement Platform (the "Platform").

1. GOOD FAITH PARTICIPATION
   You agree to participate in the parenting agreement process in good faith, with the primary goal of developing arrangements that serve the best interests of your child(ren).

2. MEDIATION ACKNOWLEDGEMENT
   If disagreements arise that cannot be resolved directly, you agree to consider mediation before pursuing litigation. The platform may recommend mediation resources, but you are not obligated to use any specific service.

3. LEGAL ADVICE
   The Platform provides a framework for creating parenting agreements but does not provide legal advice. You are encouraged to consult with an attorney regarding the legal implications of your parenting arrangements.

4. ACCURACY OF INFORMATION
   You agree to provide accurate information throughout the process. Falsifying information may invalidate agreements reached through the Platform.

5. COLLABORATIVE APPROACH
   You acknowledge that successful co-parenting requires a collaborative approach, and you commit to working with your co-parent with respect and consideration.

6. NO GUARANTEE
   While the Platform is designed to facilitate productive co-parenting arrangements, we cannot guarantee specific outcomes or that agreements reached will be recognized by courts without formal legal procedures.

7. ACKNOWLEDGEMENT
   By signing these Terms, you acknowledge that you have read, understood, and agree to be bound by these conditions while using the Platform.`
    },
    {
      id: "mediation",
      title: "Mediation Agreement",
      description: "Agreement to use mediation to resolve disputes before resorting to litigation.",
      signed: false,
      signedDate: null,
      content: `MEDIATION AGREEMENT

This Mediation Agreement (the "Agreement") establishes guidelines for dispute resolution between co-parents using the Resolve Parenting Agreement Platform.

1. COMMITMENT TO MEDIATION
   You agree to attempt mediation before initiating court proceedings for disputes related to your parenting arrangements, except in cases of emergency or where safety is at risk.

2. MEDIATOR SELECTION
   Both parents must agree on the selection of a qualified family mediator. The Platform may provide a list of recommended mediators, but you are free to select any qualified professional.

3. MEDIATION PROCESS
   Mediation sessions will be scheduled at mutually convenient times. Both parties agree to:
   a) Participate fully and honestly in the process
   b) Provide all information relevant to the dispute
   c) Consider the mediator's recommendations in good faith
   d) Focus on the best interests of the child(ren)

4. COSTS
   Unless otherwise agreed, mediation costs will be shared equally between both parents.

5. CONFIDENTIALITY
   Discussions during mediation sessions will remain confidential to the extent permitted by law, with exceptions for information related to child abuse or threats of harm.

6. OUTCOME
   You understand that mediation is non-binding unless both parties agree to the terms reached and formalize them appropriately.

7. ACKNOWLEDGEMENT
   By signing this Agreement, you acknowledge your commitment to attempt mediation before litigation for co-parenting disputes.`
    }
  ]);
  
  const [activeWaiver, setActiveWaiver] = useState<Waiver | null>(null);
  
  const handleSignWaiver = (waiverId: string) => {
    setWaivers(waivers.map(waiver => 
      waiver.id === waiverId 
        ? {...waiver, signed: true, signedDate: new Date()} 
        : waiver
    ));
    
    toast({
      title: "Agreement Signed",
      description: "Thank you for signing this agreement."
    });
    
    // Close the active waiver view
    setActiveWaiver(null);
  };
  
  const allSigned = waivers.every(waiver => waiver.signed);
  
  const handleComplete = () => {
    if (allSigned) {
      toast({
        title: "All Agreements Completed",
        description: "Thank you for reviewing and signing all the necessary agreements."
      });
      navigate('/');
    } else {
      toast({
        title: "Agreements Required",
        description: "Please sign all agreements before continuing.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-[#f9f7fe]">
      <NavigationMenu />
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="text-[#2e1a87] hover:text-[#2e1a87]/80 hover:bg-[#f5f0ff]"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        
        {activeWaiver ? (
          <div className="bg-white rounded-xl border border-[#6c54da]/20 p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#2e1a87]">{activeWaiver.title}</h2>
              <p className="text-gray-600 text-sm mt-1">{activeWaiver.description}</p>
            </div>
            
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-5 mb-6 overflow-y-auto h-96 whitespace-pre-line text-sm">
              {activeWaiver.content}
            </div>
            
            <div className="flex items-start space-x-2 mb-6">
              <Checkbox 
                id={`sign-${activeWaiver.id}`} 
                checked={activeWaiver.signed}
                onCheckedChange={() => handleSignWaiver(activeWaiver.id)}
                className="mt-1"
              />
              <div>
                <label
                  htmlFor={`sign-${activeWaiver.id}`}
                  className="text-sm font-medium"
                >
                  I have read and agree to the terms of this agreement
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  By checking this box, you agree to be bound by the terms of this agreement.
                </p>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setActiveWaiver(null)}
              >
                Back to Agreements
              </Button>
              <Button 
                variant={activeWaiver.signed ? "default" : "outline"}
                className={activeWaiver.signed ? "bg-[#2e1a87] hover:bg-[#25156d]" : ""}
                onClick={() => activeWaiver.signed 
                  ? setActiveWaiver(null) 
                  : handleSignWaiver(activeWaiver.id)
                }
              >
                {activeWaiver.signed ? "Continue" : "Sign Agreement"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#6c54da]/20 p-6 shadow-sm">
              <div className="flex items-start gap-3 mb-5">
                <div className="bg-[#f5f0ff] p-2 rounded-md">
                  <FileText className="h-5 w-5 text-[#6c54da]" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-[#2e1a87]">Waivers & Agreements</h1>
                  <p className="text-gray-600 text-sm mt-1">
                    Please review and sign the following agreements before proceeding with your parenting plan.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <Info className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-sm text-blue-700">
                    These agreements establish the framework for your participation on the Resolve platform. 
                    Please read each document carefully before signing.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                {waivers.map((waiver) => (
                  <div 
                    key={waiver.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:border-[#6c54da]/30 hover:shadow-sm transition-all cursor-pointer"
                    onClick={() => setActiveWaiver(waiver)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mt-0.5 ${
                          waiver.signed 
                            ? "bg-green-100 text-green-600" 
                            : "bg-gray-100 text-gray-400"
                        }`}>
                          {waiver.signed 
                            ? <CheckCircle className="h-4 w-4" /> 
                            : <FileText className="h-4 w-4" />
                          }
                        </div>
                        <div>
                          <h3 className="text-[#2e1a87] font-medium">{waiver.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{waiver.description}</p>
                        </div>
                      </div>
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                        waiver.signed 
                          ? "bg-green-100 text-green-600" 
                          : "bg-amber-100 text-amber-600"
                      }`}>
                        {waiver.signed ? "Signed" : "Unsigned"}
                      </div>
                    </div>
                    
                    {waiver.signed && (
                      <div className="mt-3 ml-11 text-xs text-gray-500">
                        Signed on {waiver.signedDate?.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between">
                <Button 
                  variant="ghost" 
                  className="text-[#2e1a87]"
                  onClick={() => navigate('/')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
                <Button 
                  className={`${allSigned 
                    ? "bg-[#2e1a87] hover:bg-[#25156d]" 
                    : "bg-gray-300 hover:bg-gray-300 cursor-not-allowed"
                  }`}
                  onClick={handleComplete}
                  disabled={!allSigned}
                >
                  Complete
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              
              {!allSigned && (
                <p className="text-center text-amber-600 text-xs mt-3">
                  Please sign all agreements before continuing
                </p>
              )}
            </div>
            
            <div className="bg-white rounded-xl border border-[#6c54da]/20 p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="bg-[#f5f0ff] p-2 rounded-md">
                  <Check className="h-5 w-5 text-[#6c54da]" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-[#2e1a87]">Progress</h2>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Confidentiality Agreement</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        waivers[0].signed 
                          ? "bg-green-100 text-green-600" 
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {waivers[0].signed ? "Completed" : "Pending"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Terms & Conditions</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        waivers[1].signed 
                          ? "bg-green-100 text-green-600" 
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {waivers[1].signed ? "Completed" : "Pending"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Mediation Agreement</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        waivers[2].signed 
                          ? "bg-green-100 text-green-600" 
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {waivers[2].signed ? "Completed" : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}