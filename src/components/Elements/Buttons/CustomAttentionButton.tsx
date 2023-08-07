import styled from 'styled-components'

type CustomAttentionButton = {
  dataCy?: string
  disabled?: boolean
  icon?: JSX.Element | null
  label: string | JSX.Element
  type?: 'submit' | 'reset' | 'button'
  variant?: 'primary' | 'secondary'
} & React.HTMLAttributes<HTMLButtonElement>

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
    margin: var(--spacing-1) var(--spacing-1-5);
    span {
      color: ${({ variant }) =>
    variant === 'primary' ? `var(--color-white)` : `var(--color-black)`};
      font-size: var(--text-base);
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
    margin-right: var(--spacing-0-5);
    text-align: center;
    transition: opacity 0.3s ease 0s;
  }
`

const CustomAttentionButton = ({
  dataCy = undefined,
  disabled = false,
  icon = null,
  label,
  title,
  type = 'button',
  variant = 'primary',
  ...rest
}: CustomAttentionButton) => (
  <Button
    data-cy={dataCy}
    disabled={disabled}
    type={type}
    variant={variant}
    title={title}
    {...rest}
  >
    <InnerButton>
      {icon && <div className="icon">{icon}</div>}
      <span>{label}</span>
    </InnerButton>
  </Button>
)
export default CustomAttentionButton
