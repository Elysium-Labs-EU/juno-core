import Badge from '@mui/material/Badge/Badge'
import styled from 'styled-components'

export const TabContainer = styled.nav`
  align-content: flex-start;
  display: flex;
  justify-content: space-between;
  margin-left: var(--spacing-2);
  position: relative;
  text-align: center;
`

export const ItemsContainer = styled.ul`
  display: flex;
  flex-direction: row;
  gap: var(--gap-spacing-2);
  list-style-type: none;
  margin: 0;
  padding: 0;
  li:last-child {
    margin-left: var(--spacing-4);
  }
`

interface StyledListItem {
  isActive: boolean | undefined
}

export const StyedListItem = styled.li<StyledListItem>`
  align-items: center;
  color: ${({ isActive }) =>
    isActive ? `var(--color-black)` : `var(--color-neutral-400)`};
  cursor: pointer;
  display: flex;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  line-height: 1.13;
  text-align: left;
  text-decoration: none;
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
    right: -16px;
    top: 10px;
    transition: background-color 0.1s ease-in;
    &:hover {
      background-color: var(--color-black);
    }
  }
`
