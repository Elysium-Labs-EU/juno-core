import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navigation from '../MainHeader/Navigation/Navigation'
import { useAppSelector } from '../../Store/hooks'
import Menu from './Menu/Menu'
import DetailNavigation from './DetailNavigation'
import { selectIsFocused, selectIsSorting } from '../../Store/emailListSlice'
import * as local from '../../constants/emailDetailConstants'
import BackButton from '../BackButton'
import * as S from './EmailDetailHeaderStyles'
import * as GS from '../../styles/globalStyles'
import { selectLabelIds, selectStorageLabels } from '../../Store/labelsSlice'

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
        const matchedLabel = storageLabels.filter((item) => item.id === labelIds[0])
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
        <>
          <div className="header-center">
            <h2 className="page_title">{detailHeader || local.INVALID_HEADER}</h2>
          </div>
          <Navigation />
          <S.InnerMenu>
            <Menu />
            <DetailNavigation />
          </S.InnerMenu>
        </>
      ) : (
        <S.InnerMenu>
          <S.ButtonWrapper>
            <BackButton isFocused={isFocused} isSorting={isSorting} />
          </S.ButtonWrapper>
          <S.HeaderWrapper>
            {isFocused ? <h1 className="page_title">{local.HEADER_FOCUS}</h1> : <h1 className="page_title">{local.HEADER_SORT}</h1>}
          </S.HeaderWrapper>
        </S.InnerMenu>
      )}
    </GS.OuterContainer>
  )
}

export default Emaildetailheader
