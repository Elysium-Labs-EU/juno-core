import { Fragment, useMemo } from 'react'

import * as global from 'constants/globalConstants'

import ReadUnreadMessage from './DisplayVariants/ReadUnreadMessage'
import type { IMappedMessages } from '../EmailDetailTypes'

const MappedMessages = ({
  setShouldRefreshDetail,
  threadDetail,
}: IMappedMessages) => {

  const reversedMessagesOrder = useMemo(
    () => threadDetail?.messages.slice(0).reverse(),
    [threadDetail]
  )

  return reversedMessagesOrder ? (
    <>
      {reversedMessagesOrder.map((message, index) => (
        <Fragment key={message.id}>
          {message.labelIds.includes(global.DRAFT_LABEL) ? (
            null
          ) : (
            <ReadUnreadMessage
              message={message}
              messageIndex={index}
              setShouldRefreshDetail={setShouldRefreshDetail}
              threadDetail={threadDetail}
            />
          )}
        </Fragment>
      ))}
    </>
  ) : (
    <p>{global.NOTHING_TO_SEE}</p>
  )
}

export default MappedMessages
