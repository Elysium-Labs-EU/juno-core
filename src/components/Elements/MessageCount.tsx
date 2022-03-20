import { memo } from 'react'
import styled from 'styled-components'
import { IEmailMessage } from '../../Store/emailListTypes'

const StyledMessageCount = styled.span`
  margin-left: 4px;
  color: var(--color-grey-light);
`

const MessageCount = ({
  countOfMessage,
}: {
  countOfMessage: IEmailMessage[]
}) => {
  const LengthMessageCount = memo(() => {
    const length = countOfMessage && countOfMessage.length
    if (length > 1) {
      return <StyledMessageCount>({length})</StyledMessageCount>
    }
    return null
  })

  return <LengthMessageCount />
}

export default MessageCount
