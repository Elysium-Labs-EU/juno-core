import { useCallback, useEffect, useMemo, useState } from 'react'

import CustomButton from 'components/Elements/Buttons/CustomButton'
import EmptyState from 'components/Elements/EmptyState'
import LoadingState from 'components/Elements/LoadingState/LoadingState'
import * as global from 'constants/globalConstants'
import * as keyConstants from 'constants/keyConstants'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import { selectSelectedEmails, setSelectedEmails } from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds } from 'store/labelsSlice'
import { IEmailListObject } from 'store/storeTypes/emailListTypes'
import {
  selectActiveModal,
  selectEmailListSize,
  selectInSearch,
  selectIsLoading,
} from 'store/utilsSlice'
import * as GS from 'styles/globalStyles'
import handleChangeFocus from 'utils/handleChangeFocus'
import loadNextPage from 'utils/loadNextPage'
import multipleIncludes from 'utils/multipleIncludes'

import * as S from './EmailListStyles'
import EmailListEmptyStates from './EmptyStates/EmailListEmptyStates'
import ThreadList from './ThreadList'

const SOURCE_TAG_EMAILLIST = 'emailList-thread-list-item'

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
  const selectedEmails = useAppSelector(selectSelectedEmails)

  const handleEscapeKeyDown = useCallback(() => {
    handleChangeFocus({
      focusedItemIndex,
      setFocusedItemIndex,
      sourceTag: SOURCE_TAG_EMAILLIST,
    })
    if (
      selectedEmails.selectedIds.length > 0 &&
      multipleIncludes(selectedEmails.labelIds, labelIds)
    ) {
      dispatch(setSelectedEmails([]))
    }
  }, [focusedItemIndex, selectedEmails, labelIds, dispatch])

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

  useKeyboardShortcut({
    handleEvent: handleEscapeKeyDown,
    actionKeys: [keyConstants.KEY_SPECIAL.escape],
    isDisabled: inSearch || !!activeModal,
    refreshOnDeps: [selectedEmails],
  })

  useKeyboardShortcut({
    handleEvent: handleFocusDown,
    actionKeys: [keyConstants.KEY_ARROWS.down],
    isDisabled: inSearch || !!activeModal,
    refreshOnDeps: [focusedItemIndex],
  })
  useKeyboardShortcut({
    handleEvent: handleFocusDown,
    actionKeys: [keyConstants.KEY_LETTERS.j],
    isDisabled: inSearch || !!activeModal,
    refreshOnDeps: [focusedItemIndex],
  })
  useKeyboardShortcut({
    handleEvent: handleFocusUp,
    actionKeys: [keyConstants.KEY_ARROWS.up],
    isDisabled: inSearch || !!activeModal,
    refreshOnDeps: [focusedItemIndex],
  })
  useKeyboardShortcut({
    handleEvent: handleFocusUp,
    actionKeys: [keyConstants.KEY_LETTERS.k],
    isDisabled: inSearch || !!activeModal,
    refreshOnDeps: [focusedItemIndex],
  })

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
              keySuffix="emailList"
              focusedItemIndex={focusedItemIndex}
              setFocusedItemIndex={setFocusedItemIndex}
              showLabel={labelIds.includes(global.ARCHIVE_LABEL)}
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
            <GS.P small muted>
              {global.NO_MORE_RESULTS}
            </GS.P>
          </S.LoadMoreContainer>
        )}
      </GS.OuterContainer>
    </S.Scroll>
  )
}

export default RenderEmailList
