import { useState } from "react";
import { mockFamilies } from "@/data/mockAdminData";
import { AdminFamily, AdminFilters, PlanStatusFilter, CoParentJoinedFilter, CourseScheduledFilter } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Flag,
  Search,
  Users,
  XCircle,
} from "lucide-react";
import { RootLayout } from "@/components/RootLayout";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "wouter";

export default function AdminFamiliesList() {
  const [families] = useState<AdminFamily[]>(mockFamilies);
  const [filters, setFilters] = useState<AdminFilters>({
    planStatus: "All",
    coParentJoined: "All",
    courseScheduled: "All",
    searchTerm: ""
  });

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

  const formatDate = (date?: Date) => {
    if (!date) return "N/A";
    return format(date, "MMM d, yyyy");
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
          <h1 className="text-3xl font-bold">Admin Portal - Families Overview</h1>
          <Button asChild>
            <Link href="/admin/users-families">
              <Users className="mr-2 h-4 w-4" />
              Switch to Detail View
            </Link>
          </Button>
        </div>
        
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4 w-full max-w-xl">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Search families..." 
                  className="pl-8"
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
                />
              </div>
              
              <Select 
                value={filters.planStatus} 
                onValueChange={(value) => handleFilterChange("planStatus", value as PlanStatusFilter)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Plan Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Complete">Complete</SelectItem>
                </SelectContent>
              </Select>
              
              <Select 
                value={filters.coParentJoined} 
                onValueChange={(value) => handleFilterChange("coParentJoined", value as CoParentJoinedFilter)}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Co-Parent Joined" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Yes">Co-Parent Joined</SelectItem>
                  <SelectItem value="No">Not Joined</SelectItem>
                </SelectContent>
              </Select>
              
              <Select 
                value={filters.courseScheduled} 
                onValueChange={(value) => handleFilterChange("courseScheduled", value as CourseScheduledFilter)}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Course Scheduled" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Yes">Scheduled</SelectItem>
                  <SelectItem value="No">Not Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-2 p-4 font-medium text-sm bg-gray-50 border-b">
              <div className="col-span-2">Family</div>
              <div className="col-span-2">Parents</div>
              <div className="col-span-1">Children</div>
              <div className="col-span-1">Plan Status</div>
              <div className="col-span-1">% Complete</div>
              <div className="col-span-1">Co-Parent Status</div>
              <div className="col-span-1">Waivers</div>
              <div className="col-span-1">Course</div>
              <div className="col-span-1">Last Active</div>
              <div className="col-span-1 text-center">Flags</div>
              <div className="col-span-1 text-center">Actions</div>
            </div>
            
            {filteredFamilies.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No families match your search criteria
              </div>
            ) : (
              <div className="divide-y">
                {filteredFamilies.map(family => (
                  <div key={family.id} className="grid grid-cols-12 gap-2 p-4 items-center hover:bg-gray-50">
                    <div className="col-span-2">
                      <div className="font-medium">{family.familyName}</div>
                      <div className="text-xs text-gray-500">ID: {family.id}</div>
                    </div>
                    
                    <div className="col-span-2">
                      {family.parents.map(parent => (
                        <div key={parent.id} className="text-sm">
                          {parent.name}
                        </div>
                      ))}
                    </div>
                    
                    <div className="col-span-1">
                      {family.children.length > 0 ? (
                        <div className="text-sm">
                          {family.children.length} {family.children.length === 1 ? 'child' : 'children'}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">None</div>
                      )}
                    </div>
                    
                    <div className="col-span-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(family.plan.status)}`}>
                        {family.plan.status}
                      </span>
                    </div>
                    
                    <div className="col-span-1">
                      <div className="flex items-center">
                        <div className="w-12 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${
                              family.plan.status === 'Complete' ? 'bg-green-500' : 
                              family.plan.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                            style={{ width: `${family.plan.percentComplete}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">{family.plan.percentComplete}%</span>
                      </div>
                    </div>
                    
                    <div className="col-span-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        family.coParentStatus === 'Joined' ? 'bg-green-100 text-green-800' : 
                        family.coParentStatus === 'Invited' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {family.coParentStatus}
                      </span>
                    </div>
                    
                    <div className="col-span-1 text-center">
                      {family.waiverStatus ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 inline" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 inline" />
                      )}
                    </div>
                    
                    <div className="col-span-1 text-center">
                      {family.course.scheduled ? (
                        <div className="inline-flex items-center">
                          <Calendar className="h-4 w-4 text-green-600 mr-1" />
                          <span className="text-xs text-green-600">Scheduled</span>
                        </div>
                      ) : (
                        <Clock className="h-5 w-5 text-amber-500 inline" />
                      )}
                    </div>
                    
                    <div className="col-span-1">
                      <span className="text-xs text-gray-600">
                        {formatRelativeDate(family.lastActive)}
                      </span>
                    </div>
                    
                    <div className="col-span-1 text-center">
                      {family.flags.length > 0 ? (
                        <div className="inline-flex items-center justify-center px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                          <Flag size={12} className="mr-1" />
                          {family.flags.length}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500">None</span>
                      )}
                    </div>
                    
                    <div className="col-span-1 text-center">
                      <Link href={`/admin/users-families?id=${family.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">View Details</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredFamilies.length} of {families.length} families
          </div>
        </Card>
      </div>
    </RootLayout>
  );
}