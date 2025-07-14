import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  Sparkles
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { NavigationMenu } from "@/components/NavigationMenu";

// Demo data structure for the parenting plan
interface DocumentSection {
  id: string;
  title: string;
  content: string;
}

const documentSections: DocumentSection[] = [
  {
    id: "parenting-time",
    title: "Parenting Time Schedule",
    content: `We agree that both parents will have regular, meaningful time with our children. Our standard schedule is as follows:

**Regular Weekly Schedule:**
• Parent A: Monday after school until Wednesday morning drop-off
• Parent B: Wednesday after school until Friday morning drop-off
• Alternating weekends from Friday after school until Sunday evening at 6:00 PM

**Exchange Times and Locations:**
• School days: Exchanges occur at school
• Non-school days: Exchanges occur at 123 Main Street, Anytown, State 12345
• Weekend exchanges: Friday at 6:00 PM and Sunday at 6:00 PM

**Communication During Parenting Time:**
Each parent may communicate with the children during the other parent's time through phone calls or video calls between 7:00 PM and 8:00 PM, but not more than once per day unless there is an emergency.

**Flexibility:**
Both parents agree to be flexible with the schedule when possible, always prioritizing the children's best interests and maintaining advance notice of any proposed changes.`
  },
  {
    id: "holidays-vacations",
    title: "Holiday and Vacation Schedule",
    content: `Holiday time takes precedence over the regular parenting schedule. We will alternate major holidays each year.

**Year A (Odd Years) - Parent A:**
• New Year's Day
• Memorial Day Weekend
• July 4th
• Labor Day Weekend
• Thanksgiving Weekend
• Christmas Day

**Year B (Even Years) - Parent B:**
• New Year's Day
• Memorial Day Weekend
• July 4th
• Labor Day Weekend
• Thanksgiving Weekend
• Christmas Day

**Spring Break:**
Spring break will alternate each year, with Parent A having odd years and Parent B having even years.

**Summer Vacation:**
Each parent is entitled to two weeks of uninterrupted vacation time with the children. Parents must provide at least 60 days advance notice of their intended vacation dates.

**Mother's Day and Father's Day:**
Children will spend Mother's Day with their mother and Father's Day with their father, regardless of the regular schedule.

**Children's Birthdays:**
Each parent has the right to spend time with the children on their birthdays. If the birthday falls during the other parent's time, the celebrating parent may have the children from after school until 8:00 PM.`
  },
  {
    id: "decision-making",
    title: "Decision Making Authority",
    content: `Both parents share joint legal custody and will make major decisions together regarding the children's welfare.

**Major Decisions Requiring Both Parents' Agreement:**
• Educational decisions (school choice, tutoring, special programs)
• Healthcare decisions (non-emergency medical treatment, therapy, medication)
• Religious upbringing and activities
• Extracurricular activities and sports
• Travel outside the state/country

**Emergency Decisions:**
Either parent may make immediate emergency decisions affecting the health or safety of the children. The other parent must be notified as soon as reasonably possible.

**Day-to-Day Decisions:**
The parent with whom the children are staying has the authority to make routine day-to-day decisions about care, activities, and immediate needs.

**Dispute Resolution:**
If parents cannot agree on a major decision, they will:
1. Discuss the matter respectfully, focusing on the children's best interests
2. Consult with relevant professionals (teachers, doctors, etc.)
3. Seek mediation if necessary
4. Consider the children's preferences when age-appropriate

**Information Sharing:**
Both parents have equal access to all school records, medical records, and information about the children's activities and progress. Both parents will be listed as emergency contacts and authorized to make decisions in emergency situations.`
  },
  {
    id: "communication",
    title: "Communication Guidelines",
    content: `Effective communication between parents is essential for successful co-parenting. We agree to follow these guidelines:

**Communication Methods:**
• Primary communication will be through email and text messaging
• Phone calls for urgent matters only
• Face-to-face communication should be brief and child-focused during exchanges
• We will not use the children as messengers between parents

**Communication Tone and Content:**
• All communication will be respectful, business-like, and focused on the children
• We will avoid discussing personal matters or past relationship issues
• We will respond to communication within 24 hours unless it's an emergency
• We will keep all communication child-focused and solution-oriented

**Sharing Information:**
• We will keep each other informed about the children's school events, activities, and important milestones
• We will share schedules, contact information, and any changes in circumstances
• We will inform each other of any significant changes in the children's behavior or needs
• We will coordinate on discipline approaches and house rules when possible

**Conflict Resolution:**
• We will address disagreements privately, away from the children
• We will focus on finding solutions rather than assigning blame
• We will seek professional mediation if we cannot resolve conflicts independently
• We will always prioritize the children's emotional well-being over our own disagreements

**Digital Communication:**
• We will maintain appropriate boundaries on social media regarding the children and co-parenting
• We will not share personal information about each other publicly
• We will respect each other's privacy while maintaining necessary communication about the children`
  }
];

