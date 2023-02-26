import styled from 'styled-components'

export const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: relative;
  width: 100%;
`

export const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-6);
`

export const ThreadList = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  padding-bottom: var(--spacing-2);
  padding-top: var(--spacing-2);
`
