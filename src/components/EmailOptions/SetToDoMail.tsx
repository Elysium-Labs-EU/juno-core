import * as global from '../../constants/globalConstants'
import { updateEmailLabel } from '../../store/emailListSlice'
import { AppDispatch } from '../../store/store'
import { LabelIdName } from '../../store/storeTypes/labelsTypes'
import { setServiceUnavailable } from '../../store/utilsSlice'
import { onlyLegalLabelStrings } from '../../utils/onlyLegalLabels'
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
    const onlyLegalLabels = onlyLegalLabelStrings({ labelIds, storageLabels })
    const request = {
      // Take out the SENT label, since that label can never be removed.
      removeLabelIds: onlyLegalLabels.filter(
        (label) => label !== global.SENT_LABEL
      ),
      addLabelIds: [toDoLabel?.id],
    }
    dispatch(updateEmailLabel({ threadId, request, labelIds: onlyLegalLabels }))
  } else {
    dispatch(setServiceUnavailable('Cannot find to do label'))
  }
}

export default setToDoMail
