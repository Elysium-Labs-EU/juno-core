import { forwardRef } from 'react'
import * as S from './EmailMoreOptionsStyles'
import DeleteOption from '../Options/DeleteOption'

interface IEmailMoreOptions {
  threadId: string
}

const EmailMoreOptions = forwardRef(({ threadId }: IEmailMoreOptions, ref) => (
  <S.Wrapper ref={ref}>
    <DeleteOption threadId={threadId} />
  </S.Wrapper>
))

export default EmailMoreOptions
