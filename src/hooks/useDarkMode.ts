import { useCallback, useEffect, useState } from 'react'
import { safeGetItem, safeSetItem } from '../utils/storage'

const STORAGE_KEY = 'theme'

type Theme = 'dark' | 'light'

export function useDarkMode() {
  const [theme, setTheme] = useState<Theme>(() =>
    safeGetItem<Theme>(STORAGE_KEY, 'dark'),
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    safeSetItem(STORAGE_KEY, theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle, isDark: theme === 'dark' }
}
