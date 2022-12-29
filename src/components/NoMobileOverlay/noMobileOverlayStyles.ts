import styled from 'styled-components'

import { breakPoint } from 'constants/themeConstants'

export const Wrapper = styled.div`
  z-index: var(--z-index-block-layer);
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
  place-content: center;
  background: var(--color-neutral-100);
  @media only screen and (min-width: ${breakPoint.md}) {
    display: none;
  }
`

export const Inner = styled.div`
  padding: 2rem;
  max-width: 600px;
`
