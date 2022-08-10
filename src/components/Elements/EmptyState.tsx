import styled from 'styled-components'
import * as global from '../../constants/globalConstants'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const EmptyState = ({ children }: { children?: JSX.Element | undefined }) => (
  <Wrapper>
    {children || <p style={{ marginTop: '60px' }}>{global.NOTHING_TO_SEE}</p>}
  </Wrapper>
)

EmptyState.defaultProps = {
  children: undefined,
}

export default EmptyState
