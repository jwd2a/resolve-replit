import { AdminFamily } from "@/types/admin";

export const mockFamilies: AdminFamily[] = [
  {
    id: "FAM-001",
    familyName: "Johnson Family",
    parents: [
      { id: 1, name: "Eric Johnson", email: "eric@example.com" },
      { id: 2, name: "Sarah Johnson", email: "sarah@example.com" }
    ],
    children: [
      { id: 1, name: "Mila", age: 9 },
      { id: 2, name: "Jonah", age: 6 }
    ],
    plan: {
      status: "In Progress",
      percentComplete: 65,
      sections: [
        { name: "Custody", status: true, lastEdited: new Date(2023, 3, 15) },
        { name: "Communication", status: true, lastEdited: new Date(2023, 3, 16) },
        { name: "Holidays", status: false },
        { name: "Travel", status: true, lastEdited: new Date(2023, 3, 18) },
        { name: "Finalized", status: false }
      ]
    },
    waiverStatus: true,
    holidayPreferences: false,
    coParentStatus: "Joined",
    lastActive: new Date(2023, 4, 28), // 2 days ago
    flags: [
      { 
        id: "FLAG-001", 
        message: "Holiday preferences incomplete", 
        status: "Active" 
      }
    ],
    course: {
      scheduled: false,
      confirmedByBothParents: false
    },
    engagement: [
      { action: "Eric invited Sarah", date: new Date(2023, 3, 12), completed: true },
      { action: "Sarah accepted invite", date: new Date(2023, 3, 14), completed: true },
      { action: "Waivers signed", date: new Date(2023, 3, 15), completed: true },
      { action: "Holiday prefs incomplete", date: new Date(2023, 3, 15), completed: false },
      { action: "Started Plan", date: new Date(2023, 3, 15), completed: true, actor: "Eric" },
      { action: "Course not yet scheduled", date: new Date(2023, 3, 15), completed: false }
    ],
    adminNotes: [
      { 
        id: "NOTE-001", 
        text: "Reached out to Sarah about holiday preferences", 
        date: new Date(2023, 4, 26)
      }
    ]
  },
  {
    id: "FAM-002",
    familyName: "Smith Family",
    parents: [
      { id: 3, name: "James Smith", email: "james@example.com" },
      { id: 4, name: "Emma Smith", email: "emma@example.com" }
    ],
    children: [
      { id: 3, name: "Olivia", age: 7 },
      { id: 4, name: "Ethan", age: 5 },
      { id: 5, name: "Ava", age: 3 }
    ],
    plan: {
      status: "Complete",
      percentComplete: 100,
      sections: [
        { name: "Custody", status: true, lastEdited: new Date(2023, 2, 5) },
        { name: "Communication", status: true, lastEdited: new Date(2023, 2, 7) },
        { name: "Holidays", status: true, lastEdited: new Date(2023, 2, 9) },
        { name: "Travel", status: true, lastEdited: new Date(2023, 2, 12) },
        { name: "Finalized", status: true, lastEdited: new Date(2023, 2, 15) }
      ]
    },
    waiverStatus: true,
    holidayPreferences: true,
    coParentStatus: "Joined",
    lastActive: new Date(2023, 4, 15), // 15 days ago
    flags: [],
    course: {
      scheduled: true,
      proposedDate: new Date(2023, 5, 15),
      confirmedByBothParents: true
    },
    engagement: [
      { action: "James invited Emma", date: new Date(2023, 2, 1), completed: true },
      { action: "Emma accepted invite", date: new Date(2023, 2, 2), completed: true },
      { action: "Waivers signed", date: new Date(2023, 2, 3), completed: true },
      { action: "Holiday prefs completed", date: new Date(2023, 2, 4), completed: true },
      { action: "Started Plan", date: new Date(2023, 2, 5), completed: true, actor: "James" },
      { action: "Plan completed", date: new Date(2023, 2, 15), completed: true },
      { action: "Course scheduled", date: new Date(2023, 2, 20), completed: true }
    ],
    adminNotes: []
  },
  {
    id: "FAM-003",
    familyName: "Williams Family",
    parents: [
      { id: 5, name: "Michael Williams", email: "michael@example.com" },
      { id: 6, name: "Jessica Williams", email: "jessica@example.com" }
    ],
    children: [
      { id: 6, name: "Sophia", age: 10 }
    ],
    plan: {
      status: "Not Started",
      percentComplete: 0,
      sections: [
        { name: "Custody", status: false },
        { name: "Communication", status: false },
        { name: "Holidays", status: false },
        { name: "Travel", status: false },
        { name: "Finalized", status: false }
      ]
    },
    waiverStatus: false,
    holidayPreferences: false,
    coParentStatus: "Invited",
    lastActive: new Date(2023, 4, 25), // 5 days ago
    flags: [
      { 
        id: "FLAG-002", 
        message: "Co-Parent not joined after 7 days", 
        status: "Active" 
      },
      { 
        id: "FLAG-003", 
        message: "Waivers incomplete", 
        status: "Active" 
      }
    ],
    course: {
      scheduled: false,
      confirmedByBothParents: false
    },
    engagement: [
      { action: "Michael invited Jessica", date: new Date(2023, 4, 18), completed: true },
      { action: "Jessica not yet accepted", date: new Date(2023, 4, 25), completed: false },
      { action: "Waivers incomplete", date: new Date(2023, 4, 25), completed: false },
      { action: "Plan not started", date: new Date(2023, 4, 25), completed: false },
      { action: "Course not scheduled", date: new Date(2023, 4, 25), completed: false }
    ],
    adminNotes: [
      { 
        id: "NOTE-002", 
        text: "Called Michael to follow up on invite to Jessica", 
        date: new Date(2023, 4, 26) 
      }
    ]
  },
  {
    id: "FAM-004",
    familyName: "Brown Family",
    parents: [
      { id: 7, name: "David Brown", email: "david@example.com" }
    ],
    children: [
      { id: 7, name: "Liam", age: 8 },
      { id: 8, name: "Emma", age: 6 }
    ],
    plan: {
      status: "Not Started",
      percentComplete: 0,
      sections: [
        { name: "Custody", status: false },
        { name: "Communication", status: false },
        { name: "Holidays", status: false },
        { name: "Travel", status: false },
        { name: "Finalized", status: false }
      ]
    },
    waiverStatus: true,
    holidayPreferences: false,
    coParentStatus: "Not Invited",
    lastActive: new Date(2023, 4, 27), // 3 days ago
    flags: [
      { 
        id: "FLAG-004", 
        message: "Co-Parent not invited", 
        status: "Active" 
      }
    ],
    course: {
      scheduled: false,
      confirmedByBothParents: false
    },
    engagement: [
      { action: "David created account", date: new Date(2023, 4, 20), completed: true },
      { action: "Waivers signed", date: new Date(2023, 4, 21), completed: true },
      { action: "Co-parent not invited", date: new Date(2023, 4, 27), completed: false },
      { action: "Plan not started", date: new Date(2023, 4, 27), completed: false },
      { action: "Course not scheduled", date: new Date(2023, 4, 27), completed: false }
    ],
    adminNotes: [
      { 
        id: "NOTE-003", 
        text: "David mentioned he is unsure about co-parent's email address", 
        date: new Date(2023, 4, 22) 
      }
    ]
  },
  {
    id: "FAM-005",
    familyName: "Miller Family",
    parents: [
      { id: 9, name: "Robert Miller", email: "robert@example.com" },
      { id: 10, name: "Jennifer Miller", email: "jennifer@example.com" }
    ],
    children: [
      { id: 9, name: "Noah", age: 9 },
      { id: 10, name: "Charlotte", age: 7 }
    ],
    plan: {
      status: "In Progress",
      percentComplete: 40,
      sections: [
        { name: "Custody", status: true, lastEdited: new Date(2023, 4, 10) },
        { name: "Communication", status: true, lastEdited: new Date(2023, 4, 12) },
        { name: "Holidays", status: false },
        { name: "Travel", status: false },
        { name: "Finalized", status: false }
      ]
    },
    waiverStatus: true,
    holidayPreferences: true,
    coParentStatus: "Joined",
    lastActive: new Date(2023, 4, 26), // 4 days ago
    flags: [],
    course: {
      scheduled: true,
      proposedDate: new Date(2023, 5, 20),
      confirmedByBothParents: false
    },
    engagement: [
      { action: "Robert invited Jennifer", date: new Date(2023, 4, 5), completed: true },
      { action: "Jennifer accepted invite", date: new Date(2023, 4, 7), completed: true },
      { action: "Waivers signed", date: new Date(2023, 4, 8), completed: true },
      { action: "Holiday prefs completed", date: new Date(2023, 4, 9), completed: true },
      { action: "Started Plan", date: new Date(2023, 4, 10), completed: true, actor: "Jennifer" },
      { action: "Course proposed by admin", date: new Date(2023, 4, 15), completed: true },
      { action: "Robert confirmed course date", date: new Date(2023, 4, 16), completed: true },
      { action: "Jennifer has not confirmed course date", date: new Date(2023, 4, 26), completed: false }
    ],
    adminNotes: [
      { 
        id: "NOTE-004", 
        text: "Sent reminder email to Jennifer about course confirmation", 
        date: new Date(2023, 4, 25) 
      }
    ]
  }
];