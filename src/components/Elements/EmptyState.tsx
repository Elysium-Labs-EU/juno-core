import * as global from 'constants/globalConstants'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const EmptyState = ({
  children = undefined,
}: {
  children?: JSX.Element | undefined
}) => (
  <Wrapper>
    {children || <p style={{ marginTop: '60px' }}>{global.NOTHING_TO_SEE}</p>}
  </Wrapper>
)

export default EmptyState
