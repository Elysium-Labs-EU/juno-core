import { useEffect } from 'react'

import { selectBaseLoaded } from 'store/baseSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setCurrentLabel } from 'store/labelsSlice'

export default function useSetCurrentLabel() {
  const baseLoaded = useAppSelector(selectBaseLoaded)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (baseLoaded) {
      dispatch(setCurrentLabel())
    }
  }, [baseLoaded])
}
