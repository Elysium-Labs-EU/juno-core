import styled from 'styled-components'
import * as themeConstants from '../../../constants/themeConstants'

export const MenuContainer = styled.nav`
  position: relative;
  text-align: center;
  display: flex;
  align-content: flex-start;
  justify-content: space-between;
  margin-left: 110px;
`

export const ItemsContainer = styled.ul`
  display: flex;
  flex-flow: row;
  list-style-type: none;
  margin: 2rem 0 0 0;
  li:last-child {
    margin-left: 3rem;
  }
`

interface StyledListItem {
  isActive: boolean | undefined
}

export const StyedListItem = styled.li<StyledListItem>`
  font-size: 1.125rem;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.13;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) =>
    props.isActive
      ? `${themeConstants.colorBlack}`
      : `${themeConstants.colorGrey}`};
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  font-family: 'Urbanist Variable', sans-serif;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    color: ${themeConstants.colorBlack};
    text-decoration: none;
  }

  &:active {
    color: ${themeConstants.colorBlack};
    text-decoration: none;
  }

  &:disabled {
    color: ${themeConstants.colorUltraLightGrey};
    cursor: not-allowed;
  }
`
