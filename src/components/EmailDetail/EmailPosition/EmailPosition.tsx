import React, { useEffect, useRef } from 'react'
import { IEmailListObject } from '../../../Store/emailListTypes'
import * as S from './EmailPositionStyles'

const EmailPosition = ({ activeEmailList }: { activeEmailList: IEmailListObject }) => {
    const threadsObjectStart = useRef<IEmailListObject | undefined>()

    useEffect(() => {
        threadsObjectStart.current = activeEmailList
    }, [])

    return (
        <S.Wrapper>
            {threadsObjectStart.current &&
                <p className="text_muted">{threadsObjectStart.current.threads.length - activeEmailList.threads.length + 1} / {threadsObjectStart.current.threads.length}</p>}
        </S.Wrapper>
    )
}

export default EmailPosition
