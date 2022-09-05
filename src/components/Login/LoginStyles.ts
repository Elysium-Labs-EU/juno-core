import styled from 'styled-components'

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
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  background-color: var(--color-white);
  border-radius: 5px;
  min-width: 300px;
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
  background-color: var(--color-purple-soft);
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
`
