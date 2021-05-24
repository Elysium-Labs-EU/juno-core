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
  const { labelIds, currEmail, emailList, isLoading, viewIndex, metaList } = state
  return { labelIds, currEmail, emailList, isLoading, viewIndex, metaList }
}

const DetailNavigation = ({
  labelIds,
  emailList,
  currEmail,
  viewIndex,
  dispatch,
  metaList,
}) => {
  const [currLocal, setCurrLocal] = useState('')
  const history = useHistory()
  const labelURL = convertArrayToString(labelIds)

  const isDisabledPrev = metaList[viewIndex - 1] === undefined ? true : false
  const isDisabledNext = metaList[viewIndex + 1] === undefined ? true : false
  // const isDisabledPrev = emailList[viewIndex - 1] === undefined ? true : false
  // const isDisabledNext = emailList[viewIndex + 1] === undefined ? true : false

  useEffect(() => {
    if (currEmail !== currLocal) {
      setCurrLocal(currEmail)
      // const requestBody = {
      //   emailList: emailList,
      //   currEmail: currEmail,
      // }
      const requestBody = {
        metaList: metaList,
        currEmail: currEmail,
      }
      dispatch(setViewingIndex(requestBody))
    }
  }, [currEmail])

  return (
    <Wrapper>
      <NavButton
        onClick={() =>
          NavigatePreviousMail({history, labelURL, metaList, viewIndex})
          // NavigatePreviousMail(history, labelURL, emailList, viewIndex)
        }
        disabled={isDisabledPrev}
      >
        <FiChevronLeft size={20} />
      </NavButton>
      <NavButton
        onClick={() =>
          NavigateNextMail({history, labelURL, metaList, viewIndex})
          // NavigateNextMail(history, labelURL, emailList, viewIndex)
        }
        disabled={isDisabledNext}
      >
        <FiChevronRight size={20} />
      </NavButton>
      <NavButton onClick={() => CloseMail({history})}>
        <FiX size={20} />
      </NavButton>
    </Wrapper>
  )
}

export default connect(mapStateToProps)(DetailNavigation)
