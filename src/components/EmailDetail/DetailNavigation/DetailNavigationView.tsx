import { useCallback, useMemo } from 'react'

import * as global from '../../../constants/globalConstants'
import * as keyConstants from '../../../constants/keyConstants'
import useKeyboardShortcut from '../../../hooks/useKeyboardShortcut'
import {
  QiChevronLeft,
  QiChevronRight,
} from '../../../images/svgIcons/quillIcons'
import {
  selectCoreStatus,
  selectViewIndex,
} from '../../../store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectLabelIds } from '../../../store/labelsSlice'
import { IEmailListObject } from '../../../store/storeTypes/emailListTypes'
import {
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
  const coreStatus = useAppSelector(selectCoreStatus)
  const dispatch = useAppDispatch()
  const emailFetchSize = useAppSelector(selectEmailListSize)
  const isLoading = useAppSelector(selectIsLoading)
  const isSilentLoading = useAppSelector(selectIsSilentLoading)
  const labelIds = useAppSelector(selectLabelIds)
  const viewIndex = useAppSelector(selectViewIndex)

  const handleNavPrevEvent = useCallback(() => {
    dispatch(navigatePreviousMail())
  }, [])

  const handleNavNextEvent = useCallback(() => {
    const nextButtonSelector = () => {
      if (
        activeEmailList.threads.length > 0 &&
        activeEmailList.threads[viewIndex + 1] !== undefined
      ) {
        dispatch(navigateNextMail())
      }
      if (coreStatus !== global.CORE_STATUS_MAP.searching) {
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

  useKeyboardShortcut({
    handleEvent: handleNavNextEvent,
    actionKeys: [keyConstants.KEY_ARROWS.right],
    refreshOnDeps: [activeEmailList, coreStatus, viewIndex],
  })

  useKeyboardShortcut({
    handleEvent: handleNavPrevEvent,
    actionKeys: [keyConstants.KEY_ARROWS.left],
  })

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
      </S.Wrapper>
    ),
    [isDisabledPrev, isDisabledNext, isLoading, activeEmailList]
  )

  return NavigationView
}

export default DetailNavigationView
