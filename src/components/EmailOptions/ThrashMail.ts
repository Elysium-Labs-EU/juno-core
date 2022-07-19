import { updateEmailLabel } from '../../store/emailListSlice'
import { AppDispatch } from '../../store/store'

interface IThrashMailProps {
  messageId: string
  labelIds: string[]
  dispatch: AppDispatch
}

const thrashMail = (props: IThrashMailProps) => {
  const { messageId, labelIds, dispatch } = props

  const markEmailThrashed = () => {
    dispatch(
      updateEmailLabel({
        messageId,
        request: { delete: true },
        labelIds,
      })
    )
  }

  return markEmailThrashed()
}

export default thrashMail
