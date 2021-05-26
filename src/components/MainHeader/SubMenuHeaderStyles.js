import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Wrapper = styled.nav`
  z-index: 10;
  position: absolute;
  padding: 0.5rem;
  box-shadow: 0 0 10px 0 hsla(0, 0%, 0%, 0.01);
  background-color: hsl(0, 0%, 100%);
  border-radius: 5px;
  z-index: 20;
  top: 18px;
  right: 30px;
`

export const InnerMenu = styled.div`
  display: flex;
  flex-flow: column;
`

export const MenuItem = styled(Link)``
