import { useEffect } from 'react'

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

  const setClassList = (isDark = false) => {
    if (isDark) {
      classList.add('dark')
    } else {
      classList.remove('dark')
    }
  }

  const updateTheme = () => {
    const userPreference = localStorage.getItem(THEME_KEY)
    setClassList(userPreference === 'dark')
  }

  function toggle() {
    if (classList.contains('dark')) {
      setClassList(false)
      localStorage.setItem(THEME_KEY, 'light')
    } else {
      setClassList(true)
      localStorage.setItem(THEME_KEY, 'dark')
    }
  }

  return [toggle]
}
