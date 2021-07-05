import { useDispatch, useSelector } from 'react-redux'
import { selectLabelIds, selectStorageLabels } from '../../Store/labelsSlice'
import { UpdateMetaListLabel } from '../../Store/metaListSlice'
import { FindLabel } from '../../utils'
import * as todo from '../../constants/todoConstants'

const SetToDoMail = (props) => {
  const { history, messageId, labelURL } = props
  const storageLabels = useSelector(selectStorageLabels)
  const labelIds = useSelector(selectLabelIds)
  const dispatch = useDispatch()

  const ToDoAction = () => {
    const toDoLabel = FindLabel({ storageLabels, LABEL_NAME: todo.LABEL })
    const request = {
      removeLabelIds: labelIds,
      addLabelIds: [toDoLabel[0].id],
    }
    dispatch(UpdateMetaListLabel({ messageId, request, history, labelURL }))
  }

  return ToDoAction()
}

export default SetToDoMail
