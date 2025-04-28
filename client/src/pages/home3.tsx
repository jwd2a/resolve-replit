import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

// UI components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Calendar as CalendarIcon,
  Users,
  CheckCheck,
  Check,
  CheckCircle,
  Circle,
  ArrowRight,
  Clock,
  CalendarDays,
  ClipboardList,
  HelpCircle,
  Video,
  Book,
  BookOpen,
  ExternalLink,
  Play,
  File,
} from "lucide-react";

// Interfaces for tracking pre-course requirements
interface PreCourseRequirement {
  id: string;
  title: string;
  description: string;
  completed: {
    user: boolean;
    coParent: boolean;
  };
  required: boolean;
  icon: React.ReactNode;
  action: string;
}

// Mock data interfaces
interface CourseDate {
  scheduledDate: Date | null;
  proposedDate: Date | null;
  proposedTime?: string; // Time in "HH:MM" format
  proposedBy: string | null;
  approved: boolean;
}

interface Waiver {
  id: string;
  title: string;
  description: string;
  signed: {
    user: boolean;
    coParent: boolean;
  };
  signedDate?: {
    user: Date | null;
    coParent: Date | null;
  };
}

interface HolidayPreference {
  id: string;
  title: string;
  completed: {
    user: boolean;
    coParent: boolean;
  };
}

// New Resource interface
interface Resource {
  id: string;
  title: string;
  description: string;
  type: "video" | "pdf" | "article" | "worksheet";
  url: string;
  duration?: string;
  thumbnail?: string;
  completed: boolean;
  featured: boolean;
}

