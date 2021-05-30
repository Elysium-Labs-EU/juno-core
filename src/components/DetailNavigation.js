import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import { NavButton, Wrapper } from './DetailNavigationStyles'
import {
  convertArrayToString,
  CloseMail,
  NavigatePreviousMail,
  NavigateNextMail,
} from './../utils'
import { setViewingIndex } from '../Store/actions'

const mapStateToProps = (state) => {
  const {
    labelIds,
    currEmail,
    emailList,
    isLoading,
    viewIndex,
    metaList,
  } = state
  return { labelIds, currEmail, emailList, isLoading, viewIndex, metaList }
}

const DetailNavigation = ({
  labelIds,
  currEmail,
  viewIndex,
  dispatch,
  metaList,
}) => {
  const [currLocal, setCurrLocal] = useState('')
  const history = useHistory()
  const labelURL = convertArrayToString(labelIds)
  const filteredMetaList = metaList && metaList.filter((threadList) =>
        threadList.labels.includes(...labelIds)
  )
  
  const isDisabledPrev = filteredMetaList.length > 0 && filteredMetaList[0].threads[viewIndex - 1] === undefined ? true : false
  const isDisabledNext = filteredMetaList.length > 0 && filteredMetaList[0].threads[viewIndex + 1] === undefined ? true : false

  useEffect(() => {
    if (currEmail !== currLocal) {
      setCurrLocal(currEmail)
      const requestBody = {
        metaList: filteredMetaList[0].threads,
        currEmail: currEmail,
      }
      dispatch(setViewingIndex(requestBody))
    }
  }, [currEmail])

  return (
    <Wrapper>
      <NavButton
        onClick={
          () => NavigatePreviousMail({ history, labelURL, filteredMetaList, viewIndex })
        }
        disabled={isDisabledPrev}
      >
        <FiChevronLeft size={20} />
      </NavButton>
      <NavButton
        onClick={
          () => NavigateNextMail({ history, labelURL, filteredMetaList, viewIndex })
        }
        disabled={isDisabledNext}
      >
        <FiChevronRight size={20} />
      </NavButton>
      <NavButton onClick={() => CloseMail({ history })}>
        <FiX size={20} />
      </NavButton>
    </Wrapper>
  )
}

export default connect(mapStateToProps)(DetailNavigation)
