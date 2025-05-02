import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { usePaymentStatus } from "@/hooks/use-payment-status";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Edit,
  ExternalLink,
  FileText,
  HelpCircle,
  LockIcon,
  MessageCircle,
  Users,
  Check,
  CalendarDays,
  CreditCard,
} from "lucide-react";

export default function Home6() {
  const { user } = useAuth();
  const { paymentStatus, completePayment } = usePaymentStatus();
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);

  // Mock data for family information
  const parents = [
    { id: 1, initials: "ER", name: "Eric Robinson", status: "Active" },
    { id: 2, initials: "SP", name: "Sarah Parker", status: "Pending" },
  ];

  const children = [
    { id: 1, initials: "MR", name: "Mila Robinson", age: 6 },
  ];

  // Mock data for pre-course requirements
  const requirements = [
    {
      id: "co-parent",
      icon: <Users className="h-5 w-5 text-indigo-600" />,
      title: "Co-Parent Registration",
      description: "Invite your co-parent to join the platform.",
      userStatus: "Completed",
      coParentStatus: "Pending",
      action: "Invite Co-Parent",
      actionLink: "/invite-co-parent",
      required: true,
    },
    {
      id: "waivers",
      icon: <FileText className="h-5 w-5 text-indigo-600" />,
      title: "Waivers & Agreements",
      description: "Review and sign the required legal agreements.",
      userStatus: "Pending",
      coParentStatus: "Pending",
      action: "Review & Sign",
      actionLink: "/waivers",
      required: true,
    },
    {
      id: "holidays",
      icon: <CalendarDays className="h-5 w-5 text-indigo-600" />,
      title: "Holiday Preferences",
      description: "Select your preferences for holiday schedules.",
      userStatus: "Pending",
      coParentStatus: "Pending",
      action: "Select Preferences",
      actionLink: "/holiday-preferences",
      required: true,
    },
    {
      id: "schedule",
      icon: <Clock className="h-5 w-5 text-gray-500" />,
      title: "Schedule Course Session",
      description: "Pick a date and time to complete the course with your co-parent.",
      userStatus: "No session scheduled",
      coParentStatus: "",
      action: "Schedule Now",
      actionLink: "/schedule",
      required: false,
    },
  ];

  // Mock data for resources
  const resources = [
    {
      id: 1,
      title: "Co-Parenting Guide",
      type: "PDF",
      pages: 15,
      icon: <FileText className="h-5 w-5 text-pink-400" />,
    },
    {
      id: 2,
      title: "Communication Toolkit",
      type: "Article",
      minutes: 10,
      icon: <MessageCircle className="h-5 w-5 text-blue-400" />,
    },
  ];

  const handleCompletePayment = () => {
    setIsLoadingPayment(true);
    setTimeout(() => {
      completePayment();
      setIsLoadingPayment(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Menu */}
      <NavigationMenu />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome banner - completely redesigned course readiness tracker */}
        <div className="rounded-lg bg-gradient-to-br from-[#2e1a87] to-[#4936c2] p-6 py-6 mb-6 text-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-indigo-500/20 rounded-full -mr-20 -mb-20"></div>
          <div className="absolute left-1/2 top-0 w-32 h-32 bg-purple-400/10 rounded-full -mt-10"></div>
          
          <div className="relative z-10">
            {/* Top Section - Title and subtitle */}
            <div className="mb-5">
              <h1 className="text-xl font-medium mb-1">Welcome to Your Family's Parenting Plan</h1>
              <p className="text-white/90 text-sm">
                To begin your course, please complete the steps below.
              </p>
            </div>
            
            {/* Middle Section - Progress tracker */}
            <div className="mb-5">
              {/* Overall progress bar */}
              <div className="mb-5 relative">
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden w-full">
                  <div 
                    className="h-full bg-green-400 rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${
                        (((requirements.find(r => r.id === "co-parent")?.userStatus === "Completed" ? 1 : 0) + 
                        (requirements.find(r => r.id === "waivers")?.userStatus === "Completed" ? 1 : 0) + 
                        (requirements.find(r => r.id === "holidays")?.userStatus === "Completed" ? 1 : 0) + 
                        (paymentStatus ? 1 : 0)) / 4) * 100
                      }%` 
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-white/70 px-1 mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
              
              {/* 4-step progress tracker with arrows */}
              <div className="grid grid-cols-4 relative">
                {/* Connecting line */}
                <div className="absolute top-5 left-[calc(10%+8px)] right-[calc(10%+8px)] h-0.5 bg-white/20"></div>
                
                {/* Step 1: Co-Parent Registration */}
                <div className="relative flex flex-col items-center">
                  <div className="tooltip-container" title={requirements.find(r => r.id === "co-parent")?.userStatus === "Completed" ? "Completed" : "Co-parent invited but not yet joined"}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10
                      ${requirements.find(r => r.id === "co-parent")?.userStatus === "Completed" 
                        ? "bg-green-500 text-white" 
                        : "bg-white/20 text-white border-2 border-white/40"
                      } transition-all duration-300`}
                    >
                      {requirements.find(r => r.id === "co-parent")?.userStatus === "Completed" 
                        ? <CheckCircle className="h-5 w-5" />
                        : <Users className="h-5 w-5" />
                      }
                    </div>
                  </div>
                  <span className="text-xs font-medium text-white mt-2 text-center">Co-Parent</span>
                </div>
                
                {/* Step 2: Waivers */}
                <div className="relative flex flex-col items-center">
                  <div className="tooltip-container" title={requirements.find(r => r.id === "waivers")?.userStatus === "Completed" ? "Completed" : "Sign required waivers"}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10
                      ${requirements.find(r => r.id === "waivers")?.userStatus === "Completed" 
                        ? "bg-green-500 text-white" 
                        : requirements.find(r => r.id === "co-parent")?.userStatus === "Completed"
                          ? "bg-white text-[#2e1a87] animate-pulse" 
                          : "bg-white/20 text-white border-2 border-white/40"
                      } transition-all duration-300`}
                    >
                      {requirements.find(r => r.id === "waivers")?.userStatus === "Completed" 
                        ? <CheckCircle className="h-5 w-5" />
                        : <FileText className="h-5 w-5" />
                      }
                    </div>
                  </div>
                  <span className="text-xs font-medium text-white mt-2 text-center">Waivers</span>
                </div>
                
                {/* Step 3: Holiday Preferences */}
                <div className="relative flex flex-col items-center">
                  <div className="tooltip-container" title={requirements.find(r => r.id === "holidays")?.userStatus === "Completed" ? "Completed" : "Select holiday preferences"}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10
                      ${requirements.find(r => r.id === "holidays")?.userStatus === "Completed" 
                        ? "bg-green-500 text-white" 
                        : requirements.find(r => r.id === "waivers")?.userStatus === "Completed"
                          ? "bg-white text-[#2e1a87] animate-pulse" 
                          : "bg-white/20 text-white border-2 border-white/40"
                      } transition-all duration-300`}
                    >
                      {requirements.find(r => r.id === "holidays")?.userStatus === "Completed" 
                        ? <CheckCircle className="h-5 w-5" />
                        : <CalendarDays className="h-5 w-5" />
                      }
                    </div>
                  </div>
                  <span className="text-xs font-medium text-white mt-2 text-center">Holidays</span>
                </div>
                
                {/* Step 4: Payment */}
                <div className="relative flex flex-col items-center">
                  <div className="tooltip-container" title={paymentStatus ? "Completed" : "Complete payment to access course"}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10
                      ${paymentStatus 
                        ? "bg-green-500 text-white" 
                        : requirements.find(r => r.id === "holidays")?.userStatus === "Completed"
                          ? "bg-white text-[#2e1a87] animate-pulse" 
                          : "bg-white/20 text-white border-2 border-white/40"
                      } transition-all duration-300`}
                    >
                      {paymentStatus 
                        ? <CheckCircle className="h-5 w-5" />
                        : <CreditCard className="h-5 w-5" />
                      }
                    </div>
                  </div>
                  <span className="text-xs font-medium text-white mt-2 text-center">Payment</span>
                </div>
              </div>
            </div>
            
            {/* Bottom Section - CTA and text */}
            <div className="flex items-center justify-between mt-6">
              <div>
                <p className="text-white/80 text-xs flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1.5 inline" />
                  <span>Estimated time to complete: 10-15 minutes</span>
                </p>
                <p className="text-white/80 text-xs mt-1">
                  Your progress will be saved as you go.
                </p>
              </div>
              
              <div className="flex flex-col items-end">
                <Button
                  disabled={!paymentStatus}
                  className="bg-white text-[#2e1a87] hover:bg-white/90 shadow-md px-6 h-10 font-medium"
                  size="default"
                >
                  {paymentStatus ? (
                    <>Start Course <ArrowRight className="ml-2 h-4 w-4" /></>
                  ) : (
                    <>Complete Required Steps</>
                  )}
                </Button>
                {!paymentStatus && (
                  <p className="text-white/80 text-xs mt-1.5 flex items-center">
                    <LockIcon className="h-3 w-3 mr-1" />
                    All steps must be completed before starting
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content area - spans 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pre-course checklist section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start gap-3 mb-5">
                <div className="bg-indigo-50 p-2 rounded-md">
                  <FileText className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Before You Start the Course</h2>
                  <p className="text-gray-600 text-sm">
                    Please complete these preparation steps for the best experience.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-md p-4 mb-4">
                <h3 className="text-sm font-medium text-gray-700 flex items-center mb-3">
                  <Check className="h-4 w-4 mr-2 text-indigo-600" />
                  Pre-Course Checklist
                </h3>

                <div className="space-y-4">
                  {requirements.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-white rounded-md p-4 border border-gray-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {item.icon}
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex items-center flex-wrap gap-2 mb-1">
                            <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                            {item.required && (
                              <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
                                Required
                              </span>
                            )}
                            {!item.required && (
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                Optional
                              </span>
                            )}
                          </div>
                          
                          <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                          
                          {item.id !== "schedule" ? (
                            <div className="flex text-xs text-gray-500 mb-2">
                              <span className="mr-3">
                                You: <span className={item.userStatus === "Completed" ? "text-green-600 font-medium" : "text-amber-500 font-medium"}>
                                  {item.userStatus}
                                </span>
                              </span>
                              <span>
                                Co-Parent: <span className={item.coParentStatus === "Completed" ? "text-green-600 font-medium" : "text-amber-500 font-medium"}>
                                  {item.coParentStatus}
                                </span>
                              </span>
                            </div>
                          ) : (
                            <div className="text-xs text-amber-500 font-medium mb-2">
                              {item.userStatus}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-shrink-0">
                          <Button
                            variant="link"
                            className="text-blue-600 hover:text-blue-800 p-0 h-auto text-xs font-medium flex items-center"
                          >
                            {item.action} <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Family Information section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Family Information</h2>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Parents</h3>
                  <div className="space-y-3">
                    {parents.map((parent) => (
                      <div key={parent.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white ${
                            parent.status === "Active" ? "bg-green-500" : "bg-amber-400"
                          }`}>
                            {parent.initials}
                          </div>
                          <span className="ml-3 text-sm">{parent.name}</span>
                        </div>
                        <div className="flex items-center">
                          {parent.status === "Active" ? (
                            <span className="flex items-center text-xs text-green-600">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Active
                            </span>
                          ) : (
                            <span className="text-xs text-amber-500">Pending</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {parents.some(p => p.status === "Pending") && (
                    <Button variant="ghost" size="sm" className="mt-2 text-xs text-blue-600">
                      Resend Invitation
                    </Button>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Children</h3>
                  <div className="space-y-3">
                    {children.map((child) => (
                      <div key={child.id} className="flex items-center">
                        <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                          {child.initials}
                        </div>
                        <span className="ml-3 text-sm">{child.name}</span>
                        <span className="ml-2 text-xs text-gray-500">
                          ({child.age} years old)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - spans 1 column */}
          <div className="space-y-6">
            {/* Course Access section - improved design */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm overflow-hidden relative">
              {/* Header with status badge */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Course Access</h2>
                {paymentStatus ? (
                  <span className="flex items-center px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-medium">
                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                    Unlocked
                  </span>
                ) : (
                  <span className="flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-600 text-xs font-medium">
                    <LockIcon className="h-3.5 w-3.5 mr-1" />
                    Locked
                  </span>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-5">
                Complete the course enrollment to continue your family's journey
              </p>
              
              {!paymentStatus && (
                <div className="bg-amber-50 p-4 rounded-md mb-5 border border-amber-100">
                  <p className="text-amber-700 text-sm flex items-center font-medium">
                    <CreditCard className="h-4 w-4 mr-2 flex-shrink-0" />
                    Your course access is pending payment
                  </p>
                </div>
              )}
              
              {/* Course features with improved styling */}
              <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Included in your enrollment:</h3>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-600">Comprehensive co-parenting course</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-600">Legal template creation tools</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-600">Lifetime access to resources</span>
                </div>
              </div>
              
              {/* Pricing with improved design */}
              <div className="bg-[#2e1a87]/5 p-4 rounded-md mb-5 border border-[#2e1a87]/10">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Course Enrollment</span>
                  <span className="text-xl font-bold text-[#2e1a87]">$600</span>
                </div>
              </div>
              
              {/* Enrollment button */}
              <Button 
                className="w-full bg-[#2e1a87] hover:bg-[#25156d] shadow-md h-11"
                disabled={paymentStatus || isLoadingPayment}
                onClick={handleCompletePayment}
                size="lg"
              >
                {isLoadingPayment ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Processing...
                  </>
                ) : (
                  <div className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" /> 
                    Complete Enrollment
                  </div>
                )}
              </Button>
              
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#2e1a87]/5 rounded-full"></div>
            </div>
            
            {/* Resources section - improved design */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm overflow-hidden relative">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <FileText className="h-5 w-5 text-indigo-600 mr-2" />
                  Resources
                </h2>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                  2 Available
                </span>
              </div>
              
              <div className="space-y-3">
                {resources.map((resource) => (
                  <div 
                    key={resource.id} 
                    className="flex items-start p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors cursor-pointer shadow-sm"
                  >
                    <div className="flex-shrink-0 mr-3 bg-indigo-100 p-2.5 rounded-md">
                      {resource.icon}
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{resource.title}</h3>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="font-medium text-indigo-600">{resource.type}</span>
                        {resource.pages && (
                          <span className="ml-2 text-gray-500">• {resource.pages} pages</span>
                        )}
                        {resource.minutes && (
                          <span className="ml-2 text-gray-500">• {resource.minutes} min read</span>
                        )}
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-indigo-500 ml-2 flex-shrink-0" />
                  </div>
                ))}
              </div>
              
              {/* Decorative element */}
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-50 rounded-full opacity-50"></div>
            </div>
            
            {/* Help section - improved design */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-lg p-5 border border-blue-100 shadow-sm relative overflow-hidden">
              <div className="flex items-start gap-4 relative z-10">
                <div className="bg-white p-3 rounded-full shadow-sm flex-shrink-0">
                  <HelpCircle className="h-5 w-5 text-[#2e1a87]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1.5">Need assistance?</h3>
                  <p className="text-sm text-gray-600 mb-3">Our support team is always ready to help with your questions.</p>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="text-[#2e1a87] border-[#2e1a87] hover:bg-[#2e1a87]/5 flex items-center text-xs shadow-sm"
                  >
                    Contact Support <ExternalLink className="ml-1.5 h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-100/50 rounded-full -mb-12 -mr-12"></div>
              <div className="absolute top-0 right-10 w-10 h-10 bg-indigo-100/50 rounded-full -mt-5"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}