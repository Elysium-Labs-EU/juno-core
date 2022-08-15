import { updateEmailLabel } from '../../store/emailListSlice'
import { AppDispatch } from '../../store/store'

interface IThrashMailProps {
  threadId: string
  labelIds: string[]
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
