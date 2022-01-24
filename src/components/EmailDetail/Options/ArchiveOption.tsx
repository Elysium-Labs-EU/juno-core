import React from 'react'
import { FiArchive } from 'react-icons/fi'
import { IEmailListThreadItem } from '../../../Store/emailListTypes'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import { selectLabelIds } from '../../../Store/labelsSlice'
import * as local from '../../../constants/emailDetailConstants'
import CustomButton from '../../Elements/Buttons/CustomButton'
import ArchiveMail from '../../EmailOptions/ArchiveMail'

const ArchiveOption = ({ threadDetail }: { threadDetail: IEmailListThreadItem }) => {
    const labelIds = useAppSelector(selectLabelIds)
    const dispatch = useAppDispatch()

    return <CustomButton
        icon={<FiArchive />}
        onClick={() =>
            ArchiveMail({
                messageId: threadDetail.id,
                labelIds,
                dispatch,
            })
        }
        label={local.BUTTON_ARCHIVE}
        suppressed
    />
}

export default ArchiveOption