import { useState } from 'react'
import { ErrorMessage } from '../components/ErrorMessage'
import { FilterChips } from '../components/FilterChips'
import { GameGrid } from '../components/GameGrid'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { SearchBar } from '../components/SearchBar'
import { useDebounce } from '../hooks/useDebounce'
import { useGames } from '../hooks/useGames'
import type { Game } from '../types/game'
import styles from './HomePage.module.css'

interface Props {
  isFavorite: (id: number) => boolean
  onToggleFavorite: (game: Game) => void
}

export function HomePage({ isFavorite, onToggleFavorite }: Props) {
  const [search, setSearch] = useState('')
  const [platform, setPlatform] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const { games, loading, error, hasMore, loadMore } = useGames(
    debouncedSearch,
    platform,
  )

  return (
    <div className={styles.page}>
      <div className={styles.controls}>
        <SearchBar value={search} onChange={setSearch} />
        <FilterChips active={platform} onChange={setPlatform} />
      </div>

      {error && (
        <ErrorMessage
          message={error.message}
          type={error.type}
          onRetry={loadMore}
        />
      )}

      <GameGrid
        games={games}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
      />

      {loading && <LoadingSpinner />}

      {!loading && !error && games.length === 0 && (
        <p className={styles.empty}>No games found. Try a different search.</p>
      )}

      {hasMore && !loading && (
        <div className={styles.loadMore}>
          <button className={styles.loadMoreBtn} onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
