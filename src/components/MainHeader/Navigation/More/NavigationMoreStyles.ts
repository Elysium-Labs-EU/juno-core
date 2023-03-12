import styled from 'styled-components'

export const TopMenu = styled.ul`
  margin: 0;
  padding: 0;
`

export const MenuItemButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--color-neutral-500);
  font-size: var(--text-base);
  text-align: left;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.13;
  margin: 0.3rem 0;
  font-family: var(--font-family);
  padding: 0;
  cursor: pointer;

  &:hover,
  &:active {
    color: var(--color-black);
    text-decoration: none;
    font-weight: 400;
  }

  &:disabled {
    color: var(--color-neutral-200);
    cursor: not-allowed;
  }
`
