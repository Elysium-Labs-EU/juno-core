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
        <span style={{ paddingRight: `8px` }}>{props.icon}</span>
      </div>
    </button>
  )
}
