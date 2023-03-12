import { useState, useEffect } from 'react'

export default function useDocumentVisibility() {
  const [isVisible, setIsVisible] = useState(
    document.visibilityState === 'visible'
  )

  useEffect(() => {
    const handleVisibilityChange = () => {
      const visibleElement = document.visibilityState === 'visible'
      setIsVisible(visibleElement)
      console.log('Visible element:', visibleElement)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return isVisible
}
