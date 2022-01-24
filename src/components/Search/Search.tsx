import { useRef, useState } from 'react'
import * as React from 'react'
import Modal from '@mui/material/Modal'
import InputBase from '@mui/material/InputBase'
import { FiSearch, FiX } from 'react-icons/fi'
import * as S from './SearchStyles'
import * as GS from '../../styles/globalStyles'
import * as global from '../../constants/globalConstants'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { selectIsSearching, setIsSearching } from '../../Store/utilsSlice'
import threadApi from '../../data/threadApi'
import {
  IEmailListObject,
  IEmailListObjectSearch,
  IEmailListThreadItem,
} from '../../Store/emailListTypes'
import EmailListItem from '../EmailListItem/EmailListItem'
import LoadingState from '../Elements/LoadingState'
import CustomButton from '../Elements/Buttons/CustomButton'
import sortThreads from '../../utils/sortThreads'
import { setViewIndex } from '../../Store/emailDetailSlice'
import {
  listClearSearchResults,
  storeSearchResults,
} from '../../Store/emailListSlice'
import CustomIconButton from '../Elements/Buttons/CustomIconButton'

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
interface ILoadMoreResults {
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
  dispatch,
}: IShouldClearOutPreviousResults) => {
  if (
    searchValueRef.current !== searchValue &&
    searchValueRef.current.length > 0
  ) {
    setSearchResults(undefined)
    dispatch(listClearSearchResults())
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

const loadMoreResults = ({
  searchValue,
  searchResults,
  setLoadState,
  fetchSearchThreads,
}: ILoadMoreResults) => {
  const searchBody = {
    q: searchValue,
    nextPageToken: searchResults?.nextPageToken,
  }
  setLoadState(SEARCH_STATE.LOADING)
  fetchSearchThreads(searchBody)
}

// Reset viewIndex to have emailDetail reassess its viewIndex
const openDetail = (dispatch: Function) => {
  dispatch(setIsSearching(false))
  dispatch(setViewIndex(-1))
}

const handleClose = (dispatch: Function) => dispatch(setIsSearching(false))

const Search = () => {
  const [searchValue, setSearchValue] = useState('')
  const searchValueRef = useRef('')
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const [searchResults, setSearchResults] = useState<IEmailListObjectSearch>()
  const [loadState, setLoadState] = useState(SEARCH_STATE.IDLE)
  const dispatch = useAppDispatch()
  const isSearching = useAppSelector(selectIsSearching)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const resetSearch = () => {
    setSearchValue('')
    setSearchResults(undefined)
    setLoadState(SEARCH_STATE.IDLE)
    dispatch(listClearSearchResults())
    if (searchInputRef.current !== null) {
      searchInputRef.current.focus()
    }
  }

  const fetchSearchThreads = async (searchBody: any) => {
    const response: IEmailListObject = await threadApi().getThreads(searchBody)
    if (response?.threads.length > 0) {
      const buffer: IEmailListThreadItem[] = []
      const loadCount = response.threads.length

      response.threads.forEach(async (item) => {
        const threadDetail = await threadApi().getThreadDetail(item.id)
        buffer.push(threadDetail)
        if (buffer.length === loadCount) {
          setLoadState(SEARCH_STATE.LOADED)
          if (searchValueRef.current !== searchValue) {
            searchValueRef.current = searchValue
            const newStateObject = {
              threads: sortThreads(buffer),
              nextPageToken: response.nextPageToken ?? null,
            }
            setSearchResults(newStateObject)
            dispatch(storeSearchResults(newStateObject))
            return
          }
          if (searchResults && searchResults.threads.length > 0) {
            const newStateObject = {
              threads: sortThreads(searchResults.threads.concat(buffer)),
              nextPageToken: response.nextPageToken ?? null,
            }
            setSearchResults(newStateObject)
            dispatch(storeSearchResults(newStateObject))
          }
        }
      })
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
              {searchResults.threads.map((thread) => (
                <div
                  key={`${thread.id}-search`}
                  onClick={() => openDetail(dispatch)}
                  aria-hidden="true"
                >
                  <EmailListItem email={thread} showLabel />
                </div>
              ))}
              {searchResults.nextPageToken ? (
                <S.FooterRow>
                  {loadState !== SEARCH_STATE.LOADING && (
                    <CustomButton
                      onClick={() =>
                        loadMoreResults({
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
                <GS.TextMutedParagraph>
                  {global.NOTHING_TO_SEE}
                </GS.TextMutedParagraph>
              )}
            </S.NoSearchResults>
          )}
        </S.SearchResults>
      </S.Dialog>
    </Modal>
  )
}

export default Search
