import { IEmailMessage } from '../../../../Store/emailListTypes'
import EmailDetailBody from '../EmailDetailBody'
import * as global from '../../../../constants/globalConstants'

const PreLoadNormalMessage = ({ message }: { message: IEmailMessage }) =>
  message && message.payload && message.id ? (
    <EmailDetailBody
      threadDetailBody={message.payload}
      messageId={message.id}
      detailBodyCSS={global.EMAIL_BODY_INVISIBLE}
    />
  ) : (
    <div>{global.NOTHING_TO_SEE}</div>
  )

export default PreLoadNormalMessage
