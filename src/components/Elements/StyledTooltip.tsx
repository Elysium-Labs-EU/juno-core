import * as Tooltip from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'

import { Span } from 'styles/globalStyles'

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const StyledContent = styled(Tooltip.Content)`
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  background-color: var(--color-black);
  border-radius: var(--radius-m);
  box-shadow: var(--box-shadow-low);
  color: var(--color-white);
  font-size: var(--text-small);
  font-weight: 500;
  line-height: 1;
  padding: var(--spacing-1) var(--spacing-1-5);
  position: relative;
  user-select: none;
  will-change: transform, opacity;
  z-index: var(--z-index-popover);
  &[data-state='open'][data-side='top'] {
    animation-name: ${slideDownAndFade};
  }
  &[data-state='open'][data-side='right'] {
    animation-name: ${slideLeftAndFade};
  }
  &[data-state='open'][data-side='bottom'] {
    animation-name: ${slideUpAndFade};
  }
  &[data-state='open'][data-side='left'] {
    animation-name: ${slideRightAndFade};
  }
`

const StyledArrow = styled(Tooltip.Arrow)`
  fill: var(--color-black);
`

const Content = ({
  children,
  sideOffset = undefined,
}: {
  children: ReactNode
  sideOffset?: number
}) => (
  <Tooltip.Portal>
    <StyledContent sideOffset={sideOffset}>
      {children}
      <StyledArrow />
    </StyledContent>
  </Tooltip.Portal>
)

const StyledToolTip = ({
  children,
  title,
}: {
  children: JSX.Element
  title: ReactNode
}) => (
  <Tooltip.Provider delayDuration={300} skipDelayDuration={300}>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Content sideOffset={5}>
        {typeof title === 'string' ? <Span>{title}</Span> : title}
      </Content>
    </Tooltip.Root>
  </Tooltip.Provider>
)

export default StyledToolTip
