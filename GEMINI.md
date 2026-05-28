# MyLink Project Guide

This file defines the structure, technology stack, development conventions, and key workflows for the MyLink project. The Gemini CLI agent must follow this guide during development.

## 1. Project Overview
* **Purpose:** A 'multi-link profile' service that aggregates multiple links (SNS, portfolio, blog, etc.) into a single integrated page for sharing.
* **Target Audience:** Developers, Creators.
* **Core Philosophy:** Concise UI/UX, immediate management experience through **Inline Editing**.

## 2. Technology Stack
* **Framework:** Next.js 16 (App Router)
* **Library:** React 19
* **Styling:** Tailwind CSS v4
* **UI Components:** shadcn/ui (based on Radix UI)
* **Backend/Auth:** Firebase (Authentication, Firestore) - *To be configured*
* **Icons:** Lucide React
* **Theme:** next-themes (Dark mode support)

## 3. Project Structure
```text
D:\vibe_coding\my-link\
├── app/                # Next.js App Router (Pages and Layouts)
├── components/         # Shared Components
│   └── ui/             # shadcn/ui Components
├── docs/               # Planning and Design Docs (PRD, Scenarios, Wireframes)
├── hooks/              # Custom React Hooks
├── lib/                # Utility Functions and Config (Firebase, etc.)
└── public/             # Static Assets
```

## 4. Development Conventions and Rules

### Language & Communication
* **Token Efficiency:** All communication, documentation, tasks, and commit messages must be written in **English** to save tokens.

### UI/UX Principles
* **Mobile-First:** All screens must function perfectly and look beautiful on mobile devices.
* **Inline Editing:** When modifying profile info (name, bio) or link info (title, URL), use **Inline Editing** where the text is edited directly on the spot without moving to a separate form page.
* **Consistency:** Maintain styles provided by `shadcn/ui` and use the `cn()` function in `@lib/utils.ts` for class composition.

### Coding Rules
* **TypeScript:** All code must pass strict type checking.
* **Components:** Use Server Components (RSC) by default; use 'use client' only when state management is required.
* **Icons:** Use `lucide-react`.
* **Path Alias:** Use the `@/` prefix (e.g., `@/components/...`, `@/lib/...`).
* **File References:** Use the `@` prefix when referring to documents (e.g., `@docs/PRD.md`).

### Data Management
* **Firebase Firestore:** Store user data in the `users` collection and link data in the `links` sub-collection under the user document.
* **Favicons:** When adding a link, use the Google Favicon API (`https://www.google.com/s2/favicons?domain=DOMAIN&sz=64`) to automatically extract the icon.

## 5. Key Commands
* `npm run dev`: Start development server
* `npm run build`: Production build
* `npm run start`: Run built app
* `npm run lint`: Lint check
* `npm run format`: Code formatting (Prettier)
* `npm run typecheck`: TypeScript type check

## 6. Reference Documents
* [Product Requirements Document (PRD)](@docs/PRD.md)
* [User Scenarios](@docs/USER_SCENARIO.md)
* [Wireframe](@docs/Wireframe.md)