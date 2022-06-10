import styled from 'styled-components'
import { Badge } from '@mui/material'

export const TabContainer = styled.nav`
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
    props.isActive ? `var(--color-black)` : `var(--color-grey)`};
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  font-family: var(--font-family);
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    color: var(--color-black);
    text-decoration: none;
  }

  &:active {
    color: var(--color-black);
    text-decoration: none;
  }

  &:disabled {
    color: var(--color-grey-ultra-light);
    cursor: not-allowed;
  }
`

export const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    background-color: var(--color-black);
    top: 10px;
    right: -16px;
  }
`