export default function Home3() {
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const [showSupportDialog, setShowSupportDialog] = useState(false);
  const [showResourcesDialog, setShowResourcesDialog] = useState(false);
  
  // In this version, everything is already completed
  const [coParentRegistered] = useState(true);
  const [courseScheduled] = useState(true);
  
  // Waiver and holiday preferences state - all completed
  const [waivers] = useState<Waiver[]>([
    {
      id: "confidentiality",
      title: "Confidentiality Agreement",
      description: "Agreement to keep all shared information confidential during the course and parenting plan development.",
      signed: { user: true, coParent: true },
      signedDate: { 
        user: new Date(2024, 3, 15), 
        coParent: new Date(2024, 3, 16) 
      },
    },
    {
      id: "mediation",
      title: "Terms & Conditions",
      description: "Agreement to participate in good faith in the mediation process if needed during the course.",
      signed: { user: true, coParent: true },
      signedDate: { 
        user: new Date(2024, 3, 15), 
        coParent: new Date(2024, 3, 16) 
      },
    },
  ]);
  
  const [holidayPreferences] = useState<HolidayPreference[]>([
    {
      id: "holidays",
      title: "Holiday Selection Form",
      completed: { user: true, coParent: true },
    }
  ]);
  
  // Resource data
  const [resources] = useState<Resource[]>([
    {
      id: "resource-1",
      title: "Understanding Co-Parenting Dynamics",
      description: "A comprehensive guide to effective co-parenting strategies and communication.",
      type: "video",
      url: "/resources/co-parenting-dynamics",
      duration: "18 min",
      thumbnail: "/resources/thumbnails/video1.jpg",
      completed: false,
      featured: true
    },
    {
      id: "resource-2",
      title: "Children's Needs During Separation",
      description: "Learn about addressing children's emotional needs during family transitions.",
      type: "article",
      url: "/resources/children-needs",
      thumbnail: "/resources/thumbnails/article1.jpg",
      completed: false,
      featured: true
    },
    {
      id: "resource-3",
      title: "Effective Communication Template",
      description: "A worksheet to help establish healthy communication patterns with your co-parent.",
      type: "pdf",
      url: "/resources/communication-template",
      completed: false,
      featured: false
    },
    {
      id: "resource-4",
      title: "Managing Conflict Resolution",
      description: "Strategies for resolving disagreements constructively.",
      type: "video",
      url: "/resources/conflict-resolution",
      duration: "22 min",
      completed: false,
      featured: false
    },
    {
      id: "resource-5",
      title: "Financial Planning for Co-Parents",
      description: "Guidelines for managing shared expenses and financial responsibilities.",
      type: "article",
      url: "/resources/financial-planning",
      completed: false,
      featured: false
    }
  ]);

  // Pre-course requirements - all completed
  const preCourseRequirements: PreCourseRequirement[] = [
    {
      id: "co-parent",
      title: "Co-Parent Registration",
      description: "Invite your co-parent to join the platform.",
      completed: { user: true, coParent: true },
      required: true,
      icon: <Users className="h-4 w-4" />,
      action: "Invite Co-Parent"
    },
    {
      id: "waivers",
      title: "Waivers & Agreements",
      description: "Review and sign the required legal agreements.",
      completed: { 
        user: true, 
        coParent: true 
      },
      required: true,
      icon: <FileText className="h-4 w-4" />,
      action: "Review & Sign"
    },
    {
      id: "holidays",
      title: "Holiday Preferences",
      description: "Select your preferences for holiday schedules.",
      completed: { 
        user: true, 
        coParent: true 
      },
      required: true,
      icon: <CalendarDays className="h-4 w-4" />,
      action: "Select Preferences"
    },
    {
      id: "schedule",
      title: "Schedule Course Session",
      description: "Pick a date and time to complete the course with your co-parent.",
      completed: { user: true, coParent: true },
      required: false,
      icon: <Clock className="h-4 w-4" />,
      action: "Schedule Now"
    }
  ];

  // Calculate completion status - everything is already complete
  const requiredItemsCompleted = true;
  const requiredItemsCount = preCourseRequirements.filter(item => item.required).length;
  const completedRequiredItems = requiredItemsCount;
    
  // Calculate progress percentage
  const progressPercentage = 100;
  
  // Calculate if both parents have completed requirements
  const bothParentsCompleted = true;
  
  // Get resource icon based on type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4 text-[#6c54da]" />;
      case "pdf":
        return <FileText className="h-4 w-4 text-[#6c54da]" />;
      case "article":
        return <BookOpen className="h-4 w-4 text-[#6c54da]" />;
      case "worksheet":
        return <File className="h-4 w-4 text-[#6c54da]" />;
      default:
        return <File className="h-4 w-4 text-[#6c54da]" />;
    }
  };
    
  // Get status icon for checklist item - always use themed icon
  const getStatusIcon = (item: PreCourseRequirement) => {
    // Always use themed icons based on requirement type, regardless of completion status
    switch (item.id) {
      case "co-parent":
        return (
          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#f0e6ff] border-2 border-[#6c54da]/50">
            <Users className="h-4 w-4 text-[#6c54da]" />
          </div>
        );
        
      case "waivers":
        return (
          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#f0e6ff] border-2 border-[#6c54da]/50">
            <FileText className="h-4 w-4 text-[#6c54da]" />
          </div>
        );
        
      case "holidays":
        return (
          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#f0e6ff] border-2 border-[#6c54da]/50">
            <CalendarDays className="h-4 w-4 text-[#6c54da]" />
          </div>
        );
        
      case "schedule":
        return (
          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 border border-gray-200">
            <Clock className="h-4 w-4 text-gray-500" />
          </div>
        );
        
      default:
        return (
          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#f0e6ff] border-2 border-[#6c54da]/50">
            <Circle className="h-4 w-4 text-[#6c54da]" />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f5ff] via-white to-white">
      {/* Header */}
      <Header 
        title="Family Dashboard"
        onMenuClick={() => {}}
      />

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-4">
        {/* Warm welcome message - small and centered */}
        <section className="text-center mb-2">
          <h1 className="text-lg font-medium text-[#2e1a87] mb-1">
            Welcome back, {user?.displayName || "Emily"}
          </h1>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            You're taking important steps for your family's future.
          </p>
        </section>
        
        {/* Main card with pre-course checklist */}
        <section className="relative">
          {/* Main card */}
          <div className="bg-white rounded-xl p-6 border border-[#6c54da]/20 shadow-sm relative overflow-hidden">
            {/* Soft background illustration */}
            <div className="absolute -right-24 -bottom-24 w-64 h-64 rounded-full bg-gradient-to-br from-[#f5f0ff] to-transparent opacity-50 pointer-events-none"></div>
            
            <div className="flex flex-col relative z-10">
              {/* Combined progress section */}
              <div className="mb-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 bg-[#f5f0ff] rounded-full flex items-center justify-center flex-shrink-0">
                    <ClipboardList className="h-4.5 w-4.5 text-[#6c54da]" />
                  </div>
                  <div>
                    <h2 className="font-medium text-[#2e1a87] text-base">
                      Before you start your parenting plan
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Please complete these preparation steps for the best experience.
                    </p>
                  </div>
                </div>
                
                {/* Space instead of visual progress */}
                <div className="mb-3 mt-3">
                  {bothParentsCompleted && (
                    <div className="bg-green-50 border border-green-100 rounded-lg p-2.5 mb-2">
                      <p className="text-sm text-green-700 flex items-center">
                        <CheckCheck className="h-4 w-4 mr-2 text-green-600" />
                        You and your co-parent have completed all required steps!
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Pre-course checklist */}
                <div className="bg-[#f9f5ff]/80 rounded-lg p-4 mb-5">
                  <h3 className="font-medium text-[#2e1a87] mb-2.5 flex items-center text-sm">
                    <CheckCheck className="h-4 w-4 mr-2" />
                    Pre-Course Checklist
                  </h3>
                  
                  <ul className="space-y-2">
                    {preCourseRequirements.map((item) => (
                      <li 
                        key={item.id} 
                        className={`rounded-md p-3 ${
                          item.completed.user ? 'bg-white/60' : 'bg-white'
                        }`}
                      >
                        {/* Use flexbox instead of grid for better vertical alignment */}
                        <div className="flex items-center gap-3">
                          {/* Column 1: Icon */}
                          <div className="flex-shrink-0">
                            {getStatusIcon(item)}
                          </div>
                          
                          {/* Column 2: Title and description */}
                          <div className="flex-grow min-w-0">
                            <h4 className="font-medium text-[#2e1a87] text-sm flex items-center justify-between">
                              <span>{item.title}</span>
                              
                              {/* Completion status shown on the right */}
                              {item.completed.user && (
                                <Check className="h-4 w-4 text-green-600 ml-1" />
                              )}
                            </h4>
                            <p className="text-xs text-gray-600">{item.description}</p>
                            
                            {/* Status label */}
                            <div className="mt-1 flex justify-between items-center text-xs">
                              <div className="flex gap-3">
                                <span>
                                  <span className="font-medium mr-1">You:</span>
                                  {item.completed.user ? (
                                    <span className="text-green-600">Completed</span>
                                  ) : (
                                    <span className="text-amber-500">Pending</span>
                                  )}
                                </span>
                                <span>
                                  <span className="font-medium mr-1">Co-Parent:</span>
                                  {item.completed.coParent ? (
                                    <span className="text-green-600">Completed</span>
                                  ) : (
                                    <span className="text-amber-500">Pending</span>
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Session status - change to show scheduled session */}
                <div className="bg-[#f0f9ff] rounded-lg p-4 mb-5">
                  <h3 className="font-medium text-[#0d4f8c] mb-2.5 flex items-center text-sm">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Course Session
                  </h3>
                  
                  <div className="bg-white rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          Session Scheduled
                        </h4>
                        <p className="text-sm text-green-600 font-medium">
                          Sunday, May 5, 2024 at 10:00 AM
                        </p>
                      </div>
                      <div className="bg-green-50 rounded-full p-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* NEW: Resources section */}
                <div className="bg-[#eff9ef] rounded-lg p-4 mb-5">
                  <div className="flex justify-between items-center mb-2.5">
                    <h3 className="font-medium text-[#2e6a1a] flex items-center text-sm">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Resources
                    </h3>
                    <button 
                      onClick={() => setShowResourcesDialog(true)}
                      className="text-xs text-[#3B82F6] hover:text-[#2563EB] hover:underline flex items-center"
                    >
                      View all
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                  
                  {/* Show featured resources only */}
                  <div className="space-y-2">
                    {resources.filter(r => r.featured).map((resource) => (
                      <div key={resource.id} className="bg-white rounded-md p-3">
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#e6f5e6] border-2 border-[#2e6a1a]/30 flex-shrink-0 mt-1">
                            {getResourceIcon(resource.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-[#2e1a87] text-sm line-clamp-2">
                                {resource.title}
                              </h4>
                              
                              {resource.completed ? (
                                <div className="bg-green-50 rounded-full p-1 flex-shrink-0 ml-1">
                                  <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                                </div>
                              ) : (
                                resource.type === "video" && (
                                  <div className="bg-[#f0e6ff] rounded-full p-1 flex-shrink-0 ml-1">
                                    <Play className="h-3.5 w-3.5 text-[#6c54da]" />
                                  </div>
                                )
                              )}
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-2 mt-0.5">{resource.description}</p>
                            <div className="flex justify-between items-center mt-1.5">
                              <span className="inline-flex items-center text-xs bg-[#f9f5ff] px-2 py-0.5 rounded-full text-[#6c54da] font-medium">
                                {resource.type}
                                {resource.duration && <span className="ml-1">{resource.duration}</span>}
                              </span>
                              <Link href={resource.url}>
                                <button className="text-xs text-[#3B82F6] hover:text-[#2563EB] hover:underline flex items-center">
                                  View
                                  <ExternalLink className="h-3 w-3 ml-1" />
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* CTA now active since everything is completed */}
                <div className="pb-1 pt-4">
                  <Link href="/course">
                    <Button className="w-full py-6 font-medium text-base bg-[#2e1a87] hover:bg-[#251565] text-white">
                      Start Course
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Small floating help button */}
          <button 
            onClick={() => setShowSupportDialog(true)}
            className="absolute bottom-6 right-6 z-20 bg-white p-2 rounded-full shadow-md border border-gray-200 text-gray-500 hover:text-[#2e1a87] transform hover:scale-105 transition-all duration-200"
          >
            <span className="sr-only">Get help</span>
            <Circle className="h-5 w-5" />
          </button>
        </section>
        
        {/* Support dialog */}
        <Dialog open={showSupportDialog} onOpenChange={setShowSupportDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Need Support?</DialogTitle>
              <DialogDescription>
                We're here to help you navigate this process with care and understanding.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-[#f0e6ff] p-2 rounded-full">
                  <Users className="h-4 w-4 text-[#6c54da]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Talk to a Mediator</h3>
                  <p className="text-sm text-gray-500">
                    Schedule a private conversation with one of our trained mediators.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-[#f0e6ff] p-2 rounded-full">
                  <FileText className="h-4 w-4 text-[#6c54da]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Resource Library</h3>
                  <p className="text-sm text-gray-500">
                    Access helpful articles, videos, and worksheets for co-parenting.
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSupportDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Resources dialog */}
        <Dialog open={showResourcesDialog} onOpenChange={setShowResourcesDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Co-Parenting Resources</DialogTitle>
              <DialogDescription>
                Access educational materials to support your co-parenting journey.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {resources.map((resource) => (
                <div key={resource.id} className="bg-white rounded-md p-3 border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#e6f5e6] border-2 border-[#2e6a1a]/30 flex-shrink-0 mt-1">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-[#2e1a87] text-sm">
                          {resource.title}
                        </h4>
                        
                        {resource.completed ? (
                          <div className="bg-green-50 rounded-full p-1 flex-shrink-0 ml-1">
                            <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                          </div>
                        ) : (
                          resource.type === "video" && (
                            <div className="bg-[#f0e6ff] rounded-full p-1 flex-shrink-0 ml-1">
                              <Play className="h-3.5 w-3.5 text-[#6c54da]" />
                            </div>
                          )
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">{resource.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="inline-flex items-center text-xs bg-[#f9f5ff] px-2 py-0.5 rounded-full text-[#6c54da] font-medium">
                          {resource.type}
                          {resource.duration && <span className="ml-1">{resource.duration}</span>}
                        </span>
                        <Link href={resource.url}>
                          <button className="text-xs text-[#3B82F6] hover:text-[#2563EB] hover:underline flex items-center font-semibold">
                            View resource
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowResourcesDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>

      {/* Minimalist footer with support links */}
      <footer className="mt-4 text-center">
        <div className="flex justify-center items-center gap-6 text-xs text-gray-500">
          <button 
            onClick={() => setShowSupportDialog(true)}
            className="flex items-center hover:text-[#2e1a87] transition-colors"
          >
            <HelpCircle className="h-3.5 w-3.5 mr-1.5" />
            <span>Get Support</span>
          </button>
          <a href="#" className="hover:text-[#2e1a87] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#2e1a87] transition-colors">Terms of Service</a>
        </div>
        
        <p className="text-xs text-gray-500 mt-8 max-w-md mx-auto font-light italic">
          "Every thoughtful decision you make today creates a more supportive tomorrow for your children."
        </p>
      </footer>
    </div>
  );
}