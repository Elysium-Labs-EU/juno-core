import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, KeyboardEvent } from 'react'
import { push } from 'redux-first-history'

import CustomButton from 'components/Elements/Buttons/CustomButton'
import CustomIconButton from 'components/Elements/Buttons/CustomIconButton'
import CustomDialog from 'components/Elements/Dialog/CustomDialog'
import Input from 'components/Elements/Input/Input'
import LoadingState from 'components/Elements/LoadingState/LoadingState'
import Stack from 'components/Elements/Stack/Stack'
import * as global from 'constants/globalConstants'
import * as keyConstants from 'constants/keyConstants'
import threadApi from 'data/threadApi'
import { QiArrowLeft, QiEscape, QiSearch } from 'images/svgIcons/quillIcons'
import {
  selectSearchList,
  selectSelectedEmails,
  useSearchResults,
} from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import type { AppDispatch } from 'store/store'
import type { TEmailListObject } from 'store/storeTypes/emailListTypes'
import {
  selectInSearch,
  setInSearch,
  setSystemStatusUpdate,
} from 'store/utilsSlice'
import handleChangeFocus from 'utils/handleChangeFocus'
import parseQueryString from 'utils/parseQueryString'
import sortThreads from 'utils/sortThreads'

import * as S from './CommandPaletteStyles'
import type { ISearchBody } from './CommandPaletteTypes'
import ContextBar from './ContextBar/ContextBar'
import SearchResults from './Search/SearchResults'
import CommandPalleteSuggestions from './Suggestions/CommandSuggestions'

const SEARCH = 'Search'
const COMMAND_PALLETE = 'command-palette-list-item'

const openDetail = ({
  currentEmail,
  dispatch,
  searchResults,
}: {
  currentEmail: string
  dispatch: AppDispatch
  searchResults: TEmailListObject
}) => {
  dispatch(useSearchResults({ searchResults, currentEmail }))
  dispatch(setInSearch(false))
}

function handleSelect({ focusedItemIndex }: { focusedItemIndex: number }) {
  const items = document.querySelectorAll(`.${COMMAND_PALLETE}`) as NodeListOf<
    HTMLButtonElement | HTMLAnchorElement
  >

  if (items[focusedItemIndex]) {
    items[focusedItemIndex]?.click()
  }
}

const handleClose = (dispatch: AppDispatch) => dispatch(setInSearch(false))

const CommandPallette = () => {
  const [focusedItemIndex, setFocusedItemIndex] = useState(0)
  const [loadState, setLoadState] = useState(global.LOAD_STATE_MAP.idle)
  const [searchResults, setSearchResults] = useState<TEmailListObject>()
  const [searchValue, setSearchValue] = useState('')
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const searchValueRef = useRef('')
  const dispatch = useAppDispatch()
  const inSearch = useAppSelector(selectInSearch)
  const searchList = useAppSelector(selectSearchList)
  const selectedEmails = useAppSelector(selectSelectedEmails)

  useEffect(() => {
    const { q }: { q?: string } = parseQueryString(window.location.search)
    if (q) {
      setSearchValue(q)
    }
  }, [window.location.search])

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const resetSearch = useCallback(() => {
    const { q }: { q?: string } = parseQueryString(window.location.search)
    if (q) {
      const url = new URL(window.location.href)
      url.searchParams.delete('q')
      dispatch(push(url.href))
    }
    searchValueRef.current = ''
    setSearchValue('')
    setSearchResults(undefined)
    setLoadState(global.LOAD_STATE_MAP.idle)
    if (searchInputRef.current !== null) {
      searchInputRef.current.focus()
    }
  }, [dispatch, window.location.search])

  const shouldClearOutPreviousResults = () => {
    if (
      searchValueRef.current !== searchValue &&
      searchValueRef.current.length > 0
    ) {
      setSearchResults(undefined)
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

  const fetchSearchThreads = useCallback(
    async (searchBody: ISearchBody) => {
      const searchBodyWithNextPageToken = {
        q: `${searchBody.q} in:all -label:spam`,
        nextPageToken: searchBody?.nextPageToken ?? null,
      }
      try {
        const response = await threadApi({}).getSimpleThreads(
          searchBodyWithNextPageToken
        )
        if (
          'data' in response &&
          response.data?.resultSizeEstimate &&
          response.data.resultSizeEstimate > 0
        ) {
          const { threads, nextPageToken }: TEmailListObject = response.data
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
              q: searchBody.q,
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

  const intitialSearch = useCallback(() => {
    const searchBody = {
      q: searchValue,
    }
    setLoadState(global.LOAD_STATE_MAP.loading)
    shouldClearOutPreviousResults()
    fetchSearchThreads(searchBody)
  }, [dispatch, searchValue, searchValueRef])

  const loadMoreSearchResults = useCallback(() => {
    const searchBody = {
      q: searchValue,
      nextPageToken: searchResults?.nextPageToken,
    }
    setLoadState(global.LOAD_STATE_MAP.loading)
    fetchSearchThreads(searchBody)
  }, [searchValue, searchResults])

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
        intitialSearch()
        return
      }
      if (searchResults && focusedItemIndex > -1) {
        const id = searchResults?.threads?.[focusedItemIndex]?.id
        if (id) {
          handleOpenEmailEvent(id)
        }
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
            focusedItemIndex={focusedItemIndex}
            handleOpenEmailEvent={handleOpenEmailEvent}
            loadMoreSearchResults={loadMoreSearchResults}
            loadState={loadState}
            searchResults={searchResults}
            setFocusedItemIndex={setFocusedItemIndex}
          />
        ) : (
          <Stack direction="vertical">
            {loadState === global.LOAD_STATE_MAP.loading ? (
              <LoadingState />
            ) : (
              <CommandPalleteSuggestions
                focusedItemIndex={focusedItemIndex}
                searchValue={searchValue}
              />
            )}
          </Stack>
        )}
      </S.SearchOuput>
    ),
    [loadState, searchResults, searchValue, focusedItemIndex]
  )

  const searchButtonIsDisabled =
    searchValue.length < 1 || searchValue === searchValueRef.current

  return (
    <CustomDialog
      enableDynamicHeight
      modalAriaLabel="command-pallette"
      noCloseButton
      noContentPadding
      onKeyDown={keyDownHandler}
      open={inSearch}
    >
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
        <Input
          autoComplete="off"
          autoFocus
          fullWidth
          id="search"
          ref={searchInputRef}
          onChange={handleSearchChange}
          onKeyDown={handleResetIndexOnNewSearch}
          placeholder="Search for emails and commands"
          spellCheck={false}
          value={searchValue}
        />
        <Stack direction="horizontal">
          <CustomButton
            onClick={() => intitialSearch()}
            disabled={searchButtonIsDisabled}
            label={SEARCH}
            title="Search"
            suppressed={searchButtonIsDisabled}
          />

          <CustomIconButton
            onClick={() => handleClose(dispatch)}
            aria-label="close-modal"
            icon={<QiEscape size={16} />}
            title="Close"
          />
        </Stack>
      </S.InputRow>
      {!searchResults && selectedEmails.selectedIds.length > 0 && (
        <ContextBar />
      )}
      {memoizedCommandSuggestionsAndSearchResults}
    </CustomDialog>
  )
}

export default CommandPallette
