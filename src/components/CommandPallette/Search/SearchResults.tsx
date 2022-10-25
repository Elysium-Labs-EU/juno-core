import { useState } from 'react'

import * as global from '../../../constants/globalConstants'
import { useSearchResults } from '../../../store/emailListSlice'
import { useAppDispatch } from '../../../store/hooks'
import { AppDispatch } from '../../../store/store'
import { IEmailListObject } from '../../../store/storeTypes/emailListTypes'
import { setInSearch } from '../../../store/utilsSlice'
import * as GS from '../../../styles/globalStyles'
import CustomButton from '../../Elements/Buttons/CustomButton'
import LoadingState from '../../Elements/LoadingState/LoadingState'
import ThreadList from '../../EmailList/ThreadList'
import * as S from '../SearchStyles'

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

interface ILoadMoreSearchResults {
  searchValue: string
  searchResults: IEmailListObject
  setLoadState: (value: string) => void
  fetchSearchThreads: Function
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

const SearchResults = ({
  fetchSearchThreads,
  focusedItemIndex,
  searchResults,
  searchValue,
  setFocusedItemIndex,
}: {
  fetchSearchThreads: any
  focusedItemIndex: any
  searchResults: any
  searchValue: any
  setFocusedItemIndex: any
}) => {
  const [loadState, setLoadState] = useState(global.LOAD_STATE_MAP.idle)
  const dispatch = useAppDispatch()

  const handleOpenEvent = (threadId: string) => {
    if (searchResults) {
      openDetail({
        dispatch,
        searchResults,
        currentEmail: threadId,
      })
    }
  }

  return (
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
          {loadState === global.LOAD_STATE_MAP.loading && <LoadingState />}
        </S.FooterRow>
      ) : (
        <S.FooterRow>
          <GS.TextMutedSmall>{global.NO_MORE_RESULTS}</GS.TextMutedSmall>
        </S.FooterRow>
      )}
    </>
  )
}

export default SearchResults
