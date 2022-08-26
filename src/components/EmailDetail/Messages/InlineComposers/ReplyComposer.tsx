import { IEmailListThreadItem } from '../../../../store/storeTypes/emailListTypes'
import bccEmail from '../../../../utils/emailDetailDisplayData/emailBcc'
import emailBody from '../../../../utils/emailDetailDisplayData/emailBody'
import ccEmail from '../../../../utils/emailDetailDisplayData/emailCc'
import fromEmail from '../../../../utils/emailDetailDisplayData/emailFrom'
import emailSubject from '../../../../utils/emailDetailDisplayData/emailSubject'
import ComposeEmail from '../../../Compose/ComposeEmail'
import * as ES from '../../EmailDetailStyles'

const ReplyComposer = ({
  localThreadDetail,
  selectedIndex,
  messageOverviewListener,
}: {
  localThreadDetail: IEmailListThreadItem
  selectedIndex: number | undefined
  messageOverviewListener: (messageId: string) => void
}) => {
  console.log({
    localThreadDetail,
    selectedIndex,
    messageOverviewListener,
  })
  return (
    <ES.ComposeWrapper>
      <ComposeEmail
        to={fromEmail(localThreadDetail)}
        cc={ccEmail(localThreadDetail)}
        bcc={bccEmail(localThreadDetail)}
        subject={emailSubject(localThreadDetail)}
        foundBody={
          selectedIndex !== undefined
            ? emailBody(
                localThreadDetail,
                localThreadDetail.messages.length - 1 - selectedIndex
              )
            : undefined
        }
        threadId={localThreadDetail.id}
        messageOverviewListener={messageOverviewListener}
      />
    </ES.ComposeWrapper>
  )
}

export default ReplyComposer
