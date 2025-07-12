import React, { useState } from "react";
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
  ChevronRight
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
type ActiveTab = "overview" | "sections" | "comments" | "history";

interface Section {
  id: string;
  title: string;
  content: string;
  isExpanded: boolean;
  isEditable?: boolean;
}

export default function ParentingPlan2() {
  const [viewMode, setViewMode] = useState<ViewMode>("view");
  const [activeTab, setActiveTab] = useState<ActiveTab>("sections");
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      title: "Parenting Time Schedule",
      content: "Regular parenting time shall be as follows: Parent A shall have the children every Monday and Tuesday from 6:00 PM to 8:00 AM the following day. Parent B shall have the children every Wednesday and Thursday from 6:00 PM to 8:00 AM the following day. Weekends shall alternate between parents.",
      isExpanded: true,
      isEditable: true
    },
    {
      id: "2", 
      title: "Holiday and Vacation Schedule",
      content: "Holidays shall be alternated between parents on a yearly basis. Summer vacation shall be divided equally between parents with each parent having a minimum of two consecutive weeks.",
      isExpanded: false,
      isEditable: true
    },
    {
      id: "3",
      title: "Decision Making Authority",
      content: "Parents shall share joint legal custody and make major decisions regarding the children's education, health care, and religious upbringing together.",
      isExpanded: false,
      isEditable: true
    },
    {
      id: "4",
      title: "Communication Guidelines",
      content: "Parents shall communicate regarding the children through the agreed-upon co-parenting app. Emergency communications may be made via phone call.",
      isExpanded: false,
      isEditable: true
    }
  ]);

  const toggleSection = (sectionId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, isExpanded: !section.isExpanded }
        : section
    ));
  };

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

  const sideNavItems = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "sections", label: "Sections", icon: FileText },
    { id: "comments", label: "Comments", icon: MessageSquare },
    { id: "history", label: "History", icon: History }
  ];

  const parentDetails = [
    { label: "Parent A", name: "Sarah Johnson", email: "sarah@example.com", phone: "(555) 123-4567" },
    { label: "Parent B", name: "Michael Johnson", email: "michael@example.com", phone: "(555) 987-6543" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationMenu />
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
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
                <h1 className="text-2xl font-bold text-gray-900">Parenting Partnership Agreement</h1>
                <div className="flex items-center space-x-3 mt-1">
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800">
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
                    className="bg-[#2e1a87] hover:bg-[#3d2a9b] text-white"
                  >
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
                </>
              ) : (
                <>
                  <Button
                    onClick={handleSaveChanges}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancelEdit}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar Navigation */}
          <div className={cn(
            "w-64 flex-shrink-0 transition-all duration-200",
            isSideNavOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            "lg:relative absolute lg:block",
            "bg-white rounded-lg shadow-sm border border-gray-200 h-fit"
          )}>
            <nav className="p-4">
              <div className="space-y-2">
                {sideNavItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as ActiveTab)}
                      className={cn(
                        "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        activeTab === item.id
                          ? "bg-[#2e1a87] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                {activeTab === "overview" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Eye className="h-5 w-5 mr-2" />
                        Document Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                              Draft
                            </Badge>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Last Updated</h3>
                            <p className="text-sm text-gray-900">January 15, 2024</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-3">Participants</h3>
                          <div className="space-y-3">
                            {parentDetails.map((parent, index) => (
                              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 bg-[#2e1a87] rounded-full flex items-center justify-center">
                                  <Users className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{parent.name}</p>
                                  <p className="text-sm text-gray-500">{parent.label}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === "sections" && (
                  <div className="space-y-6">
                    {sections.map(section => (
                      <Card key={section.id}>
                        <CardHeader 
                          className="cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => toggleSection(section.id)}
                        >
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center text-lg">
                              <FileText className="h-5 w-5 mr-2" />
                              Section {section.id}: {section.title}
                            </CardTitle>
                            {section.isExpanded ? 
                              <ChevronDown className="h-5 w-5 text-gray-500" /> : 
                              <ChevronRight className="h-5 w-5 text-gray-500" />
                            }
                          </div>
                        </CardHeader>
                        
                        {section.isExpanded && (
                          <CardContent>
                            {viewMode === "edit" && section.isEditable ? (
                              <div className="space-y-4">
                                <Textarea
                                  value={section.content}
                                  onChange={(e) => updateSectionContent(section.id, e.target.value)}
                                  className="min-h-[120px] border-[#6c54da]/30 focus:border-[#6c54da]"
                                  placeholder="Enter section content..."
                                />
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span>Changes will be tracked and sent for approval</span>
                                </div>
                              </div>
                            ) : (
                              <div className="prose prose-sm max-w-none">
                                <p className="text-gray-700 leading-relaxed">{section.content}</p>
                              </div>
                            )}
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                )}

                {activeTab === "comments" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2" />
                        Comments & Discussions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500">No comments yet</p>
                        <p className="text-sm text-gray-400 mt-1">Comments will appear here when added</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === "history" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <History className="h-5 w-5 mr-2" />
                        Document History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-l-2 border-[#2e1a87] pl-4">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">Document Created</span>
                            <Badge variant="outline" className="text-xs">Initial</Badge>
                          </div>
                          <p className="text-sm text-gray-500">January 10, 2024 at 2:30 PM</p>
                          <p className="text-sm text-gray-600 mt-1">Created initial parenting plan template</p>
                        </div>
                        
                        <div className="border-l-2 border-gray-300 pl-4">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">Last Modified</span>
                            <Badge variant="outline" className="text-xs">Edit</Badge>
                          </div>
                          <p className="text-sm text-gray-500">January 15, 2024 at 4:15 PM</p>
                          <p className="text-sm text-gray-600 mt-1">Updated parenting time schedule</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Sidebar - Contextual Assistance */}
              <div className="space-y-6">
                {viewMode === "view" ? (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Document Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Status</span>
                            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                              Draft
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Sections</span>
                            <span className="text-sm font-medium">{sections.length}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Participants</span>
                            <span className="text-sm font-medium">2</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Helpful Actions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <Button variant="outline" className="w-full justify-start">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Summarize Section
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <HelpCircle className="h-4 w-4 mr-2" />
                            Explain Legal Terms
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <FileText className="h-4 w-4 mr-2" />
                            Compare to Template
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Request Professional Review
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">AI Suggestions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-800">
                              Consider adding specific pickup and drop-off times for clarity.
                            </p>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-sm text-green-800">
                              Your communication guidelines follow best practices.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Compliance Check</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-sm text-gray-700">Legal requirements met</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-sm text-gray-700">Both parents included</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-sm text-gray-700">Clear communication plan</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}