import { useState } from "react";
import { Search, ChevronRight, FileText, Flag, Clock, Calendar, CheckCircle, Users, BarChart4, Folder, NotebookPen, TimerIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Progress } from "@/components/ui/progress";

export default function JudicialDashboard() {
  const [activeSection, setActiveSection] = useState("Case Overview");
  
  const sections = [
    { name: "Case Overview", icon: <Users size={18} /> },
    { name: "Parenting Plan", icon: <FileText size={18} /> },
    { name: "Compliance Tracker", icon: <CheckCircle size={18} /> },
    { name: "Financial Summary", icon: <BarChart4 size={18} /> },
    { name: "Documents", icon: <Folder size={18} /> },
    { name: "Notes & Flags", icon: <NotebookPen size={18} /> },
    { name: "Timeline", icon: <Clock size={18} /> },
  ];
  
  // Content for different sections
  const renderSectionContent = () => {
    switch(activeSection) {
      case "Case Overview":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Smith vs. Jones – Case #2025-0412</h1>
              <div className="flex items-center gap-2 mt-1 text-gray-600">
                <span>Children: </span>
                <span className="font-medium">Ella, 7 • Noah, 10</span>
              </div>
              
              <div className="flex items-center mt-3">
                <Badge className="bg-blue-100 border-blue-200 text-blue-800 hover:bg-blue-100">
                  Ready for Review
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Course Completion</div>
                  <div className="mt-1 flex items-center gap-1">
                    <span className="text-xl font-semibold text-gray-900">2/2</span>
                    <span className="text-sm text-gray-500">parents</span>
                  </div>
                  <div className="mt-2">
                    <Progress value={100} className="h-2 bg-gray-100" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Plan Agreement Score</div>
                  <div className="text-xl font-semibold text-gray-900 mt-1">93%</div>
                  <div className="mt-2">
                    <Progress value={93} className="h-2 bg-gray-100" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Outstanding Items</div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xl font-semibold text-gray-900">1</span>
                    <span className="text-sm text-gray-500">flag</span>
                  </div>
                  <div className="mt-2">
                    <Progress value={20} className="h-2 bg-gray-100" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-3">Timeline Snapshot</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full bg-[#2e1a87] flex items-center justify-center text-white text-xs">
                      1
                    </div>
                    <div className="h-full w-0.5 bg-gray-200 mt-1"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Case Opened</div>
                    <div className="text-xs text-gray-500">February 1, 2025</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full bg-[#2e1a87] flex items-center justify-center text-white text-xs">
                      2
                    </div>
                    <div className="h-full w-0.5 bg-gray-200 mt-1"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Course Completed</div>
                    <div className="text-xs text-gray-500">February 15, 2025</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full bg-[#2e1a87] flex items-center justify-center text-white text-xs">
                      3
                    </div>
                    <div className="h-full w-0.5 bg-gray-200 mt-1"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Plan Submitted</div>
                    <div className="text-xs text-gray-500">February 17, 2025</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full bg-[#2e1a87] flex items-center justify-center text-white text-xs">
                      4
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Flag Raised</div>
                    <div className="text-xs text-gray-500">February 20, 2025</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "Parenting Plan":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Parenting Plan</h1>
              <p className="text-gray-600 mt-1">Review the current parenting plan document and highlighted items</p>
            </div>
            
            <div className="border rounded-md p-4 bg-gray-50 h-[400px] flex flex-col items-center justify-center text-center">
              <FileText size={48} className="text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700">Parenting Plan Preview</h3>
              <p className="text-gray-500 mt-1 max-w-md">This is a preview placeholder for the parenting plan document that would be embedded here.</p>
              <Button className="mt-4 bg-[#2e1a87] hover:bg-[#25156d]">Open Full Plan</Button>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-3">Highlighted Items</h2>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Flag className="text-amber-500 h-5 w-5 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">Holiday Schedule – disagreement noted</div>
                      <p className="text-xs text-gray-500 mt-1">
                        There appears to be a disagreement about the Thanksgiving holiday schedule arrangement.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "Compliance Tracker":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Compliance Tracker</h1>
              <p className="text-gray-600 mt-1">Track the progress of required steps for case completion</p>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <CheckCircle size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Parenting Course Completed</div>
                      <div className="text-xs text-gray-500 mt-0.5">February 15, 2025</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <CheckCircle size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Plan Submitted</div>
                      <div className="text-xs text-gray-500 mt-0.5">February 17, 2025</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Clock size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Judge Review</div>
                      <div className="text-xs text-gray-500 mt-0.5">Pending</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
                      <Clock size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-500">Final Signatures</div>
                      <div className="text-xs text-gray-400 mt-0.5">Not started</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
                      <Clock size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-500">Court Filing</div>
                      <div className="text-xs text-gray-400 mt-0.5">Not started</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "Financial Summary":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Financial Summary</h1>
              <p className="text-gray-600 mt-1">Overview of financial arrangements and documents</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Proposed Child Support</h3>
                  <div className="text-2xl font-semibold">$800/month</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Income Disclosures Uploaded</h3>
                  <div className="text-2xl font-semibold">Yes</div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Additional Notes</h3>
                <div className="border rounded p-3 h-24 bg-gray-50"></div>
              </CardContent>
            </Card>
          </div>
        );
      case "Documents":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
              <p className="text-gray-600 mt-1">View and manage case documents</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-red-100 rounded flex items-center justify-center">
                      <FileText className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Parenting Plan.pdf</div>
                      <div className="text-xs text-gray-500 mt-0.5">Uploaded Feb 17, 2025 • 256 KB</div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-red-100 rounded flex items-center justify-center">
                      <FileText className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Financial Affidavit.pdf</div>
                      <div className="text-xs text-gray-500 mt-0.5">Uploaded Feb 10, 2025 • 189 KB</div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 rounded flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Joint Statement.docx</div>
                      <div className="text-xs text-gray-500 mt-0.5">Uploaded Feb 5, 2025 • 78 KB</div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "Notes & Flags":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notes & Flags</h1>
              <p className="text-gray-600 mt-1">Important notes and flagged issues</p>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Flag className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Concern over communication clause</div>
                      <p className="text-sm text-gray-600 mt-1">
                        The communication clause may need revision to clarify expectations about response times.
                      </p>
                      <div className="text-xs text-gray-500 mt-2">Added Feb 20, 2025</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Flag className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Review holiday schedule discrepancies</div>
                      <p className="text-sm text-gray-600 mt-1">
                        Parents have different proposals for Thanksgiving and Christmas schedules.
                      </p>
                      <div className="text-xs text-gray-500 mt-2">Added Feb 18, 2025</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-center mt-6">
                <Button variant="outline" className="text-gray-500">
                  Add Flag (Not Functional)
                </Button>
              </div>
            </div>
          </div>
        );
      case "Timeline":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Timeline</h1>
              <p className="text-gray-600 mt-1">Chronological view of case events</p>
            </div>
            
            <div className="relative border-l-2 border-gray-200 ml-4 space-y-8 py-4">
              <div className="relative">
                <div className="absolute -left-[17px] h-8 w-8 rounded-full bg-[#2e1a87] flex items-center justify-center text-white">
                  <Calendar size={16} />
                </div>
                <div className="ml-6">
                  <div className="font-medium">Case Opened</div>
                  <div className="text-sm text-gray-500">February 1, 2025</div>
                  <p className="text-sm text-gray-600 mt-1">Initial case created in the system</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[17px] h-8 w-8 rounded-full bg-[#2e1a87] flex items-center justify-center text-white">
                  <CheckCircle size={16} />
                </div>
                <div className="ml-6">
                  <div className="font-medium">Course Completed</div>
                  <div className="text-sm text-gray-500">February 15, 2025</div>
                  <p className="text-sm text-gray-600 mt-1">Both parents completed required co-parenting course</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[17px] h-8 w-8 rounded-full bg-[#2e1a87] flex items-center justify-center text-white">
                  <FileText size={16} />
                </div>
                <div className="ml-6">
                  <div className="font-medium">Plan Submitted</div>
                  <div className="text-sm text-gray-500">February 17, 2025</div>
                  <p className="text-sm text-gray-600 mt-1">Parenting plan submitted for review</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[17px] h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center text-white">
                  <Flag size={16} />
                </div>
                <div className="ml-6">
                  <div className="font-medium">Flag Raised</div>
                  <div className="text-sm text-gray-500">February 20, 2025</div>
                  <p className="text-sm text-gray-600 mt-1">Issues flagged regarding holiday schedule</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center p-10">
            <h2 className="text-xl font-medium">Select a section from the sidebar</h2>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-[#2e1a87]">Resolve Judicial</div>
            
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search cases..." 
                className="pl-8 h-9 bg-gray-50 border-gray-200"
              />
            </div>
            
            <div className="flex items-center">
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarFallback className="bg-[#2e1a87] text-white">JW</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex">
        {/* Left sidebar */}
        <div className="w-64 bg-white border-r hidden md:block">
          <div className="p-4">
            <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-4">Navigation</h3>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.name}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-md ${
                    activeSection === section.name
                      ? "bg-[#efeef9] text-[#2e1a87] font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveSection(section.name)}
                >
                  <span className={activeSection === section.name ? "text-[#2e1a87]" : "text-gray-500"}>
                    {section.icon}
                  </span>
                  <span>{section.name}</span>
                  {activeSection === section.name && (
                    <ChevronRight size={16} className="ml-auto text-[#2e1a87]" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {renderSectionContent()}
          </div>
        </div>
      </div>
    </div>
  );
}