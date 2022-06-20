import styled from 'styled-components'

interface IAttachment {
  index: number
}

export const Attachment = styled.div<IAttachment>`
  border-radius: 6px;
  background-color: hsl(0, 0%, 94%);
  cursor: pointer;
  display: grid;
  flex-flow: row;
  padding: 4px 8px;
  align-items: center;
  margin-left: ${({ index }) => (index > 0 ? '8px' : 0)};
  margin-bottom: 8px;
  grid-template-columns: 30px auto 30px;
`

export const AttachmentInner = styled.div`
  display: flex;
  flex-flow: column;
  margin: 8px;
  span {
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    text-align: left;
    color: hsl(0, 0%, 11%);
  }
`

export const IconContainer = styled.div`
  display: flex;
  place-content: center;
`
