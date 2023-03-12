import styled from 'styled-components'

interface IMenuItem {
  active: boolean
}

export const MenuItem = styled.button<IMenuItem>`
  align-items: center;
  background-color: ${({ active }) =>
    active ? 'var(--color-neutral-100)' : 'transparent'};
  border-radius: var(--radius-m);
  border: 1px solid
    ${({ active }) => (active ? 'var(--color-neutral-100)' : 'transparent')};
  color: var(--color-black);
  display: flex;
  font-size: var(--text-small);
  justify-content: space-between;
  letter-spacing: 0.01em;
  line-height: 8px;
  overflow: hidden;
  padding: var(--spacing-1-5);
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  &:hover {
    background-color: var(--color-neutral-100);
    border: 1px solid var(--color-neutral-100);
  }
`
export const MenuItemContentMain = styled.div`
  flex: 1 1 0%;
  margin-left: var(--spacing-2);
`

export const MenuItemContentSide = styled.div`
  span:not(:last-child) {
    margin-left: var(--spacing-1);
  }
`
