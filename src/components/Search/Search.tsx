import React, { useRef, useState } from 'react'
import Modal from '@mui/material/Modal'
import InputBase from '@mui/material/InputBase'
import { FiSearch, FiX } from 'react-icons/fi'
import * as S from './SearchStyles'
import * as global from '../../constants/globalConstants'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { selectIsSearching, setIsSearching } from '../../Store/utilsSlice'
import threadApi from '../../data/threadApi'
import { EmailListObject, EmailListThreadItem } from '../../Store/emailListTypes'
import EmailListItem from '../EmailListItem/EmailListItem'
import LoadingState from '../Elements/LoadingState'
import { CustomButtonText } from '../Elements/Buttons'
import sortThreads from '../../utils/sortThreads'

const GO = 'Go'

const Search = () => {
    const [searchValue, setSearchValue] = useState('')
    const searchValueRef = useRef('')
    const searchInputRef = useRef(null)
    const [searchResults, setSearchResults] = useState<EmailListObject>()
    const [loadState, setLoadState] = useState('idle')
    const dispatch = useAppDispatch()
    const isSearching = useAppSelector(selectIsSearching)
    const handleClose = () => dispatch(setIsSearching(false))


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const resetSearch = () => {
        setSearchValue('')
        setSearchResults(undefined)
        setLoadState('idle')
        // searchInputRef.current.focus()
    }

    const fetchSearchThreads = async (searchBody: any) => {
        const response: EmailListObject = await threadApi().getThreads(searchBody)
        if (response?.threads.length > 0) {
            const buffer: EmailListThreadItem[] = []
            const loadCount = response.threads.length

            response.threads.forEach(async (item) => {
                const threadDetail = await threadApi().getThreadDetail(item.id)
                buffer.push(threadDetail.thread)
                if (buffer.length === loadCount) {
                    setLoadState('loaded')
                    if (searchValueRef.current !== searchValue) {
                        searchValueRef.current = searchValue
                        setSearchResults({
                            labels: response.labels ?? [''],
                            threads: sortThreads(buffer),
                            nextPageToken: response.nextPageToken ?? null
                        })
                        return
                    }
                    if (searchResults && searchResults.threads.length > 0) {
                        setSearchResults({
                            labels: response.labels ?? [''],
                            threads: sortThreads(searchResults.threads.concat(buffer)),
                            nextPageToken: response.nextPageToken ?? null
                        })
                    }
                }
            })
        }
    }

    const shouldClearOutPreviousResults = () => {
        if (searchValueRef.current !== searchValue) {
            setSearchResults(undefined)
        }
    }

    const intitialSearch = () => {
        const searchBody = {
            q: searchValue
        }
        setLoadState('loading')
        shouldClearOutPreviousResults()
        fetchSearchThreads(searchBody)
    }

    const loadMoreResults = () => {
        const searchBody = {
            q: searchValue,
            nextPageToken: searchResults?.nextPageToken
        }
        setLoadState('loading')
        fetchSearchThreads(searchBody)
    }

    return (
        <div>
            <Modal
                open={isSearching}
                onClose={handleClose}
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
                            ref={searchInputRef}
                            fullWidth
                        />
                        {searchValue.length > 0 && <button className="juno-button" type="button" onClick={resetSearch} aria-label="Clear search"><S.Icon><FiX size={16} /></S.Icon></button>}
                        <button className="juno-button" type="button" onClick={intitialSearch} disabled={searchValue.length < 1}>{GO}</button>
                    </S.InputRow>
                    <S.SearchResults>
                        {searchResults &&
                            searchResults.threads ?
                            <>
                                {searchResults.threads.map((thread) =>
                                    <EmailListItem key={thread.id} email={thread} />
                                )}
                                {searchResults.nextPageToken ? (
                                    <S.FooterRow>
                                        {loadState !== 'loading' && (
                                            <CustomButtonText
                                                className="juno-button juno-button-small juno-button-light"
                                                onClick={loadMoreResults}
                                                label={global.LOAD_OLDER}
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
        </div>
    )
}

export default Search
