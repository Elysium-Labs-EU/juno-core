import styled from 'styled-components'
import * as theme from '../../constants/themeConstants'

export const Wrapper = styled.div`
  padding: 0 1rem;
  position: relative;
`

export const InnerMenu = styled.div`
  display: flex;
  flex-flow: row;
`

export const NavContainer = styled.div`
  padding: 0 1rem;
  position: relative;
`

export const HeaderCenter = styled.div`
  display: flex;
  width: 100%;
  place-content: center;
`

export const BackButtonWithNavgationContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
`

export const FocusSortHeaderWrapper = styled.div`
  display: flex;
  place-content: center;
  width: 100%;
`

export const PageTitle = styled.h2`
  margin: 2rem 0 0;
  font-weight: 200;
  user-select: none;
  text-transform: capitalize;
  font-size: 2.441rem;
  font-family: 'Raleway Variable', serif;
  line-height: 1.3;
  color: ${theme.colorBlack} !important;
`
