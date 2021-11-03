import { UpdateEmailListLabel } from '../Store/emailListSlice'

const MarkEmailAsRead = ({
  dispatch,
  labelIds,
  messageId,
}: {
  dispatch: any
  labelIds: string[]
  messageId: string
}) => {
  if (messageId.length > 0 && dispatch) {
    const request = {
      removeLabelIds: ['UNREAD'],
    }
    dispatch(
      UpdateEmailListLabel({
        messageId,
        request,
        labelIds,
      })
    )
  }
}

export default MarkEmailAsRead
