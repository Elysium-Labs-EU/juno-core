/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'

import type { IInlineThreadActions } from './InlineThreadActionsTypes'

type TWrapper = Pick<IInlineThreadActions, 'isFocused'>

export const Wrapper = styled.div<TWrapper>`
  align-items: center;
  background: var(--color-neutral-200);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 0) 0%,
    rgba(229, 229, 229, 1) 25%,
    rgba(229, 229, 229, 1) 85%,
    rgba(229, 229, 229, 0.4) 100%
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
