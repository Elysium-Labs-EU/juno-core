import styled from 'styled-components'

import { breakPoint } from 'constants/themeConstants'

export const Wrapper = styled.div`
  align-content: center;
  display: flex;
  flex-flow: column;
  flex-wrap: wrap;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`

export const LoginHeader = styled.h1`
  color: var(--color-black) !important;
  font-family: var(--font-family) !important;
  font-size: 4rem;
  line-height: 1;
  font-weight: 400;
  margin: 40px 0 0;
  user-select: none;
`

export const SubHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledLink = styled.a`
  color: var(--color-black) !important;
  margin-bottom: 20px;
  font-weight: 500;
  text-decoration: none;
`

export const AdditionalOptions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`

export const LoginContainer = styled.div`
  background-color: var(--color-white);
  border-radius: var(--radius-m);
  box-shadow: var(--box-shadow-low);
  padding: 10px;
  @media only screen and (min-width: ${breakPoint.md}) {
    min-width: 375px;
    padding: 20px;
  }
`

export const Inner = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column;
  padding: 40px 20px;
`

export const Header = styled.div`
  margin-bottom: 40px;
  text-align: center;
`

export const ErrorBox = styled.div`
  background-color: var(--color-blue-100);
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
`
