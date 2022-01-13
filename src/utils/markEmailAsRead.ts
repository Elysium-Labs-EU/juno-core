import { updateEmailLabel } from '../Store/emailListSlice'
import * as global from '../constants/globalConstants'

interface IMarkEmailAsRead {
  dispatch: Function
  labelIds: string[]
  messageId: string
}

const markEmailAsRead = ({
  dispatch,
  labelIds,
  messageId,
}: IMarkEmailAsRead) => {
  if (messageId.length > 0 && dispatch) {
    dispatch(
      updateEmailLabel({
        messageId,
        request: {
          removeLabelIds: [global.UNREAD_LABEL],
        },
        labelIds,
      })
    )
  }
}

export default markEmailAsRead
