import { updateEmailLabel } from 'store/emailListSlice'
import type { AppDispatch } from 'store/store'
import type { TLabelState } from 'store/storeTypes/labelsTypes'

interface IThrashMailProps {
  threadId: string
  labelIds: TLabelState['labelIds']
  dispatch: AppDispatch
}

const thrashMail = ({ threadId, labelIds, dispatch }: IThrashMailProps) => {
  const markEmailThrashed = () => {
    dispatch(
      updateEmailLabel({
        threadId,
        request: { delete: true },
        labelIds,
      })
    )
  }

  return markEmailThrashed()
}

export default thrashMail
