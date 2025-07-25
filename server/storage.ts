import { 
  User, InsertUser, Module, InsertModule, 
  Section, InsertSection, Progress, InsertProgress,
  CoParent, InsertCoParent, Child, InsertChild, 
  ParentingPlan, InsertParentingPlan,
  users, modules, sections, progress, 
  coParents, children, parentingPlans
} from "@shared/schema";
// import { db } from "./db";
// import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User>;
  
  // Co-parent methods
  getCoParents(userId: number): Promise<CoParent[]>;
  getCoParent(id: number): Promise<CoParent | undefined>;
  createCoParent(coParent: InsertCoParent): Promise<CoParent>;
  updateCoParent(id: number, coParent: Partial<InsertCoParent>): Promise<CoParent>;
  
  // Child methods
  getChildren(userId: number): Promise<Child[]>;
  getChild(id: number): Promise<Child | undefined>;
  createChild(child: InsertChild): Promise<Child>;
  updateChild(id: number, child: Partial<InsertChild>): Promise<Child>;
  
  // Parenting Plan methods
  getParentingPlan(userId: number): Promise<ParentingPlan | undefined>;
  createParentingPlan(parentingPlan: InsertParentingPlan): Promise<ParentingPlan>;
  updateParentingPlan(id: number, parentingPlan: Partial<InsertParentingPlan>): Promise<ParentingPlan>;
  
  // Module methods
  getModules(): Promise<Module[]>;
  getModule(id: number): Promise<Module | undefined>;
  createModule(module: InsertModule): Promise<Module>;
  
  // Section methods
  getSections(moduleId?: number): Promise<Section[]>;
  getSection(id: number): Promise<Section | undefined>;
  getSectionBySlug(slug: string): Promise<Section | undefined>;
  createSection(section: InsertSection): Promise<Section>;
  
  // Progress methods
  getProgress(userId: number): Promise<Progress[]>;
  updateProgress(progress: InsertProgress): Promise<Progress>;
}

/**
 * Mock Storage Implementation (for prototype/demo purposes)
 */
