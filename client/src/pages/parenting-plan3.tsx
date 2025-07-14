import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  Download, 
  Printer, 
  MoreHorizontal, 
  Edit3, 
  Share2,
  History,
  Menu,
  Send,
  Bot,
  MessageSquare,
  Clock,
  Users,
  CheckCircle,
  Sparkles,
  Eye,
  Save,
  X,
  ChevronDown,
  ChevronRight,
  Zap,
  HelpCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { NavigationMenu } from "@/components/NavigationMenu";

type ViewMode = "view" | "edit";

interface Section {
  id: string;
  title: string;
  content: string;
  isEditable?: boolean;
}

interface MainSection {
  id: string;
  title: string;
  subsections: Section[];
}

const mainSections: MainSection[] = [
  {
    id: "parental-responsibility",
    title: "Parental Responsibility and Decision Making",
    subsections: [
      {
        id: "1",
        title: "Family Information and Jurisdiction",
        content: "The parents named below, which will be referred to throughout this Agreement as we, us, or by individual names, are entering into this Agreement to address their legal rights and obligations relating to their minor children. It is our intention to submit this Agreement to the Court in any legal proceeding to determine our parenting rights and obligations. We both want the Court to adopt this Agreement in its entirety because we agree that it is in our children's best interests.\n\n1. PARENTS\n\nOur names and contact information are:\n\nEric Rabinovitz\n(813) 789-0202\nebrcapital@gmail.com\n\nMichelle Rabinovitz\n(813) 495-2219\nmmrabinovitz@gmail.com\n\nWe will keep each other informed of any changes to any of our contact information listed above, in each instance immediately upon any change, or as soon as we possibly can after any change.\n\n2. CHILDREN\n\nOur children are:\n\nInitials: A. J.\nDate of birth: Mar 12, 2013\nGender: Female",
        isEditable: true
      },
      {
        id: "2",
        title: "Shared Decision-Making",
        content: "We are going to make decisions about our children as co-parents, together, and always with our child(ren)'s best interests as the most important factor. These decisions include all important decisions affecting the welfare of our child(ren), including all decisions about the child(ren)'s Education (choice of schools, tutoring, special educational needs), Healthcare (non-emergency medical treatments, choice of doctors), Significant extracurricular activities.\n\nNeither of us will have a superior right or authority when it comes to co-parenting our children unless it expressly says so below. We will treat each other as equals, and we will do our best to ensure that our child(ren) see us as equals when it comes to all important decisions. We will never involve our children in any disputes that we may have about them because we understand how damaging this could be for our children.",
        isEditable: true
      },
      {
        id: "3",
        title: "Resolving Disagreements",
        content: "If we have a disagreement and we are unable to resolve it, then we will:\n\n• Remember and acknowledge that disagreements are normal and will happen from time to time\n• Treat each other with respect and focus on what is best for our child(ren), instead of our own needs and wants\n• Take a break if our discussion ever gets unpleasant, too argumentative, or too heated\n• Agree on a timeline for resuming the discussion so that deadlines can be met\n• Take time to research options independently before resuming discussions\n• Consult with relevant professionals for their perspectives, which are likely to be more neutral than our own\n• Document in writing any agreement we ultimately reach\n• Refrain from involving our child(ren) unless we are doing it together, and solely for the purpose of understanding their preference",
        isEditable: true
      },
      {
        id: "4",
        title: "Day-to-Day Decision-Making",
        content: "Nothing in this agreement is intended to interfere with our respective rights to make decisions regarding the day-to-day care and control of our child(ren) while the child(ren) are with us. Similarly, we both are allowed to make immediate, emergency decisions affecting the health or safety of the child(ren) if such a decision is ever necessary. If there is ever such an emergency, then we both commit to notify each other of the situation as soon as reasonably possible.",
        isEditable: true
      },
      {
        id: "5",
        title: "Extra-curricular Activities",
        content: "We agree that extracurricular activities are very important for the development of our child(ren) in many respects. We will discuss all proposed extracurricular activities with each other, and these are the things we agree are important to consider:\n• The child(ren)'s interests and desires\n• The location of activities relative to both our homes\n• How the activities will fit within our time sharing schedule\n• What equipment or supplies will be needed and how they'll be purchased, stored, and transported from one home to the other\n• How activities may impact schoolwork and academic progress\n• How competition or performance travel will impact our timesharing schedule\n\nActivity decisions will be reviewed annually",
        isEditable: true
      },
      {
        id: "6",
        title: "Sharing Information/Records",
        content: "We both will have equal access to all important information about our child(ren) at all times. We will each take care to ensure that anytime we have the opportunity to list the other parent's name on any document or list, we will do so because it is our intention to both be listed as authorized parties, contacts, or recipients for all medical, school, and other records pertaining to our child(ren). We also will try our best to always share any information that we obtain anytime we may independently consult with any professionals or other important people that are involved with our child(ren).\n\nBoth of us have equal rights to inspect and receive governmental agency and law enforcement records concerning the child(ren). Both of us will have equal and independent authority to confer with the child(ren)'s school, day care, health care providers, and other programs with regard to the child(ren)'s educational, emotional, and social progress.\n\nBoth of us will always be listed as 'emergency contacts' for the child(ren).",
        isEditable: true
      },
      {
        id: "7",
        title: "Communication",
        content: "We agree and understand that communication is critical to good coparenting. We also agree and understand that communications regarding our child(ren) should be between the two of us, as parents. Neither of us will ever use a child as a messenger to convey information, ask questions, or set up schedule changes. We agree to communicate freely with each other in a respectful manner using one or more of the following methods of communication: email, text, phone\n\nWe further agree and understand that our child(ren) deserve(s) to have communication with both of us whenever reasonable, which is not more than once or twice on most days. We each will ensure that our child(ren) has/have regular contact with the other parent in a manner that does not interfere with time sharing and routines.",
        isEditable: true
      },
      {
        id: "8",
        title: "Child Care",
        content: "We agree that the selection of individuals to care for our child(ren) is very important and that we each should be given consideration in this selection. We will try our best to use the same child care providers so that our child(ren) has/have consistency and safety, but we are free to choose our own child care providers as well.\n\nWe will give each other a right of first refusal to take care of the child(ren) whenever either of us is going to be unavailable for a period of at least One Overnight. This means that anytime one of us knows that we will be unavailable for One Overnight, the other parent will be given the opportunity to take care of the children during that time.",
        isEditable: true
      }
    ]
  },
  {
    id: "timesharing",
    title: "Timesharing",
    subsections: [
      {
        id: "9",
        title: "Scheduling and Our Calendar",
        content: "We will maintain a shared calendar system that clearly shows our timesharing schedule, including regular rotation, holidays, and any special arrangements. This calendar will be accessible to both parents and updated regularly to reflect any agreed-upon changes. The calendar will include pickup and drop-off times, locations, and any special notes relevant to each exchange.",
        isEditable: true
      },
      {
        id: "10",
        title: "Weekday and Weekend Schedule",
        content: "Our regular timesharing schedule will be based on alternating weeks, running from Sunday evening to Sunday evening. During the school year, exchanges will occur on Sunday evenings at 6:00 PM. The receiving parent will pick up the child(ren) from the other parent's residence. Weekend activities and commitments should be coordinated between both parents to ensure consistency for the child(ren).",
        isEditable: true
      },
      {
        id: "11",
        title: "Holiday Schedule",
        content: "Holidays will be alternated annually between parents unless otherwise agreed. Major holidays include: Christmas Day, Thanksgiving Day, New Year's Day, Easter, Memorial Day, Independence Day, Labor Day, and the child(ren)'s birthday. Christmas Day (12:00 AM - 11:59 PM) will alternate yearly. The child(ren)'s birthday celebrations may be shared or alternated as agreed upon by both parents, with both parents having the right to celebrate with the child(ren).",
        isEditable: true
      },
      {
        id: "12",
        title: "School Breaks",
        content: "Spring break will alternate annually between parents. Winter break will be divided equally, with the first half going to one parent and the second half to the other, alternating yearly who gets the first half. Summer vacation time will be divided to ensure both parents have meaningful time with the child(ren), with each parent entitled to at least two consecutive weeks of uninterrupted vacation time.",
        isEditable: true
      },
      {
        id: "13",
        title: "Transportation and Exchange",
        content: "Transportation for regular exchanges is the responsibility of the receiving parent unless otherwise agreed. Exchanges will occur at agreed-upon locations that are convenient and safe for all parties. During school periods, exchanges may occur at the child(ren)'s school. Both parents agree to have the child(ren) ready for exchanges on time and will communicate any delays immediately. The child(ren) should arrive with appropriate clothing, medications, and personal items needed for their stay.",
        isEditable: true
      },
      {
        id: "14",
        title: "Travel & Work Restrictions",
        content: "Neither parent may travel with the child(ren) outside of the state of Florida without written consent from the other parent at least 30 days in advance, except for medical emergencies. For any travel exceeding 100 miles from the child(ren)'s primary residence, 48-hour advance notice is required. Work-related travel that interferes with scheduled timesharing should be discussed and arrangements made for alternative care or schedule adjustments.",
        isEditable: true
      }
    ]
  },
  {
    id: "educational-decisions",
    title: "Educational Decisions",
    subsections: [
      {
        id: "15",
        title: "School Choice and Enrollment",
        content: "Both parents will participate equally in decisions regarding the child(ren)'s education, including school choice, enrollment, and any changes to educational placement. Any change of school requires mutual written consent from both parents. Both parents have equal rights to participate in school enrollment, registration, and educational planning decisions. School selection will prioritize the child(ren)'s academic needs and best interests.",
        isEditable: true
      },
      {
        id: "16",
        title: "Academic Performance and Support",
        content: "Both parents will actively support the child(ren)'s academic success by ensuring homework completion during their respective timesharing periods, providing appropriate study environments, and communicating with teachers as needed. Any decisions regarding tutoring, additional academic support, or educational interventions require mutual agreement. Costs for approved educational support will be shared proportionally based on income.",
        isEditable: true
      },
      {
        id: "17",
        title: "Parent-Teacher Communication",
        content: "Both parents have equal access to school records, teacher conferences, and school events. Both parents should be listed as contacts with the school and have independent authority to communicate with teachers and school staff regarding the child(ren)'s progress. Important educational information must be shared promptly between parents. Both parents may attend school functions, performances, and activities regardless of whose timesharing period it occurs during.",
        isEditable: true
      },
      {
        id: "18",
        title: "Special Education Needs",
        content: "Should the child(ren) require special education services, both parents will participate equally in IEP meetings, evaluations, and educational planning. All decisions regarding special education services, accommodations, and related services require mutual consent from both parents. Both parents will be actively involved in implementing any special education plans and ensuring consistency between households.",
        isEditable: true
      }
    ]
  },
  {
    id: "final-considerations",
    title: "Final Considerations",
    subsections: [
      {
        id: "19",
        title: "Relocation",
        content: "Neither parent may relocate with the child(ren) to a location that would substantially interfere with the other parent's timesharing without court approval or written consent from the other parent. Any parent considering relocation must provide at least 60 days' written notice to the other parent, including the proposed new address, reasons for relocation, and proposed revised timesharing schedule. The best interests of the child(ren) will be the primary consideration in any relocation decision.",
        isEditable: true
      },
      {
        id: "20",
        title: "Changes or Modifications to the Agreement",
        content: "This agreement may be modified only by written consent of both parties or by order of a court of competent jurisdiction. Any modifications must be in the child(ren)'s best interests. Both parents agree to review this agreement annually and make necessary adjustments to address the changing needs of the child(ren). Temporary schedule changes may be made by mutual agreement but do not permanently modify this agreement unless documented in writing.",
        isEditable: true
      },
      {
        id: "21",
        title: "Special Circumstances & Household Norms",
        content: "Both parents agree to maintain reasonable consistency in household rules regarding bedtime, screen time, discipline methods, and general behavior expectations to provide stability for the child(ren). Special circumstances such as illness, emergencies, or important family events will be handled with flexibility and mutual consideration for the child(ren)'s best interests. Both parents will respect each other's parenting styles while maintaining the child(ren)'s safety and well-being as the top priority.",
        isEditable: true
      },
      {
        id: "22",
        title: "Finalizing and Signing the Agreement",
        content: "Both parents acknowledge they have read, understood, and voluntarily agree to all terms of this Parenting Partnership Agreement. This agreement represents a good faith effort to provide stability, structure, and clear expectations for the child(ren)'s care and upbringing. Both parents commit to acting in the child(ren)'s best interests at all times and maintaining open, respectful communication to ensure the success of this co-parenting arrangement. This agreement shall take effect upon execution by both parties.",
        isEditable: true
      }
    ]
  }
];

