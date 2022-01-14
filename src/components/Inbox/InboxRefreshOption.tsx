import React, { useEffect, useState } from 'react'
import { MdRefresh } from 'react-icons/md'
import { refreshEmailFeed, selectIsFetching } from '../../Store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { selectLabelIds } from '../../Store/labelsSlice'
import { selectIsLoading } from '../../Store/utilsSlice'
import CustomIconButton from '../Elements/Buttons/CustomIconButton'

const InboxRefresh = () => {
    const [disableRefresh, setDisableRefresh] = useState(false)
    const labelIds = useAppSelector(selectLabelIds)
    const isFetching = useAppSelector(selectIsFetching)
    const isLoading = useAppSelector(selectIsLoading)
    const dispatch = useAppDispatch()

    const refreshFeed = () => {
        const params = {
            labelIds,
            maxResults: 500,
        }
        dispatch(refreshEmailFeed(params))
    }

    useEffect(() => {
        if (isFetching) {
            setDisableRefresh(true)
        }
        if (!isFetching) {
            setTimeout(() => {
                setDisableRefresh(false)
            }, 3000)
        }
        return () => setDisableRefresh(false)
    }, [isFetching])

    return (
        <CustomIconButton
            className="juno-button juno-button-light"
            onClick={() => refreshFeed()}
            disabled={isLoading || disableRefresh}
            icon={<MdRefresh />}
            type="button"
        />
    )
}

export default InboxRefresh
