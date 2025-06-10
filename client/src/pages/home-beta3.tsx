import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, ChevronDown, User, Users, FileText, CreditCard } from "lucide-react";

export default function HomeBeta3() {
  // Sample state data (in production, these come from user context or props)
  const userName = "Eric";
  const child = { name: "Ava", age: 8 };
  const coParent = { name: "Alex Jordan", email: "alex@email.com", inviteSent: true, waiverSigned: false };
  const userWaiverSigned = true;
  const paymentComplete = true;
  const familyInfoComplete = true;

  const stepsComplete = [familyInfoComplete, coParent.inviteSent, userWaiverSigned && coParent.waiverSigned, paymentComplete].filter(Boolean).length;
  const allReady = stepsComplete === 4;

  const familyRef = useRef<HTMLDivElement>(null);
  const coParentRef = useRef<HTMLDivElement>(null);
  const waiverRef = useRef<HTMLDivElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => ref.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="max-w-sm mx-auto px-4 pb-24 pt-6 text-sm text-gray-800 space-y-5">

      {/* Header Greeting */}
      <div className="text-center">
        <h1 className="text-xl font-bold text-[#2e1a87] mb-1">Hi {userName},</h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          Let's finish setting up {child.name}'s parenting plan (age {child.age}).
        </p>
      </div>

      {/* Progress Module */}
      <Card className="border-0 shadow-sm">
        <CardContent className="py-4">
          <p className="font-semibold mb-3 text-[#2e1a87]">Progress: {stepsComplete}/4 Steps Complete</p>

          <ul className="space-y-3">
            <li 
              className="flex justify-between items-center cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors" 
              onClick={() => scrollTo(familyRef)}
            >
              <div className="flex items-center gap-2">
                <User size={16} className="text-gray-500" />
                <span>Family Info</span>
              </div>
              {familyInfoComplete ? 
                <CheckCircle className="text-green-600" size={16}/> : 
                <Clock className="text-amber-600" size={16}/>
              }
            </li>
            <li 
              className="flex justify-between items-center cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors" 
              onClick={() => scrollTo(coParentRef)}
            >
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-500" />
                <span>Co-Parent</span>
              </div>
              {coParent.inviteSent ? 
                <CheckCircle className="text-green-600" size={16}/> : 
                <Clock className="text-amber-600" size={16}/>
              }
            </li>
            <li 
              className="flex justify-between items-center cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors" 
              onClick={() => scrollTo(waiverRef)}
            >
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-gray-500" />
                <span>Waivers</span>
              </div>
              {(userWaiverSigned && coParent.waiverSigned) ? 
                <CheckCircle className="text-green-600" size={16}/> : 
                <Clock className="text-amber-600" size={16}/>
              }
            </li>
            <li 
              className="flex justify-between items-center cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors" 
              onClick={() => scrollTo(paymentRef)}
            >
              <div className="flex items-center gap-2">
                <CreditCard size={16} className="text-gray-500" />
                <span>Payment</span>
              </div>
              {paymentComplete ? 
                <CheckCircle className="text-green-600" size={16}/> : 
                <Clock className="text-amber-600" size={16}/>
              }
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Next Step Message */}
      <Card className="border-0 shadow-sm">
        <CardContent className="py-4">
          {allReady ? (
            <>
              <p className="text-green-700 font-medium mb-3">You're all set!</p>
              <p className="text-gray-600 text-xs mb-3">All requirements completed. Ready to begin {child.name}'s parenting plan.</p>
              <Button className="w-full bg-[#2e1a87] hover:bg-[#3d2a9b] text-white">Start Course</Button>
            </>
          ) : (
            <>
              <p className="text-[#2e1a87] font-medium mb-2">
                Next Step: {coParent.waiverSigned ? "Review your info and begin" : `Waiting for ${coParent.name} to sign their waiver`}
              </p>
              <p className="text-gray-600 text-xs mb-3">
                {!coParent.waiverSigned && `We've sent ${coParent.name} an invitation to complete their waiver.`}
              </p>
              {!coParent.waiverSigned && (
                <Button variant="outline" size="sm" className="w-full border-[#2e1a87] text-[#2e1a87] hover:bg-[#2e1a87] hover:text-white">
                  Resend Invite
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Family Info Section */}
      <div ref={familyRef}>
        <Card className="border-0 shadow-sm">
          <CardContent className="py-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900 text-sm">Your Profile</span>
              <span className="text-green-600 flex items-center gap-1 text-sm">
                <CheckCircle size={16}/> Complete
              </span>
            </div>
            <p className="text-gray-600 text-xs">Family info entered and course unlocked.</p>
            <Button variant="link" size="sm" className="text-[#2e1a87] hover:text-[#3d2a9b] p-0 h-auto text-xs">
              Review Info
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Co-Parent Section */}
      <div ref={coParentRef}>
        <Card className="border-0 shadow-sm">
          <CardContent className="py-4 space-y-3">
            <p className="font-medium text-gray-900 text-sm">Co-Parent: {coParent.name}</p>
            <p className="text-gray-500 text-xs">{coParent.email}</p>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Invite</span>
                {coParent.inviteSent ? (
                  <span className="text-green-600 text-sm font-medium">Sent</span>
                ) : (
                  <Button size="sm" className="text-xs">Send</Button>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Waiver</span>
                {coParent.waiverSigned ? (
                  <span className="text-green-600 flex items-center gap-1 text-sm font-medium">
                    <CheckCircle size={16}/> Signed
                  </span>
                ) : (
                  <span className="text-amber-600 flex items-center gap-1 text-sm font-medium">
                    <Clock size={16}/> Pending
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Waivers Section */}
      <div ref={waiverRef}>
        <Card className="border-0 shadow-sm">
          <CardContent className="py-4 space-y-3">
            <p className="font-medium text-gray-900 text-sm">Waivers</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">You</span>
                {userWaiverSigned ? (
                  <span className="text-green-600 text-sm font-medium">Signed</span>
                ) : (
                  <Button size="sm" className="text-xs">Sign Now</Button>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{coParent.name}</span>
                {coParent.waiverSigned ? (
                  <span className="text-green-600 text-sm font-medium">Signed</span>
                ) : (
                  <span className="text-amber-600 text-sm font-medium">Pending</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Section */}
      <div ref={paymentRef}>
        <Card className="border-0 shadow-sm">
          <CardContent className="py-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900 text-sm">Payment</span>
              {paymentComplete ? (
                <span className="text-green-600 text-sm font-medium">Processed</span>
              ) : (
                <Button size="sm" className="text-xs">Pay Now</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sticky Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
        <div className="max-w-sm mx-auto">
          <Button 
            className={`w-full text-sm py-3 font-medium ${
              allReady 
                ? 'bg-[#2e1a87] hover:bg-[#3d2a9b] text-white' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            size="lg" 
            disabled={!allReady}
          >
            {allReady ? "Start Course" : `Waiting for ${coParent.name}`}
          </Button>
        </div>
      </div>

    </div>
  );
}