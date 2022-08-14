import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: stretch;
  gap: 20px;
`

export const Inner = styled.div`
  display: flex;
  flex-flow: column;
  align-items: stretch;
  gap: 16px;
`

export const OptionsWrapper = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  gap: 12px;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 20px;
`

export const SuccessContainer = styled.div`
  min-height: 200px;
  height: 100vh;
  max-height: 300px;
  display: flex;
  justify-content: center;
  div {
    justify-content: center;
    display: flex;
    flex-flow: column;
    align-items: center;
  }
`
