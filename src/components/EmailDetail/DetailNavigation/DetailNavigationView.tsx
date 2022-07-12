import { useCallback, useEffect, useMemo } from 'react'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import CircularProgress from '@mui/material/CircularProgress'
import * as S from './DetailNavigationStyles'
import * as global from '../../../constants/globalConstants'
import CustomIconButton from '../../Elements/Buttons/CustomIconButton'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  closeMail,
  navigateNextMail,
  navigatePreviousMail,
  selectEmailListSize,
  selectIsLoading,
  selectIsSilentLoading,
} from '../../../store/utilsSlice'
import { selectViewIndex } from '../../../store/emailDetailSlice'
import { selectLabelIds } from '../../../store/labelsSlice'
import { IEmailListObject } from '../../../store/storeTypes/emailListTypes'
import loadNextPage from '../../../utils/loadNextPage'
import useKeyPress from '../../../Hooks/useKeyPress'

const ICON_SIZE = 20
interface IDetailNavigationView {
  isDisabledPrev: boolean
  isDisabledNext: boolean
  activeEmailList: any
}

const DetailNavigationView = (props: IDetailNavigationView) => {
  const { isDisabledPrev, isDisabledNext, activeEmailList } = props
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  const labelIds = useAppSelector(selectLabelIds)
  const isSilentLoading = useAppSelector(selectIsSilentLoading)
  const viewIndex = useAppSelector(selectViewIndex)
  const emailFetchSize = useAppSelector(selectEmailListSize)
  const ArrowLeftListener = useKeyPress(global.KEY_ARROW_LEFT)
  const ArrowRightListener = useKeyPress(global.KEY_ARROW_RIGHT)
  const EscapeListener = useKeyPress(global.KEY_ESCAPE)

  const handleCloseEvent = useCallback(() => {
    dispatch(closeMail())
  }, [])

  useEffect(() => {
    if (EscapeListener) {
      handleCloseEvent()
    }
  }, [EscapeListener])

  const handleNavPrevEvent = useCallback(() => {
    dispatch(navigatePreviousMail())
  }, [])
  useEffect(() => {
    if (ArrowLeftListener) {
      handleNavPrevEvent()
    }
  }, [ArrowLeftListener])

  const handleNavNextEvent = useCallback(() => {
    const nextButtonSelector = () => {
      if (
        activeEmailList.threads.length > 0 &&
        activeEmailList.threads[viewIndex + 1] !== undefined &&
        labelIds
      ) {
        dispatch(navigateNextMail())
      }
      if (!labelIds.includes(global.ARCHIVE_LABEL)) {
        // If loading isn't already happening, load the nextPage
        const { nextPageToken } = activeEmailList as IEmailListObject
        if (
          activeEmailList.nextPageToken !== null &&
          activeEmailList.threads[viewIndex + 1] === undefined &&
          !isSilentLoading
        ) {
          return loadNextPage({
            nextPageToken,
            labelIds,
            dispatch,
            maxResults: emailFetchSize,
          })
        }
      }

      return null
    }
    nextButtonSelector()
  }, [])
  useEffect(() => {
    if (ArrowRightListener) {
      handleNavNextEvent()
    }
  }, [ArrowRightListener])

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
            onClick={handleNavNextEvent}
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
    [isDisabledPrev, isDisabledNext, isLoading, activeEmailList]
  )

  return NavigationView
}

export default DetailNavigationView
