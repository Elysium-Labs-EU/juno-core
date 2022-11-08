import styled from 'styled-components'

export const ListHeader = styled.p`
  color: var(--color-neutral-400);
  font-weight: 500;
  padding: 10px 30px;
  margin: 0;
`

export const ListUnordered = styled.ul`
  margin: 0;
  padding: 0;
`

export const SearchSpan = styled.span`
  max-width: 650px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const SearchContentOverflow = styled.span`
  color: var(--color-neutral-400);
  margin: 0 10px;
`
