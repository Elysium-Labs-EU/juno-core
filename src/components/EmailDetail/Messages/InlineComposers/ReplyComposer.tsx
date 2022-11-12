import ComposeEmail from 'components/Compose/ComposeEmail'
import * as ES from 'components/EmailDetail/EmailDetailStyles'
import * as global from 'constants/globalConstants'
import { IEmailListThreadItem } from 'store/storeTypes/emailListTypes'
import { handleContactConversion } from 'utils/convertToContact'
import emailBody from 'utils/emailDetailDisplayData/emailBody'

import getRelevantMessage from './getRelevantMessage'

/**
 *
 * @param localThreadDetail - the relevant thread detail object
 * @param selectedIndex - the selected index is the index of the selected message, NOTE - the message list on display is flipped
 * @param messageOverviewListener  A callback function that will listen to the discard or cancel event on the composer
 * @returns
 */

const ReplyComposer = ({
  localThreadDetail,
  selectedIndex,
  messageOverviewListener,
}: {
  localThreadDetail: IEmailListThreadItem
  selectedIndex: number | undefined
  messageOverviewListener: (
    evenType: 'cancel' | 'discard',
    messageId?: string
  ) => void
}) => {
  const relevantMessage = getRelevantMessage({
    selectedIndex,
    localThreadDetail,
  })

  return (
    <ES.ComposeWrapper>
      <ComposeEmail
        presetValue={{
          // This should only be used when the message is a draft
          bcc: handleContactConversion(relevantMessage?.payload.headers.bcc),
          body: relevantMessage?.labelIds.includes(global.DRAFT_LABEL)
            ? emailBody(relevantMessage?.payload?.body?.emailHTML)
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
