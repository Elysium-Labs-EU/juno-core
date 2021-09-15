import React, { useEffect } from 'react'
import EmailList from '../EmailList/EmailList'
import { setCurrentLabels } from '../../Store/labelsSlice'
import { selectBaseLoaded } from '../../Store/baseSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'

const LABEL = ['SENT']

const Sent = () => {
  const baseLoaded = useAppSelector(selectBaseLoaded)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (baseLoaded) {
      dispatch(setCurrentLabels(LABEL))
    }
  }, [baseLoaded])

  return <EmailList />
}

export default Sent
