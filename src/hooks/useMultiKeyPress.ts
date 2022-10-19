import { useEffect, useState } from 'react'
import multipleIncludes from '../utils/multipleIncludes'

let eventConstant: KeyboardEvent | null = null

export default function useMultiKeyPress(
  handleEvent?: () => void,
  actionKeys?: string[],
  disabled?: boolean
) {
  const [keysPressed, setKeyPressed] = useState<string[]>([])
  // TODO: Add option to let use press it again and override the blocking of the action. This is reset whenever the action is performed?

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

  // TODO: The listener should be listening when the disabled is false
  // If the disabled is true, it should

  useEffect(() => {
    // console.log({ disabled, eventConstant, handleEvent })
    let mounted = true
    if (eventConstant && disabled === true) {
      // if (eventConstant && disabled !== false) {
      // console.log('here', { disabled, eventConstant, handle/ent })
      eventConstant?.preventDefault()
      eventConstant?.stopImmediatePropagation()
      // eventConstant?.stopPropagation()
    }
    if (disabled === false && handleEvent) {
      if (
        keysPressed.length > 0 &&
        multipleIncludes(actionKeys, keysPressed) &&
        !disabled &&
        mounted
      ) {
        setKeyPressed([])
        handleEvent()
        eventConstant = null
      }
    }
    return () => {
      mounted = false
    }
  }, [keysPressed, handleEvent])

  /**
   * @function keyUpHandler
   * @param event - takes in a keyboard event
   * @returns {void} - removes the event key from the array of pressed keys
   */
  const keyUpHandler = (event: KeyboardEvent): void => {
    !disabled &&
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
    if (event.key === undefined) {
      return
    }
    // Set the eventConstant to enable event related functions
    eventConstant = event

    setKeyPressed((prevState) => [
      ...new Set([...prevState, event.key.toUpperCase()]),
    ])
  }

  useEffect(() => {
    // console.log({ disabled, eventConstant, handleEvent })
    window.addEventListener('keydown', keyDownHandler)
    window.addEventListener('keyup', keyUpHandler)
    return () => {
      setKeyPressed([])
      window.removeEventListener('keydown', keyDownHandler)
      window.removeEventListener('keyup', keyUpHandler)
    }
  }, [])
  return keysPressed
}
