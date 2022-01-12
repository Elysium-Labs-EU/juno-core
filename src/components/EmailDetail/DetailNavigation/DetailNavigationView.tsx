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
import { IEmailListObject } from '../../../Store/emailListTypes'

interface IDetailNavigationView {
    labelIds: string[]
    activeEmailList: IEmailListObject
    viewIndex: number
    isDisabledPrev: boolean
    isDisabledNext: boolean
    nextButtonSelector: Function
}

const DetailNavigationView = (props: IDetailNavigationView) => {
    const {
        labelIds,
        activeEmailList,
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
                className="juno-button option-link"
                onClick={() =>
                    NavigatePreviousMail({
                        labelIds,
                        activeEmailList,
                        viewIndex,
                        dispatch,
                    })
                }
                disabled={isDisabledPrev}
                title="Previous email"
                icon={<FiChevronLeft size={20} />}
            />
            <CustomIconLink
                className="juno-button option-link"
                onClick={() => nextButtonSelector()}
                disabled={isDisabledNext || isLoading}
                title="Next email"
                icon={!isLoading ? <FiChevronRight size={20} /> : <CircularProgress size={10} />}
            />
            <CustomIconLink
                className="juno-button option-link"
                title="Close view"
                onClick={() => CloseMail({ labelIds, storageLabels, dispatch })}
                icon={<FiX size={20} />}
            />
        </S.Wrapper>
    )
}

export default DetailNavigationView
