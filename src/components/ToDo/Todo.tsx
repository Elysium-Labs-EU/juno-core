import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmailList from '../EmailList/EmailList'
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
    if (baseLoaded && !storageLabels.some((label) => label.name === LABEL)) {
      dispatch(fetchLabelIds(LABEL))
    } else if (
      baseLoaded &&
      storageLabels.some((label) => label.name === LABEL)
    ) {
      const labelId = storageLabels.filter((label) => label.name === LABEL)
      dispatch(setCurrentLabels([labelId[0].id]))
    }
  }, [baseLoaded])

  return <EmailList />
}

export default Todo
