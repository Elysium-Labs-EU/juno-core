import styled from 'styled-components'

export const StyledButton = styled.button`
  background-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  display: inline-block;
  font-family: var(--font-family);
  font-size: var(--text-small);
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
  padding: 0;
  text-align: center;
  user-select: none;
  vertical-align: middle;

  &:disabled {
    cursor: not-allowed;
  }
`

export const BlockedItemInformation = styled.div`
  display: flex;
  flex-direction: column;
  overflow-wrap: anywhere;
`
