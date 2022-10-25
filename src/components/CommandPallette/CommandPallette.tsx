import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import InputBase from '@mui/material/InputBase'
import Modal from '@mui/material/Modal'

import * as global from '../../constants/globalConstants'
import * as keyConstants from '../../constants/keyConstants'
import threadApi from '../../data/threadApi'
import { QiDiscard, QiEscape, QiSearch } from '../../images/svgIcons/quillIcons'
import { selectSearchList, useSearchResults } from '../../store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { AppDispatch } from '../../store/store'
import { IEmailListObject } from '../../store/storeTypes/emailListTypes'
import {
  selectInSearch,
  setInSearch,
  setSystemStatusUpdate,
} from '../../store/utilsSlice'
import sortThreads from '../../utils/sortThreads'
import CustomButton from '../Elements/Buttons/CustomButton'
import CustomIconButton from '../Elements/Buttons/CustomIconButton'
import LoadingState from '../Elements/LoadingState/LoadingState'
import * as S from './SearchStyles'
import CommandPalleteSuggestions from './Suggestions/CommandSuggestions'
import SearchResults from './Search/SearchResults'

interface IShouldClearOutPreviousResults {
  searchValueRef: MutableRefObject<string>
  searchValue: string
  setSearchResults: Dispatch<SetStateAction<IEmailListObject | undefined>>
  dispatch: AppDispatch
}
interface IIntitialSearch {
  searchValue: string
  setLoadState: Dispatch<SetStateAction<string>>
  fetchSearchThreads: (searchBody: { q: string }) => void
  searchValueRef: MutableRefObject<string>
  setSearchResults: Dispatch<SetStateAction<IEmailListObject | undefined>>
  dispatch: AppDispatch
}
interface ILoadMoreSearchResults {
  searchValue: string
  searchResults: IEmailListObject
  setLoadState: Dispatch<SetStateAction<string>>
  fetchSearchThreads: (searchBody: { q: string }) => void
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

// TODO: Convert this to grab the suggested item from the CMD pallette
function handleSelect({ focusedItemIndex }: { focusedItemIndex: number }) {
  const items = document.querySelectorAll(
    '.command-palette-list-item'
  ) as NodeListOf<HTMLButtonElement | HTMLAnchorElement>

  if (items[focusedItemIndex]) {
    items[focusedItemIndex].click()

    // if (
    //   items[focusedItemIndex].attributes.getNamedItem('data-close-on-select')?.value ===
    //   'true'
    // ) {
    //   onChangeOpen(false)
    // }
  }
}

const handleClose = (dispatch: AppDispatch) => dispatch(setInSearch(false))

const CommandPallette = () => {
  const [focusedItemIndex, setFocusedItemIndex] = useState(0)
  const [loadState, setLoadState] = useState(global.LOAD_STATE_MAP.idle)
  const [searchResults, setSearchResults] = useState<IEmailListObject>()
  const [searchValue, setSearchValue] = useState('')
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const searchValueRef = useRef('')
  const dispatch = useAppDispatch()
  const inSearch = useAppSelector(selectInSearch)
  const searchList = useAppSelector(selectSearchList)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        q: `${searchBody.q} in:all -label:spam`,
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
        dispatch(
          setSystemStatusUpdate({
            type: 'error',
            message: global.ERROR_MESSAGE,
          })
        )
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

  const handleKeyDown = () => {
    if (
      searchValue &&
      searchResults &&
      searchResults.threads.length - 1 > focusedItemIndex
    ) {
      setFocusedItemIndex((prevState) => prevState + 1)
      return
    }
    if (
      !searchValue &&
      document.querySelectorAll('.command-palette-list-item').length - 1 >
        focusedItemIndex
    ) {
      setFocusedItemIndex((prevState) => prevState + 1)
    }
  }

  const handleKeyUp = () => {
    if (searchValue && searchResults && focusedItemIndex > 0) {
      setFocusedItemIndex((prevState) => prevState - 1)
      return
    }
    if (!searchValue && focusedItemIndex > 0) {
      setFocusedItemIndex((prevState) => prevState - 1)
    }
  }

  const handleKeyEscape = (event: KeyboardEvent<HTMLInputElement>) => {
    if (searchResults && searchResults.threads.length > 0) {
      resetSearch()
      event.preventDefault()
      event.stopPropagation()
    }
  }

  const handleKeyEnter = () => {
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
      return
    }
    handleSelect({ focusedItemIndex })
  }

  const keyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event?.code === undefined) return
    if (event.code === keyConstants.KEY_ARROWS.down) {
      event.preventDefault()
      handleKeyDown()
    }
    if (event.code === keyConstants.KEY_ARROWS.up) {
      event.preventDefault()
      handleKeyUp()
    }
    if (event.code === keyConstants.KEY_SPECIAL.escape) {
      handleKeyEscape(event)
    }
    if (event.code === keyConstants.KEY_SPECIAL.enter) {
      handleKeyEnter()
    }
  }

  const memoizedSearchResults = useMemo(
    () => (
      <S.SearchOuput>
        {searchResults && searchResults?.threads ? (
          <SearchResults
            fetchSearchThreads={fetchSearchThreads}
            focusedItemIndex={focusedItemIndex}
            searchResults={searchResults}
            searchValue={searchValue}
            setFocusedItemIndex={setFocusedItemIndex}
          />
        ) : (
          <S.NoSearchResults>
            {loadState === global.LOAD_STATE_MAP.loading ? (
              <LoadingState />
            ) : (
              <CommandPalleteSuggestions
                focusedItemIndex={focusedItemIndex}
                searchValue={searchValue}
              />
            )}
          </S.NoSearchResults>
        )}
      </S.SearchOuput>
    ),
    [loadState, searchResults, searchValue, focusedItemIndex]
  )

  return (
    <Modal
      open={inSearch}
      onClose={() => handleClose(dispatch)}
      aria-labelledby="modal-command-pallette"
      aria-describedby="modal-command-pallette-box"
    >
      <S.Dialog onKeyDown={keyDownHandler}>
        <S.InputRow>
          <S.Icon>
            <QiSearch size={20} />
          </S.Icon>
          <InputBase
            autoFocus
            autoComplete="off"
            fullWidth
            id="search"
            inputRef={searchInputRef}
            onChange={handleSearchChange}
            placeholder="Search"
            value={searchValue}
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
                dispatch,
                fetchSearchThreads,
                searchValue,
                searchValueRef,
                setLoadState,
                setSearchResults,
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

export default CommandPallette
