/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'

import type { InputProps } from './Input'

export const StyledInput = styled.input<Pick<InputProps, 'fullWidth'>>`
  all: unset;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'unset')};
`
