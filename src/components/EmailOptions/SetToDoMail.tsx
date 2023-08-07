import toast from 'react-hot-toast'

import CustomToast from 'components/Elements/Toast/Toast'
import * as global from 'constants/globalConstants'
import { updateEmailLabel } from 'store/emailListSlice'
import type { AppDispatch } from 'store/store'
import type { TLabelState } from 'store/storeTypes/labelsTypes'
import { findLabelByName } from 'utils/findLabel'
import { onlyLegalLabelStrings } from 'utils/onlyLegalLabels'

interface ISetToDoMail {
  dispatch: AppDispatch
  labelIds: TLabelState['labelIds']
  storageLabels: TLabelState['storageLabels']
  threadId: string
}

const setToDoMail = ({
  dispatch,
  labelIds,
  storageLabels,
  threadId,
}: ISetToDoMail) => {
  const toDoLabel = findLabelByName({
    storageLabels,
    LABEL_NAME: global.TODO_LABEL_NAME,
  })
  if (toDoLabel?.id) {
    const onlyLegalLabels = onlyLegalLabelStrings({ labelIds, storageLabels })
    const request = {
      // Take out the SENT label, since that label can never be removed.
      removeLabelIds: onlyLegalLabels.filter(
        (label) => label !== global.SENT_LABEL
      ),
      addLabelIds: [toDoLabel.id],
    }
    dispatch(updateEmailLabel({ threadId, request, labelIds: onlyLegalLabels }))
  } else {
    toast.custom((t) => (
      <CustomToast
        specificToast={t}
        title="Cannot find 'To Do' label"
        variant="error"
      />
    ))
  }
}

export default setToDoMail
