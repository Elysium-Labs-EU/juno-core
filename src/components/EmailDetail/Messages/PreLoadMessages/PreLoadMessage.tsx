import DraftMessage from '../DisplayVariants/DraftMessage'
import {
  IEmailListThreadItem,
  IEmailMessage,
} from '../../../../Store/emailListTypes'
import * as draft from '../../../../constants/draftConstants'
import PreLoadNormalMessage from './PreLoadNormalMessage'

const detailDisplaySelector = (message: IEmailMessage) => {
  if (
    Object.prototype.hasOwnProperty.call(message, 'labelIds') &&
    message.labelIds.includes(draft.DRAFT_LABEL)
  ) {
    return <DraftMessage message={message} />
  }
  return <PreLoadNormalMessage message={message} />
}

const PreLoadMessage = ({
  threadDetail,
}: {
  threadDetail: IEmailListThreadItem
}) => (
  <div>
    {threadDetail?.messages &&
      threadDetail.messages
        .slice(0)
        .reverse()
        .map((message) => (
          <div key={message.id}>{detailDisplaySelector(message)}</div>
        ))}
  </div>
)

export default PreLoadMessage
