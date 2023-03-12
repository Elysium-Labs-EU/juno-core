import { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'

import Stack from 'components/Elements/Stack/Stack'
import * as local from 'constants/emailDetailConstants'
import { selectIsForwarding, selectIsReplying } from 'store/emailDetailSlice'
import { useAppSelector } from 'store/hooks'
import { selectLabelIds } from 'store/labelsSlice'

import EmailDetailOptions from './EmailDetailOptions'
import ForwardingComposer from './InlineComposers/ForwardingComposer'
import ReplyComposer from './InlineComposers/ReplyComposer'
import MappedMessages from './MappedMessages'
import MessagesOverview from './MessagesOverview'
import DetailNavigationContainer from '../DetailNavigation/DetailNavigationContainer'
import * as S from '../EmailDetailStyles'
import type { IRenderEmailDetail } from '../EmailDetailTypes'
import EmailPosition from '../EmailPosition/EmailPosition'
import FilesOverview from '../Files/FilesOverview'
import Tabs from '../Tabs/Tabs'

const getUnsubscribeLink = ({
  threadDetail,
}: Pick<IRenderEmailDetail, 'threadDetail'>) => {
  if (!threadDetail) {
    return null
  }
  const mostRecentMessage =
    threadDetail.messages[threadDetail.messages.length - 1]
  if (
    mostRecentMessage &&
    'listUnsubscribe' in mostRecentMessage.payload.headers
  ) {
    return mostRecentMessage.payload.headers.listUnsubscribe
  }
  return null
}

const RenderTab = ({
  children,
  isVisible,
}: {
  children: JSX.Element
  isVisible: boolean
}) => (
  <S.TabContainer isVisible={isVisible}>
    <Stack
      align="center"
      direction="vertical"
      style={{ paddingBottom: 'var(--spacing-1)' }}
    >
      {children}
    </Stack>
  </S.TabContainer>
)

const RenderEmailDetail = ({
  activeEmailList,
  setShouldRefreshDetail,
  showNoNavigation,
  threadDetail,
}: IRenderEmailDetail) => {
  const isForwarding = useAppSelector(selectIsForwarding)
  const isReplying = useAppSelector(selectIsReplying)
  const labelIds = useAppSelector(selectLabelIds)
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  )
  const [previousPropToWatch, setPreviousPropToWatch] = useState<
    IRenderEmailDetail['threadDetail'] | null
  >(null)
  const { overviewId } = useParams<{
    overviewId: string
  }>()

  // The decoding should be reset whenever the user navigates between messages
  if (threadDetail !== previousPropToWatch) {
    setPreviousPropToWatch(threadDetail)
  }

  // A callback function that will listen to the discard or cancel event on the composer
  const messageOverviewListener = useCallback(
    (eventType: 'cancel' | 'discard') => {
      // TODO: Discard eventType is currently unused.
      if (eventType === 'cancel') {
        setSelectedIndex(undefined)
      }
    },
    []
  )

  const tabbedViewActive = isForwarding || isReplying

  const messagesTab = (
    <MessagesOverview
      labelIds={labelIds}
      tabbedViewActive={tabbedViewActive}
      threadDetail={threadDetail}
    >
      <MappedMessages
        indexMessageListener={(value) => {
          setSelectedIndex(value)
        }}
        setShouldRefreshDetail={setShouldRefreshDetail}
        threadDetail={threadDetail}
      />
    </MessagesOverview>
  )

  const showDetailOptions =
    threadDetail?.messages &&
    threadDetail.messages.length &&
    !isReplying &&
    !isForwarding

  return (
    <S.Wrapper tabbedView={tabbedViewActive}>
      <S.EmailDetailWrapper>
        <S.Placeholder tabbedView={tabbedViewActive} />
        <S.EmailWithComposerContainer>
          <S.Scroll>
            <S.EmailTopControlContainer tabbedView={tabbedViewActive}>
              <Tabs activeEmailList={activeEmailList} />
              {showNoNavigation ? (
                <EmailPosition />
              ) : (
                <DetailNavigationContainer activeEmailList={activeEmailList} />
              )}
            </S.EmailTopControlContainer>
            <RenderTab isVisible={overviewId === local.MESSAGES}>
              {messagesTab}
            </RenderTab>
            <RenderTab isVisible={overviewId === local.FILES}>
              <FilesOverview threadDetail={threadDetail} />
            </RenderTab>
          </S.Scroll>
          {isReplying && threadDetail && threadDetail?.messages ? (
            <ReplyComposer
              localThreadDetail={threadDetail}
              messageOverviewListener={messageOverviewListener}
              selectedIndex={selectedIndex}
            />
          ) : null}
          {isForwarding && threadDetail && threadDetail?.messages ? (
            <ForwardingComposer
              isForwarding={isForwarding}
              localThreadDetail={threadDetail}
              messageOverviewListener={messageOverviewListener}
              selectedIndex={selectedIndex}
            />
          ) : null}
        </S.EmailWithComposerContainer>
        {showDetailOptions ? (
          <EmailDetailOptions
            threadDetail={threadDetail}
            unsubscribeLink={getUnsubscribeLink({ threadDetail })}
          />
        ) : null}
      </S.EmailDetailWrapper>
    </S.Wrapper>
  )
}

export default RenderEmailDetail
