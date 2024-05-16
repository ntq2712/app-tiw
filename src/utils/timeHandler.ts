export function throttle<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let lastTime = 0
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function (...args: Parameters<T>) {
    const now = Date.now()
    const remainingTime = wait - (now - lastTime)

    if (remainingTime <= 0) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      lastTime = now
      func.apply(this, args)
    } else if (!timeout) {
      timeout = setTimeout(() => {
        lastTime = Date.now()
        timeout = null
        func.apply(this, args)
      }, remainingTime)
    }
  }
}
