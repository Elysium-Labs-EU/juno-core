import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import { selectLabelIds } from '../Store/labelsSlice'
import { NavButton, Wrapper } from './DetailNavigationStyles'
import {
  convertArrayToString,
  CloseMail,
  NavigatePreviousMail,
  NavigateNextMail,
} from '../utils'
import {
  selectCurrentEmail,
  selectViewIndex,
  setViewingIndex,
} from '../Store/emailDetailSlice'
import { selectMetaList } from '../Store/metaListSlice'

const DetailNavigation = () => {
  const metaList = useSelector(selectMetaList)
  const labelIds = useSelector(selectLabelIds)
  const currEmail = useSelector(selectCurrentEmail)
  const viewIndex = useSelector(selectViewIndex)

  const [currLocal, setCurrLocal] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()
  const labelURL = convertArrayToString(labelIds)
  const filteredMetaList =
    metaList &&
    metaList.filter((threadList) => threadList.labels.includes(...labelIds))

  const isDisabledPrev = !!(
    filteredMetaList.length > 0 &&
    filteredMetaList[0].threads[viewIndex - 1] === undefined
  )
  const isDisabledNext = !!(
    filteredMetaList.length > 0 &&
    filteredMetaList[0].threads[viewIndex + 1] === undefined
  )

  useEffect(() => {
    if (currEmail !== currLocal) {
      setCurrLocal(currEmail)
      const requestBody = {
        metaList: filteredMetaList[0].threads,
        currEmail,
      }
      dispatch(setViewingIndex(requestBody))
    }
  }, [currEmail])

  return (
    <Wrapper>
      <NavButton
        onClick={() =>
          NavigatePreviousMail({
            history,
            labelURL,
            filteredMetaList,
            viewIndex,
          })
        }
        disabled={isDisabledPrev}
      >
        <FiChevronLeft size={20} />
      </NavButton>
      <NavButton
        onClick={() =>
          NavigateNextMail({
            history,
            labelURL,
            filteredMetaList,
            viewIndex,
          })
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

export default DetailNavigation
