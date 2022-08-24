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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: ${({ active }) =>
    active ? `var(--color-grey-ultra-light)` : 'transparent'};
  color: var(--color-black);
  border: 0;
  border-radius: var(--radius-m);
  width: 100%;
  line-height: 8px;
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  &:hover {
    background-color: var(--color-grey-ultra-light);
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
