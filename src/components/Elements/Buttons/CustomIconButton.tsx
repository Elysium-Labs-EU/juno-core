/* eslint-disable react/button-has-type */
import React from 'react'
import styled from 'styled-components'
import * as theme from '../../../constants/themeConstants'

interface ICustomIconButton {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    type?: 'submit' | 'reset' | 'button'
    disabled?: boolean
    icon: {}
    style?: React.CSSProperties
    title?: string,
    className?: string
    isActive?: boolean
    // aria-describedby?: null
}

interface IButton {
    isActive: boolean | undefined
}

const Button = styled.button<IButton>`
  border: none;
  color: ${ (props) => props.isActive ? `${ theme.colorBlack } ` : `${ theme.colorTextLightGrey } ` };
  outline: none;
  background-color: transparent;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;

  &:hover {
    color: ${ theme.colorBlack };
    cursor: pointer;
  }
`

const CustomIconButton = (props: ICustomIconButton) => {
    const { onClick, disabled, icon, type, style, title, className, isActive } = props
    return (
        <Button
            onClick={(event) => onClick(event)}
            type={type ?? 'button'}
            disabled={disabled}
            style={style}
            title={title}
            className={className}
            isActive={isActive}
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
    isActive: false
}