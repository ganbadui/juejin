import { useEffect, useState } from 'react'

const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0)

  const [changeDistance, setChangeDistance] = useState(0)

  const [isBottom, setIsBottom] = useState(false)

  const handleScroll = () => {
    const position = window.pageYOffset

    setChangeDistance(position - scrollPosition)

    setScrollPosition(position)

    const isBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
    setIsBottom(isBottom)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return { scrollPosition, isBottom, changeDistance }
}

export default useScroll
