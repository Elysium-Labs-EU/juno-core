import styled from 'styled-components'
import { Select, SelectProps } from '@mui/material'

export const Dialog = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  transform: translate(-50%, -50%);
  width: 475px;
  min-height: 300px;
  background-color: var(--color-white);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  border-radius: 5px;
  overflow: hidden;
  z-index: 1;
  outline: 0;
`

export const SettingsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
  margin: 0 36px 16px;
`
export const SettingsHeader = styled.h2`
  font-weight: 200;
  user-select: none;
  text-transform: capitalize;
  font-family: var(--font-family);
  line-height: 1.3;
  color: var(--color-black);
  margin-top: 32px;
  margin-left: 32px;
  margin-bottom: 32px;
`

export const SettingsTop = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin-right: 20px;
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
