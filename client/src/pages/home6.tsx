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
        {/* Welcome banner */}
        <div className="rounded-lg bg-[#2e1a87] p-6 mb-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-xl font-medium mb-1">Welcome to Your Family's Parenting Plan</h1>
            <p className="text-white/80 text-sm mb-6">
              To begin your course, please complete the following steps.
            </p>
            <div className="flex items-center justify-between">
              <p className="text-white/70 text-xs">
                Your progress will be saved as you go.
              </p>
              <Button
                disabled={!paymentStatus}
                className="bg-white text-[#2e1a87] hover:bg-white/90"
              >
                Start Course <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-white/70 text-xs mt-2">
              All items must be completed before starting.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-indigo-500/20 rounded-full -mr-32 -mb-32"></div>
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
            {/* Course Access section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Course Access</h2>
                {paymentStatus ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <LockIcon className="h-5 w-5 text-amber-500" />
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Complete the course enrollment to continue
              </p>
              
              {!paymentStatus && (
                <div className="bg-amber-50 p-3 rounded-md mb-4">
                  <p className="text-amber-700 text-sm flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 flex-shrink-0" />
                    Your course access is pending payment
                  </p>
                </div>
              )}
              
              <div className="space-y-2 mb-6">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Comprehensive co-parenting course</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Legal template creation tools</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Lifetime access to resources</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-700">Course Enrollment</span>
                  <span className="text-sm font-medium text-gray-900">$249</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Today's Payment</span>
                  <span className="text-sm font-medium text-gray-900">$249</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-[#2e1a87] hover:bg-[#25156d]"
                disabled={paymentStatus || isLoadingPayment}
                onClick={handleCompletePayment}
              >
                {isLoadingPayment ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Processing...
                  </>
                ) : (
                  <div className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" /> 
                    Complete Enrollment
                  </div>
                )}
              </Button>
            </div>
            
            {/* Resources section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Resources</h2>
              
              <div className="space-y-3">
                {resources.map((resource) => (
                  <div 
                    key={resource.id} 
                    className="flex items-start p-3 border border-gray-100 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0 mr-3 bg-gray-100 p-2 rounded-md">
                      {resource.icon}
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium text-gray-900">{resource.title}</h3>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span>{resource.type}</span>
                        {resource.pages && (
                          <span className="ml-1">• {resource.pages} pages</span>
                        )}
                        {resource.minutes && (
                          <span className="ml-1">• {resource.minutes} min read</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Help section */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-700 mb-1">Need help? Our support team is just a click away.</p>
                  <Button 
                    variant="link" 
                    className="text-blue-600 hover:text-blue-800 p-0 h-auto text-sm font-medium flex items-center"
                  >
                    Contact Support <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}