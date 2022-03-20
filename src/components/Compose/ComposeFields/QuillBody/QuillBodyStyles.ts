import styled from 'styled-components'

interface IWrapper {
  isFocused: boolean
}

export const Wrapper = styled.div<IWrapper>`
  background: var(--color-white-slight);
  width: 100%;
  border: ${(props) =>
    props.isFocused
      ? `2px var(--color-purple-soft) solid`
      : '2px solid transparent'};

  .quill {
    border: none;
    position: relative;
    min-height: 375px;

    .ql-toolbar.ql-snow {
      border: none;
      position: absolute;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
      width: calc(100% - 32px);
      background: var(--color-white);
      top: 12px;
      left: 16px;
      border-radius: 4px;
      z-index: 10;
    }
    .ql-container.ql-snow {
      border: none;
      padding-top: 3rem;
      font-family: 'Urbanist Variable', sans-serif;
      font-size: 1rem;
    }
  }
`

export const ContentArea = styled.div`
  min-height: 375px;
`
