import styled from 'styled-components'

export const Wrapper = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
`

export const Inner = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
`

export const OptionsWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: var(--spacing-1-5);
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: var(--spacing-2);
  margin-top: var(--spacing-2);
`

export const SuccessContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  max-height: 300px;
  min-height: 200px;
  div {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

export const customStyles = {
  background: 'var(--color-white)',
  border: '1px solid var(--color-neutral-200)',
  borderRadius: 'var(--radius-m)',
  boxShadow: `rgba(0, 0, 0, 0.1) 0px 0px 10px`,
  lineHeight: 1,
  // TODO: Check these values
  padding: '10px 12px',
}
export const customStylesActive = {
  background: 'var(--color-black)',
  border: '1px solid var(--color-neutral-200)',
  borderRadius: 'var(--radius-m)',
  boxShadow: `rgba(0, 0, 0, 0.1) 0px 0px 10px`,
  color: 'var(--color-white)',
  lineHeight: 1,
  padding: '10px 12px',
}
