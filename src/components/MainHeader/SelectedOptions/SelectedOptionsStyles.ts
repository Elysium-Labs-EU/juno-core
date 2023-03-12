import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: var(--color-neutral-100);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  max-width: var(--container-max-width);
  min-height: var(--spacing-6);
  padding: var(--spacing-1) var(--spacing-4);
  position: sticky;
  top: 0;
  width: 100%;
  z-index: var(--z-index-top-element);
`

export const Inner = styled.div``

export const SelectedLabelsText = styled.span`
  color: var(--color-neutral-400);
  font-size: var(--text-small);
  margin-right: var(--spacing-2);
  user-select: none;
`
