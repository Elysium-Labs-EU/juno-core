import styled, { css } from 'styled-components'

import { breakPoint } from 'constants/themeConstants'

interface IWrapper {
  tabbedView: boolean
}

export const Wrapper = styled.div<IWrapper>`
  width: 100%;
  min-width: 665px;
  max-width: min(100vw - 340px, 860px);
  margin-left: auto;
  margin-right: auto;
  position: static;

  ${({ tabbedView }) =>
    tabbedView &&
    css`
      @media only screen and (min-width: ${breakPoint.xl}) {
        position: sticky;
        top: 0px;
        margin-left: 100px;
      }
    `}
`

export const InfoWarningContainer = styled.div`
  background-color: var(--color-blue-100);
  padding: 6px 12px;
  border-radius: 10px;
  margin-bottom: 20px;
  p {
    margin: 2px;
  }
`

export const UpdateContainer = styled.div`
  min-height: 32px;
`

interface IComposerContainer {
  tabbedView: boolean
}

export const ComposerContainer = styled.div<IComposerContainer>`
  padding-top: ${({ tabbedView }) => (tabbedView ? '0' : '40px')};
  padding-bottom: ${({ tabbedView }) => (tabbedView ? '0' : '120px')};
`

export const TopRowControls = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-neutral-200);
  margin-bottom: 20px;
`

interface ILabel {
  hasValue?: boolean
}

export const Label = styled.div<ILabel>`
  font-size: var(--small);
  margin-bottom: var(--spacing-1);

  @media only screen and (min-width: ${breakPoint.xl}) {
    position: absolute;
    left: -120px;
    width: 100px;
    text-align: right;
    top: 25px;
    margin-bottom: unset;
  }

  label {
    cursor: default;
    user-select: none;
    transition: opacity 0.3s ease 0s, color 0.3s ease 0s;
    color: ${({ hasValue }) => (hasValue ? 'rgb(83, 83, 88)' : 'default')};
    opacity: ${({ hasValue }) => (hasValue ? '0.3' : '1')};
    &:hover {
      opacity: 1;
      color: default;
    }
  }
`

export const Row = styled.div`
  position: relative;
  min-height: 35px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4px 0;
  @media only screen and (min-width: ${breakPoint.xl}) {
    flex-direction: row;
  }
`

export const CcBccContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  button:not(first-child) {
    margin-left: 10px;
  }
  margin-bottom: 10px;
`
