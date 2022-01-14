/* eslint-disable react/button-has-type */
import React from 'react'
import styled from 'styled-components'

interface ICustomIconButton {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    type?: 'submit' | 'reset' | 'button'
    disabled?: boolean
    icon: {}
    style?: React.CSSProperties
    title?: string,
    className?: string
    // aria-describedby?: null
}

const Button = styled.button`
`

const CustomIconButton = (props: ICustomIconButton) => {
    const { onClick, disabled, icon, type, style, title, className } = props
    return (
        <Button
            onClick={(event) => onClick(event)}
            type={type ?? 'button'}
            disabled={disabled}
            style={style}
            title={title}
            className={className}
        >
            <div>
                <span style={{ paddingRight: `8px` }}>{icon}</span>
            </div>
        </Button>
    )
}

export default CustomIconButton

CustomIconButton.defaultProps = {
    className: null,
    disabled: false,
    style: null,
    title: null,
    type: 'button'
}