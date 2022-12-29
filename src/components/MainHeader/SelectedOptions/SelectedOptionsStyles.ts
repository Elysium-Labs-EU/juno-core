import styled from 'styled-components'

export const Wrapper = styled.div`
  backdrop-filter: blur(20px);
  background: linear-gradient(
    180deg,
    rgba(246, 246, 246, 1) 34%,
    rgba(246, 246, 246, 0.7) 81%
  );
  background: rgb(246, 246, 246);
  box-shadow: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  left: 50%;
  margin: 0 auto;
  max-width: 1480px;
  padding: 5px 40px;
  position: absolute;
  transform: translate(-50%);
  width: 100%;
  z-index: var(--z-index-top-element);
`

export const Inner = styled.div``

export const SelectedLabelsText = styled.span`
  font-size: var(--small);
  user-select: none;
  color: var(--color-neutral-400);
  margin-right: 16px;
`
