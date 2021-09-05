import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLabelIds } from '../Store/labelsSlice'
import { UpdateMetaListLabel } from '../Store/metaListSlice'

const useEmailComplete = (props) => {
  const { messageId, history, labelURL } = props
  const labelIds = useSelector(selectLabelIds)
  const dispatch = useDispatch()

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
