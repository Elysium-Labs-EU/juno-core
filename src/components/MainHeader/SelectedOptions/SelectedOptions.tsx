import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { selectSelectedEmails, setSelectedEmails, updateEmailLabelBatch } from '../../../Store/emailListSlice'
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
    const request = {
        removeLabelIds: [
            ...labelIds.filter((item) => item !== global.UNREAD_LABEL),
        ],
    }

    // TODO: On navigation, clean up the selectedEmail list

    // useEffect(() => {
    //     if (selectedEmails.length > 0) {
    //         setSelectedEmails([])
    //     }
    // }, [location])

    const handleArchiveAll = () => {
        dispatch(updateEmailLabelBatch({ request }))
        dispatch(setSelectedEmails([]))
    }

    return (
        <S.Wrapper>
            <CustomButton label={ARCHIVE_BUTTON_LABEL} onClick={handleArchiveAll} />
        </S.Wrapper>
    )
}

export default SelectedOptions