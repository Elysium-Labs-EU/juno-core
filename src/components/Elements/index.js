export const CustomButtonText = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={props.className}
      style={{ marginTop: '1rem' }}
      type={props.type}
      disabled={props.disabled}
    >
      <div>
        {props.icon && (
          <span style={{ paddingRight: `8px` }}>{props.icon}</span>
        )}
        <span>{props.label}</span>
      </div>
    </button>
  )
}

export const CustomIconLink = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={props.className}
      style={{ marginTop: '1rem' }}
      type={props.type}
      disabled={props.disabled}
    >
      <div>
        <span>{props.icon}</span>
      </div>
    </button>
  )
}

export const CustomButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={props.className}
      style={{ marginTop: '1rem' }}
      type={props.type}
      disabled={props.disabled}
    >
      <div>
        <span style={{ paddingRight: `8px` }}>{props.icon}</span>
      </div>
    </button>
  )
}
