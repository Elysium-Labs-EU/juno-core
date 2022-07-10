import { useEffect, useMemo, useState } from 'react'
import EmailListItem from '../EmailListItem/EmailListItem'
import { fetchDrafts } from '../../Store/draftsSlice'
import {
  fetchEmails,
  refreshEmailFeed,
  selectActiveEmailListIndex,
  selectEmailList,
  setActiveEmailListIndex,
} from '../../Store/emailListSlice'
import { selectLabelIds, selectLoadedInbox } from '../../Store/labelsSlice'
import {
  selectEmailListSize,
  selectInSearch,
  selectIsLoading,
  selectIsProcessing,
  selectServiceUnavailable,
} from '../../Store/utilsSlice'
import EmptyState from '../Elements/EmptyState'
import LoadingState from '../Elements/LoadingState/LoadingState'
import * as global from '../../constants/globalConstants'
import CustomButton from '../Elements/Buttons/CustomButton'
import * as S from './EmailListStyles'
import * as GS from '../../styles/globalStyles'
import loadNextPage from '../../utils/loadNextPage'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { IEmailListObject } from '../../Store/storeTypes/emailListTypes'
import getEmailListIndex from '../../utils/getEmailListIndex'
import isPromise from '../../utils/isPromise'
import useKeyPress from '../../Hooks/useKeyPress'
import handleSessionStorage from '../../utils/handleSessionStorage'
import { resetEmailDetail, selectViewIndex } from '../../Store/emailDetailSlice'
import EmailListEmptyStates from './EmptyStates/EmailListEmptyStates'

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
                  key={email?.id}
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
          {threads.length === 0 && (
            <EmptyState>
              <EmailListEmptyStates />
            </EmptyState>
          )}
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

const LabeledInbox = ({
  emailList,
  activeEmailListIndex,
}: {
  emailList: IEmailListObject[]
  activeEmailListIndex: number
}) => {
  if (emailList && activeEmailListIndex > -1) {
    // Show the list of emails that are connected to the labelId mailbox.
    return <RenderEmailList filteredOnLabel={emailList[activeEmailListIndex]} />
  }
  return <EmptyState />
}

const EmailList = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const emailList = useAppSelector(selectEmailList)
  const isLoading = useAppSelector(selectIsLoading)
  const isProcessing = useAppSelector(selectIsProcessing)
  const emailFetchSize = useAppSelector(selectEmailListSize)
  const labelIds = useAppSelector(selectLabelIds)
  const loadedInbox = useAppSelector(selectLoadedInbox)
  const serviceUnavailable = useAppSelector(selectServiceUnavailable)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  const viewIndex = useAppSelector(selectViewIndex)
  const dispatch = useAppDispatch()

  // If the box is empty, and the history feed is adding the item to the feed - there is no next page token and the feed is only that shallow item.

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
        if (labelIds.includes(global.DRAFT_LABEL) && mounted) {
          draftPromise = dispatch(fetchDrafts())
        }
      }
      if (labelIds.some((val) => loadedInbox.flat(1).indexOf(val) > -1)) {
        if (
          emailList.length > 0 &&
          emailList.filter((emailSubList) =>
            emailSubList.labels?.includes(labelIds[0])
          ).length > 0 &&
          viewIndex === -1
        ) {
          if (
            mounted &&
            Date.now() -
            (parseInt(handleSessionStorage(global.LAST_REFRESH), 10)
              ? parseInt(handleSessionStorage(global.LAST_REFRESH), 10)
              : 0) >
            global.MIN_DELAY_REFRESH &&
            !isRefreshing &&
            !isProcessing
          ) {
            setIsRefreshing(true)
            dispatch(refreshEmailFeed())
          }
          if (labelIds.includes(global.DRAFT_LABEL) && mounted) {
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
  }, [labelIds, window.location, viewIndex, isProcessing])

  // Run a clean up function to ensure that the email detail values are always back to base values.
  useEffect(() => {
    dispatch(resetEmailDetail())
  }, [dispatch])

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

  return (
    <>
      {labelIds.some((val) => loadedInbox.flat(1).indexOf(val) > -1) &&
        activeEmailListIndex > -1 && (
          <LabeledInbox
            emailList={emailList}
            activeEmailListIndex={activeEmailListIndex}
          />
        )}
      {(isLoading || activeEmailListIndex === -1) &&
        labelIds.some((val) => loadedInbox.flat(1).indexOf(val) === -1) && (
          <LoadingState />
        )}
      {serviceUnavailable && serviceUnavailable.length > 0 && (
        <S.UnavailableContainer>
          <span>{serviceUnavailable}</span>
        </S.UnavailableContainer>
      )}
    </>
  )
}

export default EmailList
