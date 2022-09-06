import * as React from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import InputBase from '@mui/material/InputBase'
import Modal from '@mui/material/Modal'

import * as global from '../../constants/globalConstants'
import * as keyConstants from '../../constants/keyConstants'
import threadApi from '../../data/threadApi'
import useKeyPress from '../../hooks/useKeyPress'
import { QiDiscard, QiEscape, QiSearch } from '../../images/svgIcons/quillIcons'
import { selectSearchList, useSearchResults } from '../../store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { AppDispatch } from '../../store/store'
import { IEmailListObject } from '../../store/storeTypes/emailListTypes'
import {
  selectInSearch,
  setInSearch,
  setServiceUnavailable,
} from '../../store/utilsSlice'
import * as GS from '../../styles/globalStyles'
import sortThreads from '../../utils/sortThreads'
import CustomButton from '../Elements/Buttons/CustomButton'
import CustomIconButton from '../Elements/Buttons/CustomIconButton'
import LoadingState from '../Elements/LoadingState/LoadingState'
import ThreadList from '../EmailList/ThreadList'
import * as S from './SearchStyles'

const ENTER_TO_SEARCH = 'Enter to Search'

interface IShouldClearOutPreviousResults {
  searchValueRef: any
  searchValue: string
  setSearchResults: Function
  dispatch: AppDispatch
}
interface IIntitialSearch {
  searchValue: string
  setLoadState: (value: string) => void
  fetchSearchThreads: Function
  searchValueRef: any
  setSearchResults: Function
  dispatch: AppDispatch
}
interface ILoadMoreSearchResults {
  searchValue: string
  searchResults: IEmailListObject
  setLoadState: (value: string) => void
  fetchSearchThreads: Function
}

const SEARCH = 'Search'

const shouldClearOutPreviousResults = ({
  searchValueRef,
  searchValue,
  setSearchResults,
}: IShouldClearOutPreviousResults) => {
  if (
    searchValueRef.current !== searchValue &&
    searchValueRef.current.length > 0
  ) {
    setSearchResults(undefined)
  }
}

const intitialSearch = ({
  searchValue,
  setLoadState,
  fetchSearchThreads,
  searchValueRef,
  setSearchResults,
  dispatch,
}: IIntitialSearch) => {
  const searchBody = {
    q: searchValue,
  }
  setLoadState(global.LOAD_STATE_MAP.loading)
  shouldClearOutPreviousResults({
    searchValueRef,
    searchValue,
    setSearchResults,
    dispatch,
  })
  fetchSearchThreads(searchBody)
}

export const loadMoreSearchResults = ({
  searchValue,
  searchResults,
  setLoadState,
  fetchSearchThreads,
}: ILoadMoreSearchResults) => {
  const searchBody = {
    q: searchValue,
    nextPageToken: searchResults?.nextPageToken,
  }
  setLoadState(global.LOAD_STATE_MAP.loading)
  fetchSearchThreads(searchBody)
}

const openDetail = ({
  dispatch,
  searchResults,
  currentEmail,
}: {
  dispatch: AppDispatch
  searchResults: IEmailListObject
  currentEmail: string
}) => {
  dispatch(useSearchResults({ searchResults, currentEmail }))
  dispatch(setInSearch(false))
}

const handleClose = (dispatch: AppDispatch) => dispatch(setInSearch(false))

