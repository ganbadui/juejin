import { useEffect, useState } from 'react'
import useScroll from './useScroll'

const useSlide = (bNumber = 1, offset = 0) => {
  const { scrollPosition, changeDistanc } = useScroll()
  const [sideFixed, setSideFixed] = useState(false)
  const [isUp, setIsUp] = useState(true)

  // 主导航栏固定, 侧边栏固定高度变化
  const sideOffset = bNumber * 120 + offset
  useEffect(() => {
    if (scrollPosition > 500 + sideOffset) setSideFixed(true)
    else setSideFixed(false)
  }, [scrollPosition, sideOffset, offset])

  useEffect(() => {
    // 可以在这里设置下滑多少才会渐入渐出
    if (changeDistanc >= 0 && scrollPosition >= 200) setIsUp(false)
    else setIsUp(true)
  }, [changeDistanc, scrollPosition])
  return {
    sideFixed,
    setSideFixed,
    isUp
  }
}

export default useSlide
