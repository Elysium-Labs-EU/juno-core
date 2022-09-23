import styled from 'styled-components'

export const Attachment = styled.div`
  border-radius: var(--radius-m);
  background-color: var(--color-white-off);
  border: 1px solid var(--color-grey-border);
  width: 100%;
  display: grid;
  flex-flow: row;
  padding: 4px 8px;
  align-items: center;
  margin-bottom: 8px;
  grid-template-columns: 30px auto 30px;
  &:hover {
    background-color: var(--color-grey-border);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  }
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`

export const AttachmentInner = styled.div`
  display: flex;
  flex-flow: column;
  margin: 8px;
  .file_name {
    font-size: var(--small-size);
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    text-align: left;
  }
`

export const IconContainer = styled.div`
  display: flex;
  place-content: center;
`
