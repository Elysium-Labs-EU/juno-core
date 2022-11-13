import styled from 'styled-components'
import Badge from '@mui/material/Badge/Badge'

export const TabContainer = styled.nav`
  position: relative;
  text-align: center;
  display: flex;
  align-content: flex-start;
  justify-content: space-between;
`

export const ItemsContainer = styled.ul`
  display: flex;
  flex-flow: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
  li:last-child {
    margin-left: 40px;
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
  color: ${({ isActive }) =>
    isActive ? `var(--color-black)` : `var(--color-neutral-400)`};
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
    color: var(--color-neutral-200);
    cursor: not-allowed;
  }
`

export const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    background-color: var(--color-neutral-400);
    top: 10px;
    right: -16px;
    transition: background-color 0.1s ease-in;
    &:hover {
      background-color: var(--color-black);
    }
  }
`
