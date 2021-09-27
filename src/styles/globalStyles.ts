import styled from 'styled-components'

export const App = styled.div`
  display: flex;
  flex-flow: column;
`

interface Props {
  isReplying?: boolean
}

export const OuterContainer = styled.div<Props>`
  max-width: 1480px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  flex: 1 1 0%;
  display: flex;
  display: ${(props) => (props.isReplying ? 'flex' : 'initial')};
`
