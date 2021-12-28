import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navigation from '../MainHeader/Navigation/Navigation'
import { useAppSelector } from '../../Store/hooks'
import Menu from './Menu/Menu'
import DetailNavigation from './DetailNavigation/DetailNavigationContainer'
import { selectIsFocused, selectIsSorting } from '../../Store/emailListSlice'
import * as local from '../../constants/emailDetailConstants'
import BackButton from '../Elements/BackButton'
import * as S from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'
import { selectLabelIds, selectStorageLabels } from '../../Store/labelsSlice'
import { FindLabelById } from '../../utils/findLabel'

const Emaildetailheader = () => {
  const isFocused = useAppSelector(selectIsFocused)
  const isSorting = useAppSelector(selectIsSorting)
  const storageLabels = useAppSelector(selectStorageLabels)
  const labelIds = useAppSelector(selectLabelIds)
  const location = useLocation()
  const [detailHeader, setDetailHeader] = useState<string>('')

  useEffect(() => {
    if (storageLabels.length > 0 && labelIds.length > 0) {
      if (location.pathname.includes(labelIds[0])) {
        const matchedLabel = FindLabelById({ storageLabels, labelIds })
        if (matchedLabel.length > 0) {
          const splitHeader = matchedLabel[0].name.split('/')
          setDetailHeader(splitHeader[splitHeader.length - 1].toLowerCase())
        }
      }
    }
  }, [storageLabels, labelIds])

  return (
    <GS.OuterContainer>
      {!(isFocused || isSorting) ? (
        <S.Wrapper>
          <div className="header-center">
            <S.PageTitle>{detailHeader || local.INVALID_HEADER}</S.PageTitle>
          </div>
          <Navigation />
          <S.InnerMenu>
            <Menu />
            <DetailNavigation />
          </S.InnerMenu>
        </S.Wrapper>
      ) : (
        <S.Wrapper>
          <S.FocusSortHeaderWrapper>
            {isFocused ? <S.PageTitle>{local.HEADER_FOCUS}</S.PageTitle> : <S.PageTitle>{local.HEADER_SORT}</S.PageTitle>}
          </S.FocusSortHeaderWrapper>
          <div>
            <BackButton isFocused={isFocused} isSorting={isSorting} />
          </div>
        </S.Wrapper>
      )}
    </GS.OuterContainer>
  )
}

export default Emaildetailheader
