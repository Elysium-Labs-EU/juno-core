import styled from 'styled-components'

export const StartButtonWrapper = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: var(--z-index-popover);
`

export const Layer = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: var(--z-index-modal);
`

export const InnerLayer = styled.div`
  bottom: calc(100px - 100vh);
  right: calc(40px - 100vw);
  position: absolute;
  z-index: var(--z-index-modal);
`

export const Container = styled.div`
  transition: all 0.2s ease-in;
  animation: fadeInUp 0.2s both;
  min-width: 260px;
  max-width: 800px;
  max-height: calc(100vh - 32px);
  overflow: auto;
  border-radius: var(--radius-l);
  background: var(--color-black);
  box-shadow: var(--box-shadow-low);

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

export const MenuSection = styled.div`
  padding: 4px 0px;
  border-bottom: 1px solid var(--color-black-off);
  display: flex;
  flex-direction: column;
  div:last-child {
    border-bottom: 0px;
  }
`

export const MenuItem = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin: 0px 4px;
  background-color: transparent;
  color: var(--color-white);
  border: 0;
  border-radius: var(--radius-m);
  width: auto;
  line-height: 16px;
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  &:hover {
    background-color: var(--color-black-off);
  }
`

export const MenuItemContentMain = styled.div`
  flex: 1 1 0%;
  margin-right: 16px;
`

export const MenuItemContentSide = styled.div`
  color: var(--color-grey);
  span:not(:last-child) {
    margin-right: 8px;
  }
`

export const OuterContainer = styled.div`
  position: relative;
`
