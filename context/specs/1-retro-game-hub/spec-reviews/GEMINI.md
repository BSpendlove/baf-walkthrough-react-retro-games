# spec-review: Retro Game Hub (Issue #1)

**Agent:** Gemini 2.0 Flash Thinking
**Review Date:** March 24, 2026

## CRITICAL

### Incorrect Arcade Platform ID
- **Severity:** CRITICAL
- **Description:** The spec lists `166` as the RAWG platform ID for "Arcade". However, ID `166` corresponds to **Apple Arcade** (a modern subscription service). The correct ID for classic coin-operated **Arcade** machines is `34`.
- **Suggested Resolution:** Update the Platform ID Mapping table in the spec: `Arcade | 34`.

## HIGH

### Inefficient Favorites Fetching
- **Severity:** HIGH
- **Description:** The spec suggests that `FavoritesPage` fetches game details from the RAWG API for each favorited game ID in localStorage. If a user has many favorites, this will lead to a high volume of individual API requests, potentially hitting rate limits and slowing down page load.
- **Suggested Resolution:** Update `FavoritesPage` and `rawg.ts` to support fetching multiple games in a single request using the `ids` query parameter on the `/api/games` endpoint (e.g., `?ids=123,456,789`).

## MEDIUM

### Missing Abort Controller / Race Condition Handling
- **Severity:** MEDIUM
- **Description:** With a 300ms debounce, it is still possible for multiple search or filter requests to be in flight simultaneously. If a later request completes before an earlier one, the UI might display stale data.
- **Suggested Resolution:** The `useGames` hook should use an `AbortController` to cancel pending requests when the query or filter changes.

### Lack of Explicit API Key Error Component
- **Severity:** MEDIUM
- **Description:** While the manual testing plan mentions a graceful error for missing API keys, the File Plan does not include a dedicated component or explicit logic for this. If the key is missing, the entire app might fail silently or show a generic error.
- **Suggested Resolution:** Add a check in `App.tsx` or `main.tsx` to verify the presence of `VITE_RAWG_API_KEY` and display a clear instructions component if it is missing.

## LOW

### Platform Filter UI Overflow
- **Severity:** LOW
- **Description:** The 6 platform filters listed might overflow the screen width on mobile devices.
- **Suggested Resolution:** Ensure `FilterChips.module.css` implements horizontal scrolling (e.g., `overflow-x: auto`) for the chip group to prevent wrapping or layout breaking.

### Favorites Synchronization
- **Severity:** LOW
- **Description:** If a user favorites a game on the `HomePage` and then navigates to the `FavoritesPage`, the data should be in sync. The spec's `useFavorites` hook handles this well, but it's worth mentioning `window.addEventListener('storage', ...)` if the app needs to sync across multiple tabs.
- **Suggested Resolution:** Consider adding cross-tab synchronization to `useFavorites`.
