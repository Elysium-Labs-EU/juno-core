import { useCallback, useEffect, useMemo, useState } from 'react'

import * as global from '../../constants/globalConstants'
import * as keyConstants from '../../constants/keyConstants'
import useKeyPress from '../../hooks/useKeyPress'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectLabelIds } from '../../store/labelsSlice'
import { IEmailListObject } from '../../store/storeTypes/emailListTypes'
import {
  selectActiveModal,
  selectEmailListSize,
  selectInSearch,
  selectIsLoading,
} from '../../store/utilsSlice'
import * as GS from '../../styles/globalStyles'
import loadNextPage from '../../utils/loadNextPage'
import CustomButton from '../Elements/Buttons/CustomButton'
import EmptyState from '../Elements/EmptyState'
import LoadingState from '../Elements/LoadingState/LoadingState'
import * as S from './EmailListStyles'
import EmailListEmptyStates from './EmptyStates/EmailListEmptyStates'
import ThreadList from './ThreadList'

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
  const activeModal = useAppSelector(selectActiveModal)
  const ArrowDownListener = useKeyPress(keyConstants.KEY_ARROW_DOWN)
  const ArrowUpListener = useKeyPress(keyConstants.KEY_ARROW_UP)
  const KeyJListener = useKeyPress(keyConstants.KEY_J)
  const KeyKListener = useKeyPress(keyConstants.KEY_K)
  const EscapeListener = useKeyPress(keyConstants.KEY_ESCAPE)

  const { threads, nextPageToken } = filteredOnLabel

  const handleLoadMore = useCallback(
    () =>
      loadNextPage({
        nextPageToken,
        labelIds,
        dispatch,
        maxResults: emailFetchSize,
        fetchSimple: true,
      }),
    [nextPageToken, labelIds, emailFetchSize]
  )

  useEffect(() => {
    if (EscapeListener && !inSearch && !activeModal) {
      setFocusedItemIndex(-1)
    }
  }, [EscapeListener, inSearch, activeModal])

  useEffect(() => {
    if (
      (ArrowDownListener || KeyJListener) &&
      !inSearch &&
      !activeModal &&
      focusedItemIndex < filteredOnLabel.threads.length - 1
    ) {
      setFocusedItemIndex((prevState) => prevState + 1)
    }
  }, [ArrowDownListener, inSearch, activeModal, KeyJListener])

  useEffect(() => {
    if (
      (ArrowUpListener || KeyKListener) &&
      !inSearch &&
      !activeModal &&
      focusedItemIndex > -1
    ) {
      setFocusedItemIndex((prevState) => prevState - 1)
    }
  }, [ArrowUpListener, inSearch, activeModal, KeyKListener])

  // Listen to the thread count, if it reaches 0, but there is a nextPageToken
  // trigger automatically to load the next page.
  useEffect(() => {
    if (threads && threads.length === 0 && nextPageToken) {
      handleLoadMore()
    }
  }, [threads, nextPageToken])

  const memoizedThreadList = useMemo(
    () => (
      <S.ThreadList>
        {threads.length > 0 && (
          <GS.Base>
            <ThreadList
              threads={threads}
              focusedItemIndex={focusedItemIndex}
              setFocusedItemIndex={setFocusedItemIndex}
            />
          </GS.Base>
        )}
        {threads.length === 0 && (
          <EmptyState>
            <EmailListEmptyStates />
          </EmptyState>
        )}
      </S.ThreadList>
    ),
    [threads, focusedItemIndex]
  )

  const memoizedLoadMore = useMemo(
    () => (
      <S.LoadMoreContainer>
        {!isLoading && (
          <CustomButton
            disabled={isLoading}
            onClick={handleLoadMore}
            label={global.LOAD_MORE}
            suppressed
            title={global.LOAD_MORE}
          />
        )}
        {isLoading && <LoadingState />}
      </S.LoadMoreContainer>
    ),
    [isLoading, nextPageToken, labelIds, emailFetchSize]
  )

  return (
    <S.Scroll>
      <GS.OuterContainer>
        {memoizedThreadList}
        {nextPageToken && memoizedLoadMore}
        {!nextPageToken && threads.length > 0 && (
          <S.LoadMoreContainer>
            <GS.TextMutedSmall>{global.NO_MORE_RESULTS}</GS.TextMutedSmall>
          </S.LoadMoreContainer>
        )}
      </GS.OuterContainer>
    </S.Scroll>
  )
}

export default RenderEmailList
