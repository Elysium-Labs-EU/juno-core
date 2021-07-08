import React from 'react'

export const CustomButtonText = (props) => {
  const { onClick, className, disabled, icon, label, type } = props
  return (
    <button
      onClick={onClick}
      className={className}
      // eslint-disable-next-line react/button-has-type
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

export const CustomIconLink = (props) => {
  const { onClick, className, disabled, icon, style } = props
  return (
    <button
      onClick={onClick}
      className={className}
      type="button"
      disabled={disabled}
      style={style}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ lineHeight: 0 }}>{icon}</span>
      </div>
    </button>
  )
}

export const CustomButton = (props) => {
  const { onClick, className, disabled, icon } = props
  return (
    <button
      onClick={onClick}
      className={className}
      style={{ marginTop: '1rem' }}
      type="button"
      disabled={disabled}
    >
      <div>
        <span style={{ paddingRight: `8px` }}>{icon}</span>
      </div>
    </button>
  )
}
