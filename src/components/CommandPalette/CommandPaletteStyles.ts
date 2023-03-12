import styled from 'styled-components'

export const Icon = styled.div`
  display: flex;
  padding-right: var(--spacing-1);
  place-items: center;
`

export const InputRow = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: var(--spacing-2) var(--spacing-4);
`

export const SearchOuput = styled.div`
  -webkit-box-flex: 1;
  border-top: 1px solid var(--color-neutral-200);
  flex-grow: 1;
  overflow-y: auto;
  padding-top: var(--spacing-1);
  position: relative;
`

export const FooterRow = styled.div`
  display: flex;
  flex-direction: row;
  height: 3rem;
  justify-content: center;
  padding-bottom: 0.5rem;
  user-select: none;
`
