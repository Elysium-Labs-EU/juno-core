import styled from 'styled-components'

interface WrapperType {
  isReplying: boolean
}

export const Wrapper = styled.div<WrapperType>`
  max-width: 850px;
  width: 100%;
  margin-left: ${(props) => (props.isReplying ? '10%' : 'auto')};
  margin-right: auto;
  position: static;
`

export const UpdateContainer = styled.div`
  min-height: 2rem;
`

export const ComposerContainer = styled.div`
  padding-top: 120px;
  padding-bottom: 121px;
`

interface ILabel {
  hasValue?: boolean
}

export const Label = styled.div<ILabel>`
  position: absolute;
  left: -120px;
  width: 100px;
  text-align: right;
  top: 16px;
  label {
    cursor: default;
    user-select: none;
    transition: opacity 0.3s ease 0s, color 0.3s ease 0s;
    color: ${(props) => (props.hasValue ? 'rgb(83, 83, 88)' : 'default')};
    opacity: ${(props) => (props.hasValue ? '0.3' : '1')};
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
  padding: 0.25rem 0;
`

export const CcBccContainer = styled.div`
  display: flex;
  flex-flow: row;
`
