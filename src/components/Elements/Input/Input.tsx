import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import * as S from './InputStyles'

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  autoComplete?: string
  autoFocus?: boolean
  fullWidth?: boolean
  value?: string | undefined
}

const Input = forwardRef<HTMLInputElement, InputProps>(
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

Input.displayName = 'Input'

export default Input
