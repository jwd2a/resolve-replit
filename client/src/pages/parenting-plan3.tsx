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
      }
    ]
  },
  {
    id: "timesharing",
    title: "Timesharing",
    subsections: [
      {
        id: "4",
        title: "Scheduling and Our Calendar",
        content: "We will maintain a shared calendar system that clearly shows our timesharing schedule, including regular rotation, holidays, and any special arrangements. This calendar will be accessible to both parents and updated regularly to reflect any agreed-upon changes. The calendar will include pickup and drop-off times, locations, and any special notes relevant to each exchange.",
        isEditable: true
      },
      {
        id: "5",
        title: "Regular Parenting Time",
        content: "We agree that both parents will have regular, meaningful time with our children. Our standard schedule is as follows:\n\n• Parent A: Monday after school until Wednesday morning drop-off\n• Parent B: Wednesday after school until Friday morning drop-off\n• Alternating weekends from Friday after school until Sunday evening at 6:00 PM\n\nExchange times and locations:\n• School days: Exchanges occur at school\n• Non-school days: Exchanges occur at 123 Main Street, Anytown, State 12345\n• Weekend exchanges: Friday at 6:00 PM and Sunday at 6:00 PM",
        isEditable: true
      },
      {
        id: "6",
        title: "Holiday and Vacation Schedule",
        content: "Holiday time takes precedence over the regular parenting schedule. We will alternate major holidays each year.\n\nYear A (Odd Years) - Parent A:\n• New Year's Day\n• Memorial Day Weekend\n• July 4th\n• Labor Day Weekend\n• Thanksgiving Weekend\n• Christmas Day\n\nYear B (Even Years) - Parent B:\n• New Year's Day\n• Memorial Day Weekend\n• July 4th\n• Labor Day Weekend\n• Thanksgiving Weekend\n• Christmas Day",
        isEditable: true
      }
    ]
  },
  {
    id: "educational-decisions",
    title: "Educational Decisions",
    subsections: [
      {
        id: "7",
        title: "School Choice and Educational Planning",
        content: "Both parents will participate in making decisions about our children's education, including school choice, tutoring, special educational needs, and extracurricular activities. We will consult with teachers and educational professionals to make informed decisions that serve our children's best interests.",
        isEditable: true
      },
      {
        id: "8",
        title: "Information Sharing and Records Access",
        content: "We both will have equal access to all important information about our child(ren) at all times. We will each take care to ensure that anytime we have the opportunity to list the other parent's name on any document or list, we will do so because it is our intention to both be listed as authorized parties, contacts, or recipients for all medical, school, and other records pertaining to our child(ren).",
        isEditable: true
      }
    ]
  },
  {
    id: "final-considerations",
    title: "Final Considerations",
    subsections: [
      {
        id: "9",
        title: "Communication Guidelines",
        content: "We agree and understand that communication is critical to good coparenting. We also agree and understand that communications regarding our child(ren) should be between the two of us, as parents. Neither of us will ever use a child as a messenger to convey information, ask questions, or set up schedule changes. We agree to communicate freely with each other in a respectful manner using one or more of the following methods of communication: email, text, phone",
        isEditable: true
      },
      {
        id: "10",
        title: "Dispute Resolution",
        content: "If we cannot resolve a dispute through direct communication, we will seek mediation before pursuing legal action. We agree to participate in good faith mediation and to prioritize our children's well-being throughout any conflict resolution process.",
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

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-112px)] flex">
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
            <div className="h-full overflow-y-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-purple-200 p-6">
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
            <div className="h-full flex flex-col">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-purple-200 p-4 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <Bot className="h-5 w-5 mr-2 text-[#2e1a87]" />
                  <h3 className="text-base font-semibold text-gray-900">AI Parenting Plan Assistant</h3>
                </div>
                
                <div className="space-y-3 mb-4">
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