/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components'

import type { TStackSpacing, TStackStyledProps } from './StackTypes'

const spacingToGap: Record<TStackSpacing, string> = {
  px: 'px',
  none: '0',
  mini: 'var(--gap-spacing-1)',
  small: 'var(--gap-spacing-2)',
  default: 'var(--gap-spacing-3)',
  large: 'var(--gap-spacing-4)',
  huge: 'var(--gap-spacing-5)',
}

export const Stack = styled.div<TStackStyledProps>`
  align-items: ${({ align }) => align};
  display: flex;
  flex-direction: ${({ direction }) =>
    direction === 'horizontal' ? 'row' : 'column'};
  justify-content: ${({ justify }) => justify};
  gap: ${({ spacing }) => spacingToGap[spacing]};
  position: relative;
  ${({ wrap }) =>
    wrap === 'true' &&
    css`
      flex: wrap;
    `}
`
