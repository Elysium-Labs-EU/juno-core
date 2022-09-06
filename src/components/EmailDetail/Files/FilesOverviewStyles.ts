import styled from 'styled-components'

export const FilesWrapper = styled.div`
  border-radius: var(--radius-l);
  background-color: var(--color-white);
  margin-bottom: 10px;
  padding: 20px;
  box-shadow: var(--box-shadow-low);
`

export const DownloadAllContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: flex-end;
`

export const FileEmailRow = styled.div`
  margin-bottom: 24px;
`

export const NameOptionsRow = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-grey-border);
`

export const DownloadTimestampRow = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  button {
    margin-right: 20px;
  }
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
