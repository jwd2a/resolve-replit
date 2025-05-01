export interface AdminFamily {
  id: string;
  familyName: string;
  parents: {
    id: number;
    name: string;
    email: string;
  }[];
  children: {
    id: number;
    name: string;
    age: number;
  }[];
  plan: {
    status: 'Not Started' | 'In Progress' | 'Complete';
    percentComplete: number;
    sections: {
      name: string;
      status: boolean;
      lastEdited?: Date;
    }[];
  };
  waiverStatus: boolean;
  holidayPreferences: boolean;
  coParentStatus: 'Joined' | 'Invited' | 'Not Invited';
  lastActive?: Date;
  flags: {
    id: string;
    message: string;
    status: 'Active' | 'Resolved';
  }[];
  course: {
    scheduled: boolean;
    proposedDate?: Date;
    confirmedByBothParents: boolean;
  };
  engagement: {
    action: string;
    date: Date;
    completed: boolean;
    actor?: string;
  }[];
  adminNotes: {
    id: string;
    text: string;
    date: Date;
  }[];
}

export type PlanStatusFilter = 'All' | 'Not Started' | 'In Progress' | 'Complete';
export type CoParentJoinedFilter = 'All' | 'Yes' | 'No'; 
export type CourseScheduledFilter = 'All' | 'Yes' | 'No';

export interface AdminFilters {
  planStatus: PlanStatusFilter;
  coParentJoined: CoParentJoinedFilter;
  courseScheduled: CourseScheduledFilter;
  searchTerm: string;
}