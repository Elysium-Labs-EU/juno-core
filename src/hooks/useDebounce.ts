import { useState, useEffect } from 'react'

/**
 * A hook that debounces a given value and returns the debounced value
 * @template T
 * @param {T} value - The value to be debounced
 * @param {number} delay - The debounce delay in milliseconds
 * @returns {T} - The debounced value
 */

export default function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return debouncedValue
}
