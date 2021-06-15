import React from 'react'
import styled from 'styled-components'
import NavControls from '../MainHeader/Navigation/NavControls'
import Menu from '../Menu'
import DetailNavigation from '../DetailNavigation'

const InnerMenu = styled.div`
  margin-top: 4rem;
  display: flex;
`

const Emaildetailheader = () => {
  return (
    <div className="tlOuterContainer">
      <NavControls />
      <InnerMenu>
        <Menu />
        <DetailNavigation />
      </InnerMenu>
    </div>
  )
}

export default Emaildetailheader
