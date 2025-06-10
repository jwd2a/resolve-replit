import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Home, Users, FileText, CreditCard, Check, Menu, X } from "lucide-react";

export default function HomeBeta3() {
  const userName = "Eric";
  const child = { name: "Ava", age: 8 };
  const coParent = { name: "Alex Jordan", email: "alex@email.com", inviteSent: true, waiverSigned: false };
  const userWaiverSigned = true;
  const paymentComplete = true;
  const familyInfoComplete = true;
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stepsComplete = [familyInfoComplete, coParent.inviteSent, userWaiverSigned && coParent.waiverSigned, paymentComplete].filter(Boolean).length;
  const allReady = stepsComplete === 4;

  const familyRef = useRef<HTMLDivElement>(null);
  const coParentRef = useRef<HTMLDivElement>(null);
  const waiverRef = useRef<HTMLDivElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => ref.current?.scrollIntoView({ behavior: 'smooth' });

  // Step data matching the reference design
  const steps = [
    {
      id: "family-info",
      label: "Family Info",
      icon: <Home className="h-6 w-6" />,
      completed: familyInfoComplete,
      ref: familyRef
    },
    {
      id: "co-parent",
      label: "Co-Parent",
      icon: <Users className="h-6 w-6" />,
      completed: coParent.inviteSent,
      ref: coParentRef
    },
    {
      id: "waivers",
      label: "Waivers",
      icon: <FileText className="h-6 w-6" />,
      completed: userWaiverSigned && coParent.waiverSigned,
      ref: waiverRef
    },
    {
      id: "payment",
      label: "Payment",
      icon: <CreditCard className="h-6 w-6" />,
      completed: paymentComplete,
      ref: paymentRef
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-[#2e1a87] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-xl font-bold">Resolve</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white/80 hover:text-white text-sm font-medium">HOME</a>
              <a href="#" className="text-white/80 hover:text-white text-sm font-medium">COURSE</a>
              <a href="#" className="text-white/80 hover:text-white text-sm font-medium">PARENTING PLAN</a>
              <a href="#" className="text-white/80 hover:text-white text-sm font-medium">RESOURCES</a>
              <div className="flex items-center space-x-4 ml-8">
                <a href="#" className="text-white/80 hover:text-white text-sm font-medium">OTHER STUFF</a>
                <Button variant="ghost" size="sm" className="text-white border-white/20 hover:bg-white/10">
                  Login
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:bg-white/10"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#2e1a87] border-t border-white/20">
            <div className="px-4 py-4 space-y-3">
              <a href="#" className="block text-white/80 hover:text-white text-sm font-medium">HOME</a>
              <a href="#" className="block text-white/80 hover:text-white text-sm font-medium">COURSE</a>
              <a href="#" className="block text-white/80 hover:text-white text-sm font-medium">PARENTING PLAN</a>
              <a href="#" className="block text-white/80 hover:text-white text-sm font-medium">RESOURCES</a>
              <a href="#" className="block text-white/80 hover:text-white text-sm font-medium">OTHER STUFF</a>
              <Button variant="ghost" size="sm" className="text-white border-white/20 hover:bg-white/10 w-full justify-start">
                Login
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome banner - Mobile vs Desktop */}
        <div className="rounded-lg bg-gradient-to-br from-[#2e1a87] to-[#4936c2] text-white relative overflow-hidden mb-6">
          {/* Background decorative element */}
          <div className="absolute right-0 bottom-0 w-48 h-48 bg-indigo-500/10 rounded-full -mr-16 -mb-16"></div>
          
          {/* Desktop Layout */}
          <div className="hidden md:block py-6 px-6">
            <div className="relative z-10">
              {/* Title section */}
              <div className="mb-6">
                <h1 className="text-xl font-semibold mb-2">Welcome to Your Family's Parenting Plan</h1>
                <p className="text-white/80 text-sm">
                  To begin your course, please complete the steps below.
                </p>
              </div>
              
              {/* Progress indicators and Start Course button */}
              <div className="flex items-center justify-between gap-6">
                {/* Step badges */}
                <div className="flex items-center space-x-12">
                  {steps.map((step) => (
                    <div 
                      key={step.id} 
                      className="flex flex-col items-center cursor-pointer py-2" 
                      onClick={() => scrollTo(step.ref)}
                    >
                      <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 mb-2
                        ${step.completed 
                          ? "bg-[#2e1a87] text-white border border-white/20 shadow-md" 
                          : "bg-white/30 text-white border-[1.5px] border-white/60 shadow-sm"
                        }`}
                      >
                        {step.completed && (
                          <div className="absolute -top-1 -left-1 w-[14px] h-[14px] bg-green-500 rounded-full flex items-center justify-center z-20">
                            <Check className="h-2.5 w-2.5 text-white" />
                          </div>
                        )}
                        <div className={`w-6 h-6 ${!step.completed ? "opacity-80" : ""}`}>
                          {step.icon}
                        </div>
                      </div>
                      <span className="text-xs text-white text-center whitespace-nowrap font-medium">
                        {step.label}
                      </span>
                      <span className={`text-[10px] mt-0.5 text-center whitespace-nowrap
                        ${step.completed 
                          ? "text-white/90 font-medium" 
                          : "text-white/75"
                        }`}
                      >
                        {step.completed ? "Completed" : "Pending"}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Start Course button */}
                <div className="flex-shrink-0">
                  <Button 
                    className={`px-6 py-2 text-sm font-medium transition-all duration-200 ${
                      allReady 
                        ? 'bg-white text-[#2e1a87] hover:bg-gray-100 shadow-lg' 
                        : 'bg-white/20 text-white/60 cursor-not-allowed border border-white/30'
                    }`}
                    disabled={!allReady}
                  >
                    Start Course →
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout - Optimized for mobile viewing */}
          <div className="md:hidden py-4 px-4">
            <div className="relative z-10">
              {/* Mobile Title */}
              <div className="text-center mb-4">
                <h1 className="text-lg font-semibold mb-1">Setup Your Parenting Plan</h1>
                <p className="text-white/80 text-sm">
                  {stepsComplete}/4 steps completed
                </p>
              </div>
              
              {/* Mobile Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-white/80">Progress</span>
                  <span className="text-xs text-white font-medium">{Math.round((stepsComplete/4) * 100)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-green-400 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${(stepsComplete/4) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Mobile Step List */}
              <div className="space-y-3 mb-4">
                {steps.map((step) => (
                  <div 
                    key={step.id} 
                    className="flex items-center justify-between bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/15 transition-colors" 
                    onClick={() => scrollTo(step.ref)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center
                        ${step.completed 
                          ? "bg-green-500 text-white" 
                          : "bg-white/30 text-white/80"
                        }`}
                      >
                        {step.completed ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Clock className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <span className="text-white font-medium text-sm">{step.label}</span>
                        <div className="text-xs text-white/70">
                          {step.completed ? "Completed" : "Tap to complete"}
                        </div>
                      </div>
                    </div>
                    <div className="text-white/60">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="text-center">
                <Button 
                  className={`w-full py-3 text-sm font-medium transition-all duration-200 ${
                    allReady 
                      ? 'bg-white text-[#2e1a87] hover:bg-gray-100 shadow-lg' 
                      : 'bg-white/20 text-white/60 cursor-not-allowed border border-white/30'
                  }`}
                  disabled={!allReady}
                >
                  {allReady ? 'Start Course' : `${4 - stepsComplete} steps remaining`}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Next Step - Mobile only */}
      <div className="md:hidden">
        <Card className="border-0 shadow-sm">
          <CardContent className="py-4">
            {allReady ? (
              <>
                <p className="text-green-700 font-medium mb-2">You're all set!</p>
                <Button className="mt-2 w-full bg-[#2e1a87] hover:bg-[#3d2a9b] text-white">Start Course</Button>
              </>
            ) : (
              <>
                <p className="text-[#2e1a87] font-medium mb-2">
                  Next Step: {coParent.waiverSigned ? "Review your info and begin" : `Waiting for ${coParent.name} to sign their waiver`}
                </p>
                {!coParent.waiverSigned && (
                  <Button variant="outline" size="sm" className="mt-2 w-full border-[#2e1a87] text-[#2e1a87] hover:bg-[#2e1a87] hover:text-white">
                    Resend Invite
                  </Button>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

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

      {/* Sticky Footer CTA - Mobile only */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 md:hidden">
        <div className="max-w-3xl mx-auto">
          <Button 
            className={`w-full text-sm py-3 font-medium ${
              allReady 
                ? 'bg-[#2e1a87] hover:bg-[#3d2a9b] text-white' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            size="lg" 
            disabled={!allReady}
          >
            Start Course
          </Button>
        </div>
      </div>

      {/* Inline CTA for desktop */}
      {allReady && (
        <div className="hidden md:flex justify-center mt-6">
          <Button size="lg" className="bg-[#2e1a87] hover:bg-[#3d2a9b] text-white">
            Start Course
          </Button>
        </div>
      )}

      </main>
    </div>
  );
}