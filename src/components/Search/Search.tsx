import { useEffect, useRef, useState } from 'react'
import * as React from 'react'
import Modal from '@mui/material/Modal'
import InputBase from '@mui/material/InputBase'
import { FiSearch, FiX, FiXCircle } from 'react-icons/fi'
import * as S from './SearchStyles'
import * as GS from '../../styles/globalStyles'
import * as global from '../../constants/globalConstants'
import * as keyConstants from '../../constants/keyConstants'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  selectInSearch,
  setInSearch,
  setServiceUnavailable,
} from '../../store/utilsSlice'
import threadApi from '../../data/threadApi'
import {
  IEmailListObject,
  IEmailListObjectSearch,
  IEmailListThreadItem,
} from '../../store/storeTypes/emailListTypes'
import LoadingState from '../Elements/LoadingState/LoadingState'
import CustomButton from '../Elements/Buttons/CustomButton'
import sortThreads from '../../utils/sortThreads'
import { selectSearchList, useSearchResults } from '../../store/emailListSlice'
import CustomIconButton from '../Elements/Buttons/CustomIconButton'
import useKeyPress from '../../hooks/useKeyPress'
import { AppDispatch } from '../../store/store'
import ThreadList from '../EmailList/ThreadList'

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
  searchResults: IEmailListObjectSearch
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
  searchResults: IEmailListObjectSearch
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
  const [searchResults, setSearchResults] = useState<IEmailListObjectSearch>()
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

  const resetSearch = () => {
    setSearchValue('')
    setSearchResults(undefined)
    setLoadState(global.LOAD_STATE_MAP.idle)
    if (searchInputRef.current !== null) {
      searchInputRef.current.focus()
    }
  }

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

  // TODO: Refactor search
  const fetchSearchThreads = async (searchBody: any) => {
    try {
      const response = await threadApi({}).getSimpleThreads(searchBody)
      if ((response.data?.resultSizeEstimate ?? 0) > 0) {
        const buffer: IEmailListThreadItem[] = []
        const loadCount = response.data.threads.length
        const { threads }: IEmailListObject = response.data

        threads.forEach(async (item) => {
          const threadDetail = await threadApi({}).getThreadDetail(item.id)
          buffer.push(threadDetail)
          if (buffer.length === loadCount) {
            if (searchValueRef.current !== searchValue) {
              setLoadState(global.LOAD_STATE_MAP.loaded)
              searchValueRef.current = searchValue
              const newStateObject = {
                q: searchBody.q,
                threads: sortThreads(buffer),
                nextPageToken: response.nextPageToken ?? null,
              }
              setSearchResults(newStateObject)
              setLoadState(global.LOAD_STATE_MAP.loaded)
              return
            }
            if (searchResults && searchResults.threads.length > 0) {
              const newStateObject = {
                threads: sortThreads(searchResults.threads.concat(buffer)),
                nextPageToken: response.nextPageToken ?? null,
              }
              setSearchResults(newStateObject)
              setLoadState(global.LOAD_STATE_MAP.loaded)
            }
          }
        })
      } else {
        setLoadState(global.LOAD_STATE_MAP.loaded)
      }
    } catch (err) {
      dispatch(setServiceUnavailable(global.ERROR_MESSAGE))
    }
  }

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
            <FiSearch size={24} />
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
              icon={<FiXCircle size={16} />}
              title="Clear search input"
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
            icon={<FiX size={16} />}
            title="Close"
          />
        </S.InputRow>

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
                  <GS.TextMutedSmall>
                    {global.NO_MORE_RESULTS}
                  </GS.TextMutedSmall>
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
      </S.Dialog>
    </Modal>
  )
}

export default Search
