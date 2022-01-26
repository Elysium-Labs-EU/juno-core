import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import CircularProgress from '@mui/material/CircularProgress'
import * as S from './DetailNavigationStyles'
import CloseMail from '../../../utils/closeEmail'
import navigatePreviousMail from '../../../utils/navigatePreviousEmail'
import CustomIconButton from '../../Elements/Buttons/CustomIconButton'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import { selectIsLoading } from '../../../Store/utilsSlice'
import { selectStorageLabels } from '../../../Store/labelsSlice'
import { IEmailListObject, IEmailListObjectSearch } from '../../../Store/emailListTypes'

const ICON_SIZE = 20
interface IDetailNavigationView {
  labelIds: string[]
  activeEmailList: IEmailListObject | IEmailListObjectSearch
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
    nextButtonSelector,
  } = props
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  const storageLabels = useAppSelector(selectStorageLabels)

  return (
    <S.Wrapper>
      <S.NavButton>
        <CustomIconButton
          onClick={() =>
            navigatePreviousMail({
              labelIds,
              activeEmailList,
              viewIndex,
              dispatch,
            })
          }
          disabled={isDisabledPrev}
          title="Previous email"
          icon={<FiChevronLeft size={ICON_SIZE} />}
        />
      </S.NavButton>
      <S.NavButton>
        <CustomIconButton
          onClick={() => nextButtonSelector()}
          disabled={isDisabledNext || isLoading}
          title="Next email"
          icon={
            !isLoading ? (
              <FiChevronRight size={ICON_SIZE} />
            ) : (
              <CircularProgress size={10} />
            )
          }
        />
      </S.NavButton>
      <S.NavButton>
        <CustomIconButton
          title="Close view"
          onClick={() => CloseMail({ labelIds, storageLabels, dispatch })}
          icon={<FiX size={ICON_SIZE} />}
        />
      </S.NavButton>
    </S.Wrapper>
  )
}

export default DetailNavigationView
