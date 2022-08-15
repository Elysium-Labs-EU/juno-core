import { forwardRef } from 'react'
import * as S from './EmailMoreOptionsStyles'
import DeleteOption from '../Options/DeleteOption'

interface IEmailMoreOptions {
  messageId: string
}

const EmailMoreOptions = forwardRef(({ messageId }: IEmailMoreOptions, ref) => (
  <S.Wrapper ref={ref}>
    <DeleteOption messageId={messageId} />
  </S.Wrapper>
))

export default EmailMoreOptions
