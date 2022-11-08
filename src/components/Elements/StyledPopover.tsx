/* eslint-disable react/jsx-props-no-spreading */
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'
import { QiEscape } from '../../images/svgIcons/quillIcons'

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

// const slideRightAndFade = keyframes({
//   '0%': { opacity: 0, transform: 'translateX(-2px)' },
//   '100%': { opacity: 1, transform: 'translateX(0)' },
// })

// const slideDownAndFade = keyframes({
//   '0%': { opacity: 0, transform: 'translateY(-2px)' },
//   '100%': { opacity: 1, transform: 'translateY(0)' },
// })

// const slideLeftAndFade = keyframes({
//   '0%': { opacity: 0, transform: 'translateX(2px)' },
//   '100%': { opacity: 1, transform: 'translateX(0)' },
// })
const StyledContent = styled(PopoverPrimitive.Content)`
  background-color: var(--color-black);
  border-radius: var(--radius-l);
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  color: var(--color-white);
  padding: 20px;
  position: relative;
  width: 260px;
  z-index: var(--z-index-popover);
  @media (prefers-reduced-motion: no-preference): {
    animationDuration: 400ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    animation-name: ${slideUpAndFade};
    will-change: transform, opacity;
    /* '&[data-state="open"]' {
      '&[data-side="top"]': { animationName: slideDownAndFade }, */
      /* '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade }, */
    /* }, */
  },
  &:focus {
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px, 0 0 0 2px var(--colors-neutral-500);
  },
`

const StyledArrow = styled(PopoverPrimitive.Arrow)`
  fill: var(--color-black);,
`

// TODO: Listen to the data variables or state changes to animate
const Content = ({
  children,
  sideOffset,
}: {
  children: ReactNode
  sideOffset: number
}) => (
  <PopoverPrimitive.Portal>
    <StyledContent sideOffset={sideOffset}>
      {children}
      <StyledArrow />
    </StyledContent>
  </PopoverPrimitive.Portal>
)

const StyledClose = styled(PopoverPrimitive.Close)`
  align-items: center;
  all: unset;
  border-radius: 100%;
  color: var(--color-white);
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  height: 25px;
  justify-content: center;
  position: absolute;
  right: 5px;
  top: 5px;
  width: 25px;

  &:hover: {
    background-color: var(--color-neutral-800);
  }
  &:focus: {
    box-shadow: var(--box-shadow-low);
  }
`

// Exports
export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverContent = Content
export const PopoverClose = StyledClose

const StyledPopover = ({
  children,
  triggerButton,
  onOpenChange = undefined,
  open = undefined,
}: {
  children: JSX.Element
  triggerButton: JSX.Element
  onOpenChange?: (open: boolean) => void
  open?: boolean
}) => {
  // To enforce the rules from the Radix UI docs
  if (open !== undefined && onOpenChange === undefined) {
    throw new Error('onOpenChange is required when open is provided')
  }

  return (
    <PopoverPrimitive.Root onOpenChange={onOpenChange} open={open}>
      <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
      <PopoverContent sideOffset={5}>
        {children}
        <PopoverClose aria-label="Close">
          <QiEscape />
        </PopoverClose>
      </PopoverContent>
    </PopoverPrimitive.Root>
  )
}

export default StyledPopover
