import { useEffect } from 'react'

/**
 * @function
 * @name useKeyboardShortcut
 * @description A custom hook that handles the keyboard shortcuts
 * @param {IUseKeyboardShortcut} options - An object containing the options for the hook
 *  @returns {void}
 */

interface IUseKeyboardShortcut {
  key: string
  handleEvent: () => void
  isDisabled?: boolean
  refreshOnDeps?: Array<any>
}

export default function useKeyboardShortcut({
  key,
  handleEvent,
  isDisabled = false,
  refreshOnDeps = undefined,
}: IUseKeyboardShortcut) {
  useEffect(() => {
    const downHandler = (e: KeyboardEvent) => {
      if (isDisabled) return
      if (e.key === key) {
        e.preventDefault()
        e.stopPropagation()
        handleEvent()
      }
    }
    window.addEventListener('keydown', downHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
    }
  }, [isDisabled, key, handleEvent, refreshOnDeps])
}
