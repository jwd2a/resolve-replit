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
      <div className="max-w-2xl mx-auto px-4 md:px-6 pb-32 pt-6 md:pt-12 space-y-6 md:space-y-8">

        {/* Greeting */}
        <div className="text-center space-y-3 md:space-y-4">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">Hi {userName} 👋</h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-lg mx-auto">
            Let's finish setting up {child.name}'s (age {child.age}) parenting plan together.
          </p>
        </div>

        {/* You're Ready Box */}
        <Card className="border-0 shadow-lg bg-green-50 border-green-200">
          <CardContent className="space-y-4 py-6 md:py-8 px-6 md:px-8">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 md:h-7 md:w-7 text-green-600" />
              <p className="text-green-800 font-semibold text-base md:text-lg">Family Profile Complete</p>
            </div>
            <p className="text-green-700 text-sm md:text-base leading-relaxed">
              You've set up your family and unlocked the course. Great job!
            </p>
            <Button variant="link" size="sm" className="text-green-700 hover:text-green-800 p-0 h-auto text-sm md:text-base">
              Review Family Info →
            </Button>
          </CardContent>
        </Card>

        {/* Co-Parent Status */}
        <Card className="border-0 shadow-lg">
          <CardContent className="space-y-6 py-6 md:py-8 px-6 md:px-8">
            <div>
              <p className="font-semibold text-gray-900 text-base md:text-lg mb-2">Co-Parent</p>
              <p className="text-gray-600 text-sm md:text-base">{coParent.name}</p>
              <p className="text-gray-500 text-xs md:text-sm">{coParent.email}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700 text-sm md:text-base font-medium">Invite Status</span>
                {coParent.inviteSent ? (
                  <span className="text-green-700 flex items-center gap-2 text-sm md:text-base font-medium">
                    <CheckCircle size={18}/> Sent
                  </span>
                ) : (
                  <Button size="sm" variant="outline" className="text-xs md:text-sm">
                    <UserPlus size={14} className="mr-1" /> Send Invite
                  </Button>
                )}
              </div>

              <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700 text-sm md:text-base font-medium">Waiver Status</span>
                {coParent.waiverSigned ? (
                  <span className="text-green-700 flex items-center gap-2 text-sm md:text-base font-medium">
                    <CheckCircle size={18}/> Signed
                  </span>
                ) : (
                  <span className="text-amber-600 flex items-center gap-2 text-sm md:text-base font-medium">
                    <Clock size={18}/> Pending
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Waiver Summary */}
        <Card className="border-0 shadow-lg">
          <CardContent className="space-y-6 py-6 md:py-8 px-6 md:px-8">
            <p className="font-semibold text-gray-900 text-base md:text-lg">Waivers & Acknowledgments</p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700 text-sm md:text-base font-medium">You</span>
                {userWaiverSigned ? (
                  <span className="text-green-700 text-sm md:text-base font-medium">Signed</span>
                ) : (
                  <Button size="sm" className="text-xs md:text-sm">Sign Waiver</Button>
                )}
              </div>
              
              <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700 text-sm md:text-base font-medium">{coParent.name}</span>
                {coParent.waiverSigned ? (
                  <span className="text-green-700 text-sm md:text-base font-medium">Signed</span>
                ) : (
                  <span className="text-amber-600 text-sm md:text-base font-medium">Pending</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment */}
        <Card className="border-0 shadow-lg">
          <CardContent className="space-y-4 py-6 md:py-8 px-6 md:px-8">
            <p className="font-semibold text-gray-900 text-base md:text-lg">Payment</p>
            {paymentComplete ? (
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-6 w-6 md:h-7 md:w-7 text-green-600" />
                <p className="text-green-700 text-sm md:text-base">Payment processed. Full access granted.</p>
              </div>
            ) : (
              <Button className="w-full py-3 text-base">Make Payment</Button>
            )}
          </CardContent>
        </Card>

        {/* Progress Waiting State */}
        {!coParent.waiverSigned && (
          <Card className="border-0 shadow-lg bg-blue-50 border-blue-200">
            <CardContent className="text-center py-8 md:py-10 px-6 md:px-8 space-y-4">
              <Clock className="h-10 w-10 md:h-12 md:w-12 text-blue-600 mx-auto" />
              <div>
                <p className="font-semibold text-blue-900 text-lg md:text-xl mb-3">
                  Waiting for {coParent.name}
                </p>
                <p className="text-blue-700 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                  Once {coParent.name} signs their waiver, you can both start building {child.name}'s parenting plan together.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom CTA - Responsive */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:relative md:border-0 md:bg-transparent">
        <div className="max-w-2xl mx-auto px-4 md:px-6 py-4 md:py-8">
          <Button 
            className={`w-full text-base md:text-lg py-4 md:py-5 ${
              coParent.waiverSigned 
                ? 'bg-[#2e1a87] hover:bg-[#3d2a9b] text-white shadow-lg' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            size="lg" 
            disabled={!coParent.waiverSigned}
          >
            {nextAction}
          </Button>
        </div>
      </div>
    </div>
  );
}