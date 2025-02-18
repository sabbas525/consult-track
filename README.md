# Consult Track

A lightweight time-tracking and invoicing tool built for freelancers and consultants. Track hours per project, generate invoices, and monitor earnings — all in one place.

## Why?

Existing tools are either overkill (Harvest, Toggl with all the bells and whistles) or too basic (spreadsheets). This sits in the middle: actually usable for daily time logging, with invoice generation built in.

## Architecture

```
React (TypeScript)
  + tRPC client
  + Tailwind + shadcn/ui
       |
       | (type-safe RPC, no REST)
       v
Node.js server (TypeScript)
  + tRPC router
  + Prisma ORM
  + User-scoped context middleware
       |
       v
PostgreSQL
  (all tables scoped by userId)
```

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, tRPC client
- **Backend:** Node.js, TypeScript, tRPC, Prisma
- **Database:** PostgreSQL
- **Tooling:** pnpm workspaces, Docker Compose

## Features

- Log hours per project per client
- Dashboard with weekly hours, monthly earnings, unpaid invoices
- Generate invoices from tracked time (auto-calculates from hourly rates)
- Invoice status tracking (draft → sent → paid)
- Multi-tenant: all data scoped by user

## Getting Started

```bash
# Start database
docker compose up -d

# Install dependencies
pnpm install

# Set up database
cp .env.example .env
pnpm db:push
pnpm db:generate

# Run development servers
pnpm dev
```

- Frontend: http://localhost:3000
- Backend (tRPC): http://localhost:3001

## Design Decisions

- **tRPC over REST** — end-to-end type safety, no API schema to maintain separately
- **Prisma** — type-safe database access, easy migrations, great DX
- **User scoping in context** — all queries automatically filter by userId, enforced at the middleware level
- **Monorepo with pnpm workspaces** — shared types between frontend and backend without publishing packages
