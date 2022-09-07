import { useCallback, useEffect, useMemo } from 'react'

import * as global from '../../../constants/globalConstants'
import * as keyConstants from '../../../constants/keyConstants'
import useKeyPress from '../../../hooks/useKeyPress'
import {
  QiChevronLeft,
  QiChevronRight,
  QiEscape,
} from '../../../images/svgIcons/quillIcons'
import { selectViewIndex } from '../../../store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectLabelIds } from '../../../store/labelsSlice'
import { IEmailListObject } from '../../../store/storeTypes/emailListTypes'
import {
  closeMail,
  navigateNextMail,
  navigatePreviousMail,
  selectEmailListSize,
  selectIsLoading,
  selectIsSilentLoading,
} from '../../../store/utilsSlice'
import loadNextPage from '../../../utils/loadNextPage'
import CustomIconButton from '../../Elements/Buttons/CustomIconButton'
import StyledCircularProgress from '../../Elements/StyledCircularProgress'
import * as S from './DetailNavigationStyles'

const ICON_SIZE = 20
interface IDetailNavigationView {
  isDisabledPrev: boolean
  isDisabledNext: boolean
  activeEmailList: IEmailListObject
}

const DetailNavigationView = ({
  isDisabledPrev,
  isDisabledNext,
  activeEmailList,
}: IDetailNavigationView) => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  const labelIds = useAppSelector(selectLabelIds)
  const isSilentLoading = useAppSelector(selectIsSilentLoading)
  const viewIndex = useAppSelector(selectViewIndex)
  const emailFetchSize = useAppSelector(selectEmailListSize)
  const ArrowLeftListener = useKeyPress(keyConstants.KEY_ARROW_LEFT)
  const ArrowRightListener = useKeyPress(keyConstants.KEY_ARROW_RIGHT)
  const EscapeListener = useKeyPress(keyConstants.KEY_ESCAPE)

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
      if (!labelIds.includes(global.SEARCH_LABEL)) {
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
            icon={<QiChevronLeft size={ICON_SIZE} />}
          />
        </S.NavButton>
        <S.NavButton>
          <CustomIconButton
            onClick={handleNavNextEvent}
            disabled={isDisabledNext || isLoading}
            title="Next email"
            icon={
              !isLoading ? (
                <QiChevronRight size={ICON_SIZE} />
              ) : (
                <StyledCircularProgress size={10} />
              )
            }
          />
        </S.NavButton>
        <S.NavButton>
          <CustomIconButton
            title="Close view"
            onClick={handleCloseEvent}
            icon={<QiEscape size={ICON_SIZE} />}
          />
        </S.NavButton>
      </S.Wrapper>
    ),
    [isDisabledPrev, isDisabledNext, isLoading, activeEmailList]
  )

  return NavigationView
}

export default DetailNavigationView
