import { useEffect } from 'react'
import EmailList from '../EmailList/EmailList'
import { selectBaseLoaded } from '../../store/baseSlice'
import {
  fetchLabelIds,
  setCurrentLabels,
  selectStorageLabels,
} from '../../store/labelsSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import AnimatedMountUnmount from '../../utils/animatedMountUnmount'
import Seo from '../Elements/Seo'
import * as local from '../../constants/todoConstants'

const Todo = () => {
  const baseLoaded = useAppSelector(selectBaseLoaded)
  const storageLabels = useAppSelector(selectStorageLabels)
  const dispatch = useAppDispatch()

  useEffect(() => {
    let mounted = true
    if (
      baseLoaded &&
      !storageLabels.some((label) => label.name === local.LABEL)
    ) {
      mounted && dispatch(fetchLabelIds(local.LABEL))
    }
    if (
      baseLoaded &&
      storageLabels.some((label) => label.name === local.LABEL)
    ) {
      const labelId = storageLabels.filter(
        (label) => label.name === local.LABEL
      )
      mounted && dispatch(setCurrentLabels([labelId[0].id]))
    }
    return () => {
      mounted = false
    }
  }, [baseLoaded, storageLabels])

  return (
    <>
      <Seo title={local.HEADER_TODO} />
      <AnimatedMountUnmount>
        <EmailList />
      </AnimatedMountUnmount>
    </>
  )
}

export default Todo
