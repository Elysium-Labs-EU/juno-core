import styled from 'styled-components'

interface IWrapper {
  isFocused: boolean
}

export const Wrapper = styled.div<IWrapper>`
  background: var(--color-white);
  width: 100%;
  border: ${({ isFocused }) =>
    isFocused ? `2px var(--color-blue-100) solid` : '2px solid transparent'};
  display: flex;
  flex-flow: column;
  position: relative;
  min-height: 200px;
  height: 100%;
  max-height: calc(100vh - 500px);
  overflow-y: auto;
  border-radius: var(--radius-m);
  div {
    .ProseMirror {
      min-height: 200px;
      height: 100%;
      outline: 0;
      padding: 0 12px;
    }
  }
`

interface IMenuBar {
  isFocused: boolean
}

export const MenuBar = styled.div<IMenuBar>`
  margin: 0 auto;
  border: 1px solid var(--color-neutral-200);
  background: var(--color-white);
  border-radius: 4px;
  z-index: 10;
  box-shadow: ${({ isFocused }) =>
    isFocused ? `rgba(0, 0, 0, 0.1) 0px 0px 10px` : 'none'};
  opacity: ${({ isFocused }) => (isFocused ? 1 : 0.4)};
  transition: opacity 0.3s ease 0s, box-shadow 0.3s ease 0s;
`

export const Button = styled.button`
  background-color: var(--color-white);
  border: 0;
  height: 32px;
  padding: 8px;
  line-height: 16px;
  border-radius: 4px;
  &:hover {
    background-color: var(--color-neutral-100);
  }
`
