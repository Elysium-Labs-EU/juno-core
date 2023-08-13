import { useState } from 'react'
import { useParams } from 'react-router-dom'

import Stack from 'components/Elements/Stack/Stack'
import * as local from 'constants/emailDetailConstants'
import { useAppSelector } from 'store/hooks'
import { selectLabelIds } from 'store/labelsSlice'

import EmailDetailOptions from './EmailDetailOptions'
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
  const labelIds = useAppSelector(selectLabelIds)
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

  const messagesTab = (
    <MessagesOverview
      labelIds={labelIds}
      threadDetail={threadDetail}
    >
      <MappedMessages
        setShouldRefreshDetail={setShouldRefreshDetail}
        threadDetail={threadDetail}
      />
    </MessagesOverview>
  )

  const showDetailOptions =
    threadDetail?.messages.length

  return (
    <S.Wrapper>
      <S.EmailDetailWrapper>
        <S.Placeholder />
        <S.EmailContainer>
          <S.Scroll>
            <S.EmailTopControlContainer>
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
        </S.EmailContainer>
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
