import styled from 'styled-components'

interface EmailWrapperProps {
  labelIds?: string[]
}

interface EmailContainerProps {
  tabbedView?: boolean
}

interface IScroll {
  clientState: boolean
}

export const HiddenMessagesFeed = styled.div`
  display: none;
`

export const Scroll = styled.div<IScroll>`
  position: relative;
  width: 100%;
  height: ${({ clientState }) => (clientState ? '90.5vh' : '88.3vh')};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`

export const MessageFeedViewContainer = styled.div``

export const EmailWrapper = styled.div<EmailWrapperProps>`
  border-radius: 6px;
  background-color: ${(props) =>
    props?.labelIds?.includes('DRAFT') ? '#c2a6ff17' : '#ffff'};
  margin-bottom: 0.5rem;
  border: 1px solid var(--color-grey-border);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
`

export const EmailClosedWrapper = styled.div`
  padding: 1rem;
  transition: background-color ease-in 0.125s;
  cursor: pointer;
  &:hover {
    background-color: var(--color-grey-hover);
  }
`

export const EmailOpenWrapper = styled.div`
  padding: 1rem;
`

export const EmailOptionsContainer = styled.div`
  position: relative;
  min-height: 200px;
  padding: 30px;
`

export const EmailOptionsPlaceholder = styled.div`
  width: 170px;
  padding: 30px;
  box-sizing: border-box;
`

export const StickyOptions = styled.div`
  position: sticky;
  top: 50px;
`

export const InnerOptionsContainer = styled.div`
  width: 110px;
`

export const OpenMessageWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const ClosedMessageWrapper = styled.div`
  display: grid;
  grid-template-columns: max-content auto 95px;
  column-gap: 15px;
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

export const DetailRow = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1 1;
  min-width: 50%;
`

export const CardFullWidth = styled.div`
  width: 100%;
`

export const EmailDetailContainer = styled.div<EmailContainerProps>`
  min-width: 60%;
  max-width: ${({ tabbedView }) => (tabbedView ? '40vw' : '60%')};
  padding-bottom: 1.5rem;
  margin-bottom: 1rem;
  width: 100%;
  overflow: hidden;
`

export const TopContainer = styled.div`
  align-items: center;
  display: flex;
`

export const ClickHeader = styled.div`
  align-items: center;
  display: flex;
`

export const SpecificMenuContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 40px;
  z-index: 10;
`

export const TimeAttachmentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
`

export const HeaderFullWidth = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  display: flex;
  place-items: center;
`

interface IFromCCContainer {
  multipleComponents: boolean
}

export const FromContainer = styled.div<IFromCCContainer>`
  align-items: center;
  display: flex;
  border-bottom: ${({ multipleComponents }) =>
    multipleComponents ? 'none' : `1px solid var(--color-grey-border)`};
  padding-top: 16px;
  padding-bottom: 8px;
`

export const ToBCCContainer = styled.div<IFromCCContainer>`
  align-items: center;
  display: flex;
  div {
    max-width: ${({ multipleComponents }) =>
      multipleComponents ? '33%' : '100%'};
    margin-right: ${({ multipleComponents }) =>
      multipleComponents ? '2rem' : 0};
  }
  border-bottom: 1px solid var(--color-grey-border);
  padding-top: 8px;
  padding-bottom: 16px;
`

export const ToFromBCCInner = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  .truncate {
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

export const EmailDetailTitle = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.21;
  color: var(--color-black);
  margin-left: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const SmallTextMuted = styled.span`
  color: var(--color-grey);
  font-size: var(--small-size);
  margin-right: 4px;
`

export const SmallTextTruncated = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--small-size);
  padding-right: 6px;
`

export const ComposeWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
  max-width: 50%;
  margin-left: 45px;
`
