import { useEffect, useState } from 'react'
import { throttle } from '@/utils'

export function useScroll(callback: () => void) {
  useEffect(() => {
    const handleScroll = throttle(() => {
      callback()
    }, 15)
    if (typeof document !== 'undefined') {
      document.addEventListener('scroll', handleScroll)
    }
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])
}
