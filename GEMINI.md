# Project Overview: my-link (my-profile)

This is a modern web application built with **Next.js 16 (App Router)** and **React 19**, designed as a personal profile or link-in-bio platform. It utilizes **TypeScript** for type safety and **Tailwind CSS 4** for styling.

The main project source is located in the `my-profile/` directory.

## Core Stack
- **Framework:** Next.js 16 (Experimental/Future version)
- **Library:** React 19
- **Styling:** Tailwind CSS 4 (with `@tailwindcss/postcss`)
- **Language:** TypeScript
- **Linter:** ESLint (Next.js vitals + TypeScript config)

## ⚠️ Special Agent Instructions (from AGENTS.md)
**This project uses a version of Next.js that may have breaking changes.**
- APIs, conventions, and file structures might differ from standard training data.
- Always check for deprecation notices.
- If unsure, refer to documentation or existing code patterns in the `my-profile/app` directory.

## Project Structure (within `my-profile/`)
- `app/`: Contains the App Router pages, layouts, and global styles.
- `public/`: Static assets like images and SVGs.
- `next.config.ts`: Next.js configuration.
- `tailwind.config.mjs` / `postcss.config.mjs`: Styling configuration.
- `tsconfig.json`: TypeScript configuration.

## Building and Running
All commands should be executed within the `my-profile/` directory.

| Task | Command |
| :--- | :--- |
| **Development** | `npm run dev` |
| **Build** | `npm run build` |
| **Production Start** | `npm run start` |
| **Linting** | `npm run lint` |

## Development Conventions
- **App Router:** Follow the Next.js App Router conventions for routing and data fetching.
- **Component Styling:** Use Tailwind CSS utility classes directly in JSX/TSX files.
- **Type Safety:** Ensure all new components and functions are properly typed with TypeScript.
- **Strict Linting:** Adhere to the ESLint rules defined in `eslint.config.mjs`.
