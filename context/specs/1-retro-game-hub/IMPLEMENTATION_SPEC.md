# Implementation Spec: Retro Game Hub

## Overview

Build a React SPA that lets users browse, search, and favorite retro games using the RAWG API. The app features a paginated game grid with cover art, title, platform, and rating; real-time search; platform filter chips (NES, SNES, Genesis, PS1, N64, Arcade); localStorage-backed favorites; and a dedicated /favorites page. Fully responsive with loading and error states.

## Source Issue

[Issue #1 — Build Retro Game Hub — browse, search, and favorite classic games](../../.github/../../issues/1)

## Current State

Greenfield project. No source code, package.json, or build tooling exists. The repository contains only the BAF workflow scaffolding (context/, .claude/skills/, issue templates). Everything must be created from scratch.

## Design

### Architecture

Single-page React application bootstrapped with Vite + TypeScript.

```
Browser → React Router (client-side) → Pages → Components → RAWG API
                                                    ↕
                                              localStorage (favorites)
```

### Key Design Decisions

1. **Vite + TypeScript** — fast dev server, modern tooling, type safety.
2. **React Router v7** — client-side routing for `/` and `/favorites`.
3. **CSS Modules** — scoped styles without adding a CSS framework dependency. Retro-themed styling (pixel fonts, CRT-inspired palette).
4. **RAWG API** — free tier provides game data, cover art, platforms, ratings. API key required (stored in `VITE_RAWG_API_KEY` env var).
5. **localStorage for favorites** — no backend needed. Custom hook `useFavorites` manages state + persistence.
6. **Dark mode toggle** — dark theme by default (retro games deserve it). Toggle switch in the header persists preference to localStorage. Uses CSS variables for theming so all components adapt automatically.
7. **Debounced search** — 300ms debounce on search input to avoid excessive API calls.
8. **Platform filter mapping** — RAWG uses platform IDs. Map display names (NES, SNES, etc.) to RAWG parent platform/platform IDs.

### Data Flow

1. **Browse:** `HomePage` mounts → calls RAWG `/games` with retro platform filter → renders `GameGrid` → `GameCard` components.
2. **Search:** User types in `SearchBar` → debounced query updates → new API call with `search` param → grid re-renders.
3. **Filter:** User clicks platform `FilterChip` → API re-called with `platforms` param → grid re-renders.
4. **Favorite:** User clicks heart on `GameCard` → `useFavorites` hook toggles game ID in localStorage → heart fills/unfills.
5. **Favorites page:** `FavoritesPage` reads IDs from localStorage → fetches game details from RAWG → renders same `GameGrid`.
6. **Pagination:** "Load More" button at bottom → increments page → appends results.

### Platform ID Mapping

| Display Name | RAWG Platform ID |
|-------------|-----------------|
| NES | 49 |
| SNES | 79 |
| Genesis | 167 |
| PS1 | 27 |
| N64 | 83 |
| Arcade | 166 |

## Configuration

### Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_RAWG_API_KEY` | RAWG API authentication | `your-api-key-here` |

### Setup

```bash
cp .env.example .env
# Add your RAWG API key to .env
npm install
npm run dev
```

### .env.example

```
VITE_RAWG_API_KEY=your-api-key-here
```

## File Plan

### New Files — Project Setup

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript configuration |
| `tsconfig.node.json` | Node-specific TS config for Vite |
| `vite.config.ts` | Vite configuration |
| `index.html` | HTML entry point |
| `.env.example` | Environment variable template |
| `.gitignore` | Git ignore rules (node_modules, dist, .env) |

### New Files — Source Code

| File | Purpose |
|------|---------|
| `src/main.tsx` | App entry point, renders React root |
| `src/App.tsx` | Router setup, layout shell (header, nav, footer) |
| `src/App.module.css` | App layout styles |
| `src/pages/HomePage.tsx` | Main browse page — search, filters, game grid |
| `src/pages/HomePage.module.css` | Home page styles |
| `src/pages/FavoritesPage.tsx` | Favorites page — shows saved games |
| `src/pages/FavoritesPage.module.css` | Favorites page styles |
| `src/components/GameCard.tsx` | Individual game card — art, title, platform, rating, heart |
| `src/components/GameCard.module.css` | Game card styles |
| `src/components/GameGrid.tsx` | Responsive grid layout for game cards |
| `src/components/GameGrid.module.css` | Grid layout styles |
| `src/components/SearchBar.tsx` | Search input with debounce |
| `src/components/SearchBar.module.css` | Search bar styles |
| `src/components/FilterChips.tsx` | Platform filter chip group |
| `src/components/FilterChips.module.css` | Filter chip styles |
| `src/components/ThemeToggle.tsx` | Dark/light mode toggle switch |
| `src/components/ThemeToggle.module.css` | Theme toggle styles |
| `src/components/LoadingSpinner.tsx` | Loading state indicator |
| `src/components/ErrorMessage.tsx` | Error state display |
| `src/hooks/useGames.ts` | Custom hook — fetches games from RAWG, manages pagination/search/filter state |
| `src/hooks/useFavorites.ts` | Custom hook — localStorage favorites CRUD |
| `src/hooks/useDarkMode.ts` | Custom hook — dark/light theme toggle, persists to localStorage |
| `src/hooks/useDebounce.ts` | Generic debounce hook |
| `src/api/rawg.ts` | RAWG API client — typed fetch functions |
| `src/types/game.ts` | TypeScript types for Game, APIResponse, etc. |
| `src/styles/global.css` | Global styles, CSS variables, retro theme, fonts |

## Implementation Order

### Step 1: Project Scaffolding
- Create `package.json` with React 19, React Router, Vite, TypeScript
- Create config files (`vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`)
- Create `index.html`, `.env.example`, `.gitignore`
- Create `src/main.tsx` minimal entry point
- **Verify:** `npm install && npm run dev` starts without errors

### Step 2: Types and API Client
- Define `src/types/game.ts` — `Game`, `GamesResponse`, `Platform` types
- Implement `src/api/rawg.ts` — `fetchGames(params)` and `fetchGameById(id)` functions
- **Verify:** Types compile, API module exports correctly

### Step 3: Custom Hooks
- Implement `src/hooks/useDebounce.ts`
- Implement `src/hooks/useFavorites.ts` — `favorites`, `toggleFavorite`, `isFavorite`
- Implement `src/hooks/useGames.ts` — manages search, platform filter, pagination, loading/error states
- **Verify:** Hooks compile and follow React hook rules

### Step 4: Global Styles and Theme
- Create `src/styles/global.css` — CSS variables for both light and dark themes, retro color palette, pixel font import, reset styles
- Implement `src/hooks/useDarkMode.ts` — reads/writes `theme` key in localStorage, defaults to dark, sets `data-theme` attribute on `<html>`
- **Verify:** Styles load in dev server, dark theme applies by default

### Step 5: UI Components
- Implement `LoadingSpinner` and `ErrorMessage`
- Implement `GameCard` — displays cover art, title, platforms, rating, favorite heart button
- Implement `GameGrid` — responsive CSS grid of GameCards
- Implement `SearchBar` — controlled input with debounced onChange
- Implement `FilterChips` — horizontal chip group for platform filters
- **Verify:** Components render in isolation

### Step 6: Pages and Routing
- Implement `ThemeToggle` component — sun/moon icon toggle in header
- Implement `App.tsx` — React Router with header/nav (including ThemeToggle), routes for `/` and `/favorites`
- Implement `HomePage` — composes SearchBar, FilterChips, GameGrid, LoadingSpinner, ErrorMessage
- Implement `FavoritesPage` — reads favorites from hook, fetches game details, renders GameGrid
- **Verify:** Full app works — browse, search, filter, favorite, navigate to /favorites

### Step 7: Polish
- Responsive layout adjustments (mobile grid columns, touch-friendly targets)
- Loading and error states in all data-fetching paths
- Empty state for favorites page
- **Verify:** Responsive on mobile viewports, all states handled

## Testing

### Manual Testing Plan
1. **Browse:** Homepage loads with paginated retro game grid
2. **Search:** Typing filters results after debounce delay
3. **Platform filter:** Each chip narrows results to that platform
4. **Favorite:** Clicking heart toggles favorite state, persists across page reload
5. **Favorites page:** Shows only favorited games, empty state when none
6. **Pagination:** "Load More" appends additional results
7. **Responsive:** Grid adjusts columns on mobile/tablet/desktop
8. **Loading state:** Spinner shows during API calls
9. **Error state:** Error message shows on API failure
10. **API key missing:** Graceful error when `VITE_RAWG_API_KEY` is not set

### Automated Testing (future)
Not in scope for this issue. Can be added in a follow-up issue with Vitest + React Testing Library.

## Not In Scope

Per the issue:
- User accounts / authentication
- Backend server
- Game details page (individual game view)
- Reviews or comments
- Purchasing functionality
- ROM downloads
- Automated tests (can follow up)
