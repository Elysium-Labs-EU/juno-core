import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navigation from '../MainHeader/Navigation/Navigation'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import Tabs from './Tabs/Tabs'
import DetailNavigationContainer from './DetailNavigation/DetailNavigationContainer'
import { selectCoreStatus } from '../../Store/emailListSlice'
import * as local from '../../constants/emailDetailConstants'
import * as global from '../../constants/globalConstants'
import BackButton from '../Elements/Buttons/BackButton'
import * as S from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'
import { selectLabelIds, selectStorageLabels } from '../../Store/labelsSlice'
import { FindLabelById } from '../../utils/findLabel'
import EmailPosition from './EmailPosition/EmailPosition'
import {
  IEmailListObject,
  IEmailListObjectSearch,
} from '../../Store/emailListTypes'
import { edgeLoadingNextPage } from '../../utils/loadNextPage'
import { selectViewIndex } from '../../Store/emailDetailSlice'
import {
  selectEmailListSize,
  selectIsSilentLoading,
} from '../../Store/utilsSlice'
import openLinkInNewTab from '../../utils/openLinkInNewTab'

const EmailDetailHeader = ({
  activeEmailList,
}: {
  activeEmailList: IEmailListObject | IEmailListObjectSearch
}) => {
  const coreStatus = useAppSelector(selectCoreStatus)
  const storageLabels = useAppSelector(selectStorageLabels)
  const labelIds = useAppSelector(selectLabelIds)
  const viewIndex = useAppSelector(selectViewIndex)
  const isSilentLoading = useAppSelector(selectIsSilentLoading)
  const emailFetchSize = useAppSelector(selectEmailListSize)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const [detailHeader, setDetailHeader] = useState<string>('')

  openLinkInNewTab()

  useEffect(() => {
    if (storageLabels.length > 0 && labelIds.length > 0) {
      if (location.pathname.includes(labelIds[0])) {
        const matchedLabel = FindLabelById({ storageLabels, labelIds })
        if (matchedLabel.length > 0) {
          const splitHeader = matchedLabel[0].name.split('/')
          setDetailHeader(splitHeader[splitHeader.length - 1].toLowerCase())
        } else {
          setDetailHeader(global.SEARCH_LABEL.toLowerCase())
        }
      }
    }
  }, [storageLabels, labelIds])

  // Attempt to load the next emails on the background when approaching the edge
  if (
    activeEmailList.threads.length - 1 - viewIndex <= 4 &&
    activeEmailList.nextPageToken
  ) {
    edgeLoadingNextPage({
      isSilentLoading,
      dispatch,
      labelIds,
      emailFetchSize,
      activeEmailList,
    })
  }

  return (
    <GS.OuterContainer>
      {!coreStatus || coreStatus === global.CORE_STATUS_SEARCHING ? (
        <S.Wrapper>
          <S.HeaderCenter>
            <S.PageTitle>{detailHeader || local.INVALID_HEADER}</S.PageTitle>
          </S.HeaderCenter>
          <Navigation />
          <S.InnerMenu>
            <Tabs activeEmailList={activeEmailList} />
            <DetailNavigationContainer activeEmailList={activeEmailList} />
          </S.InnerMenu>
        </S.Wrapper>
      ) : (
        <S.Wrapper>
          <S.FocusSortHeaderWrapper>
            {coreStatus === global.CORE_STATUS_FOCUSED ? (
              <S.PageTitle>{local.HEADER_FOCUS}</S.PageTitle>
            ) : (
              <S.PageTitle>{local.HEADER_SORT}</S.PageTitle>
            )}
          </S.FocusSortHeaderWrapper>
          <S.InnerMenu>
            <BackButton />
            <EmailPosition />
          </S.InnerMenu>
        </S.Wrapper>
      )}
    </GS.OuterContainer>
  )
}

export default EmailDetailHeader
