import { useEffect } from 'react'
import { useAppDispatch } from '../../../../store/hooks'
import { IEmailListThreadItem } from '../../../../store/storeTypes/emailListTypes'
import markEmailAsRead from '../../../../utils/markEmailAsRead'
import * as global from '../../../../constants/globalConstants'

/**
 * @function useMarkEmailAsRead
 * @param localThreadDetail a copy of the active thread
 * @param labelIds the current active label ids
 * @returns {void} if the message is found, dispatch the action to mark the email as read
 */

export default function useMarkEmailAsRead({
  localThreadDetail,
  labelIds,
}: {
  localThreadDetail: IEmailListThreadItem | null
  labelIds: string[]
}) {
  const dispatch = useAppDispatch()

  // On mount of the email detail - mark the email as read when it is unread.s
  useEffect(() => {
    if (localThreadDetail && Object.keys(localThreadDetail).length > 0) {
      if (localThreadDetail.messages && localThreadDetail.messages.length > 0) {
        if (
          localThreadDetail.messages.filter(
            (message) =>
              message.labelIds?.includes(global.UNREAD_LABEL) === true
          ).length > 0
        ) {
          markEmailAsRead({
            threadId: localThreadDetail.id,
            dispatch,
            labelIds,
          })
        }
      }
    }
  }, [localThreadDetail])
}
