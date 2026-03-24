# Spec Critique: Retro Game Hub

## Findings

### Search/filter requests can race and render stale results
- **Severity:** HIGH
- **Description:** The spec requires debounced real-time search, platform filtering, and pagination in a single `useGames` hook, but it never defines how overlapping RAWG requests are canceled or ignored. A concrete failure case: the user types `m`, then `ma`, then quickly selects `SNES`; if the `m` request resolves last, the grid can render results that no longer match the active query/filter state.
- **Suggested Resolution:** Specify request coordination in `useGames`, either with `AbortController` cancellation or request-sequencing guards so only the latest in-flight request can update state. The implementation order should also call out resetting pagination/results whenever search or platform inputs change.

### Favorites persistence is underspecified and can fail the core `/favorites` experience
- **Severity:** HIGH
- **Description:** The spec says `useFavorites` stores only game IDs in `localStorage`, and `FavoritesPage` then refetches every saved game from RAWG. That means a user can have persisted favorites but still see an empty or broken favorites page whenever the API key is missing, the network is unavailable, the quota is exceeded, or one of the saved games disappears from the API. This undercuts one of the issue’s core acceptance criteria: saved favorites should be viewable from `/favorites`.
- **Suggested Resolution:** Define the stored favorite shape explicitly. The safer option is to persist a minimal game snapshot with each favorite (`id`, `name`, `image`, `platforms`, `rating`) and optionally revalidate in the background. If the spec keeps ID-only storage, it needs explicit degraded behavior for unavailable/missing game records and partial rendering when some fetches fail.

### The favorites page has no plan for request fan-out, partial failure, or rate limiting
- **Severity:** MEDIUM
- **Description:** `FavoritesPage` currently fetches game details per saved ID, but the spec does not define batching, concurrency limits, or partial-failure handling. A user with many favorites will trigger one request per game on page load, which is a concrete risk for slower UX and RAWG quota/rate-limit failures. The current design also leaves it unclear whether one failed detail request should fail the whole page.
- **Suggested Resolution:** Add explicit favorites-fetch behavior to the design: concurrent request cap, per-item error tolerance, and UI rules for mixed success/failure states. If RAWG supports a bulk-fetch pattern the spec should prefer it; otherwise the page should render successful items and surface non-blocking errors for failed ones.

### localStorage corruption and unavailable browser storage are not handled
- **Severity:** MEDIUM
- **Description:** The spec relies on `localStorage` for both favorites and theme persistence, but does not define behavior when stored JSON is malformed, quota is exceeded, or storage access throws (for example in stricter browser/privacy contexts). In a greenfield SPA, an uncaught parse or write error here can break app startup or make the header/theme controls unreliable.
- **Suggested Resolution:** Require defensive storage helpers in `useFavorites` and `useDarkMode`: validate parsed values, fall back to safe defaults, and catch write failures without crashing the app. The testing section should include malformed `localStorage` recovery.

### The spec does not cover asset fallbacks for missing cover art/platform metadata
- **Severity:** MEDIUM
- **Description:** The issue expects game cards with cover art, title, platform, and rating, but the spec assumes RAWG always returns complete data. In practice, games can have missing `background_image`, sparse platform arrays, or null ratings, which leads to broken image elements and uneven card layouts if not handled intentionally.
- **Suggested Resolution:** Add UI fallback rules to `GameCard`: placeholder artwork when no image exists, sensible text when platform data is missing, and a defined display for unrated games. Include these cases in the manual testing plan.

### Client-side API key exposure and quota-failure behavior are not acknowledged
- **Severity:** MEDIUM
- **Description:** Because this is a Vite SPA, `VITE_RAWG_API_KEY` is shipped to the browser. The spec mentions the env var but does not call out that the key is client-exposed, nor how the app should behave when RAWG rejects requests for invalid key, exhausted quota, or origin restrictions. That is a real operational failure mode for a portfolio app that depends entirely on a third-party API.
- **Suggested Resolution:** Document this constraint in the Configuration/Design sections and define explicit UX for RAWG auth/quota failures. At minimum, the API client should map those cases to a distinct user-facing error message instead of a generic fetch failure.
