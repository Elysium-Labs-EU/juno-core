/* eslint-disable react/button-has-type */
import React from 'react'

interface CustomButtonTextProps {
  onClick?: {},
  className: string,
  type?: 'submit' | 'reset' | 'button',
  disabled?: boolean,
  icon?: {},
  label: string,
}

export const CustomButtonText = (props: CustomButtonTextProps) => {
  const { onClick, className, disabled, icon, label, type } = props
  return (
    <button
      onClick={() => onClick}
      className={className}
      type={type ?? 'button'}
      disabled={disabled}
    >
      <div className="button-inner">
        {icon && <div className="icon">{icon}</div>}
        <span>{label}</span>
      </div>
    </button>
  )
}

CustomButtonText.defaultProps = {
  onClick: null,
  type: 'button',
  disabled: false,
  icon: null,
}

interface CustomIconLinkTypes {
  onClick: {}
  className: string
  disabled?: boolean
  icon: {}
  type?: 'submit' | 'reset' | 'button'
}

export const CustomIconLink = (props: CustomIconLinkTypes) => {
  const { onClick, className, disabled, icon, type } = props
  return (
    <button
      onClick={() => onClick}
      className={className}
      type={type ?? 'button'}
      disabled={disabled}
    // style={style}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ lineHeight: 0 }}>{icon}</span>
      </div>
    </button>
  )
}

CustomIconLink.defaultProps = {
  disabled: false,
  type: 'button',
}

interface CustomButtonProps {
  onClick: {},
  className: string,
  type: 'submit' | 'reset' | 'button',
  disabled: boolean,
  icon?: {},
}

export const CustomButton = (props: CustomButtonProps) => {
  const { onClick, className, disabled, icon, type } = props
  return (
    <button
      onClick={() => onClick}
      className={className}
      style={{ marginTop: '1rem' }}
      type={type ?? 'button'}
      disabled={disabled}
    >
      <div>
        <span style={{ paddingRight: `8px` }}>{icon}</span>
      </div>
    </button>
  )
}


CustomButton.defaultProps = {
  icon: null,
}