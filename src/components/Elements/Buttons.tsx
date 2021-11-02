/* eslint-disable react/button-has-type */
import React from 'react'

interface CustomButtonTextProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  className: string
  type?: 'submit' | 'reset' | 'button'
  disabled?: boolean
  icon?: {}
  label: string
}

export const CustomButtonText = (props: CustomButtonTextProps) => {
  const { onClick, className, disabled, icon, label, type } = props
  return (
    <button
      onClick={onClick ? (event) => onClick(event) : undefined}
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
  onClick: undefined,
  type: 'button',
  disabled: false,
  icon: null,
}

interface CustomIconLinkTypes {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  className: string
  disabled?: boolean
  style?: React.CSSProperties
  icon: {}
  type?: 'submit' | 'reset' | 'button'
  title?: string
}

export const CustomIconLink = (props: CustomIconLinkTypes) => {
  const { onClick, className, disabled, icon, type, style, title } = props

  return (
    <button
      onClick={(event) => onClick(event)}
      className={className}
      type={type ?? 'button'}
      disabled={disabled}
      style={style}
      title={title}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ lineHeight: '1rem' }}>{icon}</span>
      </div>
    </button>
  )
}

CustomIconLink.defaultProps = {
  disabled: false,
  style: null,
  type: 'button',
  title: null,
}

interface CustomButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  className: string
  type: 'submit' | 'reset' | 'button'
  disabled: boolean
  icon?: {}
}

export const CustomButton = (props: CustomButtonProps) => {
  const { onClick, className, disabled, icon, type } = props
  return (
    <button
      onClick={(event) => onClick(event)}
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
