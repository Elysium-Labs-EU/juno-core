import { IEmailListThreadItem } from '../../../../Store/emailListTypes'
import PreLoadMessage from './PreLoadMessage'

const PreLoadMessages = ({
  threadDetailList,
  viewIndex,
}: {
  threadDetailList: IEmailListThreadItem[]
  viewIndex: number
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

  if (preLoadMarginsStatic.length > 0) {
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
