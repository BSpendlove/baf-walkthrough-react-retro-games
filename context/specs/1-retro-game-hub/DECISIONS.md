# Decisions: 1-retro-game-hub

## Accepted

### Incorrect Arcade Platform ID
- **Source:** Gemini
- **Severity:** CRITICAL
- **Resolution:** Changed Arcade platform ID from `166` (Apple Arcade) to `34` (classic Arcade machines) in the Platform ID Mapping table.

### Race condition — stale search/filter results
- **Source:** Gemini + Codex
- **Severity:** HIGH
- **Resolution:** Added `AbortController` requirement to `useGames` hook. Stale requests are cancelled when search query or platform filter changes. Pagination and results reset on input change. Added to implementation steps and manual testing plan.

### Inefficient favorites fetching
- **Source:** Gemini
- **Severity:** HIGH
- **Resolution:** Redesigned favorites to store full game snapshots in localStorage instead of just IDs. `FavoritesPage` now renders directly from cached data without any API calls, eliminating the batch-fetch problem entirely.

### Favorites persistence underspecified
- **Source:** Codex
- **Severity:** HIGH
- **Resolution:** `useFavorites` now stores minimal game snapshots (`id`, `name`, `background_image`, `platforms`, `rating`) instead of bare IDs. Favorites render immediately from localStorage without API dependency. Combined with finding above.

### Missing API key check
- **Source:** Gemini
- **Severity:** MEDIUM
- **Resolution:** Added `ApiKeyMissing` component to the file plan. `App.tsx` checks for `VITE_RAWG_API_KEY` at top level and renders setup instructions if absent.

### localStorage corruption not handled
- **Source:** Codex
- **Severity:** MEDIUM
- **Resolution:** Added `src/utils/storage.ts` with defensive `safeGetItem`/`safeSetItem` helpers. All localStorage access uses try/catch with fallback defaults. Write failures are caught silently. Added manual test case for corrupted localStorage.

### Missing asset fallbacks for GameCard
- **Source:** Codex
- **Severity:** MEDIUM
- **Resolution:** Updated `GameCard` implementation step to include placeholder image for missing cover art, "N/A" for unrated games, and graceful rendering for sparse platform data. Added manual test case.

### Client-side API key exposure / quota failures
- **Source:** Codex
- **Severity:** MEDIUM
- **Resolution:** Added Security Note in Configuration section documenting client-side key exposure. API client now maps 401 → `ApiKeyError`, 429 → `RateLimitError` with distinct user-facing error messages. `ErrorMessage` component updated to show specific messages per error type.

### Favorites page request fan-out / partial failure
- **Source:** Codex
- **Severity:** MEDIUM
- **Resolution:** Eliminated entirely by switching to snapshot-based favorites storage. `FavoritesPage` renders from localStorage without any API requests.

### Platform filter chip overflow on mobile
- **Source:** Gemini
- **Severity:** LOW
- **Resolution:** Added `overflow-x: auto` requirement to `FilterChips` implementation step for horizontal scrolling on small screens.

### Cross-tab favorites sync
- **Source:** Gemini
- **Severity:** LOW
- **Resolution:** Added `window.addEventListener('storage', ...)` to `useFavorites` hook for cross-tab synchronization. Added manual test case.

## Rejected

*(No findings were rejected.)*
