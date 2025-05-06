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
  
  // Check if waiver is completed from localStorage
  const isWaiverCompleted = typeof window !== 'undefined' ? 
    localStorage.getItem('waiverCompleted') === 'true' : false;
    
  // Feature flags
  const showHolidaySelector = false; // Temporarily hidden — toggle `showHolidaySelector` to true to re-enable this section.
  
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
      completed: isWaiverCompleted
    },
    // Temporarily hidden holiday step - toggle showHolidaySelector to true to re-enable
    ...(showHolidaySelector ? [{
      id: "holidays",
      label: "Holidays",
      icon: <CalendarDays className="h-6 w-6" />,
      completed: false
    }] : []),
    {
      id: "payment",
      label: "Payment",
      icon: <CreditCard className="h-6 w-6" />,
      completed: paymentStatus
    }
  ]);
  
  // Requirements for the pre-course checklist
  const [requirements, setRequirements] = useState([
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
      totalSteps: 4,
      completedSteps: 4,
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
      userStatus: isWaiverCompleted ? "Completed" : "Pending",
      coParentStatus: "Pending",
      action: isWaiverCompleted ? "View" : "Review & Sign",
      actionLink: "/waivers-and-agreements",
      required: true,
    },
    // Temporarily hidden holiday preferences - toggle showHolidaySelector to true to re-enable
    ...(showHolidaySelector ? [{
      id: "holidays",
      icon: <CalendarDays className="h-5 w-5 text-indigo-600" />,
      title: "Holiday Preferences",
      description: "Select your preferences for holiday schedules.",
      userStatus: "Pending",
      coParentStatus: "Pending",
      action: "Select Preferences",
      actionLink: "/holiday-preferences",
      required: true,
    }] : []),
    {
      id: "schedule",
      icon: <Clock className="h-5 w-5 text-gray-500" />,
      title: "Schedule Course Session",
      description: "Pick a date and time to complete the course with your co-parent.",
      userStatus: "No session scheduled",
      coParentStatus: "",
      action: "Schedule Now",
      actionLink: "/schedule-course",
      required: false,
    },
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
      prevSteps.map(step => {
        if (step.id === "payment") {
          return { ...step, completed: paymentStatus };
        } else if (step.id === "waivers") {
          return { ...step, completed: isWaiverCompleted };
        }
        return step;
      })
    );
  }, [paymentStatus, isWaiverCompleted]);

  // Mock data for family information
  const parents = [
    { id: 1, initials: "ER", name: "Eric Robinson", status: "Active" },
    { id: 2, initials: "SP", name: "Sarah Parker", status: "Pending" },
  ];

  const children = [
    { id: 1, initials: "MR", name: "Mila Robinson", age: 6 },
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
  
  // Module data for course outline
  const courseModules = [
    {
      id: 1,
      title: "Welcome to Resolve",
      active: true,
      hasChevron: true
    },
    {
      id: 2,
      title: "Parental Responsibility and Decision Making",
      active: false,
      hasChevron: true
    },
    {
      id: 3,
      title: "Timesharing Schedule",
      active: false,
      hasChevron: true
    },
    {
      id: 4,
      title: "Educational Decisions",
      active: false,
      hasChevron: true
    },
    {
      id: 5,
      title: "Final Considerations",
      active: false,
      hasChevron: true
    }
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
            <div>
              <div className="flex items-start gap-3 mb-2">
                <div className="bg-indigo-50 p-2 rounded-md">
                  <FileText className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">You're almost ready! Finish these things to get started:</h2>
                  <p className="text-gray-600 text-sm">
                    These things are required to start building your plan
                  </p>
                </div>
              </div>
            </div>
            
            {/* Checklist items */}
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
                      <div className="text-[10px] justify-end flex items-center gap-1.5">
                        <div className="flex items-center">
                          <div className={`h-3 w-3 rounded-full ${item.completedSteps === item.totalSteps ? 'bg-green-100' : 'bg-amber-100'} flex items-center justify-center`}>
                            {item.completedSteps === item.totalSteps ? (
                              <Check className="h-2 w-2 text-green-600" />
                            ) : (
                              <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                            )}
                          </div>
                        </div>
                        <span className={`${item.completedSteps === item.totalSteps ? 'text-green-600' : 'text-amber-500'} font-medium`}>
                          {item.completedSteps}/{item.totalSteps} {item.completedSteps === item.totalSteps ? 'Completed' : 'Pending'}
                        </span>
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
                          <span className="text-amber-500 font-medium">
                            {item.coParentStatus}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Resources Section - Moved here from sidebar and made full-width */}
            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Resources</h2>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  2 Available
                </span>
              </div>

              {/* Resources Grid - 2 items per row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Co-Parenting Guide */}
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 flex items-start h-full">
                  <div className="bg-red-100 p-1.5 rounded-md mr-3 flex-shrink-0">
                    <FileText className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-sm font-medium text-gray-900">Co-Parenting Guide</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-600">PDF • 15 pages</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-blue-600"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Communication Toolkit */}
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 flex items-start h-full">
                  <div className="bg-blue-100 p-1.5 rounded-md mr-3 flex-shrink-0">
                    <MessageCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-sm font-medium text-gray-900">Communication Toolkit</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-600">Article • 10 min read</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-blue-600"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar content - spans 1 column */}
          <div className="lg:pt-0">
            {/* Course Access section - aligned with top of checklist */}
            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm flex flex-col" style={{ minHeight: '355px' }}>
              {paymentStatus ? (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">Course Access</h2>
                      <p className="text-gray-600 text-xs mt-1">
                        You have full access to all course materials
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-full px-3 py-1 flex items-center text-green-700 font-medium text-xs">
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      Unlocked
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-center gap-2 mb-4">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <p className="text-green-800 text-sm font-medium">
                      Payment processed successfully
                    </p>
                  </div>
                  
                  {/* Course features section with normal spacing */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Course includes:</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        <div className="bg-green-100 p-0.5 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">Comprehensive Course Materials</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="bg-green-100 p-0.5 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">Interactive Parenting Exercises</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="bg-green-100 p-0.5 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">Expert-Reviewed Agreement Templates</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Filling space */}
                  <div className="flex-grow"></div>
                  
                  <Button
                    className="w-full mt-4 py-2 bg-[#2e1a87] hover:bg-[#25156d] text-white font-medium flex items-center justify-center"
                  >
                    Begin Course
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">Course Access</h2>
                      <p className="text-gray-600 text-xs mt-1">
                        Complete the course enrollment to continue your family's journey
                      </p>
                    </div>
                    <div className="bg-amber-50 rounded-full px-3 py-1 flex items-center text-amber-700 font-medium text-xs">
                      <LockIcon className="h-3.5 w-3.5 mr-1" />
                      Locked
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-2.5 flex items-center gap-2 mb-4">
                    <CreditCard className="h-4 w-4 text-amber-600 flex-shrink-0" />
                    <p className="text-amber-800 text-sm font-medium">
                      Your course access is pending payment
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Included in your enrollment:</h3>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="bg-green-100 p-0.5 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">Expert-Guided Interactive Course</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="bg-green-100 p-0.5 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">Legal-Ready Parenting Agreement</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="bg-green-100 p-0.5 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">Lifetime Access to Your Plan & Resources</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="bg-green-100 p-0.5 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">Access to Co-Parenting Templates</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dynamic space filling */}
                  <div className="flex-grow"></div>
                  
                  <div className="bg-gray-100 rounded-lg p-2.5 flex items-center justify-between">
                    <span className="text-sm font-medium">Course Enrollment</span>
                    <span className="text-xl font-bold text-[#2e1a87]">$600</span>
                  </div>
                  
                  <div className="text-center mt-2 mb-1">
                    <span className="text-xs text-gray-500">Enrollment can be completed by either parent.</span>
                  </div>
                  
                  <Button
                    className="w-full mt-2 py-2 bg-[#2e1a87] hover:bg-[#25156d] text-white font-medium flex items-center justify-center"
                    onClick={handleCompletePayment}
                    disabled={isLoadingPayment}
                  >
                    {isLoadingPayment ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-1.5" />
                        Complete Enrollment
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>

            {/* Need assistance - Now aligned with Resources section */}
            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm mt-6" style={{ height: '150px' }}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="h-4 w-4 text-[#2e1a87]" />
                </div>
                <div>
                  <h2 className="text-base font-medium text-gray-900">Need assistance?</h2>
                  <p className="text-gray-600 text-xs mt-1">
                    Our support team is always ready to help with your questions.
                  </p>
                </div>
              </div>
              
              <Button
                className="w-full mt-4 border-[#2e1a87] text-[#2e1a87] hover:bg-[#2e1a87]/5 font-medium"
                variant="outline"
                size="sm"
              >
                Contact Support <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}