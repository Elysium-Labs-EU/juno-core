import { useEffect, useState } from 'react'

export default function useMultiKeyPress() {
  const [keysPressed, setKeyPressed] = useState<string[]>([])

  // To ensure that the array is clean.
  useEffect(() => {
    let timer: undefined | ReturnType<typeof setTimeout>
    if (keysPressed.length > 0) {
      timer = setTimeout(() => {
        setKeyPressed([])
      }, 800)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [keysPressed])

  useEffect(() => {
    let mounted = true
    const keyUpHandler = (event: KeyboardEvent) => {
      mounted &&
        setKeyPressed((prevState) =>
          prevState.filter((item) => item !== event.key)
        )
    }
    const keyDownHandler = (event: KeyboardEvent) => {
      mounted &&
        setKeyPressed((prevState) => [
          ...new Set([...prevState, event.key.toUpperCase()]),
        ])
    }
    window.addEventListener('keydown', keyDownHandler)
    window.addEventListener('keyup', keyUpHandler)
    return () => {
      setKeyPressed([])
      mounted = false
      window.removeEventListener('keydown', keyDownHandler)
      window.removeEventListener('keyup', keyUpHandler)
    }
  }, [])
  return keysPressed
}
