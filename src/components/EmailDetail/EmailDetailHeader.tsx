import React from 'react'
import NavControls from '../MainHeader/Navigation/NavControls'
import { useAppSelector } from '../../Store/hooks'
import Menu from './Menu/Menu'
import DetailNavigation from './DetailNavigation'
import { selectIsFocused, selectIsSorting } from '../../Store/emailListSlice'
import * as local from '../../constants/emailDetailConstants'
import BackButton from '../BackButton'
import * as S from './EmailDetailHeaderStyles'
import * as GS from '../../styles/globalStyles'

const Emaildetailheader = () => {
  const isFocused = useAppSelector(selectIsFocused)
  const isSorting = useAppSelector(selectIsSorting)

  return (
    <GS.OuterContainer>
      {!(isFocused || isSorting) ? (
        <>
          <NavControls />
          <S.InnerMenu>
            <Menu />
            <DetailNavigation
            />
          </S.InnerMenu>
        </>
      ) : (
        <S.InnerMenu>
          <S.ButtonWrapper>
            <BackButton isFocused={isFocused} isSorting={isSorting} />
          </S.ButtonWrapper>
          <S.HeaderWrapper>
            {isFocused ? <h1>{local.HEADER_FOCUS}</h1> : <h1>{local.HEADER_SORT}</h1>}
          </S.HeaderWrapper>
        </S.InnerMenu>
      )}
    </GS.OuterContainer>
  )
}

export default Emaildetailheader
