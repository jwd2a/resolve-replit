import type { Express } from "express";
import { createServer, type Server } from "http";
// import { storage } from "./storage";
import { z } from "zod";
import { setupPaymentRoutes } from "./payments";

export async function registerRoutes(app: Express): Promise<Server> {
  // Register payment routes
  setupPaymentRoutes(app);

  // API routes - disabled for prototype
  
  // Mock API endpoints for prototype
  app.get("/api/modules", async (req, res) => {
    res.json({ modules: [] });
  });
  
  app.get("/api/modules/:id", async (req, res) => {
    res.json({ module: null });
  });
  
  app.get("/api/sections", async (req, res) => {
    res.json({ sections: [] });
  });
  
  app.get("/api/sections/slug/:slug", async (req, res) => {
    res.status(404).json({ message: "Section not found" });
  });
  
  app.get("/api/sections/:id", async (req, res) => {
    res.status(404).json({ message: "Section not found" });
  });
  
  app.get("/api/progress/:userId", async (req, res) => {
    res.json({ progress: [] });
  });
  
  app.post("/api/progress", async (req, res) => {
    res.json({ progress: { id: 1, userId: 1, moduleId: 1, sectionId: 1 } });
  });
  
  const httpServer = createServer(app);
  return httpServer;
}
