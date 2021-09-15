import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../Store/hooks'
import { selectLabelIds } from '../Store/labelsSlice'
import { UpdateMetaListLabel } from '../Store/metaListSlice'

const useEmailComplete = (props) => {
  const { messageId, history, labelURL } = props
  const labelIds = useAppSelector(selectLabelIds)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const CompletedAction = () => {
      const request = {
        removeLabelIds: labelIds,
      }
      dispatch(UpdateMetaListLabel({ messageId, request, history, labelURL }))
    }
    CompletedAction()
  })

  return null
}

export default useEmailComplete
