import React from 'react'
import DraftMessage from '../DisplayVariants/DraftMessage'
import ReadUnreadMessage from '../DisplayVariants/ReadUnreadMessage'
import { EmailListThreadItem, EmailMessage } from '../../../../Store/emailListTypes'
import * as draft from '../../../../constants/draftConstants'
import * as local from '../../../../constants/emailDetailConstants'

const detailDisplaySelector = ({
    message,
    threadDetail,
}: {
    message: EmailMessage
    threadDetail: EmailListThreadItem
}) => {
    if (message.labelIds.includes(draft.LABEL)) {
        return <DraftMessage message={message} />
    }
    if (!message.labelIds.includes(draft.LABEL)) {
        return <ReadUnreadMessage message={message} threadDetail={threadDetail} FROM={local.FROM} />
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
            .map((message) => (
                <div key={message.id}>
                    {detailDisplaySelector({
                        message,
                        threadDetail,
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
