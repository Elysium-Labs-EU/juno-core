import { selectCurrentMessage } from '../../../../store/emailDetailSlice'
import { useAppSelector } from '../../../../store/hooks'
import { IEmailListThreadItem } from '../../../../store/storeTypes/emailListTypes'
import emailBody from '../../../../utils/emailDetailDisplayData/emailBody'
import emailSubject from '../../../../utils/emailDetailDisplayData/emailSubject'
import ComposeEmail from '../../../Compose/ComposeEmail'
import * as ES from '../../EmailDetailStyles'

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
  const currentMessage = useAppSelector(selectCurrentMessage)

  return (
    <ES.ComposeWrapper>
      <ComposeEmail
        subject={emailSubject(localThreadDetail)}
        threadId={localThreadDetail.id}
        messageOverviewListener={messageOverviewListener}
        foundBody={
          selectedIndex !== undefined
            ? emailBody(
                localThreadDetail,
                localThreadDetail.messages.length - 1 - selectedIndex,
                isForwarding
              )
            : emailBody(
                localThreadDetail,
                localThreadDetail.messages.findIndex(
                  (message) => message.id === currentMessage
                ),
                isForwarding
              )
        }
      />
    </ES.ComposeWrapper>
  )
}

export default ForwardingComposer
