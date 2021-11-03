import React from 'react'
import { EmailMessage } from '../../../../Store/emailListTypes'
import EmailDetailBody from '../EmailDetailBody'

const PreLoadNormalMessage = ({ message }: { message: EmailMessage }) => (
    <>
        {message && message.payload && message.id && (
            <EmailDetailBody
                threadDetailBody={message.payload}
                messageId={message.id}
            />
        )}
    </>
)

export default PreLoadNormalMessage
