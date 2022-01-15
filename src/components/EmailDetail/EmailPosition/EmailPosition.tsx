import React, { useEffect, useRef } from 'react'
import { selectViewIndex } from '../../../Store/emailDetailSlice'
import { IEmailListObject } from '../../../Store/emailListTypes'
import { useAppSelector } from '../../../Store/hooks'
import * as S from './EmailPositionStyles'
import * as GS from '../../../styles/globalStyles'

const EmailPosition = ({ activeEmailList }: { activeEmailList: IEmailListObject }) => {
    const threadsObjectStart = useRef<IEmailListObject | undefined>()
    const viewIndex = useAppSelector(selectViewIndex)

    useEffect(() => {
        if((threadsObjectStart.current === undefined) || (threadsObjectStart.current && threadsObjectStart.current.threads.length < activeEmailList.threads.length)){
            threadsObjectStart.current = activeEmailList
        }
    }, [activeEmailList])

    return (
        <S.Wrapper>
            {threadsObjectStart.current &&
                <GS.TextMutedParagraph>{viewIndex + 1} / {threadsObjectStart.current.threads.length}</GS.TextMutedParagraph>}
        </S.Wrapper>
    )
}

export default EmailPosition
