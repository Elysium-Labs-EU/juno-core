import styled from 'styled-components'

import { breakPoint } from 'constants/themeConstants'

export const NavContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: var(--container-max-width);
  padding: var(--spacing-2) 0;
  place-items: center;
`

export const InnerMenu = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1;
  justify-content: space-between;
  margin-bottom: var(--spacing-2);
  margin: var(--spacing-4) auto var(--spacing-2);
  max-width: min(100vw - 340px, 860px);
  min-width: 665px;
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
  color: var(--color-black) !important;
  font-family: var(--font-family) !important;
  font-size: var(--text-h3);
  font-weight: 600;
  line-height: 1.3;
  margin: 0;
  user-select: none;
`
