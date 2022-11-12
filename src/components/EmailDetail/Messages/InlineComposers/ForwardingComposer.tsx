import ComposeEmail from 'components/Compose/ComposeEmail'
import * as ES from 'components/EmailDetail/EmailDetailStyles'
import { IEmailListThreadItem } from 'store/storeTypes/emailListTypes'
import emailBody from 'utils/emailDetailDisplayData/emailBody'

import getRelevantMessage from './getRelevantMessage'

/**
 *
 * @param localThreadDetail - the relevant thread detail object
 * @param selectedIndex - the selected index is the index of the selected message, NOTE - the message list on display is flipped
 * @param messageOverviewListener  A callback function that will listen to the discard or cancel event on the composer
 * @returns
 */

const ForwardingComposer = ({
  localThreadDetail,
  selectedIndex,
  messageOverviewListener,
  isForwarding,
}: {
  localThreadDetail: IEmailListThreadItem
  selectedIndex: number | undefined
  messageOverviewListener: (
    evenType: 'cancel' | 'discard',
    messageId?: string
  ) => void
  isForwarding: boolean
}) => {
  const relevantMessage = getRelevantMessage({
    selectedIndex,
    localThreadDetail,
  })

  return (
    <ES.ComposeWrapper>
      <ComposeEmail
        presetValue={{
          subject: relevantMessage?.payload.headers.subject,
          body: emailBody(
            relevantMessage?.payload?.body?.emailHTML,
            isForwarding
          ),
          threadId: relevantMessage?.threadId,
          id: relevantMessage?.id,
        }}
        messageOverviewListener={messageOverviewListener}
      />
    </ES.ComposeWrapper>
  )
}

export default ForwardingComposer
