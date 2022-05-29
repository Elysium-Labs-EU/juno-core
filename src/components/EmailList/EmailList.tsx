import { memo, useEffect, useMemo, useState } from 'react'
import EmailListItem from '../EmailListItem/EmailListItem'
import { fetchDrafts } from '../../Store/draftsSlice'
import {
  fetchEmails,
  refreshEmailFeed,
  resetValuesEmailDetail,
  selectActiveEmailListIndex,
  selectEmailList,
  setActiveEmailListIndex,
} from '../../Store/emailListSlice'
import { selectLabelIds, selectLoadedInbox } from '../../Store/labelsSlice'
import {
  selectEmailListSize,
  selectInSearch,
  selectIsLoading,
  selectServiceUnavailable,
} from '../../Store/utilsSlice'
import EmptyState from '../Elements/EmptyState'
import LoadingState from '../Elements/LoadingState/LoadingState'
import * as global from '../../constants/globalConstants'
import * as draft from '../../constants/draftConstants'
import CustomButton from '../Elements/Buttons/CustomButton'
import * as S from './EmailListStyles'
import * as GS from '../../styles/globalStyles'
import loadNextPage from '../../utils/loadNextPage'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { IEmailListObject } from '../../Store/emailListTypes'
import getEmailListIndex from '../../utils/getEmailListIndex'
import isPromise from '../../utils/isPromise'
import useKeyPress from '../../Hooks/useKeyPress'
import handleSessionStorage from '../../utils/handleSessionStorage'

const RenderEmailList = ({
  filteredOnLabel,
}: {
  filteredOnLabel: IEmailListObject
}) => {
  const [focusedItemIndex, setFocusedItemIndex] = useState(-1)
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  const labelIds = useAppSelector(selectLabelIds)
  const emailFetchSize = useAppSelector(selectEmailListSize)
  const inSearch = useAppSelector(selectInSearch)
  const ArrowDownListener = useKeyPress(global.KEY_ARROW_DOWN)
  const ArrowUpListener = useKeyPress(global.KEY_ARROW_UP)
  const EscapeListener = useKeyPress(global.KEY_ESCAPE)

  useEffect(() => {
    if (EscapeListener && !inSearch) {
      setFocusedItemIndex(-1)
    }
  }, [EscapeListener, inSearch])

  useEffect(() => {
    if (
      ArrowDownListener &&
      !inSearch &&
      focusedItemIndex < filteredOnLabel.threads.length - 1
    ) {
      setFocusedItemIndex((prevState) => prevState + 1)
    }
  }, [ArrowDownListener, inSearch])

  useEffect(() => {
    if (ArrowUpListener && !inSearch) {
      setFocusedItemIndex((prevState) => prevState - 1)
    }
  }, [ArrowUpListener, inSearch])

  const { threads, nextPageToken } = filteredOnLabel
  return (
    <S.Scroll>
      <GS.OuterContainer>
        <S.ThreadList>
          {threads.length > 0 && (
            <GS.Base>
              {threads.map((email, index) => (
                <div
                  key={email.id}
                  onFocus={() => setFocusedItemIndex(index)}
                  onMouseOver={() => setFocusedItemIndex(index)}
                  aria-hidden="true"
                >
                  <EmailListItem
                    email={email}
                    showLabel={false}
                    index={index}
                    activeIndex={focusedItemIndex}
                  />
                </div>
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
  const [isRefreshing, setIsRefreshing] = useState(false)
  const emailList = useAppSelector(selectEmailList)
  const isLoading = useAppSelector(selectIsLoading)
  const emailFetchSize = useAppSelector(selectEmailListSize)
  const labelIds = useAppSelector(selectLabelIds)
  const loadedInbox = useAppSelector(selectLoadedInbox)
  const serviceUnavailable = useAppSelector(selectServiceUnavailable)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  const dispatch = useAppDispatch()

  useEffect(() => {
    let mounted = true
    let emailPromise: any = {}
    let draftPromise: any = {}
    if (labelIds && !labelIds.includes(global.ARCHIVE_LABEL)) {
      if (labelIds.some((val) => loadedInbox.flat(1).indexOf(val) === -1)) {
        const params = {
          labelIds,
          maxResults: emailFetchSize,
          nextPageToken: null,
        }

        if (mounted) {
          emailPromise = dispatch(fetchEmails(params))
        }
        if (labelIds.includes(draft.DRAFT_LABEL) && mounted) {
          draftPromise = dispatch(fetchDrafts())
        }
      }
      if (labelIds.some((val) => loadedInbox.flat(1).indexOf(val) > -1)) {
        if (
          emailList.length > 0 &&
          emailList.filter((emailSubList) =>
            emailSubList.labels?.includes(labelIds[0])
          ).length > 0
        ) {
          if (
            mounted &&
            Date.now() -
              (parseInt(handleSessionStorage(global.LAST_REFRESH), 10)
                ? parseInt(handleSessionStorage(global.LAST_REFRESH), 10)
                : 0) >
              global.MIN_DELAY_REFRESH &&
            !isRefreshing
          ) {
            setIsRefreshing(true)
            dispatch(refreshEmailFeed())
          }
          if (labelIds.includes(draft.DRAFT_LABEL) && mounted) {
            draftPromise = dispatch(fetchDrafts())
          }
        }
      }
    }
    return () => {
      mounted = false
      if (isPromise(emailPromise)) {
        emailPromise.abort()
      }
      if (isPromise(draftPromise)) {
        draftPromise.abort()
      }
    }
  }, [labelIds, window.location])

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
