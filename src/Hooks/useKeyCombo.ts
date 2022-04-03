import { useEffect } from 'react'
import multipleIncludes from '../utils/multipleIncludes'

export default function useKeyCombo({
  handleEvent,
  keysPressed,
  actionKeys,
  inSearch,
}: {
  handleEvent: Function
  keysPressed: string[]
  actionKeys: any
  inSearch?: boolean
}) {
  useEffect(() => {
    let mounted = true
    if (
      keysPressed.length > 0 &&
      multipleIncludes(actionKeys, keysPressed) &&
      (!inSearch ?? true)
    ) {
      mounted && handleEvent()
    }
    return () => {
      mounted = false
    }
  }, [keysPressed, inSearch])
}
