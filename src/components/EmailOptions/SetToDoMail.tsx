import { LabelIdName } from '../../Store/storeTypes/labelsTypes'
import { updateEmailLabel } from '../../Store/emailListSlice'
import filterIllegalLabels from '../../utils/filterIllegalLabels'
import { findLabelByName } from '../../utils/findLabel'
import * as todo from '../../constants/todoConstants'

interface SetToDoMailProps {
  messageId: string
  labelIds: string[]
  dispatch: Function
  storageLabels: LabelIdName[]
}

const SetToDoMail = (props: SetToDoMailProps) => {
  const { messageId, labelIds, dispatch, storageLabels } = props
  const toDoLabel = findLabelByName({ storageLabels, LABEL_NAME: todo.LABEL })
  const onlyLegalLabels = filterIllegalLabels(labelIds, storageLabels)

  const ToDoAction = () => {
    const request = {
      removeLabelIds: onlyLegalLabels,
      addLabelIds: [toDoLabel[0].id],
    }
    dispatch(
      updateEmailLabel({ messageId, request, labelIds: onlyLegalLabels })
    )
  }

  return ToDoAction()
}

export default SetToDoMail
