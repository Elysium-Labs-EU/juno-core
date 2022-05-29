import { useCallback, useMemo } from 'react'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import CircularProgress from '@mui/material/CircularProgress'
import * as S from './DetailNavigationStyles'
import * as global from '../../../constants/globalConstants'
import CustomIconButton from '../../Elements/Buttons/CustomIconButton'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import {
  closeMail,
  navigatePreviousMail,
  selectIsLoading,
} from '../../../Store/utilsSlice'
import useMultiKeyPress from '../../../Hooks/useMultiKeyPress'

const ICON_SIZE = 20
const actionKeys = [global.KEY_ESCAPE]
interface IDetailNavigationView {
  isDisabledPrev: boolean
  isDisabledNext: boolean
  nextButtonSelector: Function
}

const DetailNavigationView = (props: IDetailNavigationView) => {
  const { isDisabledPrev, isDisabledNext, nextButtonSelector } = props
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)

  const handleCloseEvent = useCallback(() => {
    dispatch(closeMail())
  }, [])

  useMultiKeyPress(handleCloseEvent, actionKeys)

  const handleNavPrevEvent = useCallback(() => {
    dispatch(navigatePreviousMail())
  }, [])

  const NavigationView = useMemo(
    () => (
      <S.Wrapper>
        <S.NavButton>
          <CustomIconButton
            onClick={handleNavPrevEvent}
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
            onClick={handleCloseEvent}
            icon={<FiX size={ICON_SIZE} />}
          />
        </S.NavButton>
      </S.Wrapper>
    ),
    [isDisabledPrev, isDisabledNext, isLoading, nextButtonSelector]
  )

  return NavigationView
}

export default DetailNavigationView
