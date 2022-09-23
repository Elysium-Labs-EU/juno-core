import { useState, useEffect } from 'react'

/**
 * @function useCountDownTimer
 * @param {startSeconds} - sets the amount of seconds the count down should run for
 * @returns the current countdown state
 */

export default function useCountDownTimer({
  startSeconds,
}: {
  startSeconds: number
}) {
  const [countDown, setCountDown] = useState(startSeconds)
  useEffect(() => {
    let mounted = true
    const timer = setTimeout(() => {
      mounted && setCountDown((currState) => currState - 1)
    }, 1000)
    return () => {
      mounted = false
      clearTimeout(timer)
    }
  })

  return { countDown }
}
