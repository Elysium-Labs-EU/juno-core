import { IEmailListThreadItem } from '../../../../store/storeTypes/emailListTypes'
import { handleContactConversion } from '../../../../utils/convertToContact'
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

const ReplyComposer = ({
  localThreadDetail,
  selectedIndex,
  messageOverviewListener,
}: {
  localThreadDetail: IEmailListThreadItem
  selectedIndex: number | undefined
  messageOverviewListener: (messageId: string) => void
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
          to: handleContactConversion(relevantMessage?.payload.headers.from),
          cc: handleContactConversion(relevantMessage?.payload.headers.cc),
          bcc: handleContactConversion(relevantMessage?.payload.headers.bcc),
          subject: relevantMessage?.payload.headers.subject,
          body:
            selectedIndex !== undefined &&
            relevantMessage?.payload?.body?.emailHTML
              ? emailBody(relevantMessage.payload.body.emailHTML)
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

export default ReplyComposer
