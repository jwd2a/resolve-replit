import { 
  User, InsertUser, Module, InsertModule, 
  Section, InsertSection, Progress, InsertProgress 
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private modules: Map<number, Module>;
  private sections: Map<number, Section>;
  private progresses: Map<string, Progress>;
  private currentUserId: number;
  private currentModuleId: number;
  private currentSectionId: number;
  private currentProgressId: number;

  constructor() {
    this.users = new Map();
    this.modules = new Map();
    this.sections = new Map();
    this.progresses = new Map();
    this.currentUserId = 1;
    this.currentModuleId = 1;
    this.currentSectionId = 1;
    this.currentProgressId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Create a demo user
    const demoUser: User = {
      id: this.currentUserId++,
      username: "johndoe",
      password: "password123",
      displayName: "John Doe",
      role: "student"
    };
    this.users.set(demoUser.id, demoUser);

    // Create modules
    const modules: InsertModule[] = [
      { title: "Introduction", order: 1, description: "Introduction to the course" },
      { title: "Design Thinking", order: 2, description: "Learn about design thinking methodology" },
      { title: "Technical Implementation", order: 3, description: "Implement solutions with best practices" },
      { title: "Project Management", order: 4, description: "Manage projects efficiently" },
      { title: "Final Assessment", order: 5, description: "Final course assessment" }
    ];

    modules.forEach(mod => {
      const module: Module = { ...mod, id: this.currentModuleId++ };
      this.modules.set(module.id, module);
    });

    // Create sections for the Technical Implementation module
    const techModuleId = 3; // Assuming it's the third module
    
    const sections: InsertSection[] = [
      {
        moduleId: techModuleId,
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
        moduleId: techModuleId,
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
        moduleId: techModuleId,
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
        moduleId: techModuleId,
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
        moduleId: techModuleId,
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

    sections.forEach(sec => {
      const section: Section = { ...sec, id: this.currentSectionId++ };
      this.sections.set(section.id, section);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Module methods
  async getModules(): Promise<Module[]> {
    return Array.from(this.modules.values()).sort((a, b) => a.order - b.order);
  }

  async getModule(id: number): Promise<Module | undefined> {
    return this.modules.get(id);
  }

  async createModule(insertModule: InsertModule): Promise<Module> {
    const id = this.currentModuleId++;
    const module: Module = { ...insertModule, id };
    this.modules.set(id, module);
    return module;
  }

  // Section methods
  async getSections(moduleId?: number): Promise<Section[]> {
    let sections = Array.from(this.sections.values());
    
    if (moduleId) {
      sections = sections.filter(section => section.moduleId === moduleId);
    }
    
    return sections.sort((a, b) => a.order - b.order);
  }

  async getSection(id: number): Promise<Section | undefined> {
    return this.sections.get(id);
  }

  async getSectionBySlug(slug: string): Promise<Section | undefined> {
    return Array.from(this.sections.values()).find(
      (section) => section.slug === slug
    );
  }

  async createSection(insertSection: InsertSection): Promise<Section> {
    const id = this.currentSectionId++;
    const section: Section = { ...insertSection, id };
    this.sections.set(id, section);
    return section;
  }

  // Progress methods
  async getProgress(userId: number): Promise<Progress[]> {
    return Array.from(this.progresses.values()).filter(
      (progress) => progress.userId === userId
    );
  }

  async updateProgress(insertProgress: InsertProgress): Promise<Progress> {
    const key = `${insertProgress.userId}-${insertProgress.moduleId}-${insertProgress.sectionId}`;
    const existingProgress = this.progresses.get(key);
    
    if (existingProgress) {
      const updatedProgress: Progress = {
        ...existingProgress,
        ...insertProgress
      };
      this.progresses.set(key, updatedProgress);
      return updatedProgress;
    } else {
      const id = this.currentProgressId++;
      const newProgress: Progress = { ...insertProgress, id };
      this.progresses.set(key, newProgress);
      return newProgress;
    }
  }
}

export const storage = new MemStorage();
