import { IEmailListThreadItem } from '../../../../store/storeTypes/emailListTypes'
import emailBody from '../../../../utils/emailDetailDisplayData/emailBody'
import ComposeEmail from '../../../Compose/ComposeEmail'
import * as ES from '../../EmailDetailStyles'

/**
 *
 * @param localThreadDetail - the relevant thread detail object
 * @param selectedIndex - the selected index is the index of the selected message, NOTE - the message list on display is flipped
 * @param messageOverviewListener a callback that
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
  messageOverviewListener: (messageId: string) => void
  isForwarding: boolean
}) => {
  const relevantMessage =
    selectedIndex !== undefined
      ? localThreadDetail.messages[
          localThreadDetail.messages.length - 1 - selectedIndex
        ]
      : localThreadDetail.messages[localThreadDetail.messages.length - 1]

  return (
    <ES.ComposeWrapper>
      <ComposeEmail
        subject={relevantMessage?.payload.headers.subject}
        threadId={localThreadDetail.id}
        messageOverviewListener={messageOverviewListener}
        foundBody={
          relevantMessage !== null
            ? emailBody(relevantMessage.payload.body.emailHTML, isForwarding)
            : undefined
        }
      />
    </ES.ComposeWrapper>
  )
}

export default ForwardingComposer
