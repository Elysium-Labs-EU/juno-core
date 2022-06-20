import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
`

export const Inner = styled.div`
  align-items: center;
  display: flex;
  padding-bottom: 16px;
  cursor: default;
`

export const StyledButton = styled.button`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  margin: 0;
  padding: 0;
  font-size: 13px;
  line-height: 1.5;
  cursor: pointer;
  font-family: var(--font-family);

  &:disabled {
    cursor: not-allowed;
  }
`

export const InnerButton = styled.div`
  display: flex;
  align-items: center;

  .icon {
    margin-right: 4px;
    line-height: 0;
    text-align: center;
    transition: opacity 0.3s ease 0s;
  }
`

export const Dialog = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  transform: translate(-50%, -50%);
  width: 475px;
  min-height: 300px;
  background-color: var(--color-white);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  border-radius: 5px;
  overflow: hidden;
  z-index: 1;
  outline: 0;
`

export const DialogHeader = styled.h2`
  font-weight: 200;
  user-select: none;
  font-family: var(--font-family);
  line-height: 1.3;
  color: var(--color-black);
  margin-top: 32px;
  margin-left: 32px;
  margin-bottom: 32px;
`

export const DialogInner = styled.div`
  margin-left: 32px;
  user-select: none;
`

export const BlockedItemInformation = styled.div`
  display: flex;
  flex-flow: column;
`
