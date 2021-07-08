import React from 'react'
import { useSelector } from 'react-redux'
import NavControls from '../MainHeader/Navigation/NavControls'
import Menu from '../Menu'
import DetailNavigation from './DetailNavigation'
import { selectIsFocused, selectIsSorting } from '../../Store/emailListSlice'
import * as local from '../../constants/emailDetailConstants'
import BackButton from '../BackButton'
import * as S from './EmailDetailHeaderStyles'
import * as GS from '../../styles/globalStyles'

const Emaildetailheader = () => {
  const isFocused = useSelector(selectIsFocused)
  const isSorting = useSelector(selectIsSorting)

  return (
    <GS.OuterContainer>
      {!(isFocused || isSorting) ? (
        <>
          <NavControls />
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
            {isFocused ? (
              <h1>{local.HEADER_FOCUS}</h1>
            ) : (
              <h1>{local.HEADER_SORT}</h1>
            )}
          </S.HeaderWrapper>
        </S.InnerMenu>
      )}
    </GS.OuterContainer>
  )
}

export default Emaildetailheader
