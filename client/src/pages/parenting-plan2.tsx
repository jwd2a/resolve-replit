import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Download, 
  Printer, 
  MoreHorizontal, 
  Edit3, 
  Save, 
  X, 
  Clock, 
  Users,
  MessageSquare,
  History,
  Eye,
  Share2,
  BookOpen,
  HelpCircle,
  CheckCircle,
  Menu,
  ChevronDown,
  ChevronRight,
  Send,
  Bot,
  Zap
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

export default function ParentingPlan2() {
  const [viewMode, setViewMode] = useState<ViewMode>("view");
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("1");
  const [aiQuestion, setAiQuestion] = useState("");
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      title: "Family Information and Jurisdiction",
      content: "The parents named below, which will be referred to throughout this Agreement as we, us, or by individual names, are entering into this Agreement to address their legal rights and obligations relating to their minor children. It is our intention to submit this Agreement to the Court in any legal proceeding to determine our parenting rights and obligations. We both want the Court to adopt this Agreement in its entirety because we agree that it is in our children's best interests.\n\n1. PARENTS\n\nOur names and contact information are:\n\nEric Rabinovitz\n(813) 789-0202\nebrcapital@gmail.com\n\nMichelle Rabinovitz\n(813) 495-2219\nmmrabinovitz@gmail.com\n\nWe will keep each other informed of any changes to any of our contact information listed above, in each instance immediately upon any change, or as soon as we possibly can after any change.\n\n2. CHILDREN\n\nOur children are:\n\nInitials: A. J.\nDate of birth: Mar 12, 2013\nGender: Female",
      isEditable: true
    },
    {
      id: "2", 
      title: "Parental Responsibility and Decision Making",
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
  ]);

  // Scroll spy functionality
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    sections.forEach((section) => {
      const element = sectionRefs.current[section.id];
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const updateSectionContent = (sectionId: string, newContent: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, content: newContent }
        : section
    ));
  };

  const handleProposeChanges = () => {
    setViewMode("edit");
  };

  const handleSaveChanges = () => {
    setViewMode("view");
    // Here you would typically save the changes to your backend
  };

  const handleCancelEdit = () => {
    setViewMode("view");
    // Here you would typically revert any unsaved changes
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

  return (
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

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-4">
          {/* Left Sidebar - Table of Contents */}
          <div className={cn(
            "col-span-12 lg:col-span-2 transition-all duration-200",
            isSideNavOpen ? "block" : "hidden lg:block"
          )}>
            <div className="sticky top-24">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-purple-200 p-4">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Table of Contents</h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={cn(
                        "w-full text-left px-2 py-1.5 text-xs font-medium rounded transition-all duration-200",
                        "hover:bg-purple-50",
                        activeSection === section.id
                          ? "bg-[#2e1a87] text-white shadow-sm"
                          : "text-gray-700"
                      )}
                    >
                      <div className="flex items-center">
                        <div className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0",
                          activeSection === section.id 
                            ? "bg-white text-[#2e1a87]" 
                            : "bg-purple-100 text-purple-600"
                        )}>
                          {section.id}
                        </div>
                        <span className="truncate text-xs leading-tight">{section.title}</span>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content Area - Legal Document View */}
          <div className="col-span-12 lg:col-span-7">
            {/* Legal Document Content */}
            <div className="bg-white shadow-lg border border-gray-200">
              {/* Document Header */}
              <div className="text-center border-b border-gray-300 p-6 bg-gray-50">
                <h1 className="text-2xl font-bold text-gray-900 mb-1 tracking-wide">PARENTING PARTNERSHIP AGREEMENT</h1>
                <p className="text-sm text-gray-600">Legal Document for Co-Parenting Arrangement</p>
                <p className="text-xs text-gray-500 mt-2">Date: {new Date().toLocaleDateString()}</p>
              </div>
              
              {/* Document Body */}
              <div className="p-8 space-y-6 font-serif">
                {sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    ref={(el) => (sectionRefs.current[section.id] = el)}
                    className="scroll-mt-24"
                  >
                    <div className="border-b border-gray-200 pb-6 mb-6 last:border-b-0">
                      <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">
                        SECTION {section.id} - {section.title.toUpperCase()}
                      </h2>
                      
                      {viewMode === "edit" && section.isEditable ? (
                        <div className="space-y-3">
                          <Textarea
                            value={section.content}
                            onChange={(e) => updateSectionContent(section.id, e.target.value)}
                            className="min-h-[150px] border-gray-300 focus:border-gray-500 focus:ring-gray-100 text-gray-800 leading-6 font-serif text-sm"
                            placeholder="Enter section content..."
                          />
                          <div className="flex items-center space-x-2 text-xs text-green-600 bg-green-50 p-2 rounded border border-green-200">
                            <CheckCircle className="h-3 w-3" />
                            <span>Changes tracked and require approval</span>
                          </div>
                        </div>
                      ) : (
                        <div className="max-w-none">
                          <div className="text-gray-800 leading-6 text-sm whitespace-pre-line font-serif">
                            {section.content}
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                ))}
                
                {/* Legal Signature Section */}
                <div className="mt-12 pt-6 border-t-2 border-gray-400">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">AGREEMENT SIGNATURES</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">Eric Rabinovitz</h4>
                      <div className="border-b-2 border-gray-400 pb-1 mb-3 h-12 flex items-end">
                        <span className="text-gray-400 text-xs">Digital signature pending</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        <span>Date: ________________</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">Michelle Rabinovitz</h4>
                      <div className="border-b-2 border-gray-400 pb-1 mb-3 h-12 flex items-end">
                        <span className="text-gray-400 text-xs">Digital signature pending</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        <span>Date: ________________</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Notary Section */}
                  <div className="pt-4 border-t border-gray-300">
                    <h5 className="font-bold text-gray-800 mb-3 text-sm">NOTARIZATION</h5>
                    <div className="bg-gray-50 p-4 border border-gray-300 text-xs">
                      <p className="text-gray-600 mb-2">
                        State of Florida, County of ______________
                      </p>
                      <p className="text-gray-600 mb-4 leading-tight">
                        On this _____ day of _________, 2025, before me personally appeared the above-named individuals, 
                        who proved to me on the basis of satisfactory evidence to be the persons whose names are 
                        subscribed to the within instrument and acknowledged to me that they executed the same in 
                        their authorized capacities.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="border-b border-gray-400 mb-1 h-8"></div>
                          <p className="text-xs text-center text-gray-600">Notary Public Signature</p>
                        </div>
                        <div>
                          <div className="border-b border-gray-400 mb-1 h-8"></div>
                          <p className="text-xs text-center text-gray-600">Notary Seal</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - AI Parenting Plan Assistant */}
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-24">
              <div className="space-y-6">
                {/* Enhanced AI Assistant Widget */}
                <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl flex items-center text-[#2e1a87]">
                      <Bot className="h-6 w-6 mr-3" />
                      AI Parenting Plan Assistant
                    </CardTitle>
                    <p className="text-sm text-gray-600">Expert guidance for creating fair, child-focused agreements</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Current Section Context */}
                    <div className="bg-white/80 rounded-lg p-4 border border-purple-100">
                      <h4 className="font-semibold text-sm text-gray-800 mb-2">Currently Viewing</h4>
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 rounded-full bg-[#2e1a87] text-white flex items-center justify-center text-xs font-bold">
                          {activeSection}
                        </div>
                        <span className="text-sm text-gray-700">
                          {sections.find(s => s.id === activeSection)?.title || "Document Overview"}
                        </span>
                      </div>
                    </div>

                    {/* Smart Suggestions */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-gray-800">Smart Suggestions</h4>
                      <div className="grid grid-cols-1 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="justify-start text-xs bg-white/70 hover:bg-white border-purple-200 hover:border-purple-300 h-auto py-2"
                        >
                          <div className="flex items-start space-x-2">
                            <BookOpen className="h-3 w-3 mt-0.5 text-purple-600" />
                            <div className="text-left">
                              <p className="font-medium">Explain This Section</p>
                              <p className="text-gray-500 text-xs">Get plain English explanations</p>
                            </div>
                          </div>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="justify-start text-xs bg-white/70 hover:bg-white border-purple-200 hover:border-purple-300 h-auto py-2"
                        >
                          <div className="flex items-start space-x-2">
                            <CheckCircle className="h-3 w-3 mt-0.5 text-green-600" />
                            <div className="text-left">
                              <p className="font-medium">Check Requirements</p>
                              <p className="text-gray-500 text-xs">Verify legal compliance</p>
                            </div>
                          </div>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="justify-start text-xs bg-white/70 hover:bg-white border-purple-200 hover:border-purple-300 h-auto py-2"
                        >
                          <div className="flex items-start space-x-2">
                            <Zap className="h-3 w-3 mt-0.5 text-yellow-600" />
                            <div className="text-left">
                              <p className="font-medium">Improve Language</p>
                              <p className="text-gray-500 text-xs">Make it clearer and fairer</p>
                            </div>
                          </div>
                        </Button>
                      </div>
                    </div>
                    
                    {/* Enhanced Chat Input */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-gray-800">Ask Questions</h4>
                      <div className="space-y-2">
                        <Input
                          value={aiQuestion}
                          onChange={(e) => setAiQuestion(e.target.value)}
                          placeholder="e.g., How should we handle school pickup times?"
                          className="bg-white/70 border-purple-200 focus:border-purple-400 focus:ring-purple-100 text-sm"
                          onKeyPress={(e) => e.key === 'Enter' && handleAiSubmit()}
                        />
                        <div className="flex space-x-2">
                          <Button 
                            onClick={handleAiSubmit}
                            className="bg-[#2e1a87] hover:bg-[#3d2a9b] text-white text-sm px-4 flex-1"
                            disabled={!aiQuestion.trim()}
                          >
                            <Send className="h-3 w-3 mr-2" />
                            Ask Assistant
                          </Button>
                          <Button 
                            variant="outline"
                            size="sm"
                            className="bg-white/70 border-purple-200 hover:border-purple-300"
                          >
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Quick Tips */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <HelpCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">Tip</p>
                          <p className="text-xs text-blue-700">Try asking: "What should I consider for holiday schedules?" or "How do we handle child support?"</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Chat History */}
                <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Chat History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-80 overflow-y-auto">
                      <div className="space-y-3">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-600 mb-1">You asked:</p>
                          <p className="text-sm text-gray-800">"Can you help me understand custody schedules?"</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3">
                          <p className="text-sm text-purple-600 mb-1">AI Assistant:</p>
                          <p className="text-sm text-gray-800">Custody schedules should prioritize the child's routine and both parents' availability. Common arrangements include alternating weeks, 2-2-3 schedules, or traditional every-other-weekend patterns.</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center py-4 text-sm text-gray-500">
                      <p>Ask questions to get personalized guidance</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Quick Actions */}
                <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Zap className="h-5 w-5 mr-2" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3">
                      <Button 
                        variant="outline" 
                        className="justify-start text-left h-auto p-3 bg-white/70 hover:bg-white border-purple-200 hover:border-purple-300"
                      >
                        <div className="flex items-start space-x-3">
                          <BookOpen className="h-4 w-4 mt-0.5 text-purple-600" />
                          <div>
                            <p className="font-medium text-sm">Explain This Section</p>
                            <p className="text-xs text-gray-500">Get detailed explanations of legal terms</p>
                          </div>
                        </div>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="justify-start text-left h-auto p-3 bg-white/70 hover:bg-white border-purple-200 hover:border-purple-300"
                      >
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
                          <div>
                            <p className="font-medium text-sm">Check Compliance</p>
                            <p className="text-xs text-gray-500">Verify legal requirements are met</p>
                          </div>
                        </div>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="justify-start text-left h-auto p-3 bg-white/70 hover:bg-white border-purple-200 hover:border-purple-300"
                      >
                        <div className="flex items-start space-x-3">
                          <FileText className="h-4 w-4 mt-0.5 text-blue-600" />
                          <div>
                            <p className="font-medium text-sm">Suggest Improvements</p>
                            <p className="text-xs text-gray-500">Get AI recommendations for clarity</p>
                          </div>
                        </div>
                      </Button>

                      <Button 
                        variant="outline" 
                        className="justify-start text-left h-auto p-3 bg-white/70 hover:bg-white border-purple-200 hover:border-purple-300"
                      >
                        <div className="flex items-start space-x-3">
                          <Users className="h-4 w-4 mt-0.5 text-orange-600" />
                          <div>
                            <p className="font-medium text-sm">Compare Templates</p>
                            <p className="text-xs text-gray-500">See how this compares to standards</p>
                          </div>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {viewMode === "edit" && (
                  <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center text-green-700">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Change Tracking
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-700">All changes will be tracked</span>
                        </div>
                        <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                          <Users className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-blue-700">Co-parent will be notified</span>
                        </div>
                        <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg">
                          <MessageSquare className="h-4 w-4 text-purple-500" />
                          <span className="text-sm text-purple-700">Comments can be added</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}