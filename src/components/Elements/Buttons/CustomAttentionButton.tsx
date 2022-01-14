/* eslint-disable react/button-has-type */
import React from 'react'
import styled from 'styled-components'

interface ICustomButton {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    className?: string
    type?: 'submit' | 'reset' | 'button'
    disabled?: boolean
    icon?: {}
    label: string
}

const Button = styled.button`
  font-weight: 600;
  font-family: 'Raleway Variable', sans-serif;
  border-radius: 20px;
  border: none;
  background-color: #8e23d1;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  div {
    margin: 0.4rem 0.8rem;
    span {
      color: #fdfdfd;
      font-size: 1rem;
    }
  }

  &:hover {
    background-color: #711ca6;
    cursor: pointer;
  }

  &:disabled {
    background-color: darkgrey;
    opacity: 38%;
    div {
      span {
        color: #1c1c1c;
      }
    }
  }`

const CustomAttentionButton = (props: ICustomButton) => {
    const { onClick, className, disabled, icon, label, type } = props
    return (
        <Button
            onClick={onClick ? (event) => onClick(event) : undefined}
            className={className}
            type={type ?? 'button'}
            disabled={disabled}
        >
            <div className="button-inner">
                {icon && <div className="icon">{icon}</div>}
                <span>{label}</span>
            </div>
        </Button>
    )
}
export default CustomAttentionButton

CustomAttentionButton.defaultProps = {
    onClick: undefined,
    type: 'button',
    disabled: false,
    icon: null,
    className: null,
}


