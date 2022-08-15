import { LabelIdName } from '../../store/storeTypes/labelsTypes'
import { updateEmailLabel } from '../../store/emailListSlice'
import filterIllegalLabels from '../../utils/filterIllegalLabels'
import { findLabelByName } from '../../utils/findLabel'
import * as todo from '../../constants/todoConstants'
import { AppDispatch } from '../../store/store'

interface ISetToDoMail {
  threadId: string
  labelIds: string[]
  dispatch: AppDispatch
  storageLabels: LabelIdName[]
  location?: any
}

const setToDoMail = ({
  threadId,
  labelIds,
  dispatch,
  storageLabels,
  location
}: ISetToDoMail) => {
  const toDoLabel = findLabelByName({ storageLabels, LABEL_NAME: todo.LABEL })
  const onlyLegalLabels = filterIllegalLabels(labelIds, storageLabels)
  const request = {
    removeLabelIds: onlyLegalLabels,
    addLabelIds: [toDoLabel[0].id],
  }
  dispatch(updateEmailLabel({ threadId, request, labelIds: onlyLegalLabels, location }))
}

export default setToDoMail
