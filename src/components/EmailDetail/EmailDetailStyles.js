import styled from 'styled-components'

export const EmailWrapper = styled.div`
  border-radius: 6px;
  background-color: ${(props) =>
    props.labelIds.includes('DRAFT') ? '#d971ff0f' : '#ffff'};
  margin-bottom: 0.5rem;
  padding: 1rem;
`

export const EmailOptionsContainer = styled.div`
  position: relative;
  padding: 30px;
`
export const StickyOptions = styled.div`
  position: sticky;
  top: 122px;
`

export const InnerOptionsContainer = styled.div`
  width: 110px;
`

export const OpenMessageWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const ClosedMessageWrapper = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
`

export const LoadingErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh;
`

export const DetailBase = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  min-width: 50%;
`

export const DetailRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1 1;
  min-width: 50%;
`

export const CardFullWidth = styled.div`
  width: 100%;
`

export const EmailDetailContainer = styled.div`
  min-width: 60%;
  max-width: ${(props) => (props.isReplying ? '40vw' : '60%')};
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
  margin-bottom: 1rem;
  width: 100%;
`

export const AvatarHeaderContainer = styled.div`
  align-items: center;
  display: flex;
`

export const HeaderFullWidth = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  display: flex;
  place-items: center;
`

export const FromContainer = styled.div`
  margin-top: 0.5rem;
  align-items: center;
  display: flex;
  div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const EmailBody = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`

export const ClosedAvatarSender = styled.div`
  align-content: center;
  display: flex;
`

export const ClosedSender = styled.div`
  display: flex;
  place-items: center;
  padding: 0 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const ClosedSnippet = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
