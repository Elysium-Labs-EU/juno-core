import styled from 'styled-components'

import { BACKGROUND_FADE } from 'styles/globalStyles'

interface IScroll {
  hasLargeHeader: boolean
}

export const Scroll = styled.div<IScroll>`
  display: flex;
  flex-direction: column;
  max-height: calc(
    100vh - ${({ hasLargeHeader }) => (hasLargeHeader ? '140px' : '75px')}
  );
  overflow-y: auto;
  overflow: auto;
  position: relative;
  scrollbar-width: none;
  width: 100%;
  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`

export const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-6);
`

export const ThreadListWrapper = styled.div`
  overflow: auto;
  height: 100vh;
`

export const ThreadList = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  padding-bottom: var(--spacing-2);
`

export const TopFade = styled.div`
  ${BACKGROUND_FADE};
  min-height: var(--spacing-6);
  position: sticky;
  top: 0;
  z-index: var(--z-index-top-element);
`
