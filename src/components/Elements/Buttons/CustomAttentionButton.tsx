/* eslint-disable react/button-has-type */
import * as React from 'react'
import styled from 'styled-components'

interface ICustomButton {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  type?: 'submit' | 'reset' | 'button'
  disabled?: boolean
  label: string
  variant?: 'primary' | 'secondary'
  title: string
}

interface IButton {
  variant: 'primary' | 'secondary'
}

const Button = styled.button<IButton>`
  font-weight: 500;
  font-family: var(--font-family);
  border-radius: 20px;
  border: none;
  background-color: ${({ variant }) =>
    variant === 'primary' ? `var(--color-black)` : `var(--color-purple)`};
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  div {
    margin: 10px 14px;
    span {
      color: var(--color-white);
      font-size: 1rem;
      line-height: 1rem;
    }
  }

  &:hover {
    background-color: ${({ variant }) =>
      variant === 'primary'
        ? `var(--color-black-off)`
        : `var(--color-purple-dark)`};
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  }

  &:disabled {
    background-color: var(--color-grey-hover);
    opacity: 38%;
    div {
      span {
        color: var(--color-black);
      }
    }
  }
`

const InnerButton = styled.div`
  display: flex;
  align-items: center;
`

const CustomAttentionButton = (props: ICustomButton) => {
  const { onClick, className, disabled, label, type, variant, title } = props
  return (
    <Button
      onClick={onClick ? (event) => onClick(event) : undefined}
      className={className}
      type={type ?? 'button'}
      disabled={disabled}
      variant={variant ?? 'primary'}
      title={title}
    >
      <InnerButton>
        <span>{label}</span>
      </InnerButton>
    </Button>
  )
}
export default CustomAttentionButton

CustomAttentionButton.defaultProps = {
  onClick: undefined,
  type: 'button',
  disabled: false,
  className: null,
  variant: 'primary',
}
