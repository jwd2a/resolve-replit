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
      title: "Parenting Time Schedule",
      content: "Regular parenting time shall be as follows: Parent A shall have the children every Monday and Tuesday from 6:00 PM to 8:00 AM the following day. Parent B shall have the children every Wednesday and Thursday from 6:00 PM to 8:00 AM the following day. Weekends shall alternate between parents, beginning with Parent A having the first weekend of each month. Exchange of the children shall occur at the primary residence unless otherwise agreed upon in writing.",
      isEditable: true
    },
    {
      id: "2", 
      title: "Holiday and Vacation Schedule",
      content: "Holidays shall be alternated between parents on a yearly basis according to the attached holiday schedule. Summer vacation shall be divided equally between parents with each parent having a minimum of two consecutive weeks. Each parent must provide 30 days written notice of their intended vacation time. During extended vacation periods, the non-vacationing parent shall have reasonable contact with the children via phone or video call.",
      isEditable: true
    },
    {
      id: "3",
      title: "Decision Making Authority",
      content: "Parents shall share joint legal custody and make major decisions regarding the children's education, health care, and religious upbringing together. Major decisions include but are not limited to: choice of schools, medical treatment beyond routine care, religious instruction, and extracurricular activities. Parents agree to consult with each other before making any major decisions and attempt to reach consensus.",
      isEditable: true
    },
    {
      id: "4",
      title: "Communication Guidelines",
      content: "Parents shall communicate regarding the children through the agreed-upon co-parenting app or email. Emergency communications may be made via phone call or text message. All communications should be respectful, child-focused, and businesslike. Parents agree to respond to non-emergency communications within 24 hours.",
      isEditable: true
    },
    {
      id: "5",
      title: "Transportation and Exchange",
      content: "The parent beginning their parenting time shall be responsible for picking up the children. Exchanges shall occur at 6:00 PM unless otherwise specified. If a parent will be more than 30 minutes late for an exchange, they must notify the other parent. Both parents agree to have the children ready for exchange at the designated time.",
      isEditable: true
    },
    {
      id: "6",
      title: "Financial Responsibilities",
      content: "Child support shall be paid according to the state guidelines and court order. Both parents shall maintain health insurance for the children when available through their employer at reasonable cost. Uncovered medical expenses exceeding $250 per child per year shall be shared equally between parents. Each parent is responsible for the children's expenses during their parenting time.",
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
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-purple-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSideNavOpen(!isSideNavOpen)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Parenting Partnership Agreement</h1>
                <p className="text-sm text-gray-600 mt-1">This agreement helps you create a stable, cooperative plan for your children.</p>
                <div className="flex items-center space-x-3 mt-2">
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800 rounded-full">
                    Draft
                  </Badge>
                  <span className="text-sm text-gray-500 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Last updated: Jan 15, 2024
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {viewMode === "view" ? (
                <>
                  <Button
                    onClick={handleProposeChanges}
                    className="bg-[#2e1a87] hover:bg-[#3d2a9b] text-white rounded-full px-6"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Propose Changes
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleSaveChanges}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancelEdit} className="rounded-full">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <History className="h-4 w-4 mr-2" />
                    View History
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Table of Contents */}
          <div className={cn(
            "col-span-12 lg:col-span-3 transition-all duration-200",
            isSideNavOpen ? "block" : "hidden lg:block"
          )}>
            <div className="sticky top-24">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-purple-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={cn(
                        "w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                        "hover:bg-purple-50",
                        activeSection === section.id
                          ? "bg-[#2e1a87] text-white shadow-sm"
                          : "text-gray-700"
                      )}
                    >
                      <div className="flex items-center">
                        <div className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0",
                          activeSection === section.id 
                            ? "bg-white text-[#2e1a87]" 
                            : "bg-purple-100 text-purple-600"
                        )}>
                          {section.id}
                        </div>
                        <span className="truncate">{section.title}</span>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content Area - Document View */}
          <div className="col-span-12 lg:col-span-6">
            {/* Document Content */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-purple-200 p-8">
              <div className="space-y-8">
                {sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    ref={(el) => (sectionRefs.current[section.id] = el)}
                    className="scroll-mt-24"
                  >
                    <div className="border-b border-gray-200 pb-6 mb-6 last:border-b-0">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[#2e1a87] text-white flex items-center justify-center text-sm font-bold mr-3">
                          {section.id}
                        </div>
                        {section.title}
                      </h2>
                      
                      {viewMode === "edit" && section.isEditable ? (
                        <div className="space-y-4">
                          <Textarea
                            value={section.content}
                            onChange={(e) => updateSectionContent(section.id, e.target.value)}
                            className="min-h-[140px] border-purple-200 focus:border-[#2e1a87] focus:ring-purple-100 rounded-lg text-gray-700 leading-relaxed"
                            placeholder="Enter section content..."
                          />
                          <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                            <CheckCircle className="h-4 w-4" />
                            <span>Changes will be tracked and sent for approval</span>
                          </div>
                        </div>
                      ) : (
                        <div className="prose prose-lg max-w-none">
                          <p className="text-gray-700 leading-relaxed text-base">{section.content}</p>
                        </div>
                      )}
                    </div>
                  </section>
                ))}
                
                {/* Signature Section */}
                <div className="mt-12 pt-8 border-t-2 border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Agreement Signatures</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800">Parent A</h4>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <p className="text-gray-500">Signature pending</p>
                        <p className="text-sm text-gray-400 mt-1">Sarah Johnson</p>
                      </div>
                      <p className="text-sm text-gray-500">Date: ________________</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800">Parent B</h4>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <p className="text-gray-500">Signature pending</p>
                        <p className="text-sm text-gray-400 mt-1">Michael Johnson</p>
                      </div>
                      <p className="text-sm text-gray-500">Date: ________________</p>
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