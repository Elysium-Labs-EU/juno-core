import Composer from 'components/Compose/Composer'
import * as ES from 'components/EmailDetail/EmailDetailStyles'
import * as global from 'constants/globalConstants'
import { useAppDispatch } from 'store/hooks'
import type { TThreadObject } from 'store/storeTypes/emailListTypes'
import { setSystemStatusUpdate } from 'store/utilsSlice'
import { handleContactConversion } from 'utils/convertToContact'
import emailBody from 'utils/emailDetailDisplayData/emailBody'

import isBodyWithEmailHTML from './getEmailHTML'
import getRelevantMessage from './getRelevantMessage'

/**
 *
 * @param localThreadDetail - the relevant thread detail object
 * @param selectedIndex - the selected index is the index of the selected message, NOTE - the message list on display is flipped
 * @param messageOverviewListener  A callback function that will listen to the discard or cancel event on the composer
 * @returns
 */

interface IReplyComposer {
  localThreadDetail: TThreadObject
  selectedIndex: number | undefined
  messageOverviewListener: (
    evenType: 'cancel' | 'discard',
    messageId?: string
  ) => void
}

const ReplyComposer = ({
  localThreadDetail,
  selectedIndex,
  messageOverviewListener,
}: IReplyComposer) => {
  const dispatch = useAppDispatch()
  const relevantMessage = getRelevantMessage({
    selectedIndex,
    localThreadDetail,
  })

  if (!relevantMessage) {
    dispatch(
      setSystemStatusUpdate({
        type: 'error',
        message: 'Cannot open composer with relevant message',
      })
    )
    return (
      <ES.ComposeWrapper data-cy="reply-composer">
        <Composer messageOverviewListener={messageOverviewListener} />
      </ES.ComposeWrapper>
    )
  }

  return (
    <ES.ComposeWrapper data-cy="reply-composer">
      <Composer
        presetValue={{
          // This should only be used when the message is a draft
          bcc: handleContactConversion(relevantMessage?.payload.headers.bcc),
          body: relevantMessage?.labelIds.includes(global.DRAFT_LABEL)
            ? emailBody(isBodyWithEmailHTML(relevantMessage))
            : undefined,
          cc: handleContactConversion(relevantMessage?.payload.headers.cc),
          files: relevantMessage?.payload?.files,
          id: relevantMessage?.id,
          subject: relevantMessage?.payload.headers.subject,
          threadId: relevantMessage?.threadId,
          to: handleContactConversion(relevantMessage?.payload.headers.from),
        }}
        messageOverviewListener={messageOverviewListener}
      />
    </ES.ComposeWrapper>
  )
}

export default ReplyComposer
