import React from 'react'
import './DetailNavigation.scss'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import NavigatePreviousMail from './emailOptions/NavigatePreviousMail'
import NavigateNextMail from './emailOptions/NavigateNextMail'
import CloseMail from './emailOptions/CloseMail'
import { useDispatch, useSelector } from 'react-redux'


const selectMetaList = (state) => state.metaList

const DetailNavigation = () => {
  const metaList = useSelector(selectMetaList)

  console.log(metaList)

  return (
    <div className="detail-navigation">
      <div onClick={() => NavigatePreviousMail()}>
        <FiChevronLeft size={20} />
      </div>
      <div onClick={() => NavigateNextMail()}>
        <FiChevronRight size={20} />
      </div>
      <div onClick={CloseMail}>
        <FiX size={20} />
      </div>
    </div>
  )
}

export default DetailNavigation
