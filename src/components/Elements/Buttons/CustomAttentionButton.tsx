/* eslint-disable react/button-has-type */
import React from 'react'
import styled from 'styled-components'
import * as theme from '../../../constants/themeConstants'

interface ICustomButton {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  type?: 'submit' | 'reset' | 'button'
  disabled?: boolean
  label: string
}

const Button = styled.button`
  font-weight: 600;
  font-family: 'Raleway Variable', sans-serif;
  border-radius: 20px;
  border: none;
  background-color: ${ theme.colorPurple };
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  div {
    margin: 0.4rem 0.8rem;
    span {
      color: ${ theme.white };
      font-size: 1rem;
    }
  }

  &:hover {
    background-color: ${ theme.colorPurpleDark };
    cursor: pointer;
  }

  &:disabled {
    background-color: ${ theme.greyHover };
    opacity: 38%;
    div {
      span {
        color: ${ theme.colorBlack };
      }
    }
  }`

const InnerButton = styled.div`
  display: flex;
  align-items: center;
`

const CustomAttentionButton = (props: ICustomButton) => {
  const { onClick, className, disabled, label, type } = props
  return (
    <Button
      onClick={onClick ? (event) => onClick(event) : undefined}
      className={className}
      type={type ?? 'button'}
      disabled={disabled}
    >
      <InnerButton>
        <span>{label}</span>
      </InnerButton>
    </Button>
  )
}
export default CustomAttentionButton

CustomAttentionButton.defaultProps = {
  onClick: undefined,
  type: 'button',
  disabled: false,
  className: null,
}


