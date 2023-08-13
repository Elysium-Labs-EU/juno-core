import styled from 'styled-components'

export const InnerContent = styled.div`
  padding: var(--spacing-2) 0;
  max-width: 550px;
  margin: 0 auto;
`

export const DialogSubHeader = styled.h3`
  font-weight: 600;
  margin-top: var(--spacing-4);
`

export const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
`

export const CMDKContainer = styled.div`
  align-items: center;
  border-radius: var(--radius-m);
  border: 1px solid var(--color-neutral-300);
  display: flex;
  flex-direction: column;
  gap: var(--gap-spacing-3);
  justify-content: stretch;
  padding: var(--spacing-2);
  position: relative;
`
