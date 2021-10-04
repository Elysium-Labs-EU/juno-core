import React from 'react'
import { useSelector } from 'react-redux'
import NavControls from '../MainHeader/Navigation/NavControls'
import Menu from './Menu/Menu'
import DetailNavigation from './DetailNavigation'
import { selectIsFocused, selectIsSorting } from '../../Store/emailListSlice'
import * as local from '../../constants/emailDetailConstants'
import BackButton from '../BackButton'
import * as S from './EmailDetailHeaderStyles'
import * as GS from '../../styles/globalStyles'

const Emaildetailheader = ({
  currentViewListener,
  viewIndexState,
}: {
  currentViewListener: any
  viewIndexState: number
}) => {
  const isFocused = useSelector(selectIsFocused)
  const isSorting = useSelector(selectIsSorting)

  return (
    <GS.OuterContainer>
      {!(isFocused || isSorting) ? (
        <>
          <NavControls />
          <S.InnerMenu>
            <Menu />
            <DetailNavigation
              currentViewListener={currentViewListener}
              viewIndexState={viewIndexState}
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
