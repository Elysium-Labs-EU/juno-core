import React from 'react'
import DraftMessage from '../DisplayVariants/DraftMessage'
import ReadUnreadMessage from '../DisplayVariants/ReadUnreadMessage'
import { EmailListThreadItem, EmailMessage } from '../../../../Store/emailListTypes'
import * as draft from '../../../../constants/draftConstants'
import * as local from '../../../../constants/emailDetailConstants'

const detailDisplaySelector = ({
    message,
    threadDetail,
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
        return <ReadUnreadMessage message={message} threadDetail={threadDetail} FROM={local.FROM} messageIndex={index} />
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
