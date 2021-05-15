import React from 'react'
import NavControls from './../Navigation/NavControls'
import Menu from './../Menu'
import DetailNavigation from './../DetailNavigation'
import styled from 'styled-components'

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
