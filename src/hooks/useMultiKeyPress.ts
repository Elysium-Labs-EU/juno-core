import { useEffect, useState } from 'react'
import multipleIncludes from '../utils/multipleIncludes'

export default function useMultiKeyPress(
  handleEvent?: Function,
  actionKeys?: string[],
  disabled?: boolean
) {
  const [keysPressed, setKeyPressed] = useState<string[]>([])

  /**
   * A timeout based function to ensure that the array of the pressed keys is always clean.
   */
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

  /**
   * If there is an event handler registered, the system will check wether there are keys pressed.
   * If the pressed keys are list in the in action keys, and if the system is not inSearch mode.
   * If all checks pass, the event is handled and the pressed key array is reset.
   */
  useEffect(() => {
    let mounted = true
    if (handleEvent) {
      if (
        keysPressed.length > 0 &&
        multipleIncludes(actionKeys, keysPressed) &&
        !disabled &&
        mounted
      ) {
        setKeyPressed([])
        handleEvent()
      }
    }
    return () => {
      mounted = false
    }
  }, [keysPressed, handleEvent])

  useEffect(() => {
    let mounted = true

    /**
     * @function keyUpHandler
     * @param event - takes in a keyboard event
     * @returns {void} - removes the event key from the array of pressed keys
     */
    const keyUpHandler = (event: KeyboardEvent): void => {
      mounted &&
        setKeyPressed((prevState) =>
          prevState.filter((item) => item !== event.key)
        )
    }
    /**
     * @function keyDownHandler
     * @param event - takes in a keyboard event
     * @returns {void} - add the event key from the array of pressed keys,
     * ensures that there is only one version of it on the array.
     */
    const keyDownHandler = (event: KeyboardEvent): void => {
      if (event.key === undefined) return
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
