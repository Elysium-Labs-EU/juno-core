import React, { useEffect, useRef } from 'react'
import { IEmailListObject } from '../../../Store/emailListTypes'
import * as S from './EmailPositionStyles'
import * as GS from '../../../styles/globalStyles'

const EmailPosition = ({ activeEmailList }: { activeEmailList: IEmailListObject }) => {
    const threadsObjectStart = useRef<IEmailListObject | undefined>()

    useEffect(() => {
        threadsObjectStart.current = activeEmailList
    }, [])

    return (
        <S.Wrapper>
            {threadsObjectStart.current &&
                <GS.TextMutedParagraph>{threadsObjectStart.current.threads.length - activeEmailList.threads.length + 1} / {threadsObjectStart.current.threads.length}</GS.TextMutedParagraph>}
        </S.Wrapper>
    )
}

export default EmailPosition
