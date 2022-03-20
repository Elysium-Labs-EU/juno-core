import styled from 'styled-components'

export const Wrapper = styled.nav`
  padding: 0.5rem;
  background-color: var(--color-white);
  border-radius: 5px;
  .MuiMenuItem-root {
    height: 32px !important;
  }
`
export const TopMenu = styled.ul`
  margin: 0;
  padding: 0;
`

export const TopMenuSectionWrapper = styled.div`
  padding-bottom: 8px;
`

export const BottomMenuSectionWrapper = styled.div`
  padding-top: 8px;
`

export const MenuItemButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--color-grey);
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
    color: var(--color-black);
    text-decoration: none;
    font-weight: 400;
  }

  &:disabled {
    color: var(--color-grey-ultra-light);
    cursor: not-allowed;
  }
`
