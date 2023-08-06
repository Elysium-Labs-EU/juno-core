/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import { forwardRef } from 'react'
import styled from 'styled-components'

import type { TAriaHaspopup } from 'globalTypes'
import { Span } from 'styles/globalStyles'

type CustomIconButton = {
  ariaControls?: string | undefined
  ariaExpanded?: boolean | undefined
  ariaHaspopup?: TAriaHaspopup
  dataCy?: string
  disabled?: boolean
  hoverColor?: string
  icon: JSX.Element
  isactive?: string
  type?: 'submit' | 'reset' | 'button'
} & React.HTMLAttributes<HTMLButtonElement>

interface Button {
  hoverColor: string | undefined
  isactive: string | undefined
}

const Button = styled.button<Button>`
  all: unset;
  background-color: transparent;
  border: none;
  color: ${({ isactive }) =>
    isactive === 'true' ? 'var(--color-black)' : 'var(--color-neutral-400)'};
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;

  &:hover {
    color: ${({ hoverColor }) => hoverColor || 'var(--color-black)'};
    cursor: pointer;
  }

  &:disabled {
    color: var(--color-neutral-300);
    cursor: not-allowed;
  }
`
const CustomIconButton = forwardRef<HTMLButtonElement, CustomIconButton>(
  (
    {
      ariaHaspopup = undefined,
      ariaControls = undefined,
      ariaExpanded = undefined,
      dataCy = undefined,
      disabled = false,
      hoverColor = undefined,
      icon,
      isactive = 'false',
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
      isactive={isactive}
      ref={ref}
      type={type}
      {...rest}
    >
      <Span style={{ display: 'flex' }}>{icon}</Span>
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
  isactive: 'false',
  type: 'button',
}

CustomIconButton.displayName = 'CustomIconButton'

export default CustomIconButton
