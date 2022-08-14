import styled from 'styled-components'
import { Select, SelectProps } from '@mui/material'

export const SettingsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
  margin: 0 20px;
`

export const StyledSelect = styled(Select)<SelectProps>`
  border: 0;
  width: 64px;
  height: 32px;
  font-size: 0.9rem;
  color: var(--color-black)
  background-color: transparent;
  margin-top: 16px;
  margin-right: 8px;
`

export const SettingsSubHeader = styled.h3`
  font-weight: 200;
  margin-top: 36px;
  margin-bottom: 0;
`
