import { useEffect } from 'react'

import * as global from 'constants/globalConstants'
import { useAppDispatch } from 'store/hooks'
import type { TThreadObject } from 'store/storeTypes/emailListTypes'
import type { TLabelState } from 'store/storeTypes/labelsTypes'
import markEmailAsRead from 'utils/markEmailAsRead'

/**
 * @function useMarkEmailAsRead
 * @param threadDetail a copy of the active thread
 * @param labelIds the current active label ids
 * @returns {void} if the message is found, dispatch the action to mark the email as read
 */

interface IUseMarkEmailAsRead {
  threadDetail: TThreadObject | null | undefined
  labelIds: TLabelState['labelIds']
}

export default function useMarkEmailAsRead({
  threadDetail,
  labelIds,
}: IUseMarkEmailAsRead) {
  const dispatch = useAppDispatch()

  // On mount of the email detail - mark the email as read when it is unread.s
  useEffect(() => {
    if (
      threadDetail?.messages &&
      threadDetail.messages.filter(
        (message) => message.labelIds?.includes(global.UNREAD_LABEL) === true
      ).length > 0
    ) {
      markEmailAsRead({
        threadId: threadDetail.id,
        dispatch,
        labelIds,
      })
    }
  }, [threadDetail])
}
