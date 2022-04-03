import { useEffect, useState } from 'react'
import multipleIncludes from '../utils/multipleIncludes'

export default function useMultiKeyPress(
  handleEvent?: Function,
  actionKeys?: string[],
  inSearch?: boolean
) {
  const [keysPressed, setKeyPressed] = useState<string[]>([])

  // To ensure that the array is clean.
  useEffect(() => {
    let timer: undefined | ReturnType<typeof setTimeout>
    if (keysPressed.length > 0) {
      timer = setTimeout(() => {
        setKeyPressed([])
      }, 250)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [keysPressed])

  useEffect(() => {
    if (handleEvent) {
      if (
        keysPressed.length > 0 &&
        multipleIncludes(actionKeys, keysPressed) &&
        (!inSearch ?? true)
      ) {
        handleEvent()
        setKeyPressed([])
      }
    }
  }, [keysPressed, handleEvent])

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
