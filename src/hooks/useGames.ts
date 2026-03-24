import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchGames } from '../api/rawg'
import type { ApiErrorType, Game } from '../types/game'

interface UseGamesState {
  games: Game[]
  loading: boolean
  error: { message: string; type: ApiErrorType } | null
  hasMore: boolean
}

export function useGames(search: string, platform: string) {
  const [state, setState] = useState<UseGamesState>({
    games: [],
    loading: true,
    error: null,
    hasMore: false,
  })
  const pageRef = useRef(1)
  const abortRef = useRef<AbortController | null>(null)

  // Reset and fetch when search/platform change
  useEffect(() => {
    pageRef.current = 1
    load(1, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, platform])

  const load = useCallback(
    async (page: number, reset: boolean) => {
      // Cancel any in-flight request
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
        ...(reset ? { games: [] } : {}),
      }))

      try {
        const params: Parameters<typeof fetchGames>[0] = {
          page,
          pageSize: 20,
        }
        if (search) params.search = search
        if (platform) params.platforms = platform

        const data = await fetchGames(params, controller.signal)

        setState((prev) => ({
          games: reset ? data.results : [...prev.games, ...data.results],
          loading: false,
          error: null,
          hasMore: data.next !== null,
        }))
      } catch (err) {
        // Ignore aborted requests
        if (err instanceof DOMException && err.name === 'AbortError') return

        const apiErr =
          err instanceof Error && 'type' in err
            ? (err as { message: string; type: ApiErrorType })
            : { message: 'An unexpected error occurred.', type: 'unknown' as ApiErrorType }

        setState((prev) => ({
          ...prev,
          loading: false,
          error: apiErr,
        }))
      }
    },
    [search, platform],
  )

  const loadMore = useCallback(() => {
    pageRef.current += 1
    load(pageRef.current, false)
  }, [load])

  return { ...state, loadMore }
}
