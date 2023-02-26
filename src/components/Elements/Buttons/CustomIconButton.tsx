/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import { forwardRef } from 'react'
import styled from 'styled-components'

import type { TAriaHaspopup } from 'globalTypes'
import { Span } from 'styles/globalStyles'

type TCustomIconButton = {
  ariaControls?: string | undefined
  ariaExpanded?: boolean | undefined
  ariaHaspopup?: TAriaHaspopup
  dataCy?: string
  disabled?: boolean
  hoverColor?: string
  icon: JSX.Element
  isActive?: boolean
  type?: 'submit' | 'reset' | 'button'
} & React.HTMLAttributes<HTMLButtonElement>

interface IButton {
  hoverColor: string | undefined
  isActive: boolean | undefined
}

const Button = styled.button<IButton>`
  all: unset;
  background-color: transparent;
  border: none;
  color: ${({ isActive }) =>
    isActive ? `var(--color-black) ` : `var(--color-neutral-400) `};
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;

  &:hover {
    color: ${({ hoverColor }) => hoverColor || `var(--color-black)`};
    cursor: pointer;
  }

  &:disabled {
    color: var(--color-neutral-300);
    cursor: not-allowed;
  }
`
const CustomIconButton = forwardRef<HTMLButtonElement, TCustomIconButton>(
  (
    {
      ariaHaspopup = undefined,
      ariaControls = undefined,
      ariaExpanded = undefined,
      dataCy = undefined,
      disabled = false,
      hoverColor = undefined,
      icon,
      isActive = false,
      type = 'button',
      ...rest
    },
    ref
  ) => (
    <Button
      aria-haspopup={ariaHaspopup}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      data-cy={dataCy}
      disabled={disabled}
      hoverColor={hoverColor}
      isActive={isActive}
      ref={ref}
      type={type ?? 'button'}
      {...rest}
    >
      <Span>{icon}</Span>
    </Button>
  )
)

CustomIconButton.defaultProps = {
  ariaHaspopup: undefined,
  ariaControls: undefined,
  ariaExpanded: undefined,
  dataCy: undefined,
  disabled: false,
  hoverColor: undefined,
  isActive: false,
  type: 'button',
}

export default CustomIconButton
