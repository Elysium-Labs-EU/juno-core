import { IEmailListThreadItem } from '../../../../store/storeTypes/emailListTypes'
import { handleContactConversion } from '../../../../utils/convertToContact'
import emailBody from '../../../../utils/emailDetailDisplayData/emailBody'
import ComposeEmail from '../../../Compose/ComposeEmail'
import * as ES from '../../EmailDetailStyles'
import getRelevantMessage from './getRelevantMessage'
import * as global from '../../../../constants/globalConstants'

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
  messageOverviewListener: (evenType: 'cancel' | 'discard', messageId?: string) => void
}) => {
  const relevantMessage = getRelevantMessage({
    selectedIndex,
    localThreadDetail,
  })
  return (
    <ES.ComposeWrapper>
      <ComposeEmail
        presetValue={{
          to: handleContactConversion(relevantMessage?.payload.headers.from),
          cc: handleContactConversion(relevantMessage?.payload.headers.cc),
          bcc: handleContactConversion(relevantMessage?.payload.headers.bcc),
          subject: relevantMessage?.payload.headers.subject,
          // This should only be used when the message is a draft
          body: relevantMessage?.labelIds.includes(global.DRAFT_LABEL)
            ? emailBody(relevantMessage?.payload?.body?.emailHTML)
            : undefined,
          threadId: relevantMessage?.threadId,
          id: relevantMessage?.id,
        }}
        messageOverviewListener={messageOverviewListener}
      />
    </ES.ComposeWrapper>
  )
}

export default ReplyComposer
