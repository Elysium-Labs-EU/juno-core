import * as global from 'constants/globalConstants'
import { TThreadObject } from 'store/storeTypes/emailListTypes'

import EmailDetailBody from '../EmailDetailBody/EmailDetailBody'

// Only preload messages that are is not actively being shown on the window.

const PreLoadNormalMessage = ({
  message,
}: {
  message: TThreadObject['messages'][0]
}) =>
  message &&
  message.payload &&
  message.id &&
  !window.location.pathname.includes(message.id) ? (
    <EmailDetailBody
      threadDetailBody={message.payload}
      detailBodyCSS={global.EMAIL_BODY_INVISIBLE}
    />
  ) : (
    <div>{global.NOTHING_TO_SEE}</div>
  )

const PreLoadMessage = ({ threadDetail }: { threadDetail: TThreadObject }) => (
  <div>
    {threadDetail?.messages &&
      threadDetail.messages.map((message) => {
        if (
          Object.prototype.hasOwnProperty.call(message, 'labelIds') &&
          !message.labelIds.includes(global.DRAFT_LABEL)
        ) {
          return (
            <div key={message.id}>
              <PreLoadNormalMessage message={message} />
            </div>
          )
        }
        return null
      })}
  </div>
)

const PreLoadMessages = ({
  threadDetailList,
  viewIndex,
  contentRendered,
}: {
  threadDetailList: TThreadObject[]
  viewIndex: number
  contentRendered: boolean
}) => {
  // Only preload the messages 3 before and 3 after the current message.
  // If a message has been preloaded before, and the user is still on the detail view, do not remove this message from the feed. So extend the range of the view.
  // Only preload a new batch, apart from the initial batch, once the cursor reaches a point of within 1 distance of the edge.

  // I need to keep track if the preload function has already ran, so I dont reset the view on each run.
  // I need to know how many mails there are in total, and where the active index is, to see how far I can reach back and forth

  const preLoadMargins = () => {
    const leftCursor = viewIndex - 3 < 0 ? 0 : viewIndex - 3
    const rightCursor = viewIndex + 4
    if (viewIndex > -1 && threadDetailList.length > 0) {
      return threadDetailList.slice(leftCursor, rightCursor)
    }
    return []
  }

  const preLoadMarginsStatic = preLoadMargins()

  if (contentRendered && preLoadMarginsStatic.length > 0) {
    return (
      <>
        {preLoadMarginsStatic.map((item) => (
          <PreLoadMessage key={item.id} threadDetail={item} />
        ))}
      </>
    )
  }
  return <div>Cannot load hidden details</div>
}

export default PreLoadMessages
