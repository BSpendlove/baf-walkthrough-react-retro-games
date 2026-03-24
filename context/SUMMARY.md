# Project Summary

This file tracks project state. Every agent session should read this before starting new work.

**Updated after every spec is implemented.**

## Current State

Retro Game Hub — React SPA for browsing, searching, and favoriting retro games via the RAWG API.

## Completed Specs

| Spec | Issue | Status | Summary |
|------|-------|--------|---------|
| 1-retro-game-hub | #1 | Implemented | Core app: game grid, search, platform filters, favorites, dark mode |

## Key Decisions

- **Vite + TypeScript + React Router v7** — project toolchain
- **CSS Modules + CSS variables** — scoped styles with dark/light theme support
- **Snapshot-based favorites** — localStorage stores full game snapshots, not just IDs, so /favorites renders without API calls
- **RAWG API key is client-side** — acceptable for portfolio project; documented in spec
- **Dark mode default** — retro games look better dark
