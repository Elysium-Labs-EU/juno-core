import React from 'react'
import DraftMessage from '../DisplayVariants/DraftMessage'
import { IEmailListThreadItem, IEmailMessage } from '../../../../Store/emailListTypes'
import * as draft from '../../../../constants/draftConstants'
import PreLoadNormalMessage from './PreLoadNormalMessage'

const detailDisplaySelector = (message: IEmailMessage) => {
    if (Object.prototype.hasOwnProperty.call(message, 'labelIds')) {
        if (message.labelIds.includes(draft.DRAFT_LABEL)) {
            return <DraftMessage message={message} />
        }
        if (!message.labelIds.includes(draft.DRAFT_LABEL)) {
            return <PreLoadNormalMessage message={message} />
        }
        return null
    }
    return <PreLoadNormalMessage message={message} />
}

const PreLoadMessage = ({ threadDetail }: { threadDetail: IEmailListThreadItem }) => {
    const MappedMessages = () =>
        threadDetail &&
        threadDetail.messages &&
        threadDetail.messages
            .slice(0)
            .reverse()
            .map((message) => (
                <div key={message.id}>
                    {detailDisplaySelector(
                        message
                    )}
                </div>
            ))

    return (
        <div>
            {MappedMessages()}
        </div>
    )
}

export default PreLoadMessage
