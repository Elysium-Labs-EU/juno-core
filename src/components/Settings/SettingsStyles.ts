import styled from 'styled-components'
import { Select, SelectProps } from '@mui/material'
import * as themeConstants from '../../constants/themeConstants'

export const Dialog = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  transform: translate(-50%, -50%);
  width: 475px;
  min-height: 300px;
  background-color: ${themeConstants.colorWhite};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  border-radius: 5px;
  overflow: hidden;
  z-index: 1;
`

export const SettingsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
  margin: 0 36px 16px;
`
export const SettingsHeader = styled.h2`
  margin: 2rem 0 0;
  font-weight: 200;
  user-select: none;
  text-transform: capitalize;
  font-family: 'Raleway Variable', serif;
  line-height: 1.3;
  color: ${themeConstants.colorBlack};
  margin-left: 2rem;
  margin-bottom: 2rem;
`

export const StyledSelect = styled(Select)<SelectProps>`
  border: 0;
  width: 3.5rem;
  height: 2rem;
  font-size: 0.9rem;
  color: ${themeConstants.colorBlack}
  background-color: transparent;
  margin-top: 1em;
  margin-right: 0.5em;
`

export const SettingsSubHeader = styled.h3`
  font-weight: 200;
  margin-top: 36px;
  margin-bottom: 0;
`
