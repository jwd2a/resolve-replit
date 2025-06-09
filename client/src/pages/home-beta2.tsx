import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, UserPlus } from "lucide-react";

export default function HomeBeta2() {
  // Sample data (use props/context in production)
  const userName = "Eric";
  const child = { name: "Ava", age: 8 };
  const coParent = { name: "Alex Jordan", email: "alex@email.com", inviteSent: true, waiverSigned: false };
  const userWaiverSigned = true;
  const paymentComplete = true;

  const allReady = coParent.waiverSigned && userWaiverSigned && paymentComplete;
  const nextActionText = allReady ? "Begin Ava's Parenting Plan" : coParent.waiverSigned ? "Start Course" : "Waiting on Alex to Sign";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 pb-28 pt-6 space-y-5">

        {/* Header Greeting */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-[#2e1a87] mb-1">Hi {userName},</h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Let's finish setting up {child.name}'s parenting plan (age {child.age}).
          </p>
        </div>

        {/* Profile Status */}
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

        {/* Co-Parent Status */}
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

        {/* Waiver Summary */}
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

        {/* Payment Section */}
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

        {/* Waiting Message - Only show if not all ready */}
        {!allReady && (
          <div className="text-center py-6">
            <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-[#2e1a87]" />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {!coParent.waiverSigned ? 
                `Waiting for ${coParent.name} to sign their waiver` :
                'Getting everything ready for you...'
              }
            </p>
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg">
        <div className="max-w-md mx-auto">
          <Button 
            className={`w-full text-sm py-3 font-medium ${
              allReady 
                ? 'bg-[#2e1a87] hover:bg-[#3d2a9b] text-white' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            size="lg" 
            disabled={!allReady}
          >
            {nextActionText}
          </Button>
        </div>
      </div>
    </div>
  );
}