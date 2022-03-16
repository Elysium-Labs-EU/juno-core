import styled from 'styled-components'
import * as themeConstants from '../../../../constants/themeConstants'

export const Wrapper = styled.nav`
  position: absolute;
  padding: 0.5rem 0.75rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  background-color: ${themeConstants.colorWhite};
  border-radius: 5px;
  z-index: 1200;
`
export const TopMenu = styled.ul`
  border-bottom: 1px solid ${themeConstants.colorGreyBorder};
  margin: 0;
  padding: 0 0 0.3rem 0;
`

export const InnerMenu = styled.li`
  display: flex;
  flex-flow: column;
  a {
    margin: 0.3rem 0;
  }
`

export const MenuItemButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${themeConstants.colorGrey};
  font-size: 1rem;
  text-align: left;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.13;
  margin: 0.3rem 0;
  font-family: 'Urbanist Variable', sans-serif;
  padding: 0;
  cursor: pointer;

  &:hover,
  &:active {
    color: ${themeConstants.colorBlack};
    text-decoration: none;
    font-weight: 500;
  }

  &:disabled {
    color: ${themeConstants.colorUltraLightGrey};
    cursor: not-allowed;
  }
`
