import styled from 'styled-components'

import type { IInlineThreadActions } from './InlineThreadActionsTypes'

type TWrapper = Pick<IInlineThreadActions, 'isFocused'>

export const Wrapper = styled.div<TWrapper>`
  align-items: center;
  background: var(--color-neutral-200);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 0) 0%,
    rgba(226, 226, 226, 1) 25%
  );
  right: 1rem;
  bottom: 0;
  display: flex;
  opacity: ${({ isFocused }) => (isFocused ? '1' : 0)};
  padding: 0 var(--spacing-4);
  justify-content: flex-end;
  position: absolute;
  top: 0;
  transition: opacity 0.2s ease-in-out;
  z-index: 10;
`

export const Inner = styled.div`
  display: flex;
  flex-direction: row;
  button {
    margin-left: var(--spacing-2);
    span: {
      display: flex;
    }
  }
`
