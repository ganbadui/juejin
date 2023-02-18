import { useCallback, useEffect } from 'react'

const THEME_KEY = 'theme'

export function useTheme() {
  let classList: DOMTokenList

  useEffect(() => {
    classList = document.documentElement.classList

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      updateTheme()
      window.addEventListener('storage', updateTheme)
    }
  })

  const setClassList = useCallback((isDark = false) => {
    if (isDark) {
      classList.add('dark')
    } else {
      classList.remove('dark')
    }
  }, [])

  const updateTheme = useCallback(() => {
    const userPreference = localStorage.getItem(THEME_KEY)
    setClassList(userPreference === 'dark')
  }, [setClassList])

  const toggle = useCallback(() => {
    if (classList.contains('dark')) {
      setClassList(false)
      localStorage.setItem(THEME_KEY, 'light')
    } else {
      setClassList(true)
      localStorage.setItem(THEME_KEY, 'dark')
    }
  }, [setClassList])

  return [toggle]
}
