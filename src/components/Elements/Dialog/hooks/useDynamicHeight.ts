import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface IUseDynamicHeight {
  children: ReactNode
  enableDynamicHeight: boolean
  modalRef: HTMLElement | null
}

export default function useDynamicHeight({
  children,
  enableDynamicHeight,
  modalRef,
}: IUseDynamicHeight) {
  const [height, setHeight] = useState('')

  useEffect(() => {
    if (modalRef && enableDynamicHeight) {
      // Get the current height of the modal content
      const newHeight = modalRef.scrollHeight
      setHeight(`${newHeight}px`)
    }
  }, [children, enableDynamicHeight, modalRef])

  return height
}
