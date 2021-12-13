import { FindLabelByName } from '../../utils/findLabel'
import * as todo from '../../constants/todoConstants'
import { LocationObjectType } from '../types/globalTypes'
import { LabelIdName } from '../../Store/labelsTypes'
import { UpdateEmailListLabel } from '../../Store/emailListSlice'

interface SetToDoMailProps {
  messageId: string
  labelIds: string[]
  dispatch: any
  location: LocationObjectType
  storageLabels: LabelIdName[]
}

const SetToDoMail = (props: SetToDoMailProps) => {
  const { messageId, labelIds, dispatch, location, storageLabels } = props

  const ToDoAction = () => {
    const toDoLabel = FindLabelByName({ storageLabels, LABEL_NAME: todo.LABEL })
    const request = {
      removeLabelIds: labelIds,
      addLabelIds: [toDoLabel[0].id],
    }
    dispatch(UpdateEmailListLabel({ messageId, request, location, labelIds }))
  }

  return ToDoAction()
}

export default SetToDoMail
