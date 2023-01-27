import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import BackButton from 'components/Elements/Buttons/BackButton'
import CustomButton from 'components/Elements/Buttons/CustomButton'
import * as S from 'components/MainHeader/HeaderStyles'
import Navigation from 'components/MainHeader/Navigation/Navigation'
import * as local from 'constants/emailDetailConstants'
import * as global from 'constants/globalConstants'
import { QiSearch } from 'images/svgIcons/quillIcons'
import { selectCoreStatus, selectViewIndex } from 'store/emailDetailSlice'
import { selectSearchList } from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds, selectStorageLabels } from 'store/labelsSlice'
import type { TEmailListObject } from 'store/storeTypes/emailListTypes'
import {
  selectEmailListSize,
  selectIsSilentLoading,
  setInSearch,
} from 'store/utilsSlice'
import * as GS from 'styles/globalStyles'
import { findLabelById } from 'utils/findLabel'
import { edgeLoadingNextPage } from 'utils/loadNextPage'

import DetailNavigationContainer from './DetailNavigation/DetailNavigationContainer'
import EmailPosition from './EmailPosition/EmailPosition'
import Tabs from './Tabs/Tabs'

const EmailDetailHeader = ({
  activeEmailList,
}: {
  activeEmailList: TEmailListObject
}) => {
  const coreStatus = useAppSelector(selectCoreStatus)
  const emailFetchSize = useAppSelector(selectEmailListSize)
  const isSilentLoading = useAppSelector(selectIsSilentLoading)
  const labelIds = useAppSelector(selectLabelIds)
  const searchList = useAppSelector(selectSearchList)
  const storageLabels = useAppSelector(selectStorageLabels)
  const viewIndex = useAppSelector(selectViewIndex)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const [detailHeader, setDetailHeader] = useState<string>('')

  useEffect(() => {
    let mounted = true
    if (
      storageLabels.length > 0 &&
      labelIds.length > 0 &&
      labelIds[0] &&
      location?.pathname?.includes(labelIds[0])
    ) {
      const matchedLabel = findLabelById({ storageLabels, labelIds })
      if (matchedLabel && matchedLabel.name) {
        const lastHeader = matchedLabel.name.split('/').pop()
        mounted && lastHeader && setDetailHeader(lastHeader.toLowerCase())
      } else {
        mounted && setDetailHeader(global.SEARCH_LABEL.toLowerCase())
      }
    }

    return () => {
      mounted = false
    }
  }, [storageLabels, labelIds])

  useEffect(() => {
    let mounted = true
    // Attempt to load the next emails on the background when approaching the edge
    if (
      activeEmailList.threads.length - 1 - viewIndex <= 4 &&
      activeEmailList.nextPageToken &&
      mounted &&
      !isSilentLoading
    ) {
      edgeLoadingNextPage({
        isSilentLoading,
        dispatch,
        labelIds,
        emailFetchSize,
        activeEmailList,
      })
    }
    return () => {
      mounted = false
    }
  }, [activeEmailList, emailFetchSize, isSilentLoading, labelIds, viewIndex])

  return (
    <GS.OuterContainer data-testid="email-detail-header">
      {!coreStatus || coreStatus === global.CORE_STATUS_MAP.searching ? (
        <S.Wrapper>
          <S.HeaderCenter>
            <S.PageTitle>{detailHeader || local.INVALID_HEADER}</S.PageTitle>
          </S.HeaderCenter>
          <S.SearchQuery>
            {labelIds.includes(global.SEARCH_LABEL) && (
              <CustomButton
                label={`Search Query: "${searchList?.q}"`}
                onClick={() => dispatch(setInSearch(true))}
                suppressed
                title="Go back to search window"
                icon={<QiSearch />}
              />
            )}
          </S.SearchQuery>
          <S.BackButtonWithNavgationContainer>
            <BackButton />
            <Navigation />
          </S.BackButtonWithNavgationContainer>
          <S.InnerMenu>
            {activeEmailList && (
              <>
                <Tabs activeEmailList={activeEmailList} />
                <DetailNavigationContainer activeEmailList={activeEmailList} />
              </>
            )}
          </S.InnerMenu>
        </S.Wrapper>
      ) : (
        <S.Wrapper>
          <S.FocusSortHeaderWrapper>
            {coreStatus === global.CORE_STATUS_MAP.focused ? (
              <S.PageTitle>{local.HEADER_FOCUS}</S.PageTitle>
            ) : (
              <S.PageTitle>{local.HEADER_SORT}</S.PageTitle>
            )}
          </S.FocusSortHeaderWrapper>
          <S.BackButtonWithNavgationContainer>
            <BackButton />
            <EmailPosition />
          </S.BackButtonWithNavgationContainer>
          <S.InnerMenu>
            {activeEmailList && <Tabs activeEmailList={activeEmailList} />}
          </S.InnerMenu>
        </S.Wrapper>
      )}
    </GS.OuterContainer>
  )
}

export default EmailDetailHeader
