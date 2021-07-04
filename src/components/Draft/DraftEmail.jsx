import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmailList from '../EmailList/EmailList'
import { setCurrentLabels } from '../../Store/labelsSlice'
import { selectBaseLoaded } from '../../Store/baseSlice'
import * as local from '../../constants/draftConstants'

const DraftEmail = () => {
  const baseLoaded = useSelector(selectBaseLoaded)
  const dispatch = useDispatch()
  useEffect(() => {
    if (baseLoaded) {
      dispatch(setCurrentLabels(local.LABEL_ARRAY))
    }
  }, [baseLoaded])

  return <EmailList />
}

export default DraftEmail
