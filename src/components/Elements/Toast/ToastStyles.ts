import styled, { css } from 'styled-components'

import type { TToastVariant } from './ToastTypes'

interface IToastRoot {
  showdescription: string
}

interface IToastTitle extends IToastRoot {
  variant: TToastVariant
}

export const ToastRoot = styled.div<IToastRoot>`
  align-items: center;
  background-color: white;
  border-radius: var(--radius-l);
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  column-gap: var(--spacing-2);
  display: grid;
  grid-template-areas: ${({ showdescription }) =>
    showdescription === 'true'
      ? "'title action' 'description action'"
      : "'title action'"};
  grid-template-columns: auto max-content;
  padding: var(--spacing-2) var(--spacing-4);
`

const fontColor: Record<TToastVariant, string> = {
  info: 'var(--color-neutral-600)',
  error: 'var(--color-red-500)',
  success: 'var(--color-blue-800)',
}

export const ToastTitle = styled.div<IToastTitle>`
  color: ${({ variant }) => fontColor[variant]};
  font-size: var(--text-small);
  grid-area: title;
  ${({ showdescription }) =>
    showdescription === 'true' &&
    css`
      margin-bottom: var(--spacing-0-5);
    `}
`

export const ToastDescription = styled.div`
  grid-area: description;
  margin: 0;
  color: var(--color-neutral-500);
  font-size: var(--text-small);
  line-height: 1.3;
`

export const ToastAction = styled.div`
  grid-area: action;
`
