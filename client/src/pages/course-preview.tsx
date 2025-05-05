import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CheckCircle,
  Lock,
  ExternalLink
} from "lucide-react";
import { usePaymentStatus } from "@/hooks/use-payment-status";

export default function CoursePreview() {
  const [, setLocation] = useLocation();
  const { paymentStatus } = usePaymentStatus();
  
  // Function to navigate to a specific path
  const navigate = (path: string) => {
    setLocation(path);
  };
  
  // Check which items are completed
  const isWaiverCompleted = typeof window !== 'undefined' ? 
    localStorage.getItem('waiverCompleted') === 'true' : false;
  
  // Mock state for family info completion (replace with actual state in production)
  const isFamilyInfoCompleted = true;
  
  // Get incomplete items for the reminder banner
  const incompleteItems = [];
  if (!isWaiverCompleted) incompleteItems.push("Waivers");
  if (!isFamilyInfoCompleted) incompleteItems.push("Family Info");
  if (!paymentStatus) incompleteItems.push("Payment");
  
  // Course module data (exactly as provided)
  const courseModules = [
    {
      number: 1,
      title: "Welcome to Resolve",
      lessons: [
        "1.1 A New Path Forward for You and Your Children",
        "1.2 Course Expectations",
        "1.3 A Message to My Co-Parent"
      ]
    },
    {
      number: 2,
      title: "Making Decisions Together",
      lessons: [
        "2.1 We Are Well on Our Way. Let's Dig Into Your Agreement",
        "2.2 Shared Decision-Making for Major Decisions",
        "2.3 A Process for Decision-Making When We Don't Immediately Agree",
        "2.4 Day-to-Day Decision-Making",
        "2.5 Extra-Curricular Activities",
        "2.6 Sharing Information & Important Records",
        "2.7 Communication",
        "2.8 Child Care"
      ]
    },
    {
      number: 3,
      title: "How Will We Share Time with the Kids?",
      lessons: [
        "3.1 Introduction to Timesharing & Travel",
        "3.2 Scheduling and Our Shared Calendar",
        "3.3 Weekday and Weekend Schedules",
        "3.4 The Holiday Schedule",
        "3.5 School Breaks",
        "3.6 Transportation and Exchange",
        "3.7 Travel and Work Restrictions"
      ]
    },
    {
      number: 4,
      title: "Education Decisions",
      lessons: [
        "4.1 Introduction to Education Decisions",
        "4.2 School Choice and Enrollment",
        "4.3 Academic Performance and Support",
        "4.4 Parent-Teacher Communications",
        "4.5 Special Education Needs"
      ]
    },
    {
      number: 5,
      title: "Final Considerations",
      lessons: [
        "5.1 Introduction to Final Considerations",
        "5.2 Designation for Other Legal Purposes",
        "5.3 Relocation",
        "5.4 Changes or Modifications to the Agreement",
        "5.5 Any Other Special Issues",
        "5.6 Finalizing and Signing the Agreement",
        "5.7 Course Conclusion and Next Steps",
        "5.8 What if You Didn't Finish?"
      ]
    }
  ];
  
  // Value reminders for the sidebar
  const valueReminders = [
    "Expert-Guided Interactive Course",
    "Legal-Ready Parenting Agreement",
    "Lifetime Access to Your Plan & Resources"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Menu */}
      <NavigationMenu />
      
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Hero Header Section */}
        <div className="rounded-lg bg-gradient-to-br from-[#2e1a87] to-[#4936c2] py-8 px-6 mb-6 text-white">
          <h1 className="text-2xl font-semibold mb-2">Your Co-Parenting Course</h1>
          <p className="text-white/80">
            Guided by experts. Built to help families move forward together.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content area - spans 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            {/* Access Reminder Banner */}
            {incompleteItems.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-6">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-amber-800 mb-1">
                      Complete required items to unlock your course.
                    </h3>
                    <p className="text-sm text-amber-700 mb-3">
                      You still need to finish: {incompleteItems.join(", ")}
                    </p>
                    <Button 
                      className="bg-[#2e1a87] hover:bg-[#25156d]"
                      onClick={() => navigate("/")}
                    >
                      Go to Checklist
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Course Outline Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Course Outline</h2>
              
              <div className="space-y-6">
                {courseModules.map((module) => (
                  <div key={module.number} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <h3 className="text-base font-medium text-[#2e1a87] mb-3">
                      Module {module.number}: {module.title}
                    </h3>
                    
                    <ul className="space-y-2">
                      {module.lessons.map((lesson, index) => (
                        <li 
                          key={index} 
                          className="flex items-start gap-2 text-gray-500 text-sm pl-1"
                        >
                          <Lock className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="opacity-75">{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar - spans 1 column */}
          <div className="space-y-6">
            {/* Value Reminder Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <h3 className="text-base font-medium text-gray-900 mb-3">What's Included</h3>
              
              <ul className="space-y-3">
                {valueReminders.map((value, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm">{value}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-3">
                  Complete all required items in your pre-course checklist to unlock full course access.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full text-[#2e1a87] border-[#2e1a87] hover:bg-[#f5f0ff]"
                  onClick={() => navigate("/")}
                >
                  Return to Dashboard
                </Button>
              </div>
            </div>
            
            {/* Additional resources card */}
            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <h3 className="text-base font-medium text-gray-900 mb-3">Need Assistance?</h3>
              
              <p className="text-sm text-gray-600 mb-4">
                Our team is here to help you with any questions about the course.
              </p>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-1.5 text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}