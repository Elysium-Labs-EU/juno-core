import { useCallback, useEffect, useMemo, useState } from 'react'
import { match } from 'ts-pattern'

import CustomButton from 'components/Elements/Buttons/CustomButton'
import EmptyState from 'components/Elements/EmptyState/EmptyState'
import LoadingState from 'components/Elements/LoadingState/LoadingState'
import SelectedOptions from 'components/MainHeader/SelectedOptions/SelectedOptions'
import * as global from 'constants/globalConstants'
import * as keyConstants from 'constants/keyConstants'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import { selectSelectedEmails, setSelectedEmails } from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds } from 'store/labelsSlice'
import type { TEmailListObject } from 'store/storeTypes/emailListTypes'
import {
  selectActiveModal,
  selectEmailListSize,
  selectInSearch,
  selectIsLoading,
} from 'store/utilsSlice'
import { OuterContainer, Paragraph } from 'styles/globalStyles'
import handleChangeFocus from 'utils/handleChangeFocus'
import loadNextPage from 'utils/loadNextPage'
import multipleIncludes from 'utils/multipleIncludes'

import * as S from './EmailListStyles'
import EmailListEmptyStates from './EmptyStates/EmailListEmptyStates'
import ThreadList from './ThreadList'

const SOURCE_TAG_EMAILLIST = 'emailList-thread-list-item'

interface RenderEmailListProps {
  filteredOnLabel: TEmailListObject
  hasLargeHeader: boolean
}

const RenderEmailList = ({
  filteredOnLabel,
  hasLargeHeader,
}: RenderEmailListProps) => {
  const [focusedItemIndex, setFocusedItemIndex] = useState(-1)
  const dispatch = useAppDispatch()
  const activeModal = useAppSelector(selectActiveModal)
  const emailFetchSize = useAppSelector(selectEmailListSize)
  const inSearch = useAppSelector(selectInSearch)
  const isLoading = useAppSelector(selectIsLoading)
  const labelIds = useAppSelector(selectLabelIds)
  const selectedEmails = useAppSelector(selectSelectedEmails)

  const handleEscapeKeyDown = useCallback(() => {
    handleChangeFocus({
      focusedItemIndex,
      setFocusedItemIndex,
      sourceTag: SOURCE_TAG_EMAILLIST,
    })
    if (
      selectedEmails && selectedEmails.selectedIds.length > 0 &&
      multipleIncludes(selectedEmails.labelIds, labelIds)
    ) {
      dispatch(setSelectedEmails([]))
    }
  }, [dispatch, focusedItemIndex, labelIds, selectedEmails])

  const handleFocusDown = useCallback(() => {
    handleChangeFocus({
      direction: 'down',
      focusedItemIndex,
      setFocusedItemIndex,
      sourceTag: SOURCE_TAG_EMAILLIST,
    })
  }, [focusedItemIndex])

  const handleFocusUp = useCallback(() => {
    handleChangeFocus({
      direction: 'up',
      focusedItemIndex,
      setFocusedItemIndex,
      sourceTag: SOURCE_TAG_EMAILLIST,
    })
  }, [focusedItemIndex])

  const keyHandlers = {
    [keyConstants.KEY_SPECIAL.escape]: handleEscapeKeyDown,
    [keyConstants.KEY_ARROWS.down]: handleFocusDown,
    [keyConstants.KEY_LETTERS.j]: handleFocusDown,
    [keyConstants.KEY_ARROWS.up]: handleFocusUp,
    [keyConstants.KEY_LETTERS.k]: handleFocusUp,
  }

  Object.entries(keyHandlers).forEach(([key, handleEvent]) => {
    useKeyboardShortcut({
      handleEvent,
      key,
      isDisabled: inSearch || !!activeModal,
      refreshOnDeps: [focusedItemIndex],
    })
  })

  const { threads, nextPageToken } = filteredOnLabel

  const showSelectedOptions =
    selectedEmails && selectedEmails.selectedIds.length > 0 &&
    multipleIncludes(selectedEmails.labelIds, labelIds)

  const handleLoadMore = useCallback(
    () =>
      loadNextPage({
        nextPageToken,
        labelIds,
        dispatch,
        maxResults: emailFetchSize,
        fetchSimple: true,
      }),
    [emailFetchSize, labelIds, nextPageToken]
  )

  // Listen to the thread count, if it reaches 0, but there is a nextPageToken
  // trigger automatically to load the next page.
  useEffect(() => {
    if (threads.length === 0 && nextPageToken) {
      handleLoadMore()
    }
  }, [nextPageToken, threads])

  const memoizedFadeOrOptions = useMemo(
    () => (showSelectedOptions ? <SelectedOptions /> : <S.TopFade />),
    [showSelectedOptions]
  )

  const memoizedThreadList = useMemo(
    () => (
      <>
        {memoizedFadeOrOptions}
        <S.ThreadList>
          {match(threads.length > 0)
            .with(false, () => (
              <EmptyState>
                <EmailListEmptyStates />
              </EmptyState>
            ))
            .with(true, () => (
              <ThreadList
                focusedItemIndex={focusedItemIndex}
                keySuffix="emailList"
                setFocusedItemIndex={setFocusedItemIndex}
                showLabel={labelIds.includes(global.ARCHIVE_LABEL)}
                threads={threads}
              />
            ))
            .exhaustive()}
        </S.ThreadList>
      </>
    ),
    [focusedItemIndex, showSelectedOptions, threads]
  )

  const memoizedLoadMore = useMemo(
    () => (
      <S.LoadMoreContainer>
        {match(isLoading)
          .with(false, () => (
            <CustomButton
              disabled={isLoading}
              onClick={handleLoadMore}
              label={global.LOAD_MORE}
              suppressed
              title={global.LOAD_MORE}
            />
          ))
          .with(true, () => <LoadingState />)
          .exhaustive()}
      </S.LoadMoreContainer>
    ),
    [emailFetchSize, isLoading, labelIds, nextPageToken]
  )

  return (
    <OuterContainer>
      <S.Scroll hasLargeHeader={hasLargeHeader}>
        {memoizedThreadList}
        {nextPageToken && memoizedLoadMore}
        {!nextPageToken && threads.length > 0 && (
          <S.LoadMoreContainer>
            <Paragraph small muted>
              {global.NO_MORE_RESULTS}
            </Paragraph>
          </S.LoadMoreContainer>
        )}
      </S.Scroll>
    </OuterContainer>
  )
}

export default RenderEmailList
