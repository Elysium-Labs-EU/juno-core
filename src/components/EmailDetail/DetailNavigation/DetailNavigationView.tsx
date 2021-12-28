import React from 'react'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import CircularProgress from '@mui/material/CircularProgress'
import * as S from './DetailNavigationStyles'
import CloseMail from '../../../utils/closeEmail'
import NavigatePreviousMail from '../../../utils/navigatePreviousEmail'
import { CustomIconLink } from '../../Elements/Buttons'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import { selectIsLoading } from '../../../Store/utilsSlice'
import { selectStorageLabels } from '../../../Store/labelsSlice'
import { EmailListObject } from '../../../Store/emailListTypes'

interface IDetailNavigationView {
    labelIds: string[]
    emailListIndex: number
    emailList: EmailListObject[]
    viewIndex: number
    isDisabledPrev: boolean
    isDisabledNext: boolean
    nextButtonSelector: Function
}

const DetailNavigationView = (props: IDetailNavigationView) => {
    const {
        labelIds,
        emailListIndex,
        emailList,
        viewIndex,
        isDisabledPrev,
        isDisabledNext,
        nextButtonSelector
    } = props
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(selectIsLoading)
    const storageLabels = useAppSelector(selectStorageLabels)

    return (
        <S.Wrapper>
            <CustomIconLink
                className="button option-link"
                onClick={() =>
                    NavigatePreviousMail({
                        labelIds,
                        emailListIndex,
                        emailList,
                        viewIndex,
                        dispatch,
                    })
                }
                disabled={isDisabledPrev}
                icon={<FiChevronLeft size={20} />}
            />
            <CustomIconLink
                className="button option-link"
                onClick={() => nextButtonSelector()}
                disabled={isDisabledNext || isLoading}
                icon={!isLoading ? <FiChevronRight size={20} /> : <CircularProgress size={10} />}
            />
            <CustomIconLink
                className="button option-link"
                onClick={() => CloseMail({ labelIds, storageLabels, dispatch })}
                icon={<FiX size={20} />}
            />
        </S.Wrapper>
    )
}

export default DetailNavigationView
