import { UpdateMetaListLabel } from '../../Store/metaListSlice'
import { convertArrayToString, FindLabelByName } from '../../utils'
import * as todo from '../../constants/todoConstants'

const SetToDoMail = (props) => {
  const { history, messageId, labelIds, dispatch, location, storageLabels } =
    props
  const labelURL = labelIds && convertArrayToString(labelIds)

  const ToDoAction = () => {
    const toDoLabel = FindLabelByName({ storageLabels, LABEL_NAME: todo.LABEL })
    const request = {
      removeLabelIds: labelIds,
      addLabelIds: [toDoLabel[0].id],
    }
    dispatch(
      UpdateMetaListLabel({ messageId, request, history, labelURL, location })
    )
  }

  return ToDoAction()
}

export default SetToDoMail
