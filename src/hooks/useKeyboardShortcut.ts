import { useEffect } from 'react'

/**
 * @function useKeyboardShortcut
 * @description A custom hook that handles keyboard shortcuts
 * @param {UseKeyboardShortcut} config - an object containing the configuration for the hook
 * @param {string} config.key - the key to listen for
 * @param {string} [config.modifierKey] - an optional modifier key to listen for
 * @param {function} config.handleEvent - the function to run when the key or keys are pressed
 * @param {boolean} [config.isDisabled=false] - an optional boolean to determine if the event should be prevented
 * @param {Array<unknown>} [config.refreshOnDeps] - an optional array of dependencies to refresh the event listener
 */

interface UseKeyboardShortcut {
  key: string
  modifierKey?: string
  handleEvent: () => void
  isDisabled?: boolean
  refreshOnDeps?: Array<unknown>
}

export const handleKeydown =
  (
    key: string,
    handleEvent: () => void,
    modifierKey?: string,
    isDisabled?: boolean
  ) =>
    (e: KeyboardEvent | undefined) => {
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

export default function useKeyboardShortcut({
  key,
  modifierKey,
  handleEvent,
  isDisabled = false,
  refreshOnDeps = undefined,
}: UseKeyboardShortcut) {
  useEffect(() => {
    const handleKeydownCallback = handleKeydown(
      key,
      handleEvent,
      modifierKey,
      isDisabled
    )
    window.addEventListener('keydown', handleKeydownCallback)
    return () => {
      window.removeEventListener('keydown', handleKeydownCallback)
    }
  }, [handleEvent, isDisabled, key, modifierKey, refreshOnDeps])
}
