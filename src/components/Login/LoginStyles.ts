import styled from 'styled-components'

import { breakPoint } from 'constants/themeConstants'

export const Wrapper = styled.div`
  align-content: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`

export const LoginWrapper = styled.div`
  padding: var(--spacing-2);
`

export const LoginHeader = styled.h1`
  color: var(--color-black) !important;
  font-family: var(--font-family) !important;
  font-size: var(--text-h1);
  font-weight: 400;
  line-height: 1;
  margin: var(--spacing-4) 0 0;
  user-select: none;
`

export const StyledLink = styled.a`
  color: var(--color-black) !important;
  font-weight: 500;
  margin-bottom: var(--spacing-2);
  text-decoration: none;
`

export const AdditionalOptions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: var(--spacing-1);
`

export const LoginContainer = styled.div`
  background-color: var(--color-white);
  border-radius: var(--radius-l);
  box-shadow: var(--box-shadow-low);
  padding: var(--spacing-1);
  @media only screen and (min-width: ${breakPoint.md}) {
    min-width: 375px;
    padding: var(--spacing-2);
  }
`

export const Inner = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-4) var(--spacing-2);
`

export const Header = styled.div`
  margin-bottom: var(--spacing-4);
  text-align: center;
`

export const ErrorBox = styled.div`
  background-color: var(--color-blue-100);
  border-radius: var(--radius-m);
  padding: var(--spacing-2);
  text-align: center;
`
