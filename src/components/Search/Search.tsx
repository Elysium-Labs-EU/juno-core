import React, { useRef, useState } from 'react'
import Modal from '@mui/material/Modal'
import InputBase from '@mui/material/InputBase'
import { FiSearch, FiX } from 'react-icons/fi'
import * as S from './SearchStyles'
import * as global from '../../constants/globalConstants'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { selectIsSearching, setIsSearching } from '../../Store/utilsSlice'
import threadApi from '../../data/threadApi'
import { IEmailListObject, IEmailListObjectSearch, IEmailListThreadItem } from '../../Store/emailListTypes'
import EmailListItem from '../EmailListItem/EmailListItem'
import LoadingState from '../Elements/LoadingState'
import { CustomButtonText } from '../Elements/Buttons'
import sortThreads from '../../utils/sortThreads'
import { setViewIndex } from '../../Store/emailDetailSlice'
import { listClearSearchResults, storeSearchResults } from '../../Store/emailListSlice'
import undoubleThreads from '../../utils/undoubleThreads'

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
    searchResults: IEmailListObjectSearch,
    setLoadState: Function
    fetchSearchThreads: Function
}

const SEARCH = 'Search'

const shouldClearOutPreviousResults = ({ searchValueRef, searchValue, setSearchResults, dispatch }: IShouldClearOutPreviousResults) => {
    if (searchValueRef.current !== searchValue && searchValueRef.current.length > 0) {
        setSearchResults(undefined)
        dispatch(listClearSearchResults())
    }
}

const intitialSearch = ({ searchValue, setLoadState, fetchSearchThreads, searchValueRef, setSearchResults, dispatch }: IIntitialSearch) => {
    const searchBody = {
        q: searchValue
    }
    setLoadState('loading')
    shouldClearOutPreviousResults({ searchValueRef, searchValue, setSearchResults, dispatch })
    fetchSearchThreads(searchBody)
}


const loadMoreResults = ({ searchValue, searchResults, setLoadState, fetchSearchThreads }: ILoadMoreResults) => {
    const searchBody = {
        q: searchValue,
        nextPageToken: searchResults?.nextPageToken
    }
    setLoadState('loading')
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
    const [loadState, setLoadState] = useState('idle')
    const dispatch = useAppDispatch()
    const isSearching = useAppSelector(selectIsSearching)


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const resetSearch = () => {
        setSearchValue('')
        setSearchResults(undefined)
        setLoadState('idle')
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
                buffer.push(threadDetail.thread)
                if (buffer.length === loadCount) {
                    setLoadState('loaded')
                    if (searchValueRef.current !== searchValue) {
                        searchValueRef.current = searchValue
                        const sortedThreads = sortThreads(buffer)
                        const newStateObject = {
                            threads: undoubleThreads(sortedThreads),
                            nextPageToken: response.nextPageToken ?? null
                        }
                        setSearchResults(newStateObject)
                        dispatch(
                            storeSearchResults(newStateObject)
                        )
                        return
                    }
                    if (searchResults && searchResults.threads.length > 0) {
                        const sortedThreads = sortThreads(searchResults.threads.concat(buffer))
                        const newStateObject = {
                            threads: undoubleThreads(sortedThreads),
                            nextPageToken: response.nextPageToken ?? null
                        }
                        setSearchResults(newStateObject)
                        dispatch(
                            storeSearchResults(newStateObject)
                        )
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
                    {searchValue.length > 0 &&
                        <button className="juno-button" type="button"
                            onClick={resetSearch} aria-label="clear-search">
                            <S.Icon><FiX size={16} /></S.Icon>
                        </button>}
                    <button className="juno-button" type="button"
                        onClick={() => intitialSearch({ searchValue, setLoadState, fetchSearchThreads, searchValueRef, setSearchResults, dispatch })} disabled={searchValue.length < 1}><span>{SEARCH}</span></button>
                </S.InputRow>
                <S.SearchResults>
                    {searchResults &&
                        searchResults.threads ?
                        <>
                            {searchResults.threads.map((thread) =>
                                <div key={`${ thread.id }-search`} onClick={() => openDetail(dispatch)} aria-hidden="true">
                                    <EmailListItem email={thread} showLabel />
                                </div>
                            )}
                            {searchResults.nextPageToken ? (
                                <S.FooterRow>
                                    {loadState !== 'loading' && (
                                        <CustomButtonText
                                            className="juno-button juno-button-small juno-button-light"
                                            onClick={() => loadMoreResults({ searchValue, searchResults, setLoadState, fetchSearchThreads })}
                                            label={global.LOAD_MORE}
                                        />
                                    )}
                                    {loadState === 'loading' && <LoadingState />}
                                </S.FooterRow>
                            ) : (
                                <S.FooterRow>
                                    <small className="text_muted">{global.NO_MORE_RESULTS}</small>
                                </S.FooterRow>
                            )}
                        </> :
                        <S.NoSearchResults>
                            {loadState === 'loading' ? <LoadingState /> : <p className="text_muted">{global.NOTHING_TO_SEE}</p>}
                        </S.NoSearchResults>
                    }
                </S.SearchResults>
            </S.Dialog>
        </Modal>
    )
}

export default Search
