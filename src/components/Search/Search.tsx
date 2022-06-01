import { useEffect, useRef, useState } from 'react'
import * as React from 'react'
import Modal from '@mui/material/Modal'
import InputBase from '@mui/material/InputBase'
import { FiSearch, FiX } from 'react-icons/fi'
import * as S from './SearchStyles'
import * as GS from '../../styles/globalStyles'
import * as global from '../../constants/globalConstants'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import {
  selectInSearch,
  setInSearch,
  setServiceUnavailable,
} from '../../Store/utilsSlice'
import threadApi from '../../data/threadApi'
import {
  IEmailListObject,
  IEmailListObjectSearch,
  IEmailListThreadItem,
} from '../../Store/storeTypes/emailListTypes'
import EmailListItem from '../EmailListItem/EmailListItem'
import LoadingState from '../Elements/LoadingState/LoadingState'
import CustomButton from '../Elements/Buttons/CustomButton'
import sortThreads from '../../utils/sortThreads'
import { selectSearchList, useSearchResults } from '../../Store/emailListSlice'
import CustomIconButton from '../Elements/Buttons/CustomIconButton'
import useKeyPress from '../../Hooks/useKeyPress'

const ENTER_TO_SEARCH = 'Enter to Search'

interface IShouldClearOutPreviousResults {
  searchValueRef: any
  searchValue: string
  setSearchResults: Function
  dispatch: Function
}
interface IIntitialSearch {
  searchValue: string
  setLoadState: Function
  fetchSearchThreads: Function
  searchValueRef: any
  setSearchResults: Function
  dispatch: Function
}
interface ILoadMoreSearchResults {
  searchValue: string
  searchResults: IEmailListObjectSearch
  setLoadState: Function
  fetchSearchThreads: Function
}

const SEARCH = 'Search'
const SEARCH_STATE = {
  IDLE: 'Idle',
  LOADING: 'Loading',
  LOADED: 'Loaded',
}

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
  setLoadState(SEARCH_STATE.LOADING)
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
  setLoadState(SEARCH_STATE.LOADING)
  fetchSearchThreads(searchBody)
}

const openDetail = ({
  dispatch,
  searchResults,
  currentEmail,
}: {
  dispatch: Function
  searchResults: IEmailListObjectSearch
  currentEmail: string
}) => {
  dispatch(useSearchResults({ searchResults, currentEmail }))
  dispatch(setInSearch(false))
}

const handleClose = (dispatch: Function) => dispatch(setInSearch(false))

const Search = () => {
  const [focusedItemIndex, setFocusedItemIndex] = useState(-1)
  const [searchValue, setSearchValue] = useState('')
  const searchValueRef = useRef('')
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const [searchResults, setSearchResults] = useState<IEmailListObjectSearch>()
  const [loadState, setLoadState] = useState(SEARCH_STATE.IDLE)
  const dispatch = useAppDispatch()
  const isSearching = useAppSelector(selectInSearch)
  const searchList = useAppSelector(selectSearchList)
  const ArrowDownListener = useKeyPress(global.KEY_ARROW_DOWN)
  const ArrowUpListener = useKeyPress(global.KEY_ARROW_UP)
  const EscapeListener = useKeyPress(global.KEY_ESCAPE)

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
    setLoadState(SEARCH_STATE.IDLE)
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

  const fetchSearchThreads = async (searchBody: any) => {
    try {
      const response: IEmailListObject = await threadApi({}).getThreads(
        searchBody
      )
      if ((response?.resultSizeEstimate ?? 0) > 0) {
        const buffer: IEmailListThreadItem[] = []
        const loadCount = response.threads.length

        response.threads.forEach(async (item) => {
          const threadDetail = await threadApi({}).getThreadDetail(item.id)
          buffer.push(threadDetail)
          if (buffer.length === loadCount) {
            if (searchValueRef.current !== searchValue) {
              searchValueRef.current = searchValue
              const newStateObject = {
                q: searchBody.q,
                threads: sortThreads(buffer),
                nextPageToken: response.nextPageToken ?? null,
              }
              setSearchResults(newStateObject)
              setLoadState(SEARCH_STATE.LOADED)
              return
            }
            if (searchResults && searchResults.threads.length > 0) {
              const newStateObject = {
                threads: sortThreads(searchResults.threads.concat(buffer)),
                nextPageToken: response.nextPageToken ?? null,
              }
              setSearchResults(newStateObject)
              setLoadState(SEARCH_STATE.LOADED)
            }
          }
        })
      } else {
        setLoadState(SEARCH_STATE.LOADED)
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
    if (event.code.toUpperCase() === global.KEY_ENTER) {
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
              icon={<FiX size={16} />}
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
          />
        </S.InputRow>
        <S.SearchResults>
          {searchResults && searchResults.threads ? (
            <>
              {searchResults.threads.map((thread, index) => (
                <div
                  key={`${thread.id}-search`}
                  onClick={() => handleOpenEvent(thread.id)}
                  onFocus={() => setFocusedItemIndex(index)}
                  onMouseOver={() => setFocusedItemIndex(index)}
                  aria-hidden="true"
                >
                  <EmailListItem
                    email={thread}
                    showLabel
                    index={index}
                    activeIndex={focusedItemIndex}
                  />
                </div>
              ))}
              {searchResults.nextPageToken ? (
                <S.FooterRow>
                  {loadState !== SEARCH_STATE.LOADING && (
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
                    />
                  )}
                  {loadState === SEARCH_STATE.LOADING && <LoadingState />}
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
              {loadState === SEARCH_STATE.LOADING ? (
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
