import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
`

const ToDoEmptyState = () => (
  <Wrapper>
    <p>You currently have no to-dos</p>
  </Wrapper>
)

export default ToDoEmptyState
