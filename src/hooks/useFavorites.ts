import { useCallback, useEffect, useState } from 'react'
import type { Game, GameSnapshot } from '../types/game'
import { safeGetItem, safeSetItem } from '../utils/storage'

const STORAGE_KEY = 'favorites'

function toSnapshot(game: Game): GameSnapshot {
  return {
    id: game.id,
    name: game.name,
    background_image: game.background_image,
    platforms: game.platforms,
    rating: game.rating,
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<GameSnapshot[]>(() =>
    safeGetItem<GameSnapshot[]>(STORAGE_KEY, []),
  )

  // Persist to localStorage whenever favorites change
  useEffect(() => {
    safeSetItem(STORAGE_KEY, favorites)
  }, [favorites])

  // Cross-tab sync
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) {
        setFavorites(safeGetItem<GameSnapshot[]>(STORAGE_KEY, []))
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const isFavorite = useCallback(
    (id: number) => favorites.some((g) => g.id === id),
    [favorites],
  )

  const toggleFavorite = useCallback(
    (game: Game) => {
      setFavorites((prev) => {
        const exists = prev.some((g) => g.id === game.id)
        if (exists) return prev.filter((g) => g.id !== game.id)
        return [...prev, toSnapshot(game)]
      })
    },
    [],
  )

  return { favorites, isFavorite, toggleFavorite }
}
