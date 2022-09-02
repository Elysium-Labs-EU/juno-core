import { useEffect, useMemo, useState } from 'react'

import { CircularProgress } from '@mui/material'

import * as global from '../../../constants/globalConstants'
import useFetchThreadsTotalNumber from '../../../hooks/useFetchThreadsTotalNumber'
import {
    fetchEmailsSimple,
    selectEmailList,
} from '../../../store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectLoadedInbox } from '../../../store/labelsSlice'
import getEmailListIndex from '../../../utils/getEmailListIndex'
import CustomButton from '../../Elements/Buttons/CustomButton'
import CustomModal from '../../Elements/Modal/CustomModal'
import RenderEmailList from '../../EmailList/RenderEmailList'
import SortInbox from '../InboxSortOption'
import * as S from './InboxIndicatorBarStyles'

export const INBOX_LABEL = ['INBOX']

const LoadedInboxIndicator = ({
    setShowInbox,
}: {
    setShowInbox: (value: boolean) => void
}) => {
    const { totalThreads, loadingState } = useFetchThreadsTotalNumber(INBOX_LABEL)

    const resultMap = {
        [global.LOAD_STATE_MAP.loaded]: totalThreads,
        [global.LOAD_STATE_MAP.loading]: <CircularProgress size={10} />,
        [global.LOAD_STATE_MAP.idle]: <CircularProgress size={10} />,
    }

    return (
        <S.BarWrapper>
            <S.TextWrapper>
                There are {resultMap[loadingState]} emails in your hidden inbox
            </S.TextWrapper>
            <SortInbox />
            <CustomButton
                onClick={() => setShowInbox(true)}
                label="View"
                title="View the inbox"
            />
        </S.BarWrapper>
    )
}

const InboxIndicatorBar = () => {
    const emailList = useAppSelector(selectEmailList)
    const dispatch = useAppDispatch()
    const loadedInbox = useAppSelector(selectLoadedInbox)
    const [loadState, setLoadState] = useState(global.LOAD_STATE_MAP.idle)
    const [showInbox, setShowInbox] = useState(false)
    const [inboxIndex, setInboxIndex] = useState(-1)

    useEffect(() => {
        let mounted = true
        if (loadedInbox.flat(1).indexOf(INBOX_LABEL[0]) === -1) {
            setLoadState(global.LOAD_STATE_MAP.loading)
            const params = {
                labelIds: INBOX_LABEL,
                maxResults: 10,
                nextPageToken: null,
            }

            if (mounted) {
                dispatch(fetchEmailsSimple(params))
            }
        }
        return () => {
            mounted = false
        }
    }, [])

    useEffect(() => {
        if (loadedInbox.flat(1).indexOf(INBOX_LABEL[0]) !== -1) {
            const emailListIndex = getEmailListIndex({
                emailList,
                labelIds: INBOX_LABEL,
            })
            setInboxIndex(emailListIndex)
            setLoadState(global.LOAD_STATE_MAP.loaded)
        }
    }, [loadedInbox])

    const handleCloseInbox = () => {
        setShowInbox(false)
    }
    // TODO: Allow the user to set the number indicator to be a term, such as: "a few" "some" "many" - these are tiers based on qty.

    const memoizedEmailList = useMemo(() => (
        <RenderEmailList filteredOnLabel={emailList[inboxIndex]} />
    ), [emailList, inboxIndex])

    return (
        <>
            <CustomModal
                open={showInbox}
                handleClose={handleCloseInbox}
                modalTitle="Inbox"
                modalAriaLabel="Inbox"
            >
                {memoizedEmailList}
            </CustomModal>
            <S.Wrapper>
                {loadState === global.LOAD_STATE_MAP.loaded && (
                    <LoadedInboxIndicator setShowInbox={setShowInbox} />
                )}
            </S.Wrapper>
        </>
    )
}

export default InboxIndicatorBar
