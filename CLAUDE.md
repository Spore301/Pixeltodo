# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PIXELNOTES (also called PIXELTODO) is a retro terminal/pixel aesthetic notes and task management app with AI integration. It transforms notes into actionable tasks using a local Ollama instance.

## Architecture

### Tech Stack
- **Framework**: Next.js 16.2.3 with React 19.2.4
- **Language**: TypeScript 5
- **State Management**: Two systems coexist:
  - Old: `src/lib/store.tsx` - Redux-like reducer pattern for tasks (legacy)
  - New: Zustand with persistence middleware (`notes-store.ts`, `projects-store.ts`)
- **Styling**: CSS Modules with CSS variables in `globals.css`
- **AI Integration**: Ollama API (requires local Ollama server at localhost:11434)

### Directory Structure
```
src/
├── app/
│   ├── page.tsx           # Main app entry
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # CSS variables and global styles
│   └── page.module.css    # Page-specific styles
├── components/            # React components with co-located CSS modules
│   ├── Note*.tsx          # Note-related components
│   ├── *View.tsx          # Tab views (Notes, Projects, Planner)
│   └── Pixel*.tsx         # Reusable UI components (PixelButton, PixelInput, etc.)
└── lib/
    ├── store.tsx          # Legacy task store (useReducer + localStorage)
    ├── notes-store.ts     # Zustand notes store
    ├── projects-store.ts  # Zustand projects store
    ├── ollama.ts          # Ollama API client
    └── task-extractor.ts  # AI task extraction logic
```

### Design System
Terminal/pixel aesthetic with:
- **Colors**: CSS variables in `globals.css` (green `#28ff64`, cyan `#00ccff`, amber `#ffb627`, red `#ff4757`, purple `#a55eea`)
- **Font**: IBM Plex Mono (Google Fonts)
- **Base unit**: 8px grid
- **Effects**: CRT scanline overlay via CSS gradient

## Common Commands

```bash
# Development
npm run dev              # Start dev server on http://localhost:3000

# Build & Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint (flat config, eslint.config.mjs)
```

## Critical Development Notes

### Next.js Version
**This is NOT standard Next.js.** Version 16.2.3 has breaking changes from prior versions. Before writing Next.js-specific code:
1. Read `node_modules/next/dist/docs/` for current API patterns
2. Check for deprecation notices in the codebase
3. Do not rely on prior Next.js knowledge from training data

### State Management Patterns

Two different state systems are in use:

1. **Legacy Task Store** (`src/lib/store.tsx`):
   - Uses React useReducer + Context
   - Handles tasks with time tracking
   - Dispatch pattern: `dispatch({ type: 'ACTION', payload })`

2. **Modern Zustand Stores** (`src/lib/notes-store.ts`, `projects-store.ts`):
   - Hooks-based: `const { notes, addNote } = useNotesStore()`
   - Automatic localStorage persistence via `persist` middleware
   - Separate stores for notes and projects

### Ollama Integration
AI features require local Ollama:
```bash
ollama serve  # Start Ollama server on port 11434
```

If Ollama is unavailable, the app shows offline UI state. See `src/lib/ollama.ts` for API client and `src/lib/task-extractor.ts` for extraction logic.

### Component Conventions
- All components use CSS Modules (co-located `.module.css` files)
- Reusable UI components prefixed with "Pixel" (PixelButton, PixelInput, etc.)
- ASCII/box-drawing characters for borders (┌─┐│└─┘)
- No border-radius (sharp pixel corners)

### Storage Keys
- Legacy tasks: `pixeltodo-state`
- Notes: `pixelnotes-notes-storage`
- Projects: `pixelnotes-projects-storage`

## TypeScript Interfaces

Key interfaces defined across stores:
- `Note`: id, title, content, tags, status ('editing'|'saved'|'processing'|'processed')
- `Project`: id, name, color, noteIds, taskIds
- `Task`: id, title, completed, priority, weight, timeSpent, sessions, isTracking

See `src/lib/store.tsx`, `notes-store.ts`, and `projects-store.ts` for full type definitions.
