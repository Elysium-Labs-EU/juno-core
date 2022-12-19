/* eslint-disable react/button-has-type */
import { MouseEvent } from 'react'
import styled from 'styled-components'

interface ICustomButton {
  className?: string
  disabled?: boolean
  icon?: JSX.Element | null
  label: string | JSX.Element
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  onKeyDown?: any
  tabIndex?: number
  title: string
  type?: 'submit' | 'reset' | 'button'
  variant?: 'primary' | 'secondary'
}

interface IButton {
  variant: 'primary' | 'secondary'
}

const Button = styled.button<IButton>`
  background-color: ${({ variant }) =>
    variant === 'primary' ? `var(--color-black)` : `var(--color-white)`};
  border-radius: var(--radius-l);
  border: none;
  font-family: var(--font-family);
  font-weight: 500;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  div {
    margin: 10px 14px;
    span {
      color: ${({ variant }) =>
        variant === 'primary' ? `var(--color-white)` : `var(--color-black)`};
      font-size: 1rem;
      line-height: 1rem;
    }
  }

  &:hover {
    background-color: ${({ variant }) =>
      variant === 'primary'
        ? `var(--color-neutral-800)`
        : `var(--color-neutral-200)`};
    cursor: pointer;
    box-shadow: var(--box-shadow-low);
  }

  &:disabled {
    background-color: var(--color-neutral-200);
    opacity: 38%;
    div {
      span {
        color: var(--color-black);
      }
    }
  }
`

const InnerButton = styled.div`
  align-items: center;
  display: flex;

  .icon {
    line-height: 0;
    margin: 0;
    margin-right: 5px;
    text-align: center;
    transition: opacity 0.3s ease 0s;
  }
`

const CustomAttentionButton = ({
  className = undefined,
  disabled = false,
  icon = null,
  label,
  onClick = undefined,
  onKeyDown = undefined,
  tabIndex = undefined,
  title,
  type = 'button',
  variant = 'primary',
}: ICustomButton) => (
  <Button
    className={className}
    disabled={disabled}
    onClick={onClick ? (event) => onClick(event) : undefined}
    onKeyDown={onKeyDown}
    tabIndex={tabIndex}
    title={title}
    type={type ?? 'button'}
    variant={variant ?? 'primary'}
  >
    <InnerButton>
      {icon && <div className="icon">{icon}</div>}
      <span>{label}</span>
    </InnerButton>
  </Button>
)
export default CustomAttentionButton