const Search = () => {
  const [focusedItemIndex, setFocusedItemIndex] = useState(-1)
  const [searchValue, setSearchValue] = useState('')
  const searchValueRef = useRef('')
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const [searchResults, setSearchResults] = useState<IEmailListObject>()
  const [loadState, setLoadState] = useState(global.LOAD_STATE_MAP.idle)
  const dispatch = useAppDispatch()
  const isSearching = useAppSelector(selectInSearch)
  const searchList = useAppSelector(selectSearchList)
  const ArrowDownListener = useKeyPress(keyConstants.KEY_ARROW_DOWN)
  const ArrowUpListener = useKeyPress(keyConstants.KEY_ARROW_UP)
  const EscapeListener = useKeyPress(keyConstants.KEY_ESCAPE)

  useEffect(() => {
    if (EscapeListener) {
      setFocusedItemIndex(-1)
    }
  }, [EscapeListener])

  useEffect(() => {
    if (ArrowDownListener) {
      setFocusedItemIndex((prevState) => prevState + 1)
    }
  }, [ArrowDownListener])

  useEffect(() => {
    if (ArrowUpListener) {
      setFocusedItemIndex((prevState) => prevState - 1)
    }
  }, [ArrowUpListener])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const resetSearch = useCallback(() => {
    setSearchValue('')
    searchValueRef.current = ''
    setSearchResults(undefined)
    // TODO: Clear out the search results from Redux
    // dispatch(setSearchResults())
    setLoadState(global.LOAD_STATE_MAP.idle)
    if (searchInputRef.current !== null) {
      searchInputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    let mounted = true
    if (
      searchList &&
      (searchResults?.threads.length ?? 0) < searchList.threads.length
    ) {
      mounted && setSearchResults(searchList)
    }
    return () => {
      mounted = false
    }
  }, [searchList])

  const fetchSearchThreads = useCallback(
    async (searchBody: { q: string; nextPageToken?: string }) => {
      const searchBodyWithNextPageToken = {
        q: searchBody.q,
        nextPageToken: searchBody?.nextPageToken ?? null,
      }
      try {
        const response = await threadApi({}).getSimpleThreads(
          searchBodyWithNextPageToken
        )
        if (response?.data?.resultSizeEstimate > 0) {
          const { threads, nextPageToken }: IEmailListObject = response.data
          // If there is no prior search - use this.
          if (searchValueRef.current !== searchValue) {
            searchValueRef.current = searchValue
            const newStateObject = {
              q: searchBody.q,
              threads: sortThreads(threads),
              nextPageToken: nextPageToken ?? null,
              labels: [global.SEARCH_LABEL],
            }
            setSearchResults(newStateObject)
            setLoadState(global.LOAD_STATE_MAP.loaded)
            return
          }
          // If there is already a search result use this
          if (searchResults && searchResults.threads.length > 0) {
            const newStateObject = {
              threads: sortThreads(searchResults.threads.concat(threads)),
              nextPageToken: nextPageToken ?? null,
              labels: [global.SEARCH_LABEL],
            }
            setSearchResults(newStateObject)
            setLoadState(global.LOAD_STATE_MAP.loaded)
          }
        } else {
          setLoadState(global.LOAD_STATE_MAP.error)
        }
      } catch (err) {
        setLoadState(global.LOAD_STATE_MAP.error)
        dispatch(setServiceUnavailable(global.ERROR_MESSAGE))
      }
    },
    [loadState, searchValueRef, searchValue, searchResults]
  )

  const handleOpenEvent = (threadId: string) => {
    if (searchResults) {
      openDetail({
        dispatch,
        searchResults,
        currentEmail: threadId,
      })
    }
  }

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code.toUpperCase() === keyConstants.KEY_ENTER) {
      if (searchValue.length > 1 && searchValue !== searchValueRef.current) {
        intitialSearch({
          searchValue,
          setLoadState,
          fetchSearchThreads,
          searchValueRef,
          setSearchResults,
          dispatch,
        })
      } else if (searchResults && focusedItemIndex > -1) {
        handleOpenEvent(searchResults.threads[focusedItemIndex].id)
      }
    }
  }

  const memoizedSearchResults = useMemo(
    () => (
      <S.SearchResults>
        {searchResults && searchResults?.threads ? (
          <>
            <ThreadList
              threads={searchResults.threads}
              focusedItemIndex={focusedItemIndex}
              setFocusedItemIndex={setFocusedItemIndex}
              showLabel
              keySuffix="search"
              searchOnClickHandeler={handleOpenEvent}
            />
            {searchResults.nextPageToken ? (
              <S.FooterRow>
                {loadState !== global.LOAD_STATE_MAP.loading && (
                  <CustomButton
                    onClick={() =>
                      loadMoreSearchResults({
                        searchValue,
                        searchResults,
                        setLoadState,
                        fetchSearchThreads,
                      })
                    }
                    label={global.LOAD_MORE}
                    suppressed
                    title="Load more results"
                  />
                )}
                {loadState === global.LOAD_STATE_MAP.loading && (
                  <LoadingState />
                )}
              </S.FooterRow>
            ) : (
              <S.FooterRow>
                <GS.TextMutedSmall>{global.NO_MORE_RESULTS}</GS.TextMutedSmall>
              </S.FooterRow>
            )}
          </>
        ) : (
          <S.NoSearchResults>
            {loadState === global.LOAD_STATE_MAP.loading ? (
              <LoadingState />
            ) : (
              <div>
                <span>{ENTER_TO_SEARCH}</span>
                <GS.TextMutedParagraph>
                  {global.NOTHING_TO_SEE}
                </GS.TextMutedParagraph>
              </div>
            )}
          </S.NoSearchResults>
        )}
      </S.SearchResults>
    ),
    [loadState, searchResults, focusedItemIndex]
  )

  return (
    <Modal
      open={isSearching}
      onClose={() => handleClose(dispatch)}
      aria-labelledby="modal-search"
      aria-describedby="modal-search-box"
    >
      <S.Dialog>
        <S.InputRow>
          <S.Icon>
            <QiSearch size={24} />
          </S.Icon>
          <InputBase
            id="search"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
            autoFocus={isSearching}
            inputRef={searchInputRef}
            onKeyDown={keyDownHandler}
            fullWidth
          />
          {searchValue.length > 0 && (
            <CustomIconButton
              onClick={resetSearch}
              aria-label="clear-search"
              icon={<QiDiscard size={16} />}
              title="Clear search input and results"
            />
          )}
          <CustomButton
            onClick={() =>
              intitialSearch({
                searchValue,
                setLoadState,
                fetchSearchThreads,
                searchValueRef,
                setSearchResults,
                dispatch,
              })
            }
            disabled={
              searchValue.length < 1 || searchValue === searchValueRef.current
            }
            label={SEARCH}
            style={{ marginRight: '10px' }}
            title="Search"
          />
          <CustomIconButton
            onClick={() => handleClose(dispatch)}
            aria-label="close-modal"
            icon={<QiEscape size={16} />}
            title="Close"
          />
        </S.InputRow>
        {memoizedSearchResults}
      </S.Dialog>
    </Modal>
  )
}

export default Search
