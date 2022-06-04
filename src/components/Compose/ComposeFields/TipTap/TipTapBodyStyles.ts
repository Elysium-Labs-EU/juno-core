import styled from 'styled-components'

interface IWrapper {
  isFocused: boolean
}

export const Wrapper = styled.div<IWrapper>`
  background: var(--color-white-slight);
  width: 100%;
  border: ${({ isFocused }) =>
    isFocused ? `2px var(--color-purple-soft) solid` : '2px solid transparent'};
  display: flex;
  flex-flow: column;
  position: relative;
  min-height: 375px;
  height: 100%;
  border-radius: 4px;
  div {
    .ProseMirror {
      min-height: 375px;
      height: 100%;
      outline: 0;
      padding: 0 12px;
    }
  }
`

export const MenuBar = styled.div`
  display: initial !important;
  flex: 0 !important;
  border: none;
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  background: var(--color-white);
  top: 12px;
  left: 16px;
  border-radius: 4px;
  z-index: 10;
`

export const Button = styled.button`
  background-color: var(--color-white);
  border: 0;
  height: 32px;
  padding: 8px;
  line-height: 16px;
  border-radius: 4px;
  &:hover {
    background-color: var(--color-white-off);
  }
`
