import { useEffect, useState } from 'react'

export default function useMultiKeyPress() {
  const [keysPressed, setKeyPressed] = useState<string[]>([])

  useEffect(() => {
    let mounted = true
    const keyUpHandler = (event: KeyboardEvent) => {
      mounted &&
        setKeyPressed((prevState) =>
          prevState.filter((item) => item !== event.code)
        )
    }
    const keyDownHandler = (event: KeyboardEvent) => {
      mounted &&
        setKeyPressed((prevState) => [...new Set([...prevState, event.code])])
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
