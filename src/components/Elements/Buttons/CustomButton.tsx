/* eslint-disable react/button-has-type */
import React from 'react'
import styled from 'styled-components'

interface ICustomButton {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  className: string
  type?: 'submit' | 'reset' | 'button'
  disabled?: boolean
  icon?: {}
  label: string
}

const Button = styled.button``

const CustomButton = (props: ICustomButton) => {
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
export default CustomButton

CustomButton.defaultProps = {
  onClick: undefined,
  type: 'button',
  disabled: false,
  icon: null,
}


