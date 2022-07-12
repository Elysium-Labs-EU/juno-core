import { FiEdit2, FiMail } from 'react-icons/fi'
import styled from 'styled-components'
import { IEmailMessage } from '../../store/storeTypes/emailListTypes'
import * as global from '../../constants/globalConstants'
import StyledTooltip from './StyledTooltip'

const MULTI_THREAD = 'Threads'
const SINGLE_THREAD = 'Thread'
const MULTI_DRAFT = 'Drafts'
const SINGLE_DRAFT = 'Draft'

const StyledMessageCount = styled.div`
  color: var(--color-grey-light);
  font-weight: 400;
  display: flex;
  flex-flow: row;
`

const CountWrapper = styled.div`
  display: flex;
`

const IconWrapper = styled.div`
  display: flex;
  margin: 0 4px;
`

const LengthMessageCount = ({ messages }: { messages: IEmailMessage[] }) => {
  const regularCount: number = messages.filter(
    (item) => !item.labelIds.includes(global.DRAFT_LABEL)
  ).length
  const draftCount: number = messages.filter((item) =>
    item.labelIds.includes(global.DRAFT_LABEL)
  ).length

  return (
    <StyledMessageCount>
      <StyledTooltip
        title={`${regularCount} ${
          regularCount > 1 ? MULTI_THREAD : SINGLE_THREAD
        }`}
      >
        <CountWrapper>
          {regularCount}
          <IconWrapper>
            <FiMail />
          </IconWrapper>
        </CountWrapper>
      </StyledTooltip>
      {draftCount > 0 && (
        <StyledTooltip
          title={`${draftCount} ${draftCount > 1 ? MULTI_DRAFT : SINGLE_DRAFT}`}
        >
          <CountWrapper>
            / {draftCount}
            <IconWrapper>
              {' '}
              <FiEdit2 />
            </IconWrapper>
          </CountWrapper>
        </StyledTooltip>
      )}
      &nbsp;&nbsp;—&nbsp;&nbsp;
    </StyledMessageCount>
  )
}

const MessageCount = ({ messages }: { messages: IEmailMessage[] }) =>
  messages.length > 1 ? <LengthMessageCount messages={messages} /> : null
export default MessageCount
