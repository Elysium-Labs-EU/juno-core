import { useEffect } from 'react'
// import { useSessionContext } from 'supertokens-auth-react/recipe/session'
import EmailList from '../EmailList/EmailList'
import { selectBaseLoaded } from '../../Store/baseSlice'
import {
  fetchLabelIds,
  setCurrentLabels,
  selectStorageLabels,
} from '../../Store/labelsSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import AnimatedMountUnmount from '../../utils/animatedMountUnmount'
import Seo from '../Elements/Seo'
import * as local from '../../constants/todoConstants'

const Todo = () => {
  const baseLoaded = useAppSelector(selectBaseLoaded)
  const storageLabels = useAppSelector(selectStorageLabels)
  const dispatch = useAppDispatch()

  // const response = useSessionContext()
  // console.log(response)

  useEffect(() => {
    if (
      baseLoaded &&
      !storageLabels.some((label) => label.name === local.LABEL)
    ) {
      dispatch(fetchLabelIds(local.LABEL))
    } else if (
      baseLoaded &&
      storageLabels.some((label) => label.name === local.LABEL)
    ) {
      const labelId = storageLabels.filter(
        (label) => label.name === local.LABEL
      )
      dispatch(setCurrentLabels([labelId[0].id]))
    }
  }, [baseLoaded])

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
