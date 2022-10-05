import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  z-index: var(--z-index-top-element);
  background: rgb(246, 246, 246);
  background: linear-gradient(
    180deg,
    rgba(246, 246, 246, 1) 34%,
    rgba(246, 246, 246, 0.7) 81%
  );
  box-shadow: none;
  backdrop-filter: blur(20px);
  padding: 5px 40px;
  box-sizing: border-box;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
`

export const Inner = styled.div``

export const SelectedLabelsText = styled.span`
  font-size: var(--small);
  user-select: none;
  color: var(--color-neutral-400);
  margin-right: 16px;
`
