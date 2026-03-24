import { ApiError, type GamesResponse } from '../types/game'

const BASE_URL = 'https://api.rawg.io/api'

function getApiKey(): string {
  return import.meta.env.VITE_RAWG_API_KEY ?? ''
}

export interface FetchGamesParams {
  search?: string
  platforms?: string
  page?: number
  pageSize?: number
}

export async function fetchGames(
  params: FetchGamesParams,
  signal?: AbortSignal,
): Promise<GamesResponse> {
  const apiKey = getApiKey()
  const url = new URL(`${BASE_URL}/games`)
  url.searchParams.set('key', apiKey)
  url.searchParams.set('page_size', String(params.pageSize ?? 20))

  if (params.page) url.searchParams.set('page', String(params.page))
  if (params.search) url.searchParams.set('search', params.search)
  if (params.platforms) url.searchParams.set('platforms', params.platforms)

  let response: Response
  try {
    response = await fetch(url.toString(), { signal })
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err
    throw new ApiError(
      'Unable to reach the RAWG API. Check your internet connection.',
      'network',
    )
  }

  if (response.status === 401) {
    throw new ApiError(
      'Invalid RAWG API key. Check your VITE_RAWG_API_KEY in .env.',
      'auth',
    )
  }

  if (response.status === 429) {
    throw new ApiError(
      'RAWG API rate limit exceeded. Please wait a moment and try again.',
      'rate-limit',
    )
  }

  if (!response.ok) {
    throw new ApiError(
      `RAWG API error (${response.status})`,
      'unknown',
    )
  }

  return response.json() as Promise<GamesResponse>
}
