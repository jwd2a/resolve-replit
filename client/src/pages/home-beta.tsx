import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Send, Clock, Star } from "lucide-react";

export default function HomeBeta() {
  const coParentName = "Alex Jordan";
  const coParentEmail = "alex@email.com";
  const coParentInviteSent = true;
  const coParentWaiverSigned = false;
  const userWaiverSigned = true;
  const familyInfoComplete = true;
  const paymentComplete = true;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 text-lg">
            Let's continue building your parenting plan together
          </p>
        </div>

        {/* Section 1: Your Part Is Ready */}
        <Card className="border-0 shadow-lg bg-green-50 border-green-200">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-green-900">You're Ready to Begin</h2>
                <p className="text-green-700">
                  You've set up your family profile and unlocked the course. Great work!
                </p>
              </div>
            </div>
            <div className="pt-2">
              <Button variant="link" size="sm" className="text-green-700 hover:text-green-800 p-0">
                Review Family Info →
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Co-Parent Status */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  {coParentName.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Co-Parent: {coParentName}</h2>
                <p className="text-gray-600">{coParentEmail}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Invite Status</span>
                  {coParentInviteSent ? (
                    <span className="flex items-center text-green-600 font-medium">
                      <CheckCircle size={18} className="mr-2" /> 
                      Invite Sent
                    </span>
                  ) : (
                    <Button size="sm" variant="outline" className="text-blue-600 border-blue-300">
                      <Send size={16} className="mr-2" /> 
                      Send Invite
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Waiver Status</span>
                  {coParentWaiverSigned ? (
                    <span className="flex items-center text-green-600 font-medium">
                      <CheckCircle size={18} className="mr-2" /> 
                      Signed
                    </span>
                  ) : (
                    <span className="flex items-center text-amber-600 font-medium">
                      <Clock size={18} className="mr-2" /> 
                      Pending
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Waiver Summary */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Waivers & Acknowledgments</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">You</span>
                    <p className="text-sm text-gray-600">Waiver signed and acknowledged</p>
                  </div>
                </div>
                {userWaiverSigned ? (
                  <Button variant="link" size="sm" className="text-blue-600">
                    View Document
                  </Button>
                ) : (
                  <Button size="sm" className="bg-[#2e1a87] hover:bg-[#3d2a9b] text-white">
                    Sign Waiver
                  </Button>
                )}
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    coParentWaiverSigned ? 'bg-green-100' : 'bg-amber-100'
                  }`}>
                    {coParentWaiverSigned ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Clock className="h-5 w-5 text-amber-600" />
                    )}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">{coParentName}</span>
                    <p className="text-sm text-gray-600">
                      {coParentWaiverSigned ? 'Waiver signed and acknowledged' : 'Waiting for waiver signature'}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  coParentWaiverSigned 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {coParentWaiverSigned ? 'Signed' : 'Pending'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Payment */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Payment</h2>
            
            {paymentComplete ? (
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-800">Payment processed successfully</p>
                  <p className="text-sm text-green-600">You have full access to the course</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <p className="font-medium text-blue-900">Complete your payment to unlock the course</p>
                  <p className="text-sm text-blue-600">Secure payment processed through Stripe</p>
                </div>
                <Button className="bg-[#2e1a87] hover:bg-[#3d2a9b] text-white">
                  Make Payment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Steps */}
        {coParentWaiverSigned && userWaiverSigned && paymentComplete && (
          <Card className="border-0 shadow-lg bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Ready to Start Your Course!</h3>
                <p className="text-blue-700 mb-4">
                  Both you and {coParentName} have completed all requirements. Time to begin building your parenting plan together.
                </p>
                <Button className="bg-[#2e1a87] hover:bg-[#3d2a9b] text-white px-8">
                  Start Course
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}