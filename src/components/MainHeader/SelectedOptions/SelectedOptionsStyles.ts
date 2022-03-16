/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1100;
  /* background: rgba(240, 240, 240, 0.7); */
  background: rgb(240, 240, 240);
  background: linear-gradient(
    180deg,
    rgba(240, 240, 240, 1) 34%,
    rgba(240, 240, 240, 0.7) 81%
  );
  box-shadow: none;
  backdrop-filter: blur(20px);
  padding: 5px 40px;
  box-sizing: border-box;
`
