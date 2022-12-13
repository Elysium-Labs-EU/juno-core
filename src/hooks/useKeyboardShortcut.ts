import { useEffect } from 'react'

const specialKeyMap: { [key: string]: string } = {
  Alt: 'altKey',
  Control: 'ctrlKey',
  Meta: 'metaKey',
  Shift: 'shiftKey',
}

/**
 * @function useKeyboardShortcut
 * @description - a custom hook that handles the keyboard shortcuts
 * @param {string[]} actionKeys - the key or keys to listen for
 * @param {function} handleEvent - the function to run when the key or keys are pressed
 * @param {boolean} isDisabled - an optional boolean to determine if the event should be prevented
 * @param {string[]} refreshOnDeps - an optional array of dependencies to refresh the event listener
 */

export default function useKeyboardShortcut({
  actionKeys,
  handleEvent,
  isDisabled = false,
  refreshOnDeps = undefined,
}: {
  actionKeys: Array<string>
  handleEvent: () => void
  isDisabled?: boolean
  refreshOnDeps?: Array<any>
}) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isDisabled) {
        if (
          (actionKeys.length === 2 &&
            e[specialKeyMap[actionKeys[0]] as keyof typeof e] &&
            e.key?.toLowerCase() === actionKeys[1]) ||
          (e[specialKeyMap[actionKeys[1]] as keyof typeof e] &&
            e.key === actionKeys[0]) ||
          (actionKeys.length === 1 && e.key === actionKeys[0])
        ) {
          e.preventDefault()
          e.stopPropagation()
          handleEvent()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [refreshOnDeps, isDisabled])
}
