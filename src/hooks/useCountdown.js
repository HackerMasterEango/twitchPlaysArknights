import { useState, useEffect } from 'react'

const useCountDown = (initialCount, completionFn) => {
  const [intervalId, setIntervalId] = useState()
  const [count, setCount] = useState(initialCount)
  const [startCounter, setCounterOn] = useState(false)

  useEffect(() => {
    if (count <= 0) {
      clearInterval(intervalId)
      completionFn()
    }
  }, [count, intervalId, completionFn])

  useEffect(() => {
    if (startCounter) {
      setIntervalId(
        setInterval(() => {
          setCount(prev => prev - 1)
        }, 1000)
      )
    }
  }, [startCounter])

  const resetTimer = () => {
    clearInterval(intervalId)
    setCount(initialCount)

    setCounterOn(false)
  }

  const startTimer = () => setCounterOn(true)

  return [count, resetTimer, startTimer]
}

export default useCountDown
