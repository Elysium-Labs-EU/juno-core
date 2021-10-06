import React, { memo, useRef } from 'react'
import { EmailListThreadItem } from '../../../../Store/emailListTypes'
import PreLoadMessage from './PreLoadMessage'

const PreLoadMessages = memo(
    ({
        threadDetailList,
        viewIndexState,
    }: {
        threadDetailList: EmailListThreadItem[]
        viewIndexState: number
    }) => {
        const preLoadedMessagesRef = useRef<any>(null)
        // Only preload the messages 3 before and 3 after the current message.
        // If a message has been preloaded before, and the user is still on the detail view, do not remove this message from the feed. So extend the range of the view.
        // Only preload a new batch, apart from the initial batch, once the cursor reaches a point of within 1 distance of the edge.

        // I need to keep track if the preload function has already ran, so I dont reset the view on each run.
        // I need to know how many mails there are in total, and where the active index is, to see how far I can reach back and forth

        const preLoadMargins = () => {
            const leftCursor = viewIndexState - 3 < 0 ? 0 : viewIndexState - 3
            const rightCursor = viewIndexState + 4
            if (viewIndexState > -1 && threadDetailList.length > 0) {
                preLoadedMessagesRef.current = threadDetailList.slice(leftCursor, rightCursor).map((item) => item.id)
                return threadDetailList.slice(leftCursor, rightCursor)
            }
            // if (viewIndexState > -1 && threadDetailList.length > 0 && preLoadedMessagesRef.current !== null && preLoadedMessagesRef.current.length > 0) {
            //     console.log('here3', preLoadedMessagesRef.current.indexOf(threadDetailList[viewIndexState].id) < preLoadedMessagesRef.current.length - 2)
            //     console.log('here4', preLoadedMessagesRef.current.indexOf(threadDetailList[viewIndexState].id) < 3)
            //     console.log('here5', preLoadedMessagesRef.current.indexOf(threadDetailList[viewIndexState].id))
            //     if (preLoadedMessagesRef.current.indexOf(threadDetailList[viewIndexState].id) < preLoadedMessagesRef.current.length - 2 || preLoadedMessagesRef.current.indexOf(threadDetailList[viewIndexState].id) < 3)
            //         console.log('here2')
            //     preLoadedMessagesRef.current = preLoadedMessagesRef.current.concat(threadDetailList.slice(leftCursor, rightCursor).map((item) => item.id))
            // }
            return []
        }

        console.log(preLoadMargins())

        if (preLoadMargins().length > 0) {
            return (
                <>
                    {preLoadMargins().map((item) =>
                        <PreLoadMessage
                            key={item.id}
                            threadDetail={item}
                        />
                    )
                    }
                </>
            )
        }
        return <div>Cannot load hidden details</div>
    }
)

export default PreLoadMessages
