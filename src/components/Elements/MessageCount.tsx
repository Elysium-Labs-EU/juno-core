import styled from 'styled-components'
import { IEmailMessage } from '../../Store/storeTypes/emailListTypes'

const StyledMessageCount = styled.span`
  margin-left: 4px;
  color: var(--color-grey-light);
  font-weight: 400;
`

const THREADS = 'threads'

const LengthMessageCount = ({ length }: { length: number }) => (
  <StyledMessageCount>
    {length} {THREADS} &nbsp;&nbsp;—&nbsp;&nbsp;
  </StyledMessageCount>
)

const MessageCount = ({
  countOfMessage,
}: {
  countOfMessage: IEmailMessage[]
}) =>
  countOfMessage.length > 1 ? (
    <LengthMessageCount length={countOfMessage.length} />
  ) : null

export default MessageCount
