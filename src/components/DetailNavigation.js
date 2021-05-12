import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import { NavButton, Wrapper } from './DetailNavigationStyles'

const mapStateToProps = (state) => {
  const { currEmail, emailList, isLoading } = state
  return { currEmail, emailList, isLoading }
}

const DetailNavigation = ({ emailList, currEmail }) => {
  const [currLocal, setCurrLocal] = useState('')
  const [viewIndex, setViewIndex] = useState(0)
  const history = useHistory()

  const NavigatePreviousMail = () => {
    console.log(emailList[viewIndex - 1].thread.id)
    history.push(emailList[viewIndex - 1].thread.id)
  }
  const NavigateNextMail = () => {
    console.log(emailList[viewIndex + 1].thread.id)
    history.push(`/mail/${emailList[viewIndex + 1].thread.id}`)
  }
  const CloseMail = () => {
    history.push(`/inbox`)
  }

  const isDisabledPrev = emailList[viewIndex - 1] === undefined ? true : false
  const isDisabledNext = emailList[viewIndex + 1] === undefined ? true : false

  useEffect(() => {
    if (currEmail !== currLocal) {
      setCurrLocal(currEmail)
      const viewingIndex = emailList
        .map(function (e) {
          return e.id
        })
        .indexOf(currEmail)
      setViewIndex(viewingIndex)
    }
  }, [currEmail])

  return (
    <Wrapper>
      <NavButton
        onClick={() => NavigatePreviousMail()}
        disabled={isDisabledPrev}
      >
        <FiChevronLeft size={20} />
      </NavButton>
      <NavButton onClick={() => NavigateNextMail()} disabled={isDisabledNext}>
        <FiChevronRight size={20} />
      </NavButton>
      <NavButton onClick={CloseMail}>
        <FiX size={20} />
      </NavButton>
    </Wrapper>
  )
}

export default connect(mapStateToProps)(DetailNavigation)
