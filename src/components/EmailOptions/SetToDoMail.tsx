import * as global from '../../constants/globalConstants'
import { updateEmailLabel } from '../../store/emailListSlice'
import { AppDispatch } from '../../store/store'
import { LabelIdName } from '../../store/storeTypes/labelsTypes'
import { setServiceUnavailable } from '../../store/utilsSlice'
import filterIllegalLabels from '../../utils/filterIllegalLabels'
import { findLabelByName } from '../../utils/findLabel'

interface ISetToDoMail {
  threadId: string
  labelIds: string[]
  dispatch: AppDispatch
  storageLabels: LabelIdName[]
}

const setToDoMail = ({
  threadId,
  labelIds,
  dispatch,
  storageLabels,
}: ISetToDoMail) => {
  const toDoLabel = findLabelByName({
    storageLabels,
    LABEL_NAME: global.TODO_LABEL_NAME,
  })
  if (toDoLabel) {
    const onlyLegalLabels = filterIllegalLabels(labelIds, storageLabels)
    const request = {
      removeLabelIds: onlyLegalLabels,
      addLabelIds: [toDoLabel?.id],
    }
    dispatch(updateEmailLabel({ threadId, request, labelIds: onlyLegalLabels }))
  } else {
    dispatch(setServiceUnavailable('Cannot find to do label'))
  }
}

export default setToDoMail
