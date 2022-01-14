import React, { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import EmailListItem from '../EmailListItem/EmailListItem'
import { loadDraftList } from '../../Store/draftsSlice'
import { loadEmails, refreshEmailFeed, selectEmailList } from '../../Store/emailListSlice'
import { selectLabelIds, selectLoadedInbox } from '../../Store/labelsSlice'
import { selectIsLoading, selectServiceUnavailable } from '../../Store/utilsSlice'
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
import { setCurrentEmail, setViewIndex } from '../../Store/emailDetailSlice'

const EmailList = () => {
  const emailList = useAppSelector(selectEmailList)
  const isLoading = useAppSelector(selectIsLoading)
  const labelIds = useAppSelector(selectLabelIds)
  const loadedInbox = useAppSelector(selectLoadedInbox)
  const serviceUnavailable = useAppSelector(selectServiceUnavailable)
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    let mounted = true
    if (labelIds && labelIds.some((val) => loadedInbox.flat(1).indexOf(val) === -1) && !labelIds.includes(global.ARCHIVE_LABEL)) {
      const params = {
        labelIds,
        maxResults: global.MAX_RESULTS,
      }
      mounted && dispatch(loadEmails(params))
      if (labelIds.includes(draft.DRAFT_LABEL)) {
        mounted && dispatch(loadDraftList())
      }
    }
    return () => {
      mounted = false
    }
  }, [labelIds])

  useEffect(() => {
    dispatch(setCurrentEmail(''))
    dispatch(setViewIndex(-1))
  }, [])

  useEffect(() => {
    if (
      !location.pathname.includes(Routes.INBOX) &&
      labelIds &&
      labelIds.some((val) => loadedInbox.flat(1).indexOf(val) > -1) &&
      !labelIds.includes(global.ARCHIVE_LABEL)
    ) {
      if (emailList.length > 0 && emailList.filter((emailSubList) => emailSubList.labels?.includes(labelIds[0])).length > 0) {
        const params = {
          labelIds,
          maxResults: 500,
        }
        dispatch(refreshEmailFeed(params))
      }
    }
  }, [location])

  const renderEmailList = (filteredOnLabel: IEmailListObject) => {
    if (filteredOnLabel) {
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
            {nextPageToken ? (
              <S.LoadMoreContainer>
                {!isLoading && (
                  <CustomButton
                    className="juno-button juno-button-small juno-button-light"
                    disabled={isLoading}
                    onClick={() => loadNextPage({ nextPageToken, labelIds, dispatch })}
                    label={global.LOAD_MORE}
                  />
                )}
                {isLoading && <LoadingState />}
              </S.LoadMoreContainer>
            ) : (
              <S.LoadMoreContainer>
                <small className="text_muted">{global.NO_MORE_RESULTS}</small>
              </S.LoadMoreContainer>
            )}
          </GS.OuterContainer>
        </S.Scroll>
      )
    }
    return <EmptyState />
  }


  // Show the list of emails that are connected to the labelId mailbox.
  const emailListIndex = useMemo(
    () => emailList.findIndex((threadList) => threadList.labels && threadList.labels.includes(labelIds[0])),
    [emailList, labelIds]
  )

  const labeledInbox = () => {
    if (emailList && emailListIndex > -1) {
      return renderEmailList(emailList[emailListIndex])
    }
    return <EmptyState />
  }

  return (
    <>
      {labelIds.some((val) => loadedInbox.flat(1).indexOf(val) > -1) && labeledInbox()}
      {isLoading && labelIds.some((val) => loadedInbox.flat(1).indexOf(val) === -1) && (
        <LoadingState />
      )}
      {serviceUnavailable.length > 0 && <S.UnavailableContainer><span>{serviceUnavailable}</span></S.UnavailableContainer>}
    </>
  )
}

export default EmailList
