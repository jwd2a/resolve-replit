import { 
  User, InsertUser, Module, InsertModule, 
  Section, InsertSection, Progress, InsertProgress,
  CoParent, InsertCoParent, Child, InsertChild, 
  ParentingPlan, InsertParentingPlan,
  users, modules, sections, progress, 
  coParents, children, parentingPlans
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

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
 * Database Storage Implementation
 */
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User> {
    const [user] = await db.update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return user;
  }
  
  // Co-parent methods
  async getCoParents(userId: number): Promise<CoParent[]> {
    return db.select().from(coParents).where(eq(coParents.userId, userId));
  }
  
  async getCoParent(id: number): Promise<CoParent | undefined> {
    const [coParent] = await db.select().from(coParents).where(eq(coParents.id, id));
    return coParent || undefined;
  }
  
  async createCoParent(insertCoParent: InsertCoParent): Promise<CoParent> {
    const [coParent] = await db.insert(coParents).values(insertCoParent).returning();
    return coParent;
  }
  
  async updateCoParent(id: number, coParentData: Partial<InsertCoParent>): Promise<CoParent> {
    const [coParent] = await db.update(coParents)
      .set(coParentData)
      .where(eq(coParents.id, id))
      .returning();
    return coParent;
  }
  
  // Child methods
  async getChildren(userId: number): Promise<Child[]> {
    return db.select().from(children).where(eq(children.userId, userId));
  }
  
  async getChild(id: number): Promise<Child | undefined> {
    const [child] = await db.select().from(children).where(eq(children.id, id));
    return child || undefined;
  }
  
  async createChild(insertChild: InsertChild): Promise<Child> {
    const [child] = await db.insert(children).values(insertChild).returning();
    return child;
  }
  
  async updateChild(id: number, childData: Partial<InsertChild>): Promise<Child> {
    const [child] = await db.update(children)
      .set(childData)
      .where(eq(children.id, id))
      .returning();
    return child;
  }
  
  // Parenting Plan methods
  async getParentingPlan(userId: number): Promise<ParentingPlan | undefined> {
    const [plan] = await db.select().from(parentingPlans).where(eq(parentingPlans.userId, userId));
    return plan || undefined;
  }
  
  async createParentingPlan(insertParentingPlan: InsertParentingPlan): Promise<ParentingPlan> {
    const [plan] = await db.insert(parentingPlans).values(insertParentingPlan).returning();
    return plan;
  }
  
  async updateParentingPlan(id: number, planData: Partial<InsertParentingPlan>): Promise<ParentingPlan> {
    const [plan] = await db.update(parentingPlans)
      .set(planData)
      .where(eq(parentingPlans.id, id))
      .returning();
    return plan;
  }

  async getModules(): Promise<Module[]> {
    const result = await db.select().from(modules).orderBy(modules.order);
    return result;
  }

  async getModule(id: number): Promise<Module | undefined> {
    const [module] = await db.select().from(modules).where(eq(modules.id, id));
    return module || undefined;
  }

  async createModule(insertModule: InsertModule): Promise<Module> {
    const [module] = await db.insert(modules).values(insertModule).returning();
    return module;
  }

  async getSections(moduleId?: number): Promise<Section[]> {
    if (moduleId) {
      return db.select().from(sections).where(eq(sections.moduleId, moduleId)).orderBy(sections.order);
    }
    return db.select().from(sections).orderBy(sections.order);
  }

  async getSection(id: number): Promise<Section | undefined> {
    const [section] = await db.select().from(sections).where(eq(sections.id, id));
    return section || undefined;
  }

  async getSectionBySlug(slug: string): Promise<Section | undefined> {
    const [section] = await db.select().from(sections).where(eq(sections.slug, slug));
    return section || undefined;
  }

  async createSection(insertSection: InsertSection): Promise<Section> {
    const [section] = await db.insert(sections).values(insertSection).returning();
    return section;
  }

  async getProgress(userId: number): Promise<Progress[]> {
    return db.select().from(progress).where(eq(progress.userId, userId));
  }

  async updateProgress(insertProgress: InsertProgress): Promise<Progress> {
    // Check if progress already exists
    const [existing] = await db.select().from(progress).where(
      and(
        eq(progress.userId, insertProgress.userId),
        eq(progress.moduleId, insertProgress.moduleId),
        eq(progress.sectionId, insertProgress.sectionId)
      )
    );

    if (existing) {
      // Update existing progress
      const [updated] = await db.update(progress)
        .set(insertProgress)
        .where(eq(progress.id, existing.id))
        .returning();
      return updated;
    } else {
      // Create new progress
      const [newProgress] = await db.insert(progress)
        .values(insertProgress)
        .returning();
      return newProgress;
    }
  }
}

