import type { Game } from '../types/game'
import styles from './GameCard.module.css'

interface Props {
  game: Game
  isFavorite: boolean
  onToggleFavorite: (game: Game) => void
}

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">' +
      '<rect fill="#1a1a2e" width="300" height="200"/>' +
      '<text fill="#4a4a5a" font-family="monospace" font-size="14" x="150" y="100" text-anchor="middle">No Image</text>' +
      '</svg>',
  )

function formatPlatforms(game: Game): string {
  if (!game.platforms || game.platforms.length === 0) return 'Unknown'
  return game.platforms.map((p) => p.platform.name).join(', ')
}

function formatRating(rating: number | null): string {
  if (rating === null || rating === 0) return 'N/A'
  return rating.toFixed(1)
}

export function GameCard({ game, isFavorite, onToggleFavorite }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          className={styles.image}
          src={game.background_image ?? PLACEHOLDER_IMAGE}
          alt={game.name}
          loading="lazy"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE
          }}
        />
        <button
          className={`${styles.heart} ${isFavorite ? styles.heartActive : ''}`}
          onClick={() => onToggleFavorite(game)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '\u2764' : '\u2661'}
        </button>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{game.name}</h3>
        <p className={styles.platforms}>{formatPlatforms(game)}</p>
        <div className={styles.rating}>
          <span className={styles.star}>{'\u2605'}</span> {formatRating(game.rating)}
        </div>
      </div>
    </div>
  )
}
