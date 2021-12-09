import styled from 'styled-components'
import * as theme from '../../constants/themeConstants'

export const Wrapper = styled.div`
  opacity: 0;
  position: absolute;
  top: 18px;
  right: 30px;
  bottom: 0;
  z-index: 10;
  transition: opacity 0.2s ease-in-out;

  :hover {
    opacity: 1;
    background-color: ${theme.greyHover};
  }
`

export const Inner = styled.div`
  display: flex;
  flex-flow: row;
`
