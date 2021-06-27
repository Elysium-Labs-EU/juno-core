import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmailList from '../EmailList'
import { selectBaseLoaded } from '../../Store/baseSlice'
import {
  fetchLabelIds,
  setCurrentLabels,
  selectStorageLabels,
} from '../../Store/labelsSlice'

const LABEL = 'Juno/To Do'

const Todo = () => {
  const baseLoaded = useSelector(selectBaseLoaded)
  const storageLabels = useSelector(selectStorageLabels)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('baseLoaded', baseLoaded)
    if (baseLoaded && !storageLabels.some((label) => label.name === LABEL)) {
      dispatch(fetchLabelIds(LABEL))
      console.log('booyah')
    } else if (
      baseLoaded &&
      storageLabels.some((label) => label.name === LABEL)
    ) {
      console.log('check here')
      const labelId = storageLabels.filter((label) => label.name === LABEL)
      dispatch(setCurrentLabels([labelId[0].id]))
    }
  }, [baseLoaded])

  return <EmailList />
}

export default Todo
