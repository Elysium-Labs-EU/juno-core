/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from 'react'

import * as S from './InputStyles'

export interface IInput extends React.HTMLAttributes<HTMLInputElement> {
  autoComplete?: string
  autoFocus?: boolean
  fullWidth?: boolean
  value?: string | undefined
}

const Input = forwardRef<HTMLInputElement, IInput>(
  (
    {
      autoComplete = 'on',
      autoFocus = false,
      fullWidth = false,
      value = undefined,
      ...rest
    },
    ref
  ) => (
    <S.StyledInput
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      ref={ref}
      value={value}
      fullWidth={fullWidth}
      {...rest}
    />
  )
)

Input.defaultProps = {
  autoComplete: 'on',
  autoFocus: false,
  fullWidth: false,
  value: undefined,
}

export default Input
