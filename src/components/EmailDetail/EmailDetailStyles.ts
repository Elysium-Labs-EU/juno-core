import styled from 'styled-components'

interface IScroll {
  clientState: boolean
}

export const HiddenMessagesFeed = styled.div`
  display: none;
`

interface IEmailDetail {
  tabbedView?: boolean
}

export const EmailDetailWrapper = styled.div<IEmailDetail>`
  margin-left: auto;
  margin-right: auto;
  flex: 1 1 0%;
  display: ${({ tabbedView }) => (tabbedView ? 'flex' : 'initial')};
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

interface IEmailClosedWrapper {
  hideDraft?: boolean
  isDraft?: boolean
}

export const EmailClosedWrapper = styled.div<IEmailClosedWrapper>`
  padding: 16px;
  transition: background-color ease-in 0.125s;
  background-color: ${({ isDraft }) =>
    isDraft ? '#c2a6ff17' : `var(--color-white)`};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: ${({ hideDraft }) => (hideDraft ? 'none' : 'inherit')};
  margin-bottom: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  border-radius: 6px;
  &:hover {
    background-color: var(--color-grey-hover);
    border-radius: 6px;
  }
`
export const EmailOpenWrapper = styled.div`
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  background-color: var(--color-white);
`

export const EmailOptionsContainer = styled.div<IEmailDetail>`
  position: relative;
  min-height: 200px;
  padding: 30px;
  left: ${({ tabbedView }) => (tabbedView ? '0' : '75px')};
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
`

export const DetailRow = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1 1;
`

export const CardFullWidth = styled.div`
  width: 100%;
`

export const EmailDetailContainer = styled.div<IEmailDetail>`
  width: ${({ tabbedView }) => (tabbedView ? '100%' : '100vw')};
  min-width: ${({ tabbedView }) => (tabbedView ? '665px' : '300px')};
  max-width: min(100vw - 340px, 860px);
  padding-bottom: 320px;
  margin-bottom: 20px;
  overflow: scroll;
  scrollbar-width: none;
  transition: all 0.2s ease-in-out;
  left: ${({ tabbedView }) => (tabbedView ? '0' : '75px')};
  position: relative;

  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`

export const TopContainer = styled.div`
  align-items: center;
  display: flex;
`

export const ClickHeader = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: auto auto;
  margin-right: 20px;
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
  div:not(:first-child) {
    margin-left: 10px;
  }
`

export const ChildDiv = styled.div`
  line-height: 16px;
`

export const HeaderFullWidth = styled.div`
  overflow: hidden;
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

export const BlockedTrackersContainer = styled.div<IFromCCContainer>`
  align-items: center;
  display: flex;
  padding-top: 16px;
  padding-bottom: 8px;
`

export const GreyDivider = styled.div`
  border-bottom: 1px solid var(--color-grey-border);
`

export const EmailBody = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
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
  margin-left: 40px;
`

export const Spacer = styled.div`
  margin: 10px 0;
`
