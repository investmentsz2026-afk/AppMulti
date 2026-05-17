# StreamSocial - Advanced Social Streaming Platform

Modern social streaming platform built with Next.js 15, NestJS, and Prisma. Designed for high scalability and futuristic user experience.

## Tech Stack

- **Monorepo**: Turborepo
- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Framer Motion, Zustand
- **Backend**: NestJS, Socket.io, JWT, Passport.js
- **Database**: Prisma ORM, PostgreSQL, Redis
- **Design**: Dark/Futuristic theme, Glassmorphism, Neon effects

## Structure

- `apps/web`: Next.js web application
- `apps/api`: NestJS backend API
- `packages/database`: Shared Prisma schema and client
- `packages/shared`: Shared TypeScript types and constants
- `packages/ui`: Shared React components (Shadcn/UI base)

## Prerequisites

- Node.js 18+
- PostgreSQL
- Redis (optional for development, required for production real-time)

## Getting Started

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```
3. **Configure Environment Variables**
   Create `.env` in the root or specific apps:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/streamsocial?schema=public"
   JWT_SECRET="your_secret_key"
   NEXT_PUBLIC_API_URL="http://localhost:3001"
   ```
4. **Generate Database Client**
   ```bash
   npm run db:generate --workspace=@repo/database
   ```
5. **Run Development Server**
   ```bash
   npm run dev
   ```

## Key Features Implemented

- [x] Professional Landing Page
- [x] Secure Authentication (JWT)
- [x] Role-based Dashboards (User, Streamer, Admin)
- [x] Responsive & Futuristic UI
- [x] Shared Architecture for Mobile Future

## Future Roadmap

- [ ] WebRTC/HLS Live Streaming Integration
- [ ] Real-time Battle Engine via Socket.io
- [ ] Virtual Gift System & Payment Gateway
- [ ] React Native Mobile App (Expo)
- [ ] AI-powered Content Moderation
