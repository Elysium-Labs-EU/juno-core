import CustomButton from 'components/Elements/Buttons/CustomButton'
import CustomIconButton from 'components/Elements/Buttons/CustomIconButton'
import LoadingState from 'components/Elements/LoadingState/LoadingState'
import * as global from 'constants/globalConstants'
import * as keyConstants from 'constants/keyConstants'
import threadApi from 'data/threadApi'
import { QiArrowLeft, QiEscape, QiSearch } from 'images/svgIcons/quillIcons'
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
import {
  selectSearchList,
  selectSelectedEmails,
  useSearchResults,
} from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { AppDispatch } from 'store/store'
import { IEmailListObject } from 'store/storeTypes/emailListTypes'
import {
  selectInSearch,
  setInSearch,
  setSystemStatusUpdate,
} from 'store/utilsSlice'
import handleChangeFocus from 'utils/handleChangeFocus'
import sortThreads from 'utils/sortThreads'

import InputBase from '@mui/material/InputBase'
import Modal from '@mui/material/Modal'

import * as S from './CommandPaletteStyles'
import ContextBar from './ContextBar/ContextBar'
import SearchResults from './Search/SearchResults'
import CommandPalleteSuggestions from './Suggestions/CommandSuggestions'

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
const COMMAND_PALLETE = 'command-palette-list-item'

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
  currentEmail,
  dispatch,
  searchResults,
}: {
  currentEmail: string
  dispatch: AppDispatch
  searchResults: IEmailListObject
}) => {
  dispatch(useSearchResults({ searchResults, currentEmail }))
  dispatch(setInSearch(false))
}

function handleSelect({ focusedItemIndex }: { focusedItemIndex: number }) {
  const items = document.querySelectorAll(`.${COMMAND_PALLETE}`) as NodeListOf<
    HTMLButtonElement | HTMLAnchorElement
  >

  if (items[focusedItemIndex]) {
    items[focusedItemIndex].click()
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
  const selectedEmails = useAppSelector(selectSelectedEmails)

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

  const handleOpenEmailEvent = (threadId: string) => {
    if (searchResults) {
      openDetail({
        dispatch,
        searchResults,
        currentEmail: threadId,
      })
    }
  }

  const handleResetIndexOnNewSearch = () => {
    handleChangeFocus({
      focusedItemIndex,
      setFocusedItemIndex,
      sourceTag: COMMAND_PALLETE,
      doNotMoveFocus: true,
    })
  }

  const handleKeyEscape = () => {
    if (inSearch) {
      if (searchResults && searchResults.threads.length > 0) {
        resetSearch()
      } else {
        dispatch(setInSearch(false))
      }
    }
  }

  const handleKeyEnter = () => {
    if (inSearch) {
      if (focusedItemIndex > 0) {
        handleSelect({ focusedItemIndex })
        return
      }
      if (searchValue.length > 1 && searchValue !== searchValueRef.current) {
        intitialSearch({
          searchValue,
          setLoadState,
          fetchSearchThreads,
          searchValueRef,
          setSearchResults,
          dispatch,
        })
        return
      }
      if (searchResults && focusedItemIndex > -1) {
        handleOpenEmailEvent(searchResults.threads[focusedItemIndex].id)
      }
    }
  }

  const keyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (inSearch) {
      if (event?.code === undefined) return
      if (event.code === keyConstants.KEY_ARROWS.down) {
        event.preventDefault()
        event.stopPropagation()
        handleChangeFocus({
          direction: 'down',
          focusedItemIndex,
          setFocusedItemIndex,
          sourceTag: COMMAND_PALLETE,
          doNotMoveFocus: true,
        })
      }
      if (event.code === keyConstants.KEY_ARROWS.up) {
        event.preventDefault()
        event.stopPropagation()
        handleChangeFocus({
          direction: 'up',
          focusedItemIndex,
          setFocusedItemIndex,
          sourceTag: COMMAND_PALLETE,
          doNotMoveFocus: true,
        })
      }
      if (event.code === keyConstants.KEY_SPECIAL.escape) {
        event.preventDefault()
        event.stopPropagation()
        handleKeyEscape()
      }
      if (event.code === keyConstants.KEY_SPECIAL.enter) {
        event.preventDefault()
        event.stopPropagation()
        handleKeyEnter()
      }
    }
  }

  const memoizedCommandSuggestionsAndSearchResults = useMemo(
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
            {searchValue.length > 0 ? (
              <CustomIconButton
                onClick={resetSearch}
                aria-label="clear-search"
                icon={<QiArrowLeft size={20} />}
                title="Clear search input and results"
              />
            ) : (
              <QiSearch size={20} />
            )}
          </S.Icon>
          <InputBase
            autoComplete="off"
            fullWidth
            id="search"
            autoFocus
            onKeyDown={handleResetIndexOnNewSearch}
            inputRef={searchInputRef}
            onChange={handleSearchChange}
            placeholder="Search for emails and commands"
            spellCheck={false}
            value={searchValue}
          />
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
            suppressed={
              searchValue.length < 1 || searchValue === searchValueRef.current
            }
          />
          <CustomIconButton
            onClick={() => handleClose(dispatch)}
            aria-label="close-modal"
            icon={<QiEscape size={16} />}
            title="Close"
          />
        </S.InputRow>
        {!searchResults && selectedEmails.selectedIds.length > 0 && (
          <ContextBar />
        )}
        {memoizedCommandSuggestionsAndSearchResults}
      </S.Dialog>
    </Modal>
  )
}

export default CommandPallette
