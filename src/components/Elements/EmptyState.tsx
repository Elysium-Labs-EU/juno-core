import styled from 'styled-components'
import * as global from '../../constants/globalConstants'

const Wrapper = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
`

const EmptyState = ({ children }: { children?: JSX.Element | undefined }) => (
  <Wrapper>{children || <p>{global.NOTHING_TO_SEE}</p>}</Wrapper>
)

EmptyState.defaultProps = {
  children: undefined,
}

export default EmptyState
