/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'

import type { IInput } from './Input'

export const StyledInput = styled.input<Pick<IInput, 'fullWidth'>>`
  all: unset;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'unset')};
`
