import * as global from 'constants/globalConstants'
import { updateEmailLabel } from 'store/emailListSlice'
import type { AppDispatch } from 'store/store'
import type { ILabelIdName } from 'store/storeTypes/labelsTypes'
import { setSystemStatusUpdate } from 'store/utilsSlice'
import { findLabelByName } from 'utils/findLabel'
import { onlyLegalLabelStrings } from 'utils/onlyLegalLabels'

interface ISetToDoMail {
  threadId: string
  labelIds: Array<string>
  dispatch: AppDispatch
  storageLabels: Array<ILabelIdName>
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
    dispatch(
      setSystemStatusUpdate({
        type: 'error',
        message: "Cannot find 'To Do' label",
      })
    )
  }
}

export default setToDoMail
