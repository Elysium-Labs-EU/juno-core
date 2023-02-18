/**
 * @function
 * @name useKeyPress
 * @description A custom hook that handles the keyboard shortcuts
 * @param {IUseKeyPress} options - An object containing the options for the hook
 *  @returns {void}
 */

import { useState, useEffect } from 'react'

export default function useKeyPress(targetKey: string): boolean {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false)
  // If pressed key is our target key then set to true
  function downHandler(e: KeyboardEvent): void {
    if (e.key.toLowerCase() === targetKey.toLowerCase()) {
      setKeyPressed(true)
    }
  }
  // If released key is our target key then set to false
  const upHandler = (e: KeyboardEvent): void => {
    if (e.key.toLowerCase() === targetKey.toLowerCase()) {
      setKeyPressed(false)
    }
  }
  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [])
  return keyPressed
}