export default function ParentingPlan3() {
  const [activeSection, setActiveSection] = useState<string>("parenting-time");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [aiQuestion, setAiQuestion] = useState("");
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

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

    documentSections.forEach((section) => {
      const element = sectionRefs.current[section.id];
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

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
        
        {/* Sticky Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="lg:hidden"
                >
                  <Menu className="h-4 w-4" />
                </Button>
                
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold text-gray-900">Parenting Partnership Agreement</h1>
                  <p className="text-sm text-gray-600 mt-1">This agreement helps you create a stable, cooperative plan for your children.</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                    Draft
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Last updated: {getLastUpdated()}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button className="bg-[#2e1a87] hover:bg-[#3d2a9b] text-white">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Propose Changes
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Link
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
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-128px)] flex">
          {/* Left Sidebar - Table of Contents */}
          <div className={cn(
            "w-80 flex-shrink-0 transition-all duration-200 mr-6",
            isSidebarOpen ? "block" : "hidden lg:block"
          )}>
            <div className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Table of Contents</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    {documentSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                          activeSection === section.id
                            ? "bg-[#2e1a87] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                      >
                        {section.title}
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Document Area */}
          <div className="flex-1 mr-6">
            <div className="h-full overflow-y-auto">
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="max-w-4xl mx-auto space-y-8">
                    {documentSections.map((section, index) => (
                      <div
                        key={section.id}
                        id={section.id}
                        ref={(el) => (sectionRefs.current[section.id] = el)}
                        className={cn(
                          "scroll-mt-8",
                          index > 0 && "border-t border-gray-200 pt-8"
                        )}
                      >
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                          {section.title}
                        </h2>
                        <div className="prose prose-gray max-w-none">
                          {section.content.split('\n').map((paragraph, i) => {
                            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                              return (
                                <h3 key={i} className="text-lg font-medium text-gray-800 mt-6 mb-3">
                                  {paragraph.slice(2, -2)}
                                </h3>
                              );
                            }
                            if (paragraph.startsWith('•')) {
                              return (
                                <ul key={i} className="ml-4 mb-3">
                                  <li className="text-gray-700">{paragraph.slice(1).trim()}</li>
                                </ul>
                              );
                            }
                            if (paragraph.trim()) {
                              return (
                                <p key={i} className="text-gray-700 mb-4 leading-relaxed">
                                  {paragraph}
                                </p>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar - AI Assistant */}
          <div className={cn(
            "w-80 flex-shrink-0 transition-all duration-200",
            isAiPanelOpen || "hidden lg:block"
          )}>
            <div className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Bot className="h-5 w-5 mr-2 text-[#2e1a87]" />
                    AI Parenting Plan Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    How can I help you with this section?
                  </p>
                  
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                      size="sm"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Summarize Section
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                      size="sm"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Explain Legal Terms
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                      size="sm"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Compare to Template
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                      size="sm"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Request Professional Review
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      placeholder="Type your question..."
                      className="bg-white"
                      onKeyPress={(e) => e.key === 'Enter' && handleAiSubmit()}
                    />
                    <Button 
                      onClick={handleAiSubmit}
                      className="w-full bg-[#2e1a87] hover:bg-[#3d2a9b] text-white"
                      disabled={!aiQuestion.trim()}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Ask Assistant
                    </Button>
                  </div>
                  
                  <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Sparkles className="h-4 w-4 text-purple-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-purple-800">Tip</p>
                        <p className="text-xs text-purple-700">
                          Try asking: "What should I consider for holiday schedules?" or "How do we handle communication boundaries?"
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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