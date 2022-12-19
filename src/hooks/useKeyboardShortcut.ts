import { useEffect } from 'react'

/**
 * @function useKeyboardShortcut
 * @description - a custom hook that handles the keyboard shortcuts
 * @param {string[]} actionKeys - the key or keys to listen for
 * @param {function} handleEvent - the function to run when the key or keys are pressed
 * @param {boolean} isDisabled - an optional boolean to determine if the event should be prevented
 * @param {string[]} refreshOnDeps - an optional array of dependencies to refresh the event listener
 */

export default function useKeyboardShortcut({
  key,
  modifierKey,
  handleEvent,
  isDisabled = false,
  refreshOnDeps = undefined,
}: {
  key: string
  modifierKey?: string
  handleEvent: () => void
  isDisabled?: boolean
  refreshOnDeps?: Array<any>
}) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isDisabled) return
      if (e?.code === undefined) return

      if (modifierKey) {
        if (
          e[modifierKey as keyof typeof e] &&
          e.key.toLowerCase() === key.toLowerCase()
        ) {
          e.preventDefault()
          e.stopPropagation()
          handleEvent()
        }
      } else if (e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault()
        e.stopPropagation()
        handleEvent()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [refreshOnDeps, isDisabled])
}
