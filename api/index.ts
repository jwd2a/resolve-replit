import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { registerRoutes } from '../server/routes';

// Create express app for handling requests
let app: express.Express | null = null;

const getApp = async () => {
  if (!app) {
    app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    // Register your existing routes (ignore the returned server)
    await registerRoutes(app);
  }
  return app;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const expressApp = await getApp();
  
  // Handle the request with the Express app
  expressApp(req as any, res as any);
} 