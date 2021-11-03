import { History } from 'history'
import { UpdateMetaListLabel } from '../../Store/metaListSlice'
import { convertArrayToString } from '../../utils'
import { FindLabelByName } from '../../utils/findLabel'
import * as todo from '../../constants/todoConstants'
import { LocationObjectType } from '../types/globalTypes'
import { LabelIdName } from '../../Store/labelsTypes'

interface SetToDoMailProps {
  messageId: string
  history: History
  labelIds: string[]
  dispatch: any
  location: LocationObjectType
  storageLabels: LabelIdName[]
}

const SetToDoMail = (props: SetToDoMailProps) => {
  const { history, messageId, labelIds, dispatch, location, storageLabels } = props
  const labelURL = labelIds && convertArrayToString(labelIds)

  const ToDoAction = () => {
    const toDoLabel = FindLabelByName({ storageLabels, LABEL_NAME: todo.LABEL })
    const request = {
      removeLabelIds: labelIds,
      addLabelIds: [toDoLabel[0].id],
    }
    dispatch(UpdateMetaListLabel({ messageId, request, history, location, labelIds }))
  }

  return ToDoAction()
}

export default SetToDoMail
