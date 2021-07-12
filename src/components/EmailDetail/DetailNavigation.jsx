import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import { useHistory, useLocation } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import { selectLabelIds, selectStorageLabels } from '../../Store/labelsSlice'
import * as S from './DetailNavigationStyles'
import { convertArrayToString } from '../../utils'
import {
  selectCurrentEmail,
  selectViewIndex,
  setViewingIndex,
} from '../../Store/emailDetailSlice'
import { loadEmails } from '../../Store/metaListSlice'
import CloseMail from '../../utils/closeEmail'
import NavigateNextMail from '../../utils/navigateNextEmail'
import NavigatePreviousMail from '../../utils/navigatePreviousEmail'
import { CustomIconLink } from '../Elements/Buttons'
import loadNextPage from '../../utils/loadNextPage'
import { selectEmailList } from '../../Store/emailListSlice'
import { selectIsLoading } from '../../Store/utilsSlice'
import { loadDraftList, selectDraftListLoaded } from '../../Store/draftsSlice'
import * as draft from '../../constants/draftConstants'

const DetailNavigation = () => {
  const emailList = useSelector(selectEmailList)
  const draftListLoaded = useSelector(selectDraftListLoaded)
  const labelIds = useSelector(selectLabelIds)
  const isLoading = useSelector(selectIsLoading)
  const currEmail = useSelector(selectCurrentEmail)
  const storageLabels = useSelector(selectStorageLabels)
  const viewIndex = useSelector(selectViewIndex)
  const [currLocal, setCurrLocal] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()
  const labelURL = convertArrayToString(labelIds)
  const location = useLocation()

  const emailListIndex = useMemo(
    () =>
      emailList.findIndex((threadList) =>
        threadList.labels.includes(...labelIds)
      ),
    [emailList, labelIds]
  )

  const isDisabledPrev = !!(
    emailList.length > 0 &&
    emailList[emailListIndex].threads[viewIndex - 1] === undefined
  )

  const isDisabledNext =
    emailList.length > 0 &&
    emailList[emailListIndex].nextPageToken === null &&
    emailList[emailListIndex].threads[viewIndex + 1] === undefined

  const nextButtonSelector = () => {
    if (
      emailList.length > 0 &&
      emailList[emailListIndex].threads[viewIndex + 1] !== undefined
    ) {
      return NavigateNextMail({
        history,
        labelURL,
        emailListIndex,
        emailList,
        viewIndex,
      })
    }
    if (
      emailList.length > 0 &&
      emailList[emailListIndex].nextPageToken !== null &&
      emailList[emailListIndex].threads[viewIndex + 1] === undefined
    ) {
      const { nextPageToken } = emailList[emailListIndex]
      return loadNextPage({ nextPageToken, labelIds, dispatch })
      // if (emailList[emailListIndex].threads[viewIndex + 1] === undefined) {
      //   NavigateNextMail({
      //     history,
      //     labelURL,
      //     emailListIndex,
      //     emailList,
      //     viewIndex,
      //   })
      // }
    }
    return null
  }

  const refetchMeta = () => {
    const params = {
      labelIds,
      maxResults: 20,
    }
    dispatch(loadEmails(params))
    if (location.pathname.includes(draft.LABEL) && !draftListLoaded) {
      dispatch(loadDraftList())
    }
  }

  useEffect(() => {
    if (currEmail !== currLocal) {
      if (emailList.length > 0) {
        setCurrLocal(currEmail)
        const requestBody = {
          emailList: emailList[emailListIndex].threads,
          currEmail,
        }
        dispatch(setViewingIndex(requestBody))
      } else {
        refetchMeta()
      }
    }
  }, [currEmail, emailList])

  return (
    <S.Wrapper>
      <CustomIconLink
        className="button option-link"
        onClick={() =>
          NavigatePreviousMail({
            history,
            labelURL,
            emailListIndex,
            emailList,
            viewIndex,
          })
        }
        disabled={isDisabledPrev}
        icon={<FiChevronLeft size={20} />}
      />
      <CustomIconLink
        className="button option-link"
        onClick={() => nextButtonSelector()}
        disabled={isDisabledNext || isLoading}
        icon={
          !isLoading ? (
            <FiChevronRight size={20} />
          ) : (
            <CircularProgress size={10} />
          )
        }
      />
      <CustomIconLink
        className="button option-link"
        onClick={() => CloseMail({ history, labelIds, storageLabels })}
        icon={<FiX size={20} />}
      />
    </S.Wrapper>
  )
}

export default DetailNavigation
