import React, { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import EmailListItem from '../EmailListItem/EmailListItem'
import { loadDraftList } from '../../Store/draftsSlice'
import { loadEmails, refreshEmailFeed, selectEmailList } from '../../Store/emailListSlice'
import { selectLabelIds, selectLoadedInbox } from '../../Store/labelsSlice'
import { selectIsLoading } from '../../Store/utilsSlice'
import EmptyState from '../Elements/EmptyState'
import LoadingState from '../Elements/LoadingState'
import * as global from '../../constants/globalConstants'
import * as draft from '../../constants/draftConstants'
import { CustomButtonText } from '../Elements/Buttons'
import * as S from './EmailListStyles'
import * as GS from '../../styles/globalStyles'
import loadNextPage from '../../utils/loadNextPage'
import Routes from '../../constants/routes.json'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { EmailListObject } from '../../Store/emailListTypes'
import { LocationObjectType } from '../types/globalTypes'
import { setCurrentEmail, setViewIndex } from '../../Store/emailDetailSlice'

const EmailList = () => {
  const emailList = useAppSelector(selectEmailList)
  const isLoading = useAppSelector(selectIsLoading)
  const labelIds = useAppSelector(selectLabelIds)
  const loadedInbox = useAppSelector(selectLoadedInbox)
  const dispatch = useAppDispatch()
  const location = useLocation<LocationObjectType>()

  useEffect(() => {
    let mounted = true
    if (labelIds && labelIds.some((val) => loadedInbox.flat(1).indexOf(val) === -1)) {
      const params = {
        labelIds,
        maxResults: global.MAX_RESULTS,
      }
      mounted && dispatch(loadEmails(params))
      if (labelIds.includes(draft.LABEL)) {
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
      labelIds.some((val) => loadedInbox.flat(1).indexOf(val) > -1)
    ) {
      if (emailList.length > 0 && emailList.filter((emailSubList) => emailSubList.labels.includes(labelIds[0])).length > 0) {
        const params = {
          labelIds,
          maxResults: 500,
        }
        dispatch(refreshEmailFeed(params))
      }
    }
  }, [location])

  const renderEmailList = (filteredOnLabel: EmailListObject) => {
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
                  <CustomButtonText
                    className="juno-button juno-button-small juno-button-light"
                    disabled={isLoading}
                    onClick={() => loadNextPage({ nextPageToken, labelIds, dispatch })}
                    label={global.LOAD_OLDER}
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

  const emailListIndex = useMemo(
    () => emailList.findIndex((threadList) => threadList.labels.includes(labelIds[0])),
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
    </>
  )
}

export default EmailList
