import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { usePaymentStatus } from "@/hooks/use-payment-status";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Button } from "@/components/ui/button";
import { CourseSessionStatusBlock, SessionState } from "@/components/CourseSessionStatusBlock";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Edit,
  ExternalLink,
  FileText,
  HelpCircle,
  Home,
  LockIcon,
  MessageCircle,
  Users,
  Check,
  CalendarDays,
  CreditCard,
  PlusCircle,
  Calendar,
  AlertCircle,
} from "lucide-react";

export default function Home6() {
  const { user } = useAuth();
  const { paymentStatus, completePayment } = usePaymentStatus();
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  
  // State for the Course Session Status Block
  const [sessionState, setSessionState] = useState<SessionState>('none'); // 'none', 'proposed', 'scheduled'
  const [sessionDate, setSessionDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 10)) // Example date 10 days in future
  );
  
  // Step states for the badge-style progress tracker with larger icons
  const [steps, setSteps] = useState([
    {
      id: "family-info",
      label: "Family Info",
      icon: <Home className="h-6 w-6" />,
      completed: true
    },
    {
      id: "co-parent",
      label: "Co-Parent",
      icon: <Users className="h-6 w-6" />,
      completed: true
    },
    {
      id: "waivers",
      label: "Waivers",
      icon: <FileText className="h-6 w-6" />,
      completed: false
    },
    {
      id: "holidays",
      label: "Holidays",
      icon: <CalendarDays className="h-6 w-6" />,
      completed: false
    },
    {
      id: "payment",
      label: "Payment",
      icon: <CreditCard className="h-6 w-6" />,
      completed: paymentStatus
    }
  ]);
  
  // Toggle function for the click-to-toggle interaction
  const toggleStepStatus = (stepId: string) => {
    setSteps(steps.map(step => 
      step.id === stepId 
        ? { ...step, completed: !step.completed } 
        : step
    ));
  };
  
  // Update the Payment step when paymentStatus changes
  useEffect(() => {
    setSteps(prevSteps => 
      prevSteps.map(step => 
        step.id === "payment" 
          ? { ...step, completed: paymentStatus } 
          : step
      )
    );
  }, [paymentStatus]);

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
      id: "family-info",
      icon: <Home className="h-5 w-5 text-indigo-600" />,
      title: "Family Information",
      description: "Review the family details you provided during onboarding.",
      userStatus: "Completed",
      coParentStatus: "Completed",
      familyMetadata: {
        children: "Completed",
        jurisdiction: "Completed"
      },
      action: "Review & Edit",
      actionLink: "/family-edit",
      required: true,
    },
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

  // Function to cycle through session states ('none', 'proposed', 'scheduled')
  const toggleSessionState = () => {
    setSessionState((prevState) => {
      if (prevState === 'none') return 'proposed';
      if (prevState === 'proposed') return 'scheduled';
      return 'none';
    });
  };

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
        {/* Welcome banner with true vertical alignment */}
        <div className="rounded-lg bg-gradient-to-br from-[#2e1a87] to-[#4936c2] py-5 px-5 mb-6 text-white relative overflow-hidden flex flex-col">
          {/* Background decorative element - subtle and minimal */}
          <div className="absolute right-0 bottom-0 w-48 h-48 bg-indigo-500/10 rounded-full -mr-16 -mb-16"></div>
          
          <div className="relative z-10">
            {/* Title section */}
            <div className="mb-6">
              <h1 className="text-lg font-medium mb-0.5">Welcome to Your Family's Parenting Plan</h1>
              <p className="text-white/80 text-xs">
                To begin your course, please complete the steps below.
              </p>
            </div>
          </div>
          
          {/* Refined badge-style progress tracker with improved layout */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mt-2">
            {/* Step badges with increased spacing */}
            <div className="flex items-center justify-center md:justify-start md:space-x-8 space-x-5 flex-wrap">
              {steps.map((step) => (
                <div 
                  key={step.id} 
                  className="relative flex flex-col items-center z-10 cursor-pointer py-2 mb-1" 
                  onClick={() => toggleStepStatus(step.id)}
                >
                  <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200
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
                  <span className="text-xs text-white mt-1.5 text-center whitespace-nowrap font-medium">
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
            
            {/* Course Session Status Block - hidden for now */}
            {/* 
            <div 
              className="flex-shrink-0 rounded-md cursor-pointer transition-all duration-200 h-auto"
              onClick={toggleSessionState}
            >
              <CourseSessionStatusBlock 
                state={sessionState}
                sessionDate={sessionDate}
                sessionTime="3:00 PM"
                daysRemaining={sessionState === 'scheduled' ? 2 : undefined}
                onPropose={toggleSessionState}
                onProposeNew={toggleSessionState}
                onAccept={toggleSessionState}
              />
            </div>
            */}
            
            {/* Start Course button aligned with badges */}
            <div className="flex-shrink-0 flex flex-col items-center mt-2 lg:mt-0">
              <Link href="/co-parent-verification">
                <Button
                  disabled={!steps.every(step => step.completed)}
                  className="bg-white text-[#2e1a87] hover:bg-white/90 shadow-sm px-5 h-10 text-sm font-medium whitespace-nowrap w-44"
                  size="default"
                >
                  Start Course <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
              {!steps.every(step => step.completed) && (
                <p className="text-white/70 text-[10px] mt-2 flex items-center text-center">
                  <LockIcon className="h-2.5 w-2.5 mr-0.5" />
                  All steps must be completed
                </p>
              )}
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
                  <h2 className="text-lg font-medium text-gray-900">Pre-Course Checklist</h2>
                  <p className="text-gray-600 text-sm">
                    Please complete these preparation steps for the best experience.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-md p-4">
                <div className="space-y-3">
                  {requirements.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-white rounded-md p-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {item.icon}
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex items-center flex-wrap gap-2 mb-0.5">
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
                          
                          <p className="text-xs text-gray-600">{item.description}</p>
                        </div>
                        
                        <div className="flex-shrink-0 flex flex-col items-end">
                          <Link 
                            href={
                              item.id === "family-info" 
                                ? "/family-information" 
                                : item.id === "co-parent" 
                                  ? "/co-parent-invitation" 
                                  : item.id === "waivers" 
                                    ? "/waivers-and-agreements" 
                                    : item.id === "holidays" 
                                      ? "/holiday-preferences" 
                                      : "/schedule-course"
                            }
                          >
                            <Button
                              variant="link"
                              className="text-blue-600 hover:text-blue-800 p-0 h-auto text-xs font-medium flex items-center"
                            >
                              {item.action} <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                      
                      {/* Status tags in a separate row */}
                      <div className="flex justify-end mt-2 px-3">
                        {item.id === "family-info" ? (
                          <div className="flex flex-wrap text-[10px] gap-x-3 gap-y-1 justify-end">
                            <div className="flex gap-1">
                              <span className="text-gray-700">You:</span>
                              <span className="text-green-600 font-medium">Completed</span>
                            </div>
                            <div className="flex gap-1">
                              <span className="text-gray-700">Co-Parent:</span>
                              <span className="text-green-600 font-medium">Completed</span>
                            </div>
                            <div className="flex gap-1">
                              <span className="text-gray-700">Children:</span>
                              <span className="text-green-600 font-medium">Completed</span>
                            </div>
                            <div className="flex gap-1">
                              <span className="text-gray-700">Jurisdiction:</span>
                              <span className="text-green-600 font-medium">Completed</span>
                            </div>
                          </div>
                        ) : item.id === "schedule" ? (
                          <div className="text-[10px] text-amber-500 font-medium">
                            {item.userStatus}
                          </div>
                        ) : (
                          <div className="flex text-[10px] gap-3 justify-end">
                            <div className="flex gap-1">
                              <span className="text-gray-700">You:</span>
                              <span className={item.userStatus === "Completed" ? "text-green-600 font-medium" : "text-amber-500 font-medium"}>
                                {item.userStatus}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <span className="text-gray-700">Co-Parent:</span>
                              <span className={item.coParentStatus === "Completed" ? "text-green-600 font-medium" : "text-amber-500 font-medium"}>
                                {item.coParentStatus}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Course Outline section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-medium text-gray-900">Course Outline</h2>
                <Link href="/course">
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <ExternalLink className="h-4 w-4" />
                    View Full Course
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                {/* Module 1 */}
                <div className="group bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg p-4 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Module 1</p>
                      <h3 className="text-[#2e1a87] font-semibold">Welcome to Resolve</h3>
                    </div>
                    <div className="text-gray-400 group-hover:text-[#2e1a87]">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                {/* Module 2 */}
                <div className="group bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg p-4 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Module 2</p>
                      <h3 className="text-[#2e1a87] font-semibold">Parental Responsibility and Decision Making</h3>
                    </div>
                    <div className="text-gray-400 group-hover:text-[#2e1a87]">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                {/* Module 3 */}
                <div className="group bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg p-4 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Module 3</p>
                      <h3 className="text-[#2e1a87] font-semibold">Timesharing Schedule</h3>
                    </div>
                    <div className="text-gray-400 group-hover:text-[#2e1a87]">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                {/* Module 4 */}
                <div className="group bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg p-4 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Module 4</p>
                      <h3 className="text-[#2e1a87] font-semibold">Educational Decisions</h3>
                    </div>
                    <div className="text-gray-400 group-hover:text-[#2e1a87]">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                {/* Module 5 */}
                <div className="group bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg p-4 border border-gray-100 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#2e1a87]"></div>
                  <div className="flex items-center justify-between pl-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Module 5</p>
                      <h3 className="text-[#2e1a87] font-semibold">Final Considerations</h3>
                    </div>
                    <div className="text-gray-400 group-hover:text-[#2e1a87]">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Progress through all five modules to complete your comprehensive parenting plan. 
                  Each module covers key aspects of co-parenting arrangements.
                </p>
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