import {useCallback, useEffect, useState} from 'react'

const useCountDown = initValue => {
  const [count, setCount] = useState<number>(initValue)

  const setCountDown = useCallback(value => {
    setCount(value)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevState => {
        if (prevState === 0) return prevState
        return prevState - 1
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return [count, setCountDown]
}

export default useCountDown
