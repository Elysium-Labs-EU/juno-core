import * as DialogPrimitive from '@radix-ui/react-dialog'
import styled, { keyframes } from 'styled-components'

import { breakPoint } from 'constants/themeConstants'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 0.6 },
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

export const StyledOverlay = styled(DialogPrimitive.Overlay)`
  background-color: var(--color-neutral-500);
  opacity: 0.6;
  position: fixed;
  inset: 0;
  z-index: calc(var(--z-index-modal) - 1);
  @media (prefers-reduced-motion: no-preference) {
    animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
`

export const StyledContent = styled(DialogPrimitive.Content)`
  background-color: var(--color-white);
  border-radius: var(--radius-l);
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  left: 50%;
  max-height: calc(100% - 64px);
  outline: 0;
  overflow-y: auto;
  padding: 25px;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 825px;
  z-index: var(--z-index-modal);
  @media (prefers-reduced-motion: no-preference) {
    animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &:focus: {
    outline: none;
  }
  @media only screen and (max-width: ${breakPoint.lg}) {
    width: 100%;
  }
  @media only screen and (max-width: ${breakPoint.md}) {
    min-height: 50%;
  }
`

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
`

export const ModalHeader = styled.div`
  border-bottom: 1px solid var(--color-neutral-200);
  margin-bottom: 20px;
`

export const HeaderRow = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const StyledTitle = styled(DialogPrimitive.Title)`
  margin: 0;
  font-weight: 400;
  color: var(--color-neutral-800);
  padding-bottom: 10px;
`

export const StyledDescription = styled(DialogPrimitive.Description)`
  margin: 10px 0 20px;
  color: var(--color-neutral-800);
  font-size: 15px;
  line-height: 1.5;
`

export const ModalIconButton = styled.button`
  align-items: center;
  all: unset;
  border-radius: 100%;
  cursor: pointer;
  display: inline-flex;
  height: 25px;
  justify-content: center;
  position: absolute;
  right: 10px;
  top: 10px;
  width: 25px;
`
