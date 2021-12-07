import React from 'react'
import { EmailMessage } from '../../../../Store/emailListTypes'
import EmailDetailBody from '../EmailDetailBody'
import * as global from '../../../../constants/globalConstants'

const PreLoadNormalMessage = ({ message }: { message: EmailMessage }) => (
    message && message.payload && message.id ? (
        <EmailDetailBody
            threadDetailBody={message.payload}
            messageId={message.id}
        />
    ) : <div>{global.NOTHING_TO_SEE}</div>

)

export default PreLoadNormalMessage
