/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import styled from 'styled-components'

import { Span } from 'styles/globalStyles'

type TCustomButton = {
  dataCy?: string
  disabled?: boolean
  icon?: JSX.Element | null
  label: string | null
  showIconAfterLabel?: boolean
  suppressed?: boolean
  type?: 'submit' | 'reset' | 'button'
} & React.HTMLAttributes<HTMLButtonElement>

interface IButton {
  suppressed: boolean | undefined
}

const Button = styled.button<IButton>`
  all: unset;
  background-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-radius: var(--radius-m);
  border-right-color: transparent;
  border-top-color: transparent;
  border: 1px solid transparent;
  color: ${({ suppressed }) =>
    suppressed ? `var(--color-neutral-400) ` : `var(--color-black) `};
  cursor: pointer;
  display: inline-block;
  font-family: var(--font-family);
  font-size: var(--small);
  font-weight: 400;
  line-height: 1.5;
  padding: 0.375rem 0.75rem;
  text-align: center;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  user-select: none;
  vertical-align: middle;

  &:hover {
    box-shadow: (--box-shadow-low);
    color: var(--color-black);
  }

  &:disabled {
    cursor: not-allowed;
  }
`

interface IInnerButton {
  hasLabel: boolean
  showIconAfterLabel: boolean
}

const InnerButton = styled.div<IInnerButton>`
  align-items: center;
  display: flex;

  .icon {
    line-height: 0;
    margin-right: ${({ hasLabel, showIconAfterLabel }) =>
      hasLabel && !showIconAfterLabel && '13px'};
    margin-left: ${({ hasLabel, showIconAfterLabel }) =>
      hasLabel && showIconAfterLabel && '13px'};
    text-align: center;
    transition: opacity 0.3s ease 0s;
  }
`

const CustomButton = ({
  disabled = false,
  dataCy = undefined,
  icon = null,
  label,
  showIconAfterLabel = false,
  suppressed = false,
  type = 'button',
  ...rest
}: TCustomButton) => (
  <Button
    data-cy={dataCy}
    disabled={disabled}
    suppressed={suppressed}
    type={type ?? 'button'}
    {...rest}
  >
    <InnerButton
      hasLabel={Boolean(label)}
      showIconAfterLabel={showIconAfterLabel}
    >
      {icon && !showIconAfterLabel && <div className="icon">{icon}</div>}
      <Span>{label}</Span>
      {icon && showIconAfterLabel && <div className="icon">{icon}</div>}
    </InnerButton>
  </Button>
)
export default CustomButton
