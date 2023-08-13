import styled from 'styled-components'

import { breakPoint } from 'constants/themeConstants'

export const NavContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: var(--container-max-width);
  padding: var(--spacing-2) 0;
  place-items: center;
`

export const BackButtonContainer = styled.div`
  position: relative;
  right: var(--spacing-2);
  @media only screen and (max-width: ${breakPoint.lg}) {
    margin-left: var(--spacing-1);
    margin-right: auto;
    position: initial;
  }
`

export const PageTitle = styled.h1`
  color: var(--color-neutral-600) !important;
  font-family: var(--font-family) !important;
  font-size: var(--text-h4);
  font-weight: 300;
  line-height: 1.3;
  margin: 0;
  text-transform: lowercase;
  user-select: none;
`