// Initialize the database with sample data
async function seedDatabase() {
  try {
    // First check if we already have data
    const existingModules = await db.select().from(modules);
    if (existingModules.length > 0) {
      console.log("Database already seeded, skipping");
      return;
    }

    console.log("Seeding database with initial data...");
    
    // Create a demo user
    const demoUser: InsertUser = {
      username: "johndoe",
      password: "password123",
      displayName: "John Doe",
      email: "john.doe@example.com",
      role: "parent"
    };
    
    const [user] = await db.insert(users).values(demoUser).returning();

    // Create modules
    const moduleData: InsertModule[] = [
      { title: "Introduction", order: 1, description: "Introduction to the course" },
      { title: "Design Thinking", order: 2, description: "Learn about design thinking methodology" },
      { title: "Technical Implementation", order: 3, description: "Implement solutions with best practices" },
      { title: "Project Management", order: 4, description: "Manage projects efficiently" },
      { title: "Final Assessment", order: 5, description: "Final course assessment" }
    ];
    
    const insertedModules = await db.insert(modules).values(moduleData).returning();
    
    // Find Technical Implementation module
    const techModule = insertedModules.find((m: Module) => m.title === "Technical Implementation");
    if (!techModule) {
      throw new Error("Failed to find Technical Implementation module");
    }

    // Create sections for the Technical Implementation module
    const sectionData: InsertSection[] = [
      {
        moduleId: techModule.id,
        title: "Overview",
        slug: "3.0",
        order: 1,
        content: {
          title: "3.0 Technical Implementation Overview",
          description: "This module explores the technical aspects of implementing solutions, focusing on best practices, code architecture, and deployment strategies. You'll learn how to translate design concepts into functional applications.",
          timeEstimate: 45,
          difficulty: "Intermediate",
          type: "hands-on",
          objectives: [
            "Understand the technical implementation workflow and its importance in project delivery",
            "Learn to choose appropriate technologies for different solution requirements",
            "Identify common implementation challenges and how to overcome them",
            "Develop strategies for balancing technical debt with delivery timelines"
          ],
          sections: [
            {
              title: "Implementation Fundamentals",
              content: "Technical implementation is the bridge between design concepts and functional solutions. Effective implementation requires careful planning, appropriate technology selection, and systematic execution.",
              processList: [
                "Analyze requirements and design specifications",
                "Select appropriate technologies and frameworks",
                "Develop architecture and component structure",
                "Implement core functionality",
                "Test and iterate",
                "Optimize for performance and scalability",
                "Deploy to production environment"
              ],
              considerations: [
                {
                  title: "Modularity",
                  icon: "puzzle-piece",
                  description: "Building modular components allows for better maintainability, reusability, and scalability."
                },
                {
                  title: "Performance",
                  icon: "tachometer-alt",
                  description: "Consider performance implications early to avoid costly refactoring later in the project."
                },
                {
                  title: "Security",
                  icon: "shield-alt",
                  description: "Implement security best practices from the beginning to protect data and functionality."
                },
                {
                  title: "Accessibility",
                  icon: "universal-access",
                  description: "Ensure your implementation is accessible to users with different abilities and needs."
                }
              ]
            }
          ],
          exercises: [
            {
              title: "Technology Selection Exercise",
              description: "Practice evaluating technology options for different implementation scenarios. For each case, select the most appropriate technology stack.",
              questions: [
                {
                  title: "Scenario 1: E-commerce Platform",
                  question: "A client needs a scalable e-commerce platform with inventory management, user accounts, and payment processing. Which technology stack would you recommend?",
                  options: [
                    "MERN Stack (MongoDB, Express, React, Node.js)",
                    "Django with PostgreSQL and React frontend",
                    "Laravel with MySQL and Vue.js frontend",
                    "Ruby on Rails with React frontend"
                  ],
                  correctAnswer: 0
                }
              ]
            }
          ],
          codeExamples: [
            {
              title: "Implementation Example",
              description: "Below is an example of a modular component implementation using React. This demonstrates key concepts of reusability and separation of concerns.",
              filename: "DataTable.jsx",
              code: `import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Pagination, Spinner, ErrorMessage } from './components';

const DataTable = ({ 
  columns, 
  fetchData, 
  initialFilters = {}, 
  pageSize = 10 
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(initialFilters);
  const [totalItems, setTotalItems] = useState(0);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetchData({ 
          page, 
          pageSize, 
          filters 
        });
        setData(response.data);
        setTotalItems(response.totalItems);
        setError(null);
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [page, filters, pageSize, fetchData]);
  
  return (
    <div className="data-table">
      {error && <ErrorMessage message={error} />}
      
      {loading ? (
        <Spinner />
      ) : (
        <>
          <table className="w-full">
            <thead>
              <tr>
                {columns.map(column => (
                  <th key={column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {columns.map(column => (
                    <td key={\`\${index}-\${column.key}\`}>
                      {column.render 
                        ? column.render(row) 
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          
          <Pagination
            currentPage={page}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      render: PropTypes.func
    })
  ).isRequired,
  fetchData: PropTypes.func.isRequired,
  initialFilters: PropTypes.object,
  pageSize: PropTypes.number
};

export default DataTable;`
            }
          ]
        },
        timeEstimate: 45,
        difficulty: "Intermediate"
      },
      {
        moduleId: techModule.id,
        title: "Implementation Strategy",
        slug: "3.1",
        order: 2,
        content: {
          title: "3.1 Implementation Strategy",
          description: "This section covers strategies for effective technical implementation.",
          timeEstimate: 30,
          difficulty: "Intermediate"
        },
        timeEstimate: 30,
        difficulty: "Intermediate"
      },
      {
        moduleId: techModule.id,
        title: "Code Examples",
        slug: "3.2",
        order: 3,
        content: {
          title: "3.2 Code Examples",
          description: "This section provides real-world code examples for common implementation patterns.",
          timeEstimate: 60,
          difficulty: "Advanced"
        },
        timeEstimate: 60,
        difficulty: "Advanced"
      },
      {
        moduleId: techModule.id,
        title: "Testing Protocol",
        slug: "3.3",
        order: 4,
        content: {
          title: "3.3 Testing Protocol",
          description: "Learn effective testing strategies for your implementations.",
          timeEstimate: 45,
          difficulty: "Intermediate"
        },
        timeEstimate: 45,
        difficulty: "Intermediate"
      },
      {
        moduleId: techModule.id,
        title: "Deployment",
        slug: "3.4",
        order: 5,
        content: {
          title: "3.4 Deployment",
          description: "Best practices for deploying applications to production environments.",
          timeEstimate: 40,
          difficulty: "Intermediate"
        },
        timeEstimate: 40,
        difficulty: "Intermediate"
      }
    ];
    
    await db.insert(sections).values(sectionData);
    
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Export database storage
export const storage = new DatabaseStorage();

// Seed the database when this file is imported
seedDatabase();
