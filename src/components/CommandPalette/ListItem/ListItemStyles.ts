import styled from 'styled-components'

interface IListItem {
  isFocused: boolean
}

export const ListItemButton = styled.button<IListItem>`
  align-items: center;
  background-color: ${({ isFocused }) =>
    isFocused ? 'var(--color-neutral-100)' : 'transparent'};
  border: 0;
  border-radius: var(--radius-m);
  display: flex;
  justify-content: space-between;
  padding: 15px 30px;
  transition: background-color ease-in 0.125s;
  width: 100%;

  &:hover {
    background-color: var(--color-neutral-100);
    border-radius: var(--radius-m);
    z-index: 2;
  }
`

export const IconContainer = styled.div`
  display: flex;
  margin-right: 10px;
`
export const IconTitleContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

export const ChildrenAsText = styled.span`
  margin: auto;
`

export const Label = styled.span`
  color: var(--color-neutral-500);
  font-size: var(--small);
`
