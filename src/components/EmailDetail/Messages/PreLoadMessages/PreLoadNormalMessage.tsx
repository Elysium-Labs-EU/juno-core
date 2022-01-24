import { IEmailMessage } from '../../../../Store/emailListTypes'
import EmailDetailBody from '../EmailDetailBody'
import * as global from '../../../../constants/globalConstants'

const PreLoadNormalMessage = ({ message }: { message: IEmailMessage }) =>
  message && message.payload && message.id ? (
    <EmailDetailBody
      threadDetailBody={message.payload}
      messageId={message.id}
    />
  ) : (
    <div>{global.NOTHING_TO_SEE}</div>
  )

export default PreLoadNormalMessage
