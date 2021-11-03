import React from 'react'
import DraftMessage from '../DisplayVariants/DraftMessage'
import { EmailListThreadItem, EmailMessage } from '../../../../Store/emailListTypes'
import * as draft from '../../../../constants/draftConstants'
import PreLoadNormalMessage from './PreLoadNormalMessage'

const detailDisplaySelector = ({
    message,
    index,
}: {
    message: EmailMessage
    threadDetail: EmailListThreadItem
    index: number,
}) => {
    if (message.labelIds.includes(draft.LABEL)) {
        return <DraftMessage message={message} messageIndex={index} />
    }
    if (!message.labelIds.includes(draft.LABEL)) {
        return <PreLoadNormalMessage message={message} />
    }
    return null
}

const PreLoadMessage = ({ threadDetail }: { threadDetail: EmailListThreadItem }) => {
    const MappedMessages = () =>
        threadDetail &&
        threadDetail.messages &&
        threadDetail.messages
            .slice(0)
            .reverse()
            .map((message, index) => (
                <div key={message.id}>
                    {detailDisplaySelector({
                        message,
                        threadDetail,
                        index,
                    })}
                </div>
            ))

    return (
        <div>
            {MappedMessages()}
        </div>
    )
}

export default PreLoadMessage
