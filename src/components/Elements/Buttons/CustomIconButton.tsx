/* eslint-disable react/button-has-type */
import { CSSProperties, forwardRef, MouseEvent } from 'react'
import styled from 'styled-components'

import type { TAriaHaspopup } from 'globalTypes'

interface ICustomIconButton {
  ariaControls?: string | undefined
  ariaExpanded?: boolean | undefined
  ariaHaspopup?: TAriaHaspopup
  className?: string
  dataCy?: string
  disabled?: boolean
  hoverColor?: string
  icon: JSX.Element
  isActive?: boolean
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  onKeyDown?: (event: any) => void
  style?: CSSProperties
  title: string
  type?: 'submit' | 'reset' | 'button'
}

interface IButton {
  hoverColor: string | undefined
  isActive: boolean | undefined
}

const Button = styled.button<IButton>`
  unset: all;
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
const CustomIconButton = forwardRef<HTMLButtonElement, ICustomIconButton>(
  (
    {
      ariaHaspopup = undefined,
      ariaControls = undefined,
      ariaExpanded = undefined,
      className = undefined,
      dataCy = undefined,
      disabled = false,
      hoverColor = undefined,
      icon,
      isActive = false,
      onClick,
      onKeyDown = undefined,
      style = undefined,
      title,
      type = 'button',
    },
    ref
  ) => (
    <Button
      aria-haspopup={ariaHaspopup}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      className={className}
      data-cy={dataCy}
      disabled={disabled}
      hoverColor={hoverColor}
      isActive={isActive}
      onClick={(event) => onClick(event)}
      onKeyDown={onKeyDown}
      ref={ref}
      style={style}
      title={title}
      type={type ?? 'button'}
    >
      <span>{icon}</span>
    </Button>
  )
)

CustomIconButton.defaultProps = {
  ariaHaspopup: undefined,
  ariaControls: undefined,
  ariaExpanded: undefined,
  className: undefined,
  dataCy: undefined,
  disabled: false,
  hoverColor: undefined,
  isActive: false,
  onKeyDown: undefined,
  style: undefined,
  type: 'button',
}

export default CustomIconButton
