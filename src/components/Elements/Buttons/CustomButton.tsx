/* eslint-disable react/button-has-type */
import * as React from 'react'
import styled from 'styled-components'
import * as theme from '../../../constants/themeConstants'

interface ICustomButton {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  type?: 'submit' | 'reset' | 'button'
  disabled?: boolean
  icon?: {}
  label: string
  suppressed?: boolean
}

interface IButton {
  suppressed: boolean | undefined
}

const Button = styled.button<IButton>`
  display: inline-block;
  font-weight: 400;
  color: ${(props) =>
    props.suppressed ? `${theme.colorGrey} ` : `${theme.colorBlack} `};
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  cursor: pointer;
  font-family: 'Raleway Variable', sans-serif;

  &:hover {
    color: ${theme.colorBlack};
  }

  &:disabled {
    cursor: not-allowed;
  }
`

const InnerButton = styled.div`
  display: flex;
  align-items: center;

  .icon {
    margin-right: 13px;
    line-height: 0;
    text-align: center;
    transition: opacity 0.3s ease 0s;
  }
`

const CustomButton = (props: ICustomButton) => {
  const { onClick, className, disabled, icon, label, type, suppressed } = props
  return (
    <Button
      onClick={onClick ? (event) => onClick(event) : undefined}
      className={className}
      type={type ?? 'button'}
      disabled={disabled}
      suppressed={suppressed}
    >
      <InnerButton>
        {icon && <div className="icon">{icon}</div>}
        <span>{label}</span>
      </InnerButton>
    </Button>
  )
}
export default CustomButton

CustomButton.defaultProps = {
  onClick: undefined,
  type: 'button',
  disabled: false,
  icon: null,
  className: null,
  suppressed: false,
}
