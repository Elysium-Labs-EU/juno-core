import { useEffect, useState } from 'react'
import multipleIncludes from '../utils/multipleIncludes'

const BLACKLISTED_DOM_TARGETS = ['TEXTAREA', 'INPUT']
let eventConstant: KeyboardEvent | null = null

// TODO: Integrate repeat on hold function

export default function useMultiKeyPress({
  handleEvent = undefined,
  actionKeys = undefined,
  // repeatOnHold = false,
  disabled = false,
}: {
  handleEvent?: () => void
  actionKeys?: string[]
  // repeatOnHold?: boolean
  disabled?: boolean
}) {
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
    // First check if we should prevent the default. This should be done first to ensure the correct order.
    if (eventConstant) {
      const { target } = eventConstant as any
      if (target) {
        if (
          disabled === true &&
          BLACKLISTED_DOM_TARGETS.indexOf(target.tagName) === -1
        ) {
          eventConstant.preventDefault()
          eventConstant.stopImmediatePropagation()
        }
      }
    }
    if (disabled === false && handleEvent && actionKeys) {
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
  }, [disabled, keysPressed, handleEvent])

  /**
   * @function keyUpHandler
   * @param event - takes in a keyboard event
   * @returns {void} - removes the event key from the array of pressed keys
   */
  const keyUpHandler = (keyUpEvent: KeyboardEvent): void => {
    !disabled &&
      setKeyPressed((prevState) =>
        prevState.filter((item) => item !== keyUpEvent.key)
      )
  }
  /**
   * @function keyDownHandler
   * @param event - takes in a keyboard event
   * @returns {void} - add the event key from the array of pressed keys,
   * ensures that there is only one version of it on the array.
   */
  const keyDownHandler = (keydownEvent: KeyboardEvent): void => {
    if (keydownEvent.key === undefined) {
      return
    }
    // console.log(keydownEvent.repeat)

    // if (keydownEvent.repeat && !options.repeatOnHold) return;

    // Set the eventConstant to enable event related functions
    eventConstant = keydownEvent

    setKeyPressed((prevState) => [...new Set([...prevState, keydownEvent.key])])
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler, true)
    window.addEventListener('keyup', keyUpHandler)
    return () => {
      setKeyPressed([])
      window.removeEventListener('keydown', keyDownHandler)
      window.removeEventListener('keyup', keyUpHandler)
    }
  }, [])
  return keysPressed
}
