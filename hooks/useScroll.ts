import { useEffect, useState } from 'react'

const BOTTOM_OFFSET = 100

const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isBottom, setIsBottom] = useState(false)
  const [changeDistanc, setChangeDistanc] = useState(0)

  const handleScroll = () => {
    const position = window.pageYOffset

    setChangeDistanc(position - scrollPosition)

    setScrollPosition(position)

    const isBottom =
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - BOTTOM_OFFSET
    setIsBottom(isBottom)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return { scrollPosition, isBottom, changeDistanc }
}

export default useScroll
