import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmailList from '../EmailList'
import { setCurrentLabels } from '../../Store/labelsSlice'
import { selectBaseLoaded } from '../../Store/baseSlice'

const LABEL = ['DRAFT']
const DraftEmail = () => {
  const baseLoaded = useSelector(selectBaseLoaded)
  const dispatch = useDispatch()
  useEffect(() => {
    if (baseLoaded) {
      dispatch(setCurrentLabels(LABEL))
    }
  }, [baseLoaded])

  return <EmailList />
}

export default DraftEmail
