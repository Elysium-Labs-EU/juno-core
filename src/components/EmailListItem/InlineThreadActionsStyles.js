/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'

export const Wrapper = styled.div`
  opacity: 0;
  position: absolute;
  top: 18px;
  right: 30px;
  bottom: 0;
  z-index: 10;

  :hover {
    opacity: 1;
    background-color: rgb(240, 240, 240);
  }
`
