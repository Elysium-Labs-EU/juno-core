import styled from 'styled-components'

export const Wrapper = styled.nav`
  .MuiMenuItem-root {
    height: 32px !important;
  }
`

export const StartButtonWrapper = styled.div`
  bottom: 40px;
  position: fixed;
  right: 40px;
  z-index: var(--z-index-popover);
`

export const Container = styled.div`
  animation: fadeInUp 0.2s both;
  background: var(--color-black);
  border-radius: var(--radius-l);
  box-shadow: var(--box-shadow-low);
  max-height: calc(100vh - 32px);
  max-width: 800px;
  min-width: 260px;
  overflow: auto;
  transition: all 0.2s ease-in;

  /* Animation */
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translate3d(0, 5px, 0);
    }

    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
`

export const MenuSectionContainer = styled.div`
  margin: 0;
  padding: 0;
`

export const MenuSection = styled.div`
  border-bottom: 1px solid var(--color-neutral-800);
  display: flex;
  flex-direction: column;
  padding: 4px 0px;
  div:last-child {
    border-bottom: 0px;
  }
`

interface IMenuItem {
  isFocused: boolean
}

export const MenuItem = styled.button<IMenuItem>`
  align-items: center;
  background-color: ${({ isFocused }) =>
    isFocused ? `var(--color-neutral-800)` : 'transparent'};
  border-radius: var(--radius-m);
  border: 0;
  color: var(--color-white);
  font-size: var(--small);
  display: flex;
  justify-content: space-between;
  letter-spacing: 0.01em;
  line-height: 16px;
  margin: 0px 4px;
  overflow: hidden;
  padding: 12px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: auto;
  &:hover {
    background-color: var(--color-neutral-800);
  }
`

export const MenuItemContentMain = styled.span`
  flex: 1 1 0%;
  margin-right: 16px;
`

export const MenuItemContentSide = styled.div`
  color: var(--color-neutral-500);
  span:not(:last-child) {
    margin-right: 8px;
  }
`

export const OuterContainer = styled.div`
  position: relative;
`
