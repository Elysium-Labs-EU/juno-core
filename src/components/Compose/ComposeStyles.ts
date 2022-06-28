import styled from 'styled-components'

interface IWrapper {
  tabbedView: boolean
}

export const Wrapper = styled.div<IWrapper>`
  min-width: 665px;
  max-width: min(100vw - 340px, 860px);
  width: ${({ tabbedView }) => (tabbedView ? 'auto' : '100%')};
  margin-left: ${({ tabbedView }) => (tabbedView ? '10%' : 'auto')};
  margin-right: auto;
  position: ${({ tabbedView }) => (tabbedView ? 'sticky' : 'static')};
  ${({ tabbedView }) => tabbedView && 'top: 0px'};
`

export const InfoWarningContainer = styled.div`
  background-color: var(--color-purple-soft);
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

interface ILabel {
  hasValue?: boolean
}

export const Label = styled.div<ILabel>`
  position: absolute;
  left: -120px;
  width: 100px;
  text-align: right;
  top: 25px;
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

Label.defaultProps = {
  hasValue: false,
}

export const Row = styled.div`
  position: relative;
  min-height: 35px;
  display: flex;
  padding: 4px 0;
`

export const CcBccContainer = styled.div`
  display: flex;
  flex-flow: row;
`
