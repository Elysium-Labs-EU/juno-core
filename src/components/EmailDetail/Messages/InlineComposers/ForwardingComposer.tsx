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
        presetValue={{
          subject: relevantMessage?.payload.headers.subject,
          body:
            relevantMessage !== null &&
            relevantMessage?.payload?.body?.emailHTML
              ? emailBody(
                  relevantMessage?.payload?.body?.emailHTML,
                  isForwarding
                )
              : undefined,
          threadId: localThreadDetail?.id,
          id: localThreadDetail.messages[
            selectedIndex === undefined
              ? localThreadDetail.messages.length - 1
              : selectedIndex
          ].id,
        }}
        messageOverviewListener={messageOverviewListener}
      />
    </ES.ComposeWrapper>
  )
}

export default ForwardingComposer
