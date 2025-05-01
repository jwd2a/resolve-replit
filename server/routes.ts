import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { setupPaymentRoutes } from "./payments";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Get all modules
  app.get("/api/modules", async (req, res) => {
    const modules = await storage.getModules();
    res.json({ modules });
  });
  
  // Get a specific module
  app.get("/api/modules/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid module ID" });
    }
    
    const module = await storage.getModule(id);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    
    res.json({ module });
  });
  
  // Get all sections or sections for a specific module
  app.get("/api/sections", async (req, res) => {
    const moduleId = req.query.moduleId ? parseInt(req.query.moduleId as string) : undefined;
    
    const sections = await storage.getSections(moduleId);
    res.json({ sections });
  });
  
  // Get a specific section by slug
  app.get("/api/sections/slug/:slug", async (req, res) => {
    const slug = req.params.slug;
    
    const section = await storage.getSectionBySlug(slug);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }
    
    res.json({ section });
  });
  
  // Get a specific section by ID
  app.get("/api/sections/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid section ID" });
    }
    
    const section = await storage.getSection(id);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }
    
    res.json({ section });
  });
  
  // Get user progress
  app.get("/api/progress/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const progress = await storage.getProgress(userId);
    res.json({ progress });
  });
  
  // Update user progress
  app.post("/api/progress", async (req, res) => {
    const schema = z.object({
      userId: z.number(),
      moduleId: z.number(),
      sectionId: z.number(),
      completed: z.boolean().optional(),
      dateCompleted: z.string().optional()
    });
    
    try {
      const data = schema.parse(req.body);
      const progress = await storage.updateProgress(data);
      res.json({ progress });
    } catch (error) {
      res.status(400).json({ message: "Invalid progress data", error });
    }
  });
  
  const httpServer = createServer(app);
  return httpServer;
}
