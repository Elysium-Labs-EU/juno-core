import styled from 'styled-components'
import * as themeConstants from '../../constants/themeConstants'

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  height: 100vh;
  width: 100vw;
`

export const LoginContainer = styled.div`
  padding: 0.5rem 0.75rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  background-color: ${themeConstants.colorWhite};
  border-radius: 5px;
`

export const Inner = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 40px 20px;
`

export const Header = styled.div`
  margin-bottom: 40px;
  text-align: center;
`

export const ErrorBox = styled.div`
  background-color: ${themeConstants.colorPurpleSoft};
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
`
