import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
    selectSelectedEmails,
    setSelectedEmails,
    updateEmailLabelBatch,
} from '../../../Store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import { selectLabelIds } from '../../../Store/labelsSlice'
import CustomButton from '../../Elements/Buttons/CustomButton'
import * as S from './SelectedOptionsStyles'
import * as global from '../../../constants/globalConstants'

const ARCHIVE_BUTTON_LABEL = 'Archive'

const SelectedOptions = () => {
    const labelIds = useAppSelector(selectLabelIds)
    const dispatch = useAppDispatch()
    const selectedEmails = useAppSelector(selectSelectedEmails)
    const location = useLocation()
    const [currentLocation, setCurrentLocation] = useState<string | null>(null)

    useEffect(() => {
        if (location.pathname !== currentLocation) {
            setCurrentLocation(location.pathname)
        }
        if (currentLocation !== null && currentLocation !== location.pathname) {
            if (selectedEmails.length > 0) {
                dispatch(setSelectedEmails([]))
            }
        }
    }, [location])


    const handleArchiveAll = useCallback(() => {
        const request = {
            removeLabelIds: [
                ...labelIds.filter((item) => item !== global.UNREAD_LABEL),
            ],
        }

        dispatch(updateEmailLabelBatch({ request }))
        dispatch(setSelectedEmails([]))
    }, [labelIds])

    return (
        <S.Wrapper>
            <CustomButton label={ARCHIVE_BUTTON_LABEL} onClick={handleArchiveAll} />
        </S.Wrapper>
    )
}

export default SelectedOptions
