import styled from 'styled-components'
import EmptyStateImage from '../../../Juno-empty-state-1@150x.png'
import * as GS from '../../../styles/globalStyles'

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  img {
    max-width: 330px;
  }
`

const HEADER = 'Inbox zero'
const PARAGRAPH = 'You have reached it!'

const InboxEmptyState = () => (
    <Wrapper>
        <img src={EmptyStateImage} alt="No more inbox" />
        <p>
            <strong>{HEADER}</strong>
        </p>
        <GS.TextMutedParagraph style={{ marginTop: 0 }}>
            {PARAGRAPH}
        </GS.TextMutedParagraph>
    </Wrapper>
)

export default InboxEmptyState
