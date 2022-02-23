/* eslint-disable react/button-has-type */
import * as React from 'react'
import styled from 'styled-components'
import * as theme from '../../../constants/themeConstants'

interface ICustomIconButton {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'submit' | 'reset' | 'button'
  disabled?: boolean
  icon: {}
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
  color: ${(props) =>
    props.isActive ? `${theme.colorBlack} ` : `${theme.colorGrey} `};
  outline: none;
  background-color: transparent;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;

  &:hover {
    color: ${(props) => props.hoverColor || theme.colorBlack};
    cursor: pointer;
  }

  &:disabled {
    color: ${theme.colorUltraLightGrey};
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
