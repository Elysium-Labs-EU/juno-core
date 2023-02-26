import styled from 'styled-components'

import { breakPoint } from 'constants/themeConstants'

export const Wrapper = styled.div`
  background-color: var(--color-white);
  background: var(--color-neutral-100);
  display: flex;
  flex-direction: column;
  height: 100%;
  place-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: var(--z-index-block-layer);
  @media only screen and (min-width: ${breakPoint.md}) {
    display: none;
  }
`

export const Inner = styled.div`
  padding: var(--spacing-4);
  max-width: 600px;
`
