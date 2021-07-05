import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLabelIds } from '../../Store/labelsSlice'
import { UpdateMetaListLabel } from '../../Store/metaListSlice'

const SetCompletedMail = (props) => {
  const { messageId, history, labelURL } = props
  const labelIds = useSelector(selectLabelIds)
  const dispatch = useDispatch()

  const CompletedAction = () => {
    const request = {
      removeLabelIds: labelIds,
    }
    dispatch(UpdateMetaListLabel({ messageId, request, history, labelURL }))
  }

  return <>{CompletedAction()}</>
}

export default SetCompletedMail
