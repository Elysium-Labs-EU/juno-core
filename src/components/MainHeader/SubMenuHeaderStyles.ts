import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Wrapper = styled.nav`
  z-index: 10;
  position: absolute;
  padding: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  background-color: hsl(0, 0%, 100%);
  border-radius: 5px;
  z-index: 20;
`

export const InnerMenu = styled.div`
  display: flex;
  flex-flow: column;
  a {
    margin: 0.3rem 0;
  }
`

export const MenuItem = styled(Link)``
