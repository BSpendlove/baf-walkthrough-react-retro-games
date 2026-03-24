import type { Game } from '../types/game'
import { GameCard } from './GameCard'
import styles from './GameGrid.module.css'

interface Props {
  games: Game[]
  isFavorite: (id: number) => boolean
  onToggleFavorite: (game: Game) => void
}

export function GameGrid({ games, isFavorite, onToggleFavorite }: Props) {
  if (games.length === 0) return null

  return (
    <div className={styles.grid}>
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          isFavorite={isFavorite(game.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
