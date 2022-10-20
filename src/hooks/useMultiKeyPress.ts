import { useEffect, useState } from 'react'
import multipleIncludes from '../utils/multipleIncludes'

const BLACKLISTED_DOM_TARGETS = ['TEXTAREA', 'INPUT']
const WHITELISTED_SYSTEM_KEY_COMBOS = [[]]
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
    console.log({ disabled, eventConstant })
    let mounted = true
    if (eventConstant) {
      const { target } = eventConstant as any
      if (target) {
        // console.log('BOYAH', target.tagName)
        // console.log('KASHA', BLACKLISTED_DOM_TARGETS.indexOf(target.tagName))
        // TODO: We need to allow system combinations, some of them.
        if (
          disabled === true ||
          BLACKLISTED_DOM_TARGETS.indexOf(target.tagName) >= 0 ||
          WHITELISTED_SYSTEM_KEY_COMBOS
        ) {
          console.log('here')
          // console.log('%%%', BLACKLISTED_DOM_TARGETS.indexOf(target.tagName))
        } else {
          eventConstant?.preventDefault()
          eventConstant?.stopImmediatePropagation()
        }
      }
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
    console.log('keydownEvent', keydownEvent)
    if (keydownEvent.key === undefined) {
      return
    }

    // if (keydownEvent.repeat && !options.repeatOnHold) return;

    // Set the eventConstant to enable event related functions
    eventConstant = keydownEvent

    setKeyPressed((prevState) => [
      ...new Set([...prevState, keydownEvent.key.toUpperCase()]),
    ])
  }

  useEffect(() => {
    // console.log({ disabled, eventConstant, handleEvent })
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
