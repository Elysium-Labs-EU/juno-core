import styled, { css } from 'styled-components'

import { breakPoint } from 'constants/themeConstants'

interface Wrapper {
  tabbedView: string
}

export const Wrapper = styled.div<Wrapper>`
  margin-left: ${({ tabbedView }) =>
    tabbedView === 'true' ? 'var(--spacing-4)' : 'auto'};
  margin-right: auto;
  max-width: ${({ tabbedView }) =>
    tabbedView === 'true' ? '690px' : 'min(100vw - 340px, 860px)'};
  min-width: ${({ tabbedView }) => (tabbedView === 'true' ? '500px' : '665px')};
  position: static;
  width: 100%;

  ${({ tabbedView }) =>
    tabbedView === 'true' &&
    css`
      @media only screen and (min-width: ${breakPoint.xl}) {
        margin-left: var(--spacing-8);
        position: sticky;
        top: 0px;
      }
    `}
`

export const UpdateContainer = styled.div`
  min-height: 32px;
`

interface ComposerContainer {
  tabbedView: string
}

export const ComposerContainer = styled.div<ComposerContainer>`
  padding-bottom: ${({ tabbedView }) =>
    tabbedView === 'true' ? '0' : 'var(--spacing-10)'};
  padding-top: ${({ tabbedView }) => (tabbedView === 'true' ? '0' : 'var(--spacing-4)')};
`

export const TopRowControls = styled.div`
  align-items: center;
  border-bottom: 1px solid var(--color-neutral-200);
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-2);
`

interface Label {
  hasValue?: string
}

export const Label = styled.div<Label>`
  font-size: var(--text-small);
  margin-bottom: var(--spacing-1);

  @media only screen and (min-width: ${breakPoint.xl}) {
    position: absolute;
    left: -120px;
    width: 100px;
    text-align: right;
    top: calc(35px / 2);
    margin-bottom: unset;
  }

  label {
    color: ${({ hasValue }) => (hasValue === 'true' ? 'rgb(83, 83, 88)' : 'default')};
    cursor: default;
    opacity: ${({ hasValue }) => (hasValue === 'true' ? '0.3' : '1')};
    transition: opacity 0.3s ease 0s, color 0.3s ease 0s;
    user-select: none;
    &:hover {
      color: default;
      opacity: 1;
    }
  }
`

export const Row = styled.div`
  display: flex;
  gap: var(--spacing-2);
  flex-direction: column;
  min-height: 35px;
  position: relative;
  width: 100%;
  @media only screen and (min-width: ${breakPoint.xl}) {
    flex-direction: row;
  }
`

export const CcBccContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  button:not(first-child) {
    margin-left: var(--spacing-1);
  }
  margin-bottom: var(--spacing-1);
`
