import { updateEmailLabel } from '../../Store/emailListSlice'

interface IThrashMailProps {
  messageId: string
  labelIds: string[]
  dispatch: Function
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
