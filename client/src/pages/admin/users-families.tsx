import { useState, useEffect } from "react";
import { mockFamilies } from "@/data/mockAdminData";
import { AdminFamily } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Alert,
  AlertDescription
} from "@/components/ui/alert";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Mail,
  Flag,
  Users,
  XCircle,
} from "lucide-react";
import { Link } from "wouter";
import { RootLayout } from "@/components/RootLayout";
import { format, formatDistanceToNow } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function AdminUsersFamilies() {
  const [families] = useState<AdminFamily[]>(mockFamilies);
  const [selectedFamily, setSelectedFamily] = useState<AdminFamily | null>(null);
  const [newNote, setNewNote] = useState("");

  // Get the family ID from URL query parameter
  const getQueryParams = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    return { id: params.get('id') };
  };

  useEffect(() => {
    // Try to get family ID from URL
    const { id } = getQueryParams();
    
    // If ID is provided in URL, find and select that family
    if (id && families.length > 0) {
      const familyFromId = families.find(f => f.id === id);
      if (familyFromId) {
        setSelectedFamily(familyFromId);
        return;
      }
    }
    
    // Otherwise, set the first family as selected when the page loads
    if (families.length > 0 && !selectedFamily) {
      setSelectedFamily(families[0]);
    }
  }, [families, selectedFamily]);

  const toggleFlag = (flag: { id: string; message: string; status: string }) => {
    if (!selectedFamily) return;
    
    const updatedFamily: AdminFamily = { 
      ...selectedFamily,
      flags: selectedFamily.flags.some(f => f.id === flag.id)
        ? selectedFamily.flags.filter(f => f.id !== flag.id) // Remove flag
        : [...selectedFamily.flags, flag] // Add flag
    };
    
    setSelectedFamily(updatedFamily);
  };

  const addNote = () => {
    if (!newNote.trim() || !selectedFamily) return;
    
    const newEngagement = {
      id: `NOTE-${Date.now()}`,
      type: "Note",
      date: new Date(),
      message: newNote,
      user: "Admin"
    };
    
    const updatedFamily = {
      ...selectedFamily,
      engagement: [newEngagement, ...selectedFamily.engagement]
    };
    
    setSelectedFamily(updatedFamily);
    setNewNote("");
  };

  const formatDate = (date?: Date) => {
    if (!date) return "N/A";
    return format(new Date(date), "MMM d, yyyy");
  };

  const formatDateWithTime = (date?: Date) => {
    if (!date) return "N/A";
    return format(new Date(date), "MMM d, yyyy 'at' h:mm a");
  };

  const formatRelativeDate = (date?: Date) => {
    if (!date) return "N/A";
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <RootLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Portal - Family Details</h1>
          <Button asChild>
            <Link href="/admin/families">
              <Users className="mr-2 h-4 w-4" />
              Back to Families Overview
            </Link>
          </Button>
        </div>
        
        <div className="w-full bg-white rounded-lg shadow-sm border p-6">
          {!selectedFamily ? (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <p className="text-gray-500">No family found. Please return to the families overview page.</p>
            </div>
          ) : (
            <Tabs defaultValue="overview">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedFamily.familyName}</h2>
                  <p className="text-gray-600">
                    ID: {selectedFamily.id} | Created on {formatDate(selectedFamily.engagement[0]?.date)}
                  </p>
                </div>
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="course">Course Scheduling</TabsTrigger>
                  <TabsTrigger value="plan">Parenting Plan</TabsTrigger>
                  <TabsTrigger value="engagement">Engagement Log</TabsTrigger>
                  <TabsTrigger value="flags">Flags & Intervention</TabsTrigger>
                </TabsList>
              </div>
              
              {/* OVERVIEW TAB */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <Card className="p-5">
                    <h3 className="text-lg font-semibold mb-4">Family Members</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-700">Parents</h4>
                        <ul className="mt-2 space-y-2">
                          {selectedFamily.parents.map(parent => (
                            <li key={parent.id} className="flex justify-between">
                              <span>{parent.name}</span>
                              <span className="text-gray-500 text-sm">{parent.email}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700">Children</h4>
                        <ul className="mt-2 space-y-2">
                          {selectedFamily.children.map(child => (
                            <li key={child.id}>
                              {child.name}, {child.age} years old
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-5">
                    <h3 className="text-lg font-semibold mb-4">Status Summary</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700">Parenting Plan Status</span>
                          <span className={`font-medium ${
                            selectedFamily.plan.status === 'Complete' ? 'text-green-600' : 
                            selectedFamily.plan.status === 'In Progress' ? 'text-blue-600' : 'text-gray-600'
                          }`}>
                            {selectedFamily.plan.status}
                          </span>
                        </div>
                        <Progress value={selectedFamily.plan.percentComplete} className="h-2" />
                        <span className="text-xs text-gray-500">{selectedFamily.plan.percentComplete}% complete</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-700">Waiver Status:</span>
                          {selectedFamily.waiverStatus ? 
                            <CheckCircle2 className="h-5 w-5 text-green-600" /> : 
                            <XCircle className="h-5 w-5 text-red-600" />
                          }
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-700">Holiday Preferences:</span>
                          {selectedFamily.holidayPreferences ? 
                            <CheckCircle2 className="h-5 w-5 text-green-600" /> : 
                            <XCircle className="h-5 w-5 text-red-600" />
                          }
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-700">Co-Parent Status:</span>
                          <span className={`text-sm ${
                            selectedFamily.coParentStatus === 'Joined' ? 'text-green-600' : 
                            selectedFamily.coParentStatus === 'Invited' ? 'text-amber-600' : 'text-red-600'
                          }`}>
                            {selectedFamily.coParentStatus}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-700">Course Scheduled:</span>
                          {selectedFamily.course.scheduled ? 
                            <CheckCircle2 className="h-5 w-5 text-green-600" /> : 
                            <XCircle className="h-5 w-5 text-red-600" />
                          }
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <span className="text-gray-700">Last Activity:</span>
                        <span className="ml-2 text-gray-600">
                          {formatRelativeDate(selectedFamily.lastActive)}
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="flex space-x-3 mt-4">
                  <Button variant="outline" className="gap-2">
                    <FileText size={16} />
                    View Plan PDF
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Mail size={16} />
                    Contact Family
                  </Button>
                  {selectedFamily.flags.length > 0 ? (
                    <Button 
                      variant="outline" 
                      className="gap-2 text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => toggleFlag(selectedFamily.flags[0])}
                    >
                      <Flag size={16} />
                      Clear Flags ({selectedFamily.flags.length})
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={() => toggleFlag({ id: `FLAG-NEW-${Date.now()}`, message: "Manual flag by admin", status: "Active" })}
                    >
                      <Flag size={16} />
                      Mark as Flagged
                    </Button>
                  )}
                </div>
              </TabsContent>
              
              {/* COURSE SCHEDULING TAB */}
              <TabsContent value="course" className="space-y-6">
                <Card className="p-5">
                  <h3 className="text-lg font-semibold mb-4">Course Scheduling Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="text-gray-700 w-1/3">Status:</span>
                      <span className={`font-medium ${selectedFamily.course.scheduled ? 'text-green-600' : 'text-amber-600'}`}>
                        {selectedFamily.course.scheduled ? 'Scheduled' : 'Not Scheduled'}
                      </span>
                    </div>
                    
                    {selectedFamily.course.scheduled && selectedFamily.course.proposedDate && (
                      <>
                        <div className="flex items-center">
                          <span className="text-gray-700 w-1/3">Proposed Date & Time:</span>
                          <span className="font-medium">{formatDateWithTime(selectedFamily.course.proposedDate)}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="text-gray-700 w-1/3">Confirmed by Both Parents:</span>
                          <span className={`font-medium ${selectedFamily.course.confirmedByBothParents ? 'text-green-600' : 'text-amber-600'}`}>
                            {selectedFamily.course.confirmedByBothParents ? 'Yes' : 'No'}
                          </span>
                        </div>
                      </>
                    )}
                    
                    <div className="mt-6 flex space-x-3">
                      {!selectedFamily.course.scheduled ? (
                        <Button className="gap-2">
                          <Calendar size={16} />
                          Schedule Course
                        </Button>
                      ) : (
                        <Button className="gap-2">
                          <Calendar size={16} />
                          Update Schedule
                        </Button>
                      )}
                      
                      {selectedFamily.coParentStatus === 'Joined' && !selectedFamily.course.confirmedByBothParents && (
                        <Button variant="outline" className="gap-2">
                          <Mail size={16} />
                          Send Reminder
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
                
                {selectedFamily.coParentStatus !== 'Joined' && (
                  <Alert className="bg-amber-50 border-amber-200">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-amber-800">
                      Co-parent needs to join the platform before a course can be scheduled.
                    </AlertDescription>
                  </Alert>
                )}
              </TabsContent>
              
              {/* PARENTING PLAN TAB */}
              <TabsContent value="plan" className="space-y-6">
                <Card className="p-5">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-semibold">Parenting Plan Sections</h3>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadgeClass(selectedFamily.plan.status)}`}>
                      {selectedFamily.plan.status}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {selectedFamily.plan.sections.map((section, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            {section.status ? 
                              <CheckCircle2 className="h-5 w-5 text-green-600" /> : 
                              <Clock className="h-5 w-5 text-amber-600" />
                            }
                            <span className="font-medium">{section.title}</span>
                          </div>
                          <span className="text-sm text-gray-600">{section.status ? 'Completed' : 'Pending'}</span>
                        </div>
                        {section.subsections && (
                          <div className="ml-8 mt-2 space-y-2">
                            {section.subsections.map((subsection, i) => (
                              <div key={i} className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  {subsection.status ? 
                                    <CheckCircle2 className="h-4 w-4 text-green-600" /> : 
                                    <Clock className="h-4 w-4 text-amber-600" />
                                  }
                                  <span className="text-sm">{subsection.title}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
                
                <div className="flex space-x-3">
                  <Button className="gap-2">
                    <Download size={16} />
                    Download Current Plan
                  </Button>
                </div>
              </TabsContent>
              
              {/* ENGAGEMENT LOG TAB */}
              <TabsContent value="engagement" className="space-y-6">
                <Card className="p-5">
                  <h3 className="text-lg font-semibold mb-4">Add Note</h3>
                  <div className="space-y-4">
                    <Textarea 
                      placeholder="Enter a note about this family..." 
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <Button onClick={addNote} disabled={!newNote.trim()}>
                      Add Note
                    </Button>
                  </div>
                </Card>
                
                <Card className="p-5">
                  <h3 className="text-lg font-semibold mb-4">Engagement History</h3>
                  <div className="space-y-6">
                    {selectedFamily.engagement.map((item, index) => (
                      <div key={index} className="border-l-2 border-gray-200 pl-4 pb-6 relative">
                        <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-0"></div>
                        <div className="flex justify-between">
                          <span className="font-medium">{item.type}</span>
                          <span className="text-sm text-gray-600">{formatDateWithTime(item.date)}</span>
                        </div>
                        <p className="mt-1 text-gray-700">{item.message}</p>
                        {item.user && (
                          <p className="text-xs text-gray-500 mt-1">By: {item.user}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
              
              {/* FLAGS TAB */}
              <TabsContent value="flags" className="space-y-6">
                <Card className="p-5">
                  <h3 className="text-lg font-semibold mb-4">Active Flags</h3>
                  
                  {selectedFamily.flags.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-md">
                      No active flags for this family
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedFamily.flags.map((flag, index) => (
                        <div key={index} className="border-l-4 border-red-400 p-4 bg-red-50 rounded-md">
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <Flag size={16} className="text-red-500 mr-2" />
                              <span className="font-medium text-red-800">Flag ID: {flag.id}</span>
                            </div>
                            <span className="text-sm text-red-700">{flag.status}</span>
                          </div>
                          <p className="mt-2 text-red-700">{flag.message}</p>
                          <div className="mt-4 flex justify-end">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => toggleFlag(flag)}
                            >
                              Clear Flag
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
                
                <Card className="p-5">
                  <h3 className="text-lg font-semibold mb-4">Flag History</h3>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-gray-200 p-4 bg-gray-50 rounded-md">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Flag size={16} className="text-gray-500 mr-2" />
                          <span className="font-medium text-gray-800">Flag ID: FLAG-001</span>
                        </div>
                        <span className="text-sm text-gray-700">Resolved</span>
                      </div>
                      <p className="mt-2 text-gray-700">Missed scheduled call with mediator</p>
                      <div className="mt-2 flex items-center">
                        <span className="text-xs text-gray-500">Resolved on {formatDate(new Date(2023, 2, 15))}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </RootLayout>
  );
}