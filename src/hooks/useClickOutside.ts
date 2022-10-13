import { useEffect, useRef } from 'react'

/**
 * @function useClickOutside
 * @param {object} - takes in an object with a callback function
 * @returns the ref of the object where the hook is applied on
 */

export default function useClickOutside({
  onClickOutside,
}: {
  onClickOutside: () => void
}) {
  const ref = useRef<any>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside()
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [onClickOutside])

  return { ref }
}
