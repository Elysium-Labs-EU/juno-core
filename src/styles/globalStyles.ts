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

export const MenuPopper = styled.div`
  z-index: 10;
  position: relative;
  padding: 0.5rem;
  box-shadow: 0 2px 6.7px rgba(0, 0, 0, 0.028),
    0 6.7px 22.3px rgba(0, 0, 0, 0.042), 0 30px 100px rgba(0, 0, 0, 0.07);
  /* box-shadow: 0 0 10px 0 hsla(0, 0%, 0%, 0.01); */
  background-color: hsl(0, 0%, 100%);
  border-radius: 5px;
`
