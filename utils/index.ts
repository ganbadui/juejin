export function debounce(
  this: any,
  func: () => void,
  time: number,
  immediate = false
) {
  let timer: number | null = null
  return (...args: any) => {
    if (timer) clearInterval(timer)
    if (immediate) {
      if (!timer) func.apply(this, args)
      timer = window.setTimeout(() => {
        timer = null
      }, time)
    } else {
      timer = window.setTimeout(() => {
        func.apply(this, args)
      }, time)
    }
  }
}

export function throttle(
  this: any,
  func: () => void,
  time: number,
  immediate = false
) {
  if (immediate) {
    let prevTime = 0
    return (...args: any) => {
      const nowTime = Date.now()
      if (nowTime - prevTime >= time) {
        func.apply(this, args)
        prevTime = nowTime
      }
    }
  } else {
    let timer: number | null = null
    return (...args: any) => {
      if (!timer) {
        func.apply(this, args)
        timer = window.setTimeout(() => {
          if (timer) clearInterval(timer)
          timer = null
        }, time)
      }
    }
  }
}
