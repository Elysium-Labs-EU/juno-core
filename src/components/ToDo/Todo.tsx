import { useEffect } from 'react'
import EmailList from '../EmailList/EmailList'
import { selectBaseLoaded } from '../../Store/baseSlice'
import {
  fetchLabelIds,
  setCurrentLabels,
  selectStorageLabels,
} from '../../Store/labelsSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import AnimatedMountUnmount from '../../utils/animatedMountUnmount'

const LABEL = 'Juno/To Do'

const Todo = () => {
  const baseLoaded = useAppSelector(selectBaseLoaded)
  const storageLabels = useAppSelector(selectStorageLabels)
  const dispatch = useAppDispatch()

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

  return (
    <AnimatedMountUnmount>
      <EmailList />
    </AnimatedMountUnmount>
  )
}

export default Todo