export default function ParentingPlan3() {
  const [viewMode, setViewMode] = useState<ViewMode>("view");
  const [activeSection, setActiveSection] = useState<string>("1");
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  const [aiQuestion, setAiQuestion] = useState("");
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Flatten sections for easier management
  const sections = mainSections.flatMap(section => section.subsections);
  const [sectionsState, setSectionsState] = useState<Section[]>(sections);

  // Auto-scroll to active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionsState.forEach((section) => {
      const element = sectionRefs.current[section.id];
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionsState]);

  const updateSectionContent = (sectionId: string, newContent: string) => {
    setSectionsState(prev => prev.map(section => 
      section.id === sectionId ? { ...section, content: newContent } : section
    ));
  };

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleAiSubmit = () => {
    if (aiQuestion.trim()) {
      // Here you would send the question to your AI backend
      console.log("AI Question:", aiQuestion);
      setAiQuestion("");
    }
  };

  const handleSaveChanges = () => {
    setViewMode("view");
    // Here you would typically save the changes to your backend
  };

  const handleCancelEdit = () => {
    setViewMode("view");
    // Here you would typically revert any unsaved changes
  };

  const getLastUpdated = () => {
    return new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
        <NavigationMenu />
        
        {/* Clean Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSideNavOpen(!isSideNavOpen)}
                  className="lg:hidden"
                >
                  <Menu className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Parenting Partnership Agreement</h1>
                  <div className="flex items-center space-x-3 mt-1">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      Legal Ready
                    </Badge>
                    <span className="text-xs text-gray-500">Version 2.1</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === "edit" ? "view" : "edit")}
                >
                  {viewMode === "edit" ? (
                    <><Eye className="h-4 w-4 mr-2" />View</>
                  ) : (
                    <><Edit3 className="h-4 w-4 mr-2" />Edit</>
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Printer className="h-4 w-4 mr-2" />
                      Print Document
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share with Co-Parent
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <History className="h-4 w-4 mr-2" />
                      View History
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex">
          {/* Left Sidebar - Table of Contents (Sticky) */}
          <div className={cn(
            "w-80 flex-shrink-0 transition-all duration-200 mr-4",
            isSideNavOpen ? "block" : "hidden lg:block"
          )}>
            <div className="sticky top-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-purple-200 p-4">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Table of Contents</h3>
                <div className="w-full space-y-4">
                  {mainSections.map((mainSection) => (
                    <div key={mainSection.id} className="border border-purple-200 rounded-lg">
                      <div className="px-3 py-2 text-xs font-semibold text-gray-900 bg-purple-50 rounded-t-lg border-b border-purple-200">
                        {mainSection.title}
                      </div>
                      <div className="px-3 py-2">
                        <nav className="space-y-1">
                          {mainSection.subsections.map((subsection) => (
                            <button
                              key={subsection.id}
                              onClick={() => scrollToSection(subsection.id)}
                              className={cn(
                                "w-full text-left px-2 py-1.5 text-xs font-medium rounded transition-all duration-200",
                                "hover:bg-purple-50",
                                activeSection === subsection.id
                                  ? "bg-[#2e1a87] text-white shadow-sm"
                                  : "text-gray-700"
                              )}
                            >
                              <div className="flex items-center">
                                <div className={cn(
                                  "w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0",
                                  activeSection === subsection.id 
                                    ? "bg-white text-[#2e1a87]" 
                                    : "bg-purple-100 text-purple-600"
                                )}>
                                  {subsection.id}
                                </div>
                                <span className="truncate text-xs leading-tight">{subsection.title}</span>
                              </div>
                            </button>
                          ))}
                        </nav>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Document Area */}
          <div className="flex-1 mr-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-purple-200 p-6">
              <div className="max-w-none space-y-6">
                {sectionsState.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    ref={(el) => (sectionRefs.current[section.id] = el)}
                    className={cn(
                      "scroll-mt-8",
                      index > 0 && "border-t border-gray-200 pt-6"
                    )}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {section.title}
                      </h2>
                      {section.isEditable && viewMode === "view" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setViewMode("edit")}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    {viewMode === "edit" && section.isEditable ? (
                      <div className="space-y-4">
                        <Textarea
                          value={section.content}
                          onChange={(e) => updateSectionContent(section.id, e.target.value)}
                          className="min-h-[200px] resize-none font-mono text-sm"
                          placeholder="Enter content for this section..."
                        />
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancelEdit}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleSaveChanges}
                            className="bg-[#2e1a87] hover:bg-[#3d2a9b] text-white"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="prose prose-gray max-w-none">
                        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {section.content}
                        </div>
                      </div>
                    )}
                  </section>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - AI Assistant */}
          <div className={cn(
            "w-80 flex-shrink-0 transition-all duration-200",
            isAiPanelOpen || "hidden lg:block"
          )}>
            <div className="sticky top-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-purple-200 p-4 flex flex-col space-y-4">
                <div className="flex items-center">
                  <Bot className="h-5 w-5 mr-2 text-[#2e1a87]" />
                  <h3 className="text-base font-semibold text-gray-900">AI Parenting Plan Assistant</h3>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    I can help you refine your parenting plan with suggestions, legal insights, and personalized recommendations.
                  </p>
                  
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-2"
                      size="sm"
                    >
                      <Sparkles className="h-4 w-4 mr-2 text-purple-600" />
                      <div className="text-left">
                        <div className="font-medium">Improve This Section</div>
                        <div className="text-xs text-gray-500">Get suggestions for clarity and completeness</div>
                      </div>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-2"
                      size="sm"
                    >
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      <div className="text-left">
                        <div className="font-medium">Legal Review</div>
                        <div className="text-xs text-gray-500">Check for legal compliance</div>
                      </div>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-2"
                      size="sm"
                    >
                      <Users className="h-4 w-4 mr-2 text-blue-600" />
                      <div className="text-left">
                        <div className="font-medium">Co-Parent Perspective</div>
                        <div className="text-xs text-gray-500">Consider other viewpoints</div>
                      </div>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-2"
                      size="sm"
                    >
                      <HelpCircle className="h-4 w-4 mr-2 text-orange-600" />
                      <div className="text-left">
                        <div className="font-medium">Explain Section</div>
                        <div className="text-xs text-gray-500">Understand what this means</div>
                      </div>
                    </Button>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-auto">
                  <div className="flex items-center space-x-2 mb-3">
                    <Input
                      placeholder="Ask me anything..."
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAiSubmit()}
                      className="flex-1 text-sm"
                    />
                    <Button
                      onClick={handleAiSubmit}
                      size="sm"
                      className="bg-[#2e1a87] hover:bg-[#3d2a9b] text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Zap className="h-4 w-4 text-purple-600 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-purple-800">Quick Tip</p>
                        <p className="text-xs text-purple-700">
                          Ask: "What's missing from this section?" or "How can we make this more fair?"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile AI Assistant Float Button */}
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
            className="rounded-full w-14 h-14 bg-[#2e1a87] hover:bg-[#3d2a9b] text-white shadow-lg"
          >
            <Bot className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </>
  );
}