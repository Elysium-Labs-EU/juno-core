import * as Tooltip from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'
import styled from 'styled-components'

const StyledContent = styled(Tooltip.Content)`
  background-color: var(--color-black);
  border-radius: var(--radius-m);
  box-shadow: var(--box-shadow-low);
  color: var(--color-white);
  font-size: var(--small);
  font-weight: 500;
  line-height: 1;
  padding: 10px 15px;
  position: relative;
  user-select: none;
  z-index: var(--z-index-popover);
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
        {typeof title === 'string' ? <span>{title}</span> : title}
      </Content>
    </Tooltip.Root>
  </Tooltip.Provider>
)

export default StyledToolTip
