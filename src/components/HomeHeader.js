import NavControls from './NavControls'
import Menu from './Menu'
import DetailNavigation from './DetailNavigation'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

const InnerMenu = styled.div`
  margin-top: 4rem;
  display: flex;
`

const HomeHeader = () => {
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

export default HomeHeader
