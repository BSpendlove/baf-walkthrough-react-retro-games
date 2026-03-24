import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { ApiKeyMissing } from './components/ApiKeyMissing'
import { ThemeToggle } from './components/ThemeToggle'
import { useDarkMode } from './hooks/useDarkMode'
import { useFavorites } from './hooks/useFavorites'
import { FavoritesPage } from './pages/FavoritesPage'
import { HomePage } from './pages/HomePage'
import styles from './App.module.css'

const hasApiKey = Boolean(import.meta.env.VITE_RAWG_API_KEY)

export default function App() {
  const { isDark, toggle } = useDarkMode()
  const { favorites, isFavorite, toggleFavorite } = useFavorites()

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.header}>
          <Link to="/" className={styles.logo}>
            Retro Game Hub
          </Link>
          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>
              Browse
            </Link>
            <Link to="/favorites" className={styles.navLink}>
              Favorites{favorites.length > 0 && ` (${favorites.length})`}
            </Link>
            <ThemeToggle isDark={isDark} onToggle={toggle} />
          </nav>
        </header>

        <main className={styles.main}>
          {!hasApiKey ? (
            <ApiKeyMissing />
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    isFavorite={isFavorite}
                    onToggleFavorite={toggleFavorite}
                  />
                }
              />
              <Route
                path="/favorites"
                element={
                  <FavoritesPage
                    favorites={favorites}
                    isFavorite={isFavorite}
                    onToggleFavorite={toggleFavorite}
                  />
                }
              />
            </Routes>
          )}
        </main>

        <footer className={styles.footer}>
          <p>Powered by RAWG API</p>
        </footer>
      </div>
    </BrowserRouter>
  )
}
