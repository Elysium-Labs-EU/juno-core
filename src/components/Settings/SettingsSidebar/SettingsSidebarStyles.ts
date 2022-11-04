import styled from 'styled-components'

export const Wrapper = styled.ul`
  display: flex;
  flex-flow: column;
  list-style-type: none;
  margin: 0 20px 0 0;
  padding: 0;

  li:not(last-child) {
    margin-bottom: 10px;
  }
`

interface IMenuItem {
  active: boolean
}

export const MenuItem = styled.button<IMenuItem>`
  align-items: center;
  background-color: ${({ active }) =>
    active ? `var(--color-neutral-100)` : 'transparent'};
  border-radius: var(--radius-m);
  border: 1px solid
    ${({ active }) => (active ? `var(--color-neutral-200)` : 'transparent')};
  color: var(--color-black);
  display: flex;
  justify-content: space-between;
  letter-spacing: 0.01em;
  line-height: 8px;
  overflow: hidden;
  padding: 12px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  &:hover {
    background-color: var(--color-neutral-200);
    border: 1px solid var(--color-neutral-200);
  }
`
export const MenuItemContentMain = styled.div`
  flex: 1 1 0%;
  margin-left: 16px;
`

export const MenuItemContentSide = styled.div`
  span:not(:last-child) {
    margin-left: 8px;
  }
`
