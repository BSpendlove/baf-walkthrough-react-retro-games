export interface Platform {
  platform: {
    id: number
    name: string
    slug: string
  }
}

export interface Game {
  id: number
  name: string
  background_image: string | null
  rating: number | null
  platforms: Platform[] | null
}

export interface GamesResponse {
  count: number
  next: string | null
  previous: string | null
  results: Game[]
}

export interface GameSnapshot {
  id: number
  name: string
  background_image: string | null
  platforms: Platform[] | null
  rating: number | null
}

export type ApiErrorType = 'auth' | 'rate-limit' | 'network' | 'unknown'

export class ApiError extends Error {
  type: ApiErrorType

  constructor(message: string, type: ApiErrorType) {
    super(message)
    this.type = type
    this.name = 'ApiError'
  }
}
