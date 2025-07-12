# Resolve - Co-Parenting Platform

## Overview

Resolve is a web application designed to help separating or divorcing parents collaboratively build co-parenting plans without going through adversarial family court proceedings. The platform provides guided onboarding, educational courses, document management, and plan building tools in a supportive, emotionally-aware environment.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: TailwindCSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: React Query for server state, React hooks for local state
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (Neon serverless)
- **API Style**: RESTful endpoints

### Key Design Principles
- Mobile-first responsive design
- Emotionally supportive user experience
- Clean, warm visual design with purple brand colors
- Progressive disclosure of information
- DocuSign-style signature flows

## Key Components

### Authentication & User Management
- User registration and login system
- Role-based access (parents, co-parents, admin)
- Onboarding completion tracking
- Provider-based authentication support

### Onboarding Flow
- Multi-step emotional check-in (4 steps without progress bar)
- Legal profile collection (5 steps with progress tracking)
- Family information collection
- Co-parent invitation system
- Jurisdiction selection

### Course System
- Modular course structure with sections
- Progress tracking per user
- Video content integration (Vimeo player)
- Interactive elements and assessments
- Session scheduling functionality

### Document Management
- Waiver and acknowledgment system with DocuSign-style signatures
- Digital signature capture (draw/type)
- Parenting plan document generation
- PDF download and print capabilities
- Version control and editing workflows

### Payment Integration
- Stripe payment processing
- Course payment ($149 standard)
- Payment status tracking
- Integration with user access controls

## Data Flow

### User Journey
1. **Registration** → Emotional onboarding → Legal profile setup
2. **Family Setup** → Co-parent invitation → Jurisdiction selection
3. **Prerequisites** → Waivers signing → Payment processing
4. **Course Access** → Module progression → Plan building
5. **Document Creation** → Collaborative editing → Final signatures

### Data Models
- **Users**: Authentication, profile, onboarding status
- **Co-Parents**: Relationship mapping, invitation status
- **Children**: Family structure information
- **Modules/Sections**: Course content organization
- **Progress**: User advancement tracking
- **Parenting Plans**: Document structure and status

## External Dependencies

### Payment Processing
- **Stripe**: Payment intents, subscription management
- Webhook handling for payment confirmations
- Secure card processing with client-side integration

### Email Services
- **SendGrid**: Transactional emails for invitations
- Welcome sequences and progress notifications
- Document sharing and completion alerts

### Video Hosting
- **Vimeo Player**: Course video content delivery
- Embedded player controls and progress tracking

### Database
- **Neon PostgreSQL**: Serverless database hosting
- Connection pooling for performance
- Environment-based configuration

## Deployment Strategy

### Development Environment
- Replit-based development with hot reloading
- Vite dev server with Express API
- Environment variable management
- Database migrations via Drizzle Kit

### Production Considerations
- Static asset building via Vite
- Node.js server bundle with esbuild
- Database connection management
- Environment variable security

### Build Process
- TypeScript compilation checking
- Client-side bundle optimization
- Server-side code bundling
- Database schema deployment

The application follows a modern full-stack TypeScript architecture with clear separation between client and server concerns, emphasizing user experience and emotional support throughout the co-parenting journey.

## Recent Changes (January 2025)

### Parenting Plan Document Layout Improvements
- **Updated Table of Contents**: Restructured TOC into accordion layout with 4 main sections (Parental Responsibility, Timesharing, Educational Decisions, Final Considerations) with expandable subsections for better navigation
- **Persistent Sidebar Layout**: Implemented fixed sidebars with scrollable document content only - left sidebar contains TOC accordion, right sidebar contains Parenting Plan Assistant
- **Improved Document Navigation**: Enhanced section navigation with numbered subsections and active state highlighting for easy document traversal
- **Mobile-Responsive Design**: Maintained responsive behavior with collapsible sidebars on smaller screens