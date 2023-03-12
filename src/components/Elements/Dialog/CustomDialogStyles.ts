import * as DialogPrimitive from '@radix-ui/react-dialog'
import styled, { keyframes } from 'styled-components'

import { breakPoint } from 'constants/themeConstants'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 0.6 },
})

const contentShow = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate(-50%, -2%) scale(.96)',
  },
  '100%': {
    opacity: 1,
    transform: 'translate(-50%, 0%) scale(1)',
  },
})

export const StyledOverlay = styled(DialogPrimitive.Overlay)`
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  background-color: var(--color-neutral-500);
  opacity: 0.6;
  position: fixed;
  inset: 0;
  z-index: calc(var(--z-index-modal) - 1);
`

interface IStyledContent {
  height: string
  nocontentpadding?: string
}

export const StyledContent = styled(DialogPrimitive.Content)<IStyledContent>`
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  background-color: var(--color-white);
  border-radius: var(--radius-l);
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  left: 50%;
  max-height: calc(100% - 64px);
  outline: 0;
  overflow-y: auto;
  padding: ${({ nocontentpadding }) =>
    nocontentpadding === 'true' ? '0' : 'var(--spacing-3)'};
  position: fixed;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  top: 20%;
  transform: translateX(-50%);
  transition: height 0.3s ease-in-out;
  min-width: 300px;
  width: 100%;
  max-width: 825px;
  z-index: var(--z-index-modal);
  &[data-state='open'] {
    height: ${({ height }) => height};
  }
  &[data-state='closed'] {
    height: 0;
    overflow: hidden;
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

export const ModalHeader = styled.div`
  border-bottom: 1px solid var(--color-neutral-200);
  margin-bottom: var(--spacing-2);
`

export const StyledTitle = styled(DialogPrimitive.Title)`
  color: var(--color-neutral-800);
  font-weight: 400;
  margin: 0;
  padding-bottom: var(--spacing-1);
`

export const StyledDescription = styled(DialogPrimitive.Description)`
  color: var(--color-neutral-800);
  font-size: var(--text-base);
  line-height: 1.5;
  margin: var(--spacing-1) 0 var(--spacing-2);
`

export const ModalIconButton = styled.button`
  all: unset;
  align-items: center;
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
