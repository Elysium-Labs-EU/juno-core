import styled, { css } from 'styled-components'

import { breakPoint } from 'constants/themeConstants'

interface IScroll {
  clientState: boolean
}

export const Scroll = styled.div<IScroll>`
  width: 100%;
  display: flex;
  flex: 2;
  flex-direction: column;
`

export const HiddenMessagesFeed = styled.div`
  display: none;
`

interface IEmailDetail {
  tabbedView?: boolean
}

export const EmailDetailWrapper = styled.div<IEmailDetail>`
  display: flex;
`

export const MessageFeedViewContainer = styled.div``

interface IEmailWrapper {
  hideDraft?: boolean
  isDraft?: boolean
}

export const EmailClosedWrapper = styled.div<IEmailWrapper>`
  background-color: ${({ isDraft }) =>
    isDraft ? '#c2a6ff17' : `var(--color-white)`};
  border-radius: var(--radius-l);
  box-shadow: var(--box-shadow-low);
  cursor: pointer;
  display: ${({ hideDraft }) => (hideDraft ? 'none' : 'inherit')};
  margin-bottom: 20px;
  padding: 20px;
  transition: all 0.2s ease-in-out;
  transition: background-color ease-in 0.125s;
  &:hover {
    background-color: ${({ isDraft }) =>
      isDraft ? `var(--color-blue-100)` : `var(--color-neutral-200)`};
    border-radius: var(--radius-l);
  }
`
export const EmailOpenWrapper = styled.div<IEmailWrapper>`
  background-color: ${({ isDraft }) =>
    isDraft ? '#c2a6ff17' : `var(--color-white)`};
  border-radius: var(--radius-l);
  box-shadow: var(--box-shadow-low);
  display: ${({ hideDraft }) => (hideDraft ? 'none' : 'inherit')};
  margin-bottom: 20px;
  padding: 20px;
`

export const DraftHeaderControls = styled.div`
  align-items: center;
  border-bottom: 1px solid var(--color-blue-100);
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
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
  align-items: center;
  column-gap: var(--spacing-2);
  display: grid;
  grid-template-columns: max-content auto 95px;
`

export const LoadingErrorWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 50vh;
  justify-content: center;
  width: 100%;
`

export const DetailBase = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`

export const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  @media only screen and (min-width: ${breakPoint.xl}) {
    flex-direction: row;
    max-width: calc(100vw - 340px);
  }
`

export const DetailRow = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1 1 0%;
`

export const CardFullWidth = styled.div`
  width: 100%;
`

export const EmailDetailContainer = styled.div<IEmailDetail>`
  width: ${({ tabbedView }) => (tabbedView ? '100%' : '100vw')};
  min-width: ${({ tabbedView }) => (tabbedView ? '665px' : '300px')};
  max-width: min(100vw - 340px, 860px);
  /* padding-bottom: 320px; */
  margin-bottom: var(--spacing-2);
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
  margin-right: var(--spacing-2);
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

export const ContactsContainer = styled.div`
  align-items: center;
  display: flex;
  margin-top: var(--spacing-2);
  margin-bottom: var(--spacing-2);
`

export const ToFromBCCInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const BlockedTrackersContainer = styled.div`
  align-items: center;
  display: flex;
  padding-top: var(--spacing-2);
  padding-bottom: var(--spacing-1);
`

export const GreyDivider = styled.div`
  border-bottom: 1px solid var(--color-neutral-100);
`

export const EmailBody = styled.div`
  margin-top: var(--spacing-2);
  margin-bottom: var(--spacing-2);
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
  margin-left: var(--spacing-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

interface ISmallTextTruncated {
  showComma?: boolean
}

const commaSeperator = css`
  margin-right: var(--spacing-0-75);
  &:after {
    content: ',';
  }
`

export const SmallTextTruncated = styled.span<ISmallTextTruncated>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--small);
  ${({ showComma }) => showComma && commaSeperator};
  margin-right: ${({ showComma }) => (showComma ? 'var(--spacing-0-5)' : '0')};
`

export const FullContactContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const ContactContainer = styled.div`
  margin-bottom: var(--spacing-0-5);
`

export const ComposeWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  order: -1;
  @media only screen and (min-width: ${breakPoint.xl}) {
    order: 1;
    max-width: 50%;
  }
`

export const Spacer = styled.div`
  margin: 10px 0;
`
