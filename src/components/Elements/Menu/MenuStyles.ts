import styled from 'styled-components'

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
  font-size: var(--text-small);
  display: flex;
  justify-content: space-between;
  letter-spacing: 0.01em;
  line-height: 16px;
  overflow: hidden;
  padding: var(--spacing-1-5);
  transition: background-color 0.15s ease-in-out;
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
  margin-right: var(--spacing-2);
  text-transform: capitalize;
`

export const MenuItemContentSide = styled.div`
  color: var(--color-neutral-500);
  span:not(:last-child) {
    margin-right: var(--spacing-1);
  }
`

export const OuterContainer = styled.div`
  position: relative;
`
