import { GameGrid } from '../components/GameGrid'
import type { Game, GameSnapshot } from '../types/game'
import styles from './FavoritesPage.module.css'

interface Props {
  favorites: GameSnapshot[]
  isFavorite: (id: number) => boolean
  onToggleFavorite: (game: Game) => void
}

export function FavoritesPage({
  favorites,
  isFavorite,
  onToggleFavorite,
}: Props) {
  // GameSnapshot is compatible with Game for rendering purposes
  const games = favorites as Game[]

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Your Favorites</h2>

      {favorites.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>No favorites yet.</p>
          <p className={styles.emptyHint}>
            Click the heart on any game to save it here.
          </p>
        </div>
      ) : (
        <GameGrid
          games={games}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  )
}
