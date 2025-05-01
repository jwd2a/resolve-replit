import { useState, useEffect } from "react";
import { mockFamilies } from "@/data/mockAdminData";
import { AdminFamily, AdminFilters, PlanStatusFilter, CoParentJoinedFilter, CourseScheduledFilter } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Alert,
  AlertDescription
} from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminUsersFamilies() {
  const [families, setFamilies] = useState<AdminFamily[]>(mockFamilies);
  const [selectedFamily, setSelectedFamily] = useState<AdminFamily | null>(null);
  const [newNote, setNewNote] = useState("");
  const [filters, setFilters] = useState<AdminFilters>({
    planStatus: "All",
    coParentJoined: "All",
    courseScheduled: "All",
    searchTerm: ""
  });

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

  const handleFilterChange = (
    filterType: keyof AdminFilters, 
    value: string | PlanStatusFilter | CoParentJoinedFilter | CourseScheduledFilter
  ) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const filteredFamilies = families.filter(family => {
    // Filter by search term
    const searchTermMatches = 
      filters.searchTerm.trim() === "" || 
      family.familyName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      family.parents.some(parent => parent.name.toLowerCase().includes(filters.searchTerm.toLowerCase()));
    
    // Filter by plan status
    const planStatusMatches = 
      filters.planStatus === "All" || 
      family.plan.status === filters.planStatus;
    
    // Filter by co-parent joined status
    const coParentJoinedMatches = 
      filters.coParentJoined === "All" || 
      (filters.coParentJoined === "Yes" && family.coParentStatus === "Joined") ||
      (filters.coParentJoined === "No" && family.coParentStatus !== "Joined");
    
    // Filter by course scheduled status
    const courseScheduledMatches = 
      filters.courseScheduled === "All" || 
      (filters.courseScheduled === "Yes" && family.course.scheduled) ||
      (filters.courseScheduled === "No" && !family.course.scheduled);
    
    return searchTermMatches && planStatusMatches && coParentJoinedMatches && courseScheduledMatches;
  });

  const handleAddNote = () => {
    if (!selectedFamily || !newNote.trim()) return;

    const updatedFamily = { 
      ...selectedFamily,
      adminNotes: [
        ...selectedFamily.adminNotes,
        {
          id: `NOTE-${Date.now()}`,
          text: newNote,
          date: new Date()
        }
      ]
    };

    setFamilies(families.map(f => f.id === selectedFamily.id ? updatedFamily : f));
    setSelectedFamily(updatedFamily);
    setNewNote("");
  };

  const toggleFlag = (flag: { id: string, message: string, status: "Active" | "Resolved" }) => {
    if (!selectedFamily) return;

    // If flag exists, toggle its status; if it doesn't exist, add it
    const flagExists = selectedFamily.flags.find(f => f.id === flag.id);

    let updatedFlags;
    if (flagExists) {
      updatedFlags = selectedFamily.flags.map(f => 
        f.id === flag.id 
          ? { ...f, status: f.status === "Active" ? "Resolved" as const : "Active" as const } 
          : f
      );
    } else {
      updatedFlags = [...selectedFamily.flags, { ...flag, status: "Active" as const }];
    }

    const updatedFamily: AdminFamily = { 
      ...selectedFamily,
      flags: updatedFlags as { id: string; message: string; status: "Active" | "Resolved"; }[]
    };

    setFamilies(families.map(f => f.id === selectedFamily.id ? updatedFamily : f));
    setSelectedFamily(updatedFamily);
  };

  const formatDate = (date?: Date) => {
    if (!date) return "N/A";
    return format(date, "MMM d, yyyy");
  };

  const formatDateWithTime = (date?: Date) => {
    if (!date) return "N/A";
    return format(date, "MMM d, yyyy 'at' h:mm a");
  };

  const formatRelativeDate = (date?: Date) => {
    if (!date) return "N/A";
    
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  const getStatusBadgeClass = (status: 'Not Started' | 'In Progress' | 'Complete') => {
    switch (status) {
      case 'Complete':
        return "bg-green-100 text-green-800 border-green-200";
      case 'In Progress':
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <RootLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Portal - Users & Families</h1>
          <Button asChild>
            <Link href="/admin/families">
              <Users className="mr-2 h-4 w-4" />
              Back to Families Overview
            </Link>
          </Button>
        </div>
        
        <div className="flex gap-6">
          {/* LEFT PANEL - Family List */}
          <div className="w-1/4 bg-white rounded-lg shadow-sm border p-4">
            <div className="mb-4">
              <Input 
                placeholder="Search families..." 
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-3 mb-4">
              <div>
                <label className="text-sm font-medium mb-1 block text-gray-700">Plan Status</label>
                <Select 
                  value={filters.planStatus} 
                  onValueChange={(value) => handleFilterChange("planStatus", value as PlanStatusFilter)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Complete">Complete</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block text-gray-700">Co-Parent Joined</label>
                <Select 
                  value={filters.coParentJoined} 
                  onValueChange={(value) => handleFilterChange("coParentJoined", value as CoParentJoinedFilter)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block text-gray-700">Course Scheduled</label>
                <Select 
                  value={filters.courseScheduled} 
                  onValueChange={(value) => handleFilterChange("courseScheduled", value as CourseScheduledFilter)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Families ({filteredFamilies.length})</h3>
              
              <ScrollArea className="h-[calc(100vh-350px)]">
                <div className="space-y-2">
                  {filteredFamilies.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No families match the current filters</p>
                  ) : (
                    filteredFamilies.map(family => (
                      <Card 
                        key={family.id}
                        className={`p-3 cursor-pointer transition hover:shadow ${selectedFamily?.id === family.id ? 'border-blue-400 bg-blue-50' : ''}`}
                        onClick={() => setSelectedFamily(family)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{family.familyName}</h4>
                            <p className="text-sm text-gray-600">
                              Parents: {family.parents.map(p => p.name.split(' ')[0]).join(' & ')}
                            </p>
                            <p className="text-sm text-gray-600">
                              Children: {family.children.map(c => `${c.name} (${c.age})`).join(', ')}
                            </p>
                            <div className="flex items-center mt-1 space-x-2">
                              <span className={`text-xs px-2 py-1 rounded-full border ${getStatusBadgeClass(family.plan.status)}`}>
                                Plan: {family.plan.status}
                              </span>
                              <span className="text-xs text-gray-500">
                                Last Active: {formatRelativeDate(family.lastActive)}
                              </span>
                            </div>
                          </div>
                          <div>
                            {family.flags.length > 0 && (
                              <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                                <Flag size={12} className="mr-1" />
                                {family.flags.length}
                              </span>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
          
          {/* RIGHT PANEL - Family Details */}
          <div className="w-3/4 bg-white rounded-lg shadow-sm border p-6">
            {!selectedFamily ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Select a family to view details</p>
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
                              <span className="font-medium">{section.name}</span>
                            </div>
                            <div className="text-sm text-gray-500">
                              {section.lastEdited && `Last edited: ${formatDate(section.lastEdited)}`}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-700">Overall Completion:</span>
                        <span className="font-medium">{selectedFamily.plan.percentComplete}%</span>
                      </div>
                      <Progress value={selectedFamily.plan.percentComplete} className="h-2" />
                    </div>
                    
                    <div className="mt-6 flex space-x-3">
                      <Button variant="outline" className="gap-2">
                        <Download size={16} />
                        Download Plan PDF
                      </Button>
                      {selectedFamily.plan.status === 'Complete' ? (
                        <Button variant="outline" className="gap-2 text-green-600">
                          <CheckCircle2 size={16} />
                          Plan Complete
                        </Button>
                      ) : (
                        <Button variant="outline" className="gap-2">
                          <Mail size={16} />
                          Send Progress Reminder
                        </Button>
                      )}
                    </div>
                  </Card>
                </TabsContent>
                
                {/* ENGAGEMENT LOG TAB */}
                <TabsContent value="engagement" className="space-y-6">
                  <Card className="p-5">
                    <h3 className="text-lg font-semibold mb-4">Engagement Timeline</h3>
                    <div className="space-y-4">
                      {selectedFamily.engagement.length === 0 ? (
                        <p className="text-gray-500">No engagement history recorded</p>
                      ) : (
                        <div className="relative pl-6 border-l-2 border-gray-200 space-y-6">
                          {selectedFamily.engagement.map((event, index) => (
                            <div key={index} className="relative mb-4 last:mb-0">
                              <div className="absolute left-[-22px] top-0">
                                {event.completed ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-600 bg-white" />
                                ) : (
                                  <Clock className="h-5 w-5 text-amber-600 bg-white" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">
                                  {event.action} 
                                  {event.actor && <span className="text-sm text-gray-600"> by {event.actor}</span>}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {formatDate(event.date)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 flex space-x-3">
                      <Button variant="outline" className="gap-2">
                        <Mail size={16} />
                        Send Engagement Email
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
                
                {/* FLAGS & INTERVENTION TAB */}
                <TabsContent value="flags" className="space-y-6">
                  <Card className="p-5">
                    <h3 className="text-lg font-semibold mb-4">Active Flags & System Alerts</h3>
                    
                    {selectedFamily.flags.length === 0 ? (
                      <div className="py-3 text-center text-gray-500">
                        <p>No active flags for this family</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedFamily.flags.map(flag => (
                          <Alert key={flag.id} className="bg-red-50 border-red-200">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <div className="flex justify-between items-center w-full">
                              <AlertDescription className="text-red-800">
                                {flag.message}
                              </AlertDescription>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8 gap-1 text-red-600 hover:bg-red-100"
                                onClick={() => toggleFlag(flag)}
                              >
                                Resolve
                              </Button>
                            </div>
                          </Alert>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-8">
                      <h4 className="font-medium mb-2">Admin Notes</h4>
                      <ScrollArea className="h-48 border rounded-md p-3 mb-3">
                        {selectedFamily.adminNotes.length === 0 ? (
                          <p className="text-gray-500 text-center py-4">No admin notes</p>
                        ) : (
                          <div className="space-y-3">
                            {selectedFamily.adminNotes.map(note => (
                              <div key={note.id} className="border-b pb-3 last:border-b-0">
                                <p className="text-sm">{note.text}</p>
                                <p className="text-xs text-gray-500 mt-1">{formatDate(note.date)}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </ScrollArea>
                      
                      <div className="mt-3">
                        <Textarea 
                          placeholder="Add a new note..." 
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          className="mb-2"
                        />
                        <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                          Add Note
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t">
                      <h4 className="font-medium mb-2">Intervention Actions</h4>
                      <div className="flex space-x-3">
                        <Button className="gap-2">
                          <Mail size={16} />
                          Send Reminder Email
                        </Button>
                        
                        {selectedFamily.flags.length > 0 && (
                          <Button 
                            variant="outline" 
                            className="gap-2"
                            onClick={() => {
                              const updatedFamily: AdminFamily = {
                                ...selectedFamily,
                                flags: selectedFamily.flags.map(f => ({ ...f, status: "Resolved" as const }))
                              };
                              setFamilies(families.map(f => f.id === selectedFamily.id ? updatedFamily : f));
                              setSelectedFamily(updatedFamily);
                            }}
                          >
                            <CheckCircle2 size={16} />
                            Resolve All Flags
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </RootLayout>
  );
}