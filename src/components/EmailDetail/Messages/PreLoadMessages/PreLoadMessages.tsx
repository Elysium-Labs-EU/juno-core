import React, { memo } from 'react'
import { EmailListThreadItem } from '../../../../Store/emailListTypes'
import PreLoadMessage from './PreLoadMessage'

const PreLoadMessages = memo(
    ({
        threadDetailList,
    }: {
        threadDetailList: EmailListThreadItem[]
    }) => {
        if (threadDetailList) {
            return (
                <>
                    {threadDetailList.length > 0 &&
                        threadDetailList.map((item) =>
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
