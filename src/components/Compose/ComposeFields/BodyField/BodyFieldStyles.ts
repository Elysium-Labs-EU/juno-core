import styled from 'styled-components'

interface IWrapper {
  isFocused: boolean
}

export const Wrapper = styled.div<IWrapper>`
  background: var(--color-white);
  border-radius: var(--radius-m);
  border: ${({ isFocused }) =>
    isFocused ? `2px var(--color-blue-100) solid` : '2px solid transparent'};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: calc(100vh - 500px);
  min-height: 200px;
  overflow-wrap: break-word;
  overflow-y: auto;
  position: relative;
  width: 100%;
  word-break: break-all;
  word-wrap: break-word;
  div {
    .ProseMirror {
      height: 100%;
      min-height: 200px;
      outline: 0;
      padding: 0 var(--spacing-1-5);
    }
  }
`

interface IMenuBar {
  isFocused: boolean
}

export const MenuBar = styled.div<IMenuBar>`
  background: var(--color-white);
  border-radius: var(--radius-m);
  border: 1px solid var(--color-neutral-200);
  box-shadow: ${({ isFocused }) =>
    isFocused ? `rgba(0, 0, 0, 0.1) 0px 0px 10px` : 'none'};
  margin: 0 auto;
  opacity: ${({ isFocused }) => (isFocused ? 1 : 0.4)};
  transition: opacity 0.3s ease 0s, box-shadow 0.3s ease 0s;
  z-index: 10;
`

export const Button = styled.button`
  background-color: var(--color-white);
  border-radius: var(--radius-m);
  border: 0;
  height: 32px;
  line-height: 16px;
  padding: var(--spacing-1);
  &:hover {
    background-color: var(--color-neutral-100);
  }
`
