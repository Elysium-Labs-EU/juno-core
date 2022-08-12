import styled from 'styled-components'

// export const Menu = styled.span`

// `

// export const MenuInner = styled.div`

// `

export const Dialog = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1100;
  transform: translate(-50%, -50%);
  width: 825px;
  border-radius: 5px;
  background-color: var(--color-white);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  outline: 0;
`

export const HeaderRow = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`

export const Inner = styled.div`
  padding: 0 20px;
  display: flex;
  flex-flow: column;
`

export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 40px;
  right: 40px;
  z-index: 1100;
`

export const Layer = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 1100;
  /* width: 100%;
  height: 100%; */
`

export const InnerLayer = styled.div`
  bottom: calc(100px - 100vh);
  right: calc(40px - 100vw);
  position: absolute;
  z-index: 1100;
`

export const Container = styled.div`
  transition: all 0.2s ease-in;
  transform: translateZ(0) rotate(0deg) scaleY(1);
  animation: fadeInUp 0.2s both;
  min-width: 260px;
  max-width: 800px;
  max-height: calc(100vh - 32px);
  overflow: auto;
  border-radius: var(--radius-l);
  background: var(--color-black);
  box-shadow: var(--elevation-low-material-border-contr-inside);

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
  /* flex: 2; */
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

// export const Container = styled.div`
//   width: 256px;
//   app-region: none;
//   min-width: 200px;
//   max-width: 800px;
//   max-height: calc(100vh - 32px);
//   overflow: auto;
//   border-radius: var(--radius-l);
//   background: var(--material-contrast);
//   box-shadow: var(--elevation-low-material-border-contr-inside);
//   color: var(--white);
// `