export class MockStorage implements IStorage {
  private mockData = {
    users: [
      { 
        id: 1, 
        username: "johndoe", 
        password: "password123", 
        displayName: "John Doe", 
        email: "john.doe@example.com", 
        phone: null,
        address: null,
        role: "parent",
        authProvider: null,
        providerId: null,
        onboardingComplete: null,
        createdAt: new Date()
      }
    ],
    modules: [
      { id: 1, title: "Introduction", order: 1, description: "Introduction to the course" },
      { id: 2, title: "Design Thinking", order: 2, description: "Learn about design thinking methodology" },
      { id: 3, title: "Technical Implementation", order: 3, description: "Implement solutions with best practices" },
      { id: 4, title: "Project Management", order: 4, description: "Manage projects efficiently" },
      { id: 5, title: "Final Assessment", order: 5, description: "Final course assessment" }
    ],
    sections: [
      {
        id: 1,
        moduleId: 3,
        title: "Overview",
        slug: "3.0",
        order: 1,
        content: {
          title: "3.0 Technical Implementation Overview",
          description: "This module explores the technical aspects of implementing solutions, focusing on best practices, code architecture, and deployment strategies.",
          timeEstimate: 45,
          difficulty: "Intermediate",
          type: "hands-on"
        },
        timeEstimate: 45,
        difficulty: "Intermediate" as const
      }
    ],
    progress: [] as Progress[],
    coParents: [] as CoParent[],
    children: [] as Child[],
    parentingPlans: [] as ParentingPlan[]
  };

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.mockData.users.find(u => u.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.mockData.users.find(u => u.username === username);
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.mockData.users.find(u => u.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const newUser = { ...insertUser, id: this.mockData.users.length + 1 };
    this.mockData.users.push(newUser);
    return newUser;
  }
  
  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User> {
    const userIndex = this.mockData.users.findIndex(u => u.id === id);
    if (userIndex === -1) throw new Error("User not found");
    
    this.mockData.users[userIndex] = { ...this.mockData.users[userIndex], ...userData };
    return this.mockData.users[userIndex];
  }
  
  // Co-parent methods
  async getCoParents(userId: number): Promise<CoParent[]> {
    return this.mockData.coParents.filter(cp => cp.userId === userId);
  }
  
  async getCoParent(id: number): Promise<CoParent | undefined> {
    return this.mockData.coParents.find(cp => cp.id === id);
  }
  
  async createCoParent(insertCoParent: InsertCoParent): Promise<CoParent> {
    const newCoParent = { ...insertCoParent, id: this.mockData.coParents.length + 1 };
    this.mockData.coParents.push(newCoParent);
    return newCoParent;
  }
  
  async updateCoParent(id: number, coParentData: Partial<InsertCoParent>): Promise<CoParent> {
    const index = this.mockData.coParents.findIndex(cp => cp.id === id);
    if (index === -1) throw new Error("Co-parent not found");
    
    this.mockData.coParents[index] = { ...this.mockData.coParents[index], ...coParentData };
    return this.mockData.coParents[index];
  }
  
  // Child methods
  async getChildren(userId: number): Promise<Child[]> {
    return this.mockData.children.filter(c => c.userId === userId);
  }
  
  async getChild(id: number): Promise<Child | undefined> {
    return this.mockData.children.find(c => c.id === id);
  }
  
  async createChild(insertChild: InsertChild): Promise<Child> {
    const newChild = { ...insertChild, id: this.mockData.children.length + 1 };
    this.mockData.children.push(newChild);
    return newChild;
  }
  
  async updateChild(id: number, childData: Partial<InsertChild>): Promise<Child> {
    const index = this.mockData.children.findIndex(c => c.id === id);
    if (index === -1) throw new Error("Child not found");
    
    this.mockData.children[index] = { ...this.mockData.children[index], ...childData };
    return this.mockData.children[index];
  }
  
  // Parenting Plan methods
  async getParentingPlan(userId: number): Promise<ParentingPlan | undefined> {
    return this.mockData.parentingPlans.find(pp => pp.userId === userId);
  }
  
  async createParentingPlan(insertParentingPlan: InsertParentingPlan): Promise<ParentingPlan> {
    const newPlan = { ...insertParentingPlan, id: this.mockData.parentingPlans.length + 1 };
    this.mockData.parentingPlans.push(newPlan);
    return newPlan;
  }
  
  async updateParentingPlan(id: number, planData: Partial<InsertParentingPlan>): Promise<ParentingPlan> {
    const index = this.mockData.parentingPlans.findIndex(pp => pp.id === id);
    if (index === -1) throw new Error("Parenting plan not found");
    
    this.mockData.parentingPlans[index] = { ...this.mockData.parentingPlans[index], ...planData };
    return this.mockData.parentingPlans[index];
  }

  async getModules(): Promise<Module[]> {
    return [...this.mockData.modules].sort((a, b) => a.order - b.order);
  }

  async getModule(id: number): Promise<Module | undefined> {
    return this.mockData.modules.find(m => m.id === id);
  }

  async createModule(insertModule: InsertModule): Promise<Module> {
    const newModule = { ...insertModule, id: this.mockData.modules.length + 1 };
    this.mockData.modules.push(newModule);
    return newModule;
  }

  async getSections(moduleId?: number): Promise<Section[]> {
    let sections = this.mockData.sections;
    if (moduleId) {
      sections = sections.filter(s => s.moduleId === moduleId);
    }
    return [...sections].sort((a, b) => a.order - b.order);
  }

  async getSection(id: number): Promise<Section | undefined> {
    return this.mockData.sections.find(s => s.id === id);
  }

  async getSectionBySlug(slug: string): Promise<Section | undefined> {
    return this.mockData.sections.find(s => s.slug === slug);
  }

  async createSection(insertSection: InsertSection): Promise<Section> {
    const newSection = { ...insertSection, id: this.mockData.sections.length + 1 };
    this.mockData.sections.push(newSection);
    return newSection;
  }

  async getProgress(userId: number): Promise<Progress[]> {
    return this.mockData.progress.filter(p => p.userId === userId);
  }

  async updateProgress(insertProgress: InsertProgress): Promise<Progress> {
    // Check if progress already exists
    const existingIndex = this.mockData.progress.findIndex(p => 
      p.userId === insertProgress.userId &&
      p.moduleId === insertProgress.moduleId &&
      p.sectionId === insertProgress.sectionId
    );

    if (existingIndex !== -1) {
      // Update existing progress
      this.mockData.progress[existingIndex] = { ...this.mockData.progress[existingIndex], ...insertProgress };
      return this.mockData.progress[existingIndex];
    } else {
      // Create new progress
      const newProgress = { ...insertProgress, id: this.mockData.progress.length + 1 };
      this.mockData.progress.push(newProgress);
      return newProgress;
    }
  }
}

// Export mock storage for prototype
export const storage = new MockStorage();

console.log("Using mock storage for prototype - no database required");
