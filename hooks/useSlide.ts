import { useEffect, useState } from 'react'
// import useScrollTool from './useScrollTool'
import useScrollTool from './useScrollTool'

const useSlide = (sideDistance = 1, offset = 0) => {
  const { scrollPosition, changeDistance } = useScrollTool()
  const [sideFixed, setSideFixed] = useState(false)
  const [isUp, setIsUp] = useState(true)

  const sideOffset = sideDistance * 120 + offset
  useEffect(() => {
    if (scrollPosition > 800 + sideOffset) {
      setSideFixed(true)
    } else {
      setSideFixed(false)
    }
  }, [scrollPosition, sideOffset, offset])

  useEffect(() => {
    if (changeDistance >= 0 && scrollPosition >= 200) {
      setIsUp(false)
    } else {
      setIsUp(true)
    }
  }, [changeDistance, scrollPosition])
  return {
    sideFixed,
    setSideFixed,
    isUp
  }
}

export default useSlide
