import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, UserPlus, Home, BookOpen, FileText, HelpCircle } from "lucide-react";

export default function HomeBeta2() {
  // Sample data (use props/context in production)
  const userName = "Eric";
  const child = { name: "Ava", age: 8 };
  const coParent = { name: "Alex Jordan", email: "alex@email.com", inviteSent: true, waiverSigned: false };
  const userWaiverSigned = true;
  const paymentComplete = true;

  const nextAction = coParent.waiverSigned ? "Begin Ava's Plan" : "Wait for Alex to Sign";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Main Content */}
      <div className="max-w-sm mx-auto px-4 pb-32 pt-6 space-y-6">

        {/* Greeting */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Hi {userName} 👋</h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Let's finish setting up {child.name}'s (age {child.age}) parenting plan together.
          </p>
        </div>

        {/* You're Ready Box */}
        <Card className="border-0 shadow-lg bg-green-50 border-green-200">
          <CardContent className="space-y-3 py-5 px-5">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-green-800 font-semibold text-base">Family Profile Complete</p>
            </div>
            <p className="text-green-700 text-sm leading-relaxed">
              You've set up your family and unlocked the course. Great job!
            </p>
            <Button variant="link" size="sm" className="text-green-700 hover:text-green-800 p-0 h-auto text-sm">
              Review Family Info →
            </Button>
          </CardContent>
        </Card>

        {/* Co-Parent Status */}
        <Card className="border-0 shadow-lg">
          <CardContent className="space-y-4 py-5 px-5">
            <div>
              <p className="font-semibold text-gray-900 text-base mb-1">Co-Parent</p>
              <p className="text-gray-600 text-sm">{coParent.name}</p>
              <p className="text-gray-500 text-xs">{coParent.email}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700 text-sm">Invite Status</span>
                {coParent.inviteSent ? (
                  <span className="text-green-700 flex items-center gap-2 text-sm font-medium">
                    <CheckCircle size={16}/> Sent
                  </span>
                ) : (
                  <Button size="sm" variant="outline" className="text-xs">
                    <UserPlus size={14} className="mr-1" /> Send Invite
                  </Button>
                )}
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700 text-sm">Waiver Status</span>
                {coParent.waiverSigned ? (
                  <span className="text-green-700 flex items-center gap-2 text-sm font-medium">
                    <CheckCircle size={16}/> Signed
                  </span>
                ) : (
                  <span className="text-amber-600 flex items-center gap-2 text-sm font-medium">
                    <Clock size={16}/> Pending
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Waiver Summary */}
        <Card className="border-0 shadow-lg">
          <CardContent className="space-y-4 py-5 px-5">
            <p className="font-semibold text-gray-900 text-base">Waivers & Acknowledgments</p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700 text-sm">You</span>
                {userWaiverSigned ? (
                  <span className="text-green-700 text-sm font-medium">Signed</span>
                ) : (
                  <Button size="sm" className="text-xs">Sign Waiver</Button>
                )}
              </div>
              
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700 text-sm">{coParent.name}</span>
                {coParent.waiverSigned ? (
                  <span className="text-green-700 text-sm font-medium">Signed</span>
                ) : (
                  <span className="text-amber-600 text-sm font-medium">Pending</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment */}
        <Card className="border-0 shadow-lg">
          <CardContent className="space-y-3 py-5 px-5">
            <p className="font-semibold text-gray-900 text-base">Payment</p>
            {paymentComplete ? (
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-green-700 text-sm">Payment processed. Full access granted.</p>
              </div>
            ) : (
              <Button className="w-full">Make Payment</Button>
            )}
          </CardContent>
        </Card>

        {/* Progress Waiting State */}
        {!coParent.waiverSigned && (
          <Card className="border-0 shadow-lg bg-blue-50 border-blue-200">
            <CardContent className="text-center py-6 px-5 space-y-3">
              <Clock className="h-8 w-8 text-blue-600 mx-auto" />
              <div>
                <p className="font-semibold text-blue-900 text-base mb-2">
                  Waiting for {coParent.name}
                </p>
                <p className="text-blue-700 text-sm leading-relaxed">
                  Once {coParent.name} signs their waiver, you can both start building {child.name}'s parenting plan together.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        {/* Sticky CTA */}
        <div className="max-w-sm mx-auto px-4 py-3">
          <Button 
            className={`w-full text-base py-3 ${
              coParent.waiverSigned 
                ? 'bg-[#2e1a87] hover:bg-[#3d2a9b] text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            size="lg" 
            disabled={!coParent.waiverSigned}
          >
            {nextAction}
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="border-t border-gray-100">
          <div className="max-w-sm mx-auto flex justify-around py-2">
            <button className="flex flex-col items-center space-y-1 py-2 px-3 text-[#2e1a87]">
              <Home size={20} />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400">
              <BookOpen size={20} />
              <span className="text-xs">Course</span>
            </button>
            <button className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400">
              <FileText size={20} />
              <span className="text-xs">Plan</span>
            </button>
            <button className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400">
              <HelpCircle size={20} />
              <span className="text-xs">Resources</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}