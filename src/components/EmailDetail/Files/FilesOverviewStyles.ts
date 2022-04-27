import styled from 'styled-components'

export const FilesWrapper = styled.div`
  border-radius: 6px;
  background-color: var(--color-white);
  margin-bottom: 0.5rem;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
`

export const FileEmailRow = styled.div`
  margin-bottom: 24px;
`

export const NameTimestampRow = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-grey-border);
`

export const AvatarName = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  div {
    margin-right: 10px;
  }
`

export const BubbleWrapper = styled.div`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
`
