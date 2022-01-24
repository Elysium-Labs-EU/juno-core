import * as S from './EmailMoreOptionsStyles'
import DeleteOption from '../Options/DeleteOption'

interface IEmailMoreOptions {
  messageId: string
}

const EmailMoreOptions = ({ messageId }: IEmailMoreOptions) => (
  <S.Wrapper>
    <DeleteOption messageId={messageId} />
  </S.Wrapper>
)

export default EmailMoreOptions
