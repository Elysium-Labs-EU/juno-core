/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'

import CustomButton from 'components/Elements/Buttons/CustomButton'

export const StyledCustomButton = styled(CustomButton)`
  color: var(--color-white);
  padding: var(--spacing-1-5);
  text-overflow: ellipsis;
  transition: background-color 0.15s ease-in-out;
  &:hover {
    background-color: var(--color-neutral-800);
    color: var(--color-white);
  }
`
