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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 pb-32 pt-8 md:pt-16 space-y-8 md:space-y-12">

        {/* Greeting */}
        <div className="text-center space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#2e1a87] via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Building {child.name}'s Future
          </h1>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Hi {userName}, let's complete your parenting plan setup together. {child.name} (age {child.age}) deserves the best.
          </p>
        </div>

        {/* Progress Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* You're Ready Card */}
          <Card className="border-0 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="h-32 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-4 right-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="w-8 h-8 bg-white/30 rounded-lg"></div>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">You're All Set</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Family profile complete and course unlocked. Ready to start!
              </p>
              <Button variant="link" className="text-green-600 hover:text-green-700 p-0 h-auto text-sm font-medium">
                Review Profile →
              </Button>
            </CardContent>
          </Card>

          {/* Co-Parent Status Card */}
          <Card className="border-0 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="h-32 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-4 right-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  {coParent.waiverSigned ? (
                    <CheckCircle className="h-6 w-6 text-white" />
                  ) : (
                    <Clock className="h-6 w-6 text-white" />
                  )}
                </div>
              </div>
              <div className="absolute bottom-4 left-4 flex space-x-2">
                <div className="w-6 h-6 bg-white/30 rounded-full"></div>
                <div className="w-6 h-6 bg-white/20 rounded-full"></div>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Co-Parent: {coParent.name}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Invite</span>
                  <span className="text-sm font-medium text-green-600">Sent</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Waiver</span>
                  <span className={`text-sm font-medium ${coParent.waiverSigned ? 'text-green-600' : 'text-amber-600'}`}>
                    {coParent.waiverSigned ? 'Signed' : 'Pending'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Status Card */}
          <Card className="border-0 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="h-32 bg-gradient-to-br from-violet-400 via-purple-500 to-pink-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-4 right-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="w-8 h-2 bg-white/30 rounded-full"></div>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Payment Complete</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Full access granted. Ready to begin your journey.
              </p>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">Processed</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Waiver Details Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Waiver Progress</h2>
            <p className="text-gray-600">Both parents need to complete waivers before starting</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Your Waiver */}
            <Card className="border-0 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="h-24 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-3 right-3">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="absolute bottom-3 left-3">
                  <div className="text-white font-semibold text-lg">You</div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Waiver Complete</h3>
                    <p className="text-green-600 text-sm font-medium">Signed & Acknowledged</p>
                  </div>
                  <Button variant="link" className="text-green-600 text-sm">
                    View →
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Co-Parent Waiver */}
            <Card className="border-0 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className={`h-24 bg-gradient-to-br ${coParent.waiverSigned ? 'from-green-400 via-emerald-500 to-teal-600' : 'from-amber-400 via-orange-500 to-red-500'} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-3 right-3">
                  {coParent.waiverSigned ? (
                    <CheckCircle className="h-6 w-6 text-white" />
                  ) : (
                    <Clock className="h-6 w-6 text-white" />
                  )}
                </div>
                <div className="absolute bottom-3 left-3">
                  <div className="text-white font-semibold text-lg">{coParent.name}</div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {coParent.waiverSigned ? 'Waiver Complete' : 'Waiver Pending'}
                    </h3>
                    <p className={`text-sm font-medium ${coParent.waiverSigned ? 'text-green-600' : 'text-amber-600'}`}>
                      {coParent.waiverSigned ? 'Signed & Acknowledged' : 'Waiting for signature'}
                    </p>
                  </div>
                  {coParent.waiverSigned && (
                    <Button variant="link" className="text-green-600 text-sm">
                      View →
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Next Steps Section */}
        {!coParent.waiverSigned ? (
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-4 right-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 flex space-x-2">
                <div className="w-8 h-8 bg-white/30 rounded-full animate-pulse"></div>
                <div className="w-8 h-8 bg-white/20 rounded-full animate-pulse delay-75"></div>
                <div className="w-8 h-8 bg-white/10 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Waiting for {coParent.name}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-md mx-auto mb-6">
                Once {coParent.name} signs their waiver, you can both start building {child.name}'s parenting plan together.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Waiting for response</span>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-4 right-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="text-white font-bold text-2xl">🎉</div>
              </div>
            </div>
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Ready to Begin!
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-md mx-auto mb-6">
                Both parents have completed all requirements. Time to start building {child.name}'s parenting plan together.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom CTA - Responsive */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 md:relative md:border-0 md:bg-transparent md:backdrop-blur-none">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 md:py-8">
          <Button 
            className={`w-full text-base md:text-lg py-4 md:py-6 font-semibold rounded-xl shadow-lg transition-all duration-300 ${
              coParent.waiverSigned 
                ? 'bg-gradient-to-r from-[#2e1a87] via-purple-600 to-blue-600 hover:from-[#3d2a9b] hover:via-purple-700 hover:to-blue-700 text-white shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02]' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
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