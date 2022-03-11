import { LabelIdName } from '../../Store/labelsTypes'
import { updateEmailLabel } from '../../Store/emailListSlice'
import filterIllegalLabels from '../../utils/filterIllegalLabels'

interface SetToDoMailProps {
  messageId: string
  labelIds: string[]
  dispatch: Function
  storageLabels: LabelIdName[]
}

const SetToDoMail = (props: SetToDoMailProps) => {
  const { messageId, labelIds, dispatch, storageLabels } = props
  const onlyLegalLabels = filterIllegalLabels(labelIds, storageLabels)

  const ToDoAction = () => {
    const request = {
      removeLabelIds: onlyLegalLabels,
    }
    dispatch(
      updateEmailLabel({ messageId, request, labelIds: onlyLegalLabels })
    )
  }

  return ToDoAction()
}

export default SetToDoMail
