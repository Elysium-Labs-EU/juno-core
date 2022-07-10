import { updateEmailLabel } from '../Store/emailListSlice'
import * as global from '../constants/globalConstants'

interface IMarkEmailAsRead {
  dispatch: Function
  labelIds: string[]
  threadId: string
}

/**
 * @function markEmailAsRead
 * @param IMarkEmailAsRead - takes in labelIds and threadId to update the message's labels.
 * The output of the function is to remove the unread label.
 */

const markEmailAsRead = ({
  dispatch,
  labelIds,
  threadId,
}: IMarkEmailAsRead) => {
  if (threadId.length > 0 && dispatch) {
    dispatch(
      updateEmailLabel({
        threadId,
        request: {
          removeLabelIds: [global.UNREAD_LABEL],
        },
        labelIds,
      })
    )
  }
}

export default markEmailAsRead
