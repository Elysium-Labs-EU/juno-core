import DraftMessage from '../DisplayVariants/DraftMessage'
import {
  IEmailListThreadItem,
  IEmailMessage,
} from '../../../../Store/storeTypes/emailListTypes'
import * as global from '../../../../constants/globalConstants'
import PreLoadNormalMessage from './PreLoadNormalMessage'

const DetailDisplaySelector = ({ message }: { message: IEmailMessage }) => {
  if (
    Object.prototype.hasOwnProperty.call(message, 'labelIds') &&
    message.labelIds.includes(global.DRAFT_LABEL)
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
          <div key={message.id}>
            <DetailDisplaySelector message={message} />
          </div>
        ))}
  </div>
)

export default PreLoadMessage
