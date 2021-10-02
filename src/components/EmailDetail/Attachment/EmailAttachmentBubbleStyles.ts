import styled from 'styled-components'

export const Attachment = styled.div`
  border-radius: 6px;
  background-color: hsl(0, 0%, 94%);
  cursor: pointer;
  display: flex;
  flex-flow: row;
  max-width: max-content;
  padding: 0.2rem 0.5rem;
  align-items: center;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
`

export const AttachmentInner = styled.div`
  display: flex;
  flex-flow: column;
  margin: 0.3rem;
`
