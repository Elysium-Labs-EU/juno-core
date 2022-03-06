import { memo, useCallback, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import EmailListItem from '../EmailListItem/EmailListItem'
import { loadDraftList } from '../../Store/draftsSlice'
import {
  loadEmails,
  refreshEmailFeed,
  resetValuesEmailDetail,
  selectActiveEmailListIndex,
  selectEmailList,
  setActiveEmailListIndex,
} from '../../Store/emailListSlice'
import { selectLabelIds, selectLoadedInbox } from '../../Store/labelsSlice'
import {
  selectEmailListSize,
  selectIsLoading,
  selectServiceUnavailable,
} from '../../Store/utilsSlice'
import EmptyState from '../Elements/EmptyState'
import LoadingState from '../Elements/LoadingState'
import * as global from '../../constants/globalConstants'
import * as draft from '../../constants/draftConstants'
import CustomButton from '../Elements/Buttons/CustomButton'
import * as S from './EmailListStyles'
import * as GS from '../../styles/globalStyles'
import loadNextPage from '../../utils/loadNextPage'
import Routes from '../../constants/routes.json'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { IEmailListObject } from '../../Store/emailListTypes'
import getEmailListIndex from '../../utils/getEmailListIndex'

const RenderEmailList = ({
  filteredOnLabel,
}: {
  filteredOnLabel: IEmailListObject
}) => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  const labelIds = useAppSelector(selectLabelIds)
  const emailFetchSize = useAppSelector(selectEmailListSize)

  const { threads, nextPageToken } = filteredOnLabel
  return (
    <S.Scroll>
      <GS.OuterContainer>
        <S.ThreadList>
          {threads.length > 0 && (
            <GS.Base>
              {threads.map((email) => (
                <EmailListItem key={email.id} email={email} showLabel={false} />
              ))}
            </GS.Base>
          )}
          {threads.length === 0 && <EmptyState />}
        </S.ThreadList>

        {nextPageToken && (
          <S.LoadMoreContainer>
            {!isLoading && (
              <CustomButton
                disabled={isLoading}
                onClick={() =>
                  loadNextPage({
                    nextPageToken,
                    labelIds,
                    dispatch,
                    maxResults: emailFetchSize,
                  })
                }
                label={global.LOAD_MORE}
                suppressed
              />
            )}
            {isLoading && <LoadingState />}
          </S.LoadMoreContainer>
        )}
        {!nextPageToken && threads.length > 0 && (
          <S.LoadMoreContainer>
            <GS.TextMutedSmall>{global.NO_MORE_RESULTS}</GS.TextMutedSmall>
          </S.LoadMoreContainer>
        )}
      </GS.OuterContainer>
    </S.Scroll>
  )
}

const EmailList = () => {
  const emailList = useAppSelector(selectEmailList)
  const isLoading = useAppSelector(selectIsLoading)
  const emailFetchSize = useAppSelector(selectEmailListSize)
  const labelIds = useAppSelector(selectLabelIds)
  const loadedInbox = useAppSelector(selectLoadedInbox)
  const serviceUnavailable = useAppSelector(selectServiceUnavailable)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    let mounted = true
    if (labelIds && !labelIds.includes(global.ARCHIVE_LABEL)) {
      if (labelIds.some((val) => loadedInbox.flat(1).indexOf(val) === -1)) {
        const params = {
          labelIds,
          maxResults: emailFetchSize,
          nextPageToken: null,
        }

        mounted && dispatch(loadEmails(params))
        if (labelIds.includes(draft.DRAFT_LABEL)) {
          mounted && dispatch(loadDraftList())
        }
      }
      if (
        !location.pathname.includes(Routes.INBOX) &&
        labelIds.some((val) => loadedInbox.flat(1).indexOf(val) > -1)
      ) {
        if (
          emailList.length > 0 &&
          emailList.filter((emailSubList) =>
            emailSubList.labels?.includes(labelIds[0])
          ).length > 0
        ) {
          const params = {
            labelIds,
            maxResults: 500,
            nextPageToken: null,
          }
          mounted && dispatch(refreshEmailFeed(params))
          if (labelIds.includes(draft.DRAFT_LABEL)) {
            mounted && dispatch(loadDraftList())
          }
        }
      }
    }
    return () => {
      mounted = false
    }
  }, [labelIds])

  // Run a clean up function to ensure that the email detail values are always back to base.
  useEffect(() => {
    dispatch(resetValuesEmailDetail())
  }, [])

  const emailListIndex = useMemo(
    () => getEmailListIndex({ emailList, labelIds }),
    [emailList, labelIds]
  )

  // Sync the emailListIndex with Redux
  useEffect(() => {
    if (emailListIndex > -1 && activeEmailListIndex !== emailListIndex) {
      dispatch(setActiveEmailListIndex(emailListIndex))
    }
  }, [emailListIndex])

  const LabeledInbox = memo(() => {
    if (emailList && activeEmailListIndex > -1) {
      // Show the list of emails that are connected to the labelId mailbox.
      return (
        <RenderEmailList filteredOnLabel={emailList[activeEmailListIndex]} />
      )
    }
    return <EmptyState />
  })

  return (
    <>
      {labelIds.some((val) => loadedInbox.flat(1).indexOf(val) > -1) && (
        <LabeledInbox />
      )}
      {isLoading &&
        labelIds.some((val) => loadedInbox.flat(1).indexOf(val) === -1) && (
          <LoadingState />
        )}
      {serviceUnavailable.length > 0 && (
        <S.UnavailableContainer>
          <span>{serviceUnavailable}</span>
        </S.UnavailableContainer>
      )}
    </>
  )
}

export default EmailList
