/* eslint-disable react/button-has-type */
import * as React from 'react'
import styled from 'styled-components'

interface ICustomIconButton {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'submit' | 'reset' | 'button'
  disabled?: boolean
  icon: JSX.Element
  style?: React.CSSProperties
  title?: string
  className?: string
  isActive?: boolean
  hoverColor?: string
  // aria-describedby?: null
}

interface IButton {
  isActive: boolean | undefined
  hoverColor: string | undefined
}

const Button = styled.button<IButton>`
  border: none;
  color: ${ ({ isActive }) =>
    isActive ? `var(--color-black) ` : `var(--color-grey) ` };
  outline: none;
  background-color: transparent;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;

  &:hover {
    color: ${ ({ hoverColor }) => hoverColor || `var(--color-black)` };
    cursor: pointer;
  }

  &:disabled {
    color: var(--color-grey-ultra-light);
    cursor: not-allowed;
  }
`
const CustomIconButton = (props: ICustomIconButton) => {
  const {
    onClick,
    disabled,
    icon,
    type,
    style,
    title,
    className,
    isActive,
    hoverColor,
  } = props
  return (
    <Button
      onClick={(event) => onClick(event)}
      type={type ?? 'button'}
      disabled={disabled}
      style={style}
      title={title}
      className={className}
      isActive={isActive}
      hoverColor={hoverColor}
    >
      <span>{icon}</span>
    </Button>
  )
}

export default CustomIconButton

CustomIconButton.defaultProps = {
  className: null,
  disabled: false,
  style: null,
  title: null,
  type: 'button',
  isActive: false,
  hoverColor: null,
}
