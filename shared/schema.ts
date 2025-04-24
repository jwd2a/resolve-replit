import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password"),
  displayName: text("display_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  address: text("address"),
  role: text("role").notNull().default("parent"),
  authProvider: text("auth_provider"),
  providerId: text("provider_id"),
  onboardingComplete: boolean("onboarding_complete").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  email: true,
  phone: true,
  address: true,
  role: true,
  authProvider: true,
  providerId: true,
  onboardingComplete: true,
});

// Co-parent information
export const coParents = pgTable("co_parents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  relationship: text("relationship"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCoParentSchema = createInsertSchema(coParents).pick({
  userId: true,
  fullName: true,
  email: true,
  phone: true,
  address: true,
  relationship: true,
});

// Children information
export const children = pgTable("children", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  fullName: text("full_name").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  gender: text("gender"),
  specialNeeds: text("special_needs"),
  additionalInfo: text("additional_info"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertChildSchema = createInsertSchema(children).pick({
  userId: true,
  fullName: true,
  dateOfBirth: true,
  gender: true,
  specialNeeds: true,
  additionalInfo: true,
});

// Parenting Plan Information
export const parentingPlans = pgTable("parenting_plans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  jurisdiction: text("jurisdiction").notNull(),
  caseNumber: text("case_number"),
  courtName: text("court_name"),
  status: text("status").default("draft"),
  lastUpdated: timestamp("last_updated").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertParentingPlanSchema = createInsertSchema(parentingPlans).pick({
  userId: true,
  jurisdiction: true,
  caseNumber: true,
  courtName: true,
  status: true,
});

// Module model
export const modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  order: integer("order").notNull(),
});

export const insertModuleSchema = createInsertSchema(modules).pick({
  title: true,
  description: true,
  order: true,
});

// Section model
export const sections = pgTable("sections", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  order: integer("order").notNull(),
  content: jsonb("content"),
  timeEstimate: integer("time_estimate"),
  difficulty: text("difficulty"),
});

export const insertSectionSchema = createInsertSchema(sections).pick({
  moduleId: true,
  title: true,
  slug: true,
  order: true,
  content: true,
  timeEstimate: true,
  difficulty: true,
});

// Progress model
export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  moduleId: integer("module_id").notNull(),
  sectionId: integer("section_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  dateCompleted: text("date_completed"),
});

export const insertProgressSchema = createInsertSchema(progress).pick({
  userId: true,
  moduleId: true,
  sectionId: true,
  completed: true,
  dateCompleted: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type CoParent = typeof coParents.$inferSelect;
export type InsertCoParent = z.infer<typeof insertCoParentSchema>;

export type Child = typeof children.$inferSelect;
export type InsertChild = z.infer<typeof insertChildSchema>;

export type ParentingPlan = typeof parentingPlans.$inferSelect;
export type InsertParentingPlan = z.infer<typeof insertParentingPlanSchema>;

export type Module = typeof modules.$inferSelect;
export type InsertModule = z.infer<typeof insertModuleSchema>;

export type Section = typeof sections.$inferSelect;
export type InsertSection = z.infer<typeof insertSectionSchema>;

export type Progress = typeof progress.$inferSelect;
export type InsertProgress = z.infer<typeof insertProgressSchema>;
