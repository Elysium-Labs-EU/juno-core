import React, { useEffect, useMemo, useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import { useHistory, useLocation } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import { selectLabelIds, selectStorageLabels } from '../../Store/labelsSlice'
import * as S from './DetailNavigationStyles'
import { selectCurrentEmail, selectViewIndex } from '../../Store/emailDetailSlice'
import { loadEmails } from '../../Store/metaListSlice'
import CloseMail from '../../utils/closeEmail'
import NavigateNextMail from '../../utils/navigateNextEmail'
import NavigatePreviousMail from '../../utils/navigatePreviousEmail'
import { CustomIconLink } from '../Elements/Buttons'
import loadNextPage from '../../utils/loadNextPage'
import { selectEmailList } from '../../Store/emailListSlice'
import { selectIsLoading, selectIsSilentLoading } from '../../Store/utilsSlice'
import { loadDraftList, selectDraftListLoaded } from '../../Store/draftsSlice'
import * as draft from '../../constants/draftConstants'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { LocationObjectType } from '../types/globalTypes'

const DetailNavigation = () => {
  const emailList = useAppSelector(selectEmailList)
  const draftListLoaded = useAppSelector(selectDraftListLoaded)
  const labelIds = useAppSelector(selectLabelIds)
  const isLoading = useAppSelector(selectIsLoading)
  const isSilentLoading = useAppSelector(selectIsSilentLoading)
  const currEmail = useAppSelector(selectCurrentEmail)
  const storageLabels = useAppSelector(selectStorageLabels)
  const viewIndex = useAppSelector(selectViewIndex)
  const [currLocal, setCurrLocal] = useState<string>('')
  const history = useHistory()
  const dispatch = useAppDispatch()
  const location = useLocation<LocationObjectType>()

  const emailListIndex = useMemo(
    () => emailList.findIndex((threadList) => threadList.labels.includes(labelIds[0])),
    [emailList, labelIds]
  )

  const isDisabledPrev = !!(
    emailList.length > 0 && emailList[emailListIndex].threads[viewIndex - 1] === undefined
  )

  const isDisabledNext =
    emailList.length > 0 &&
    emailList[emailListIndex].nextPageToken === null &&
    emailList[emailListIndex].threads[viewIndex + 1] === undefined

  const nextButtonSelector = () => {
    const { nextPageToken } = emailList[emailListIndex]
    if (
      emailList.length > 0 &&
      emailList[emailListIndex].threads[viewIndex + 1] !== undefined &&
      labelIds
    ) {
      NavigateNextMail({
        history,
        labelIds,
        emailListIndex,
        emailList,
        viewIndex,
        dispatch,
      })
      if ((emailList[emailListIndex].threads.length - 1) - viewIndex <= 4) {
        if (!isSilentLoading) {
          const silentLoading = true
          return loadNextPage({ nextPageToken, labelIds, dispatch, silentLoading })
        }
      }
    }
    if (
      emailList.length > 0 &&
      emailList[emailListIndex].nextPageToken !== null &&
      emailList[emailListIndex].threads[viewIndex + 1] === undefined
    ) {
      if (!isSilentLoading) {
        return loadNextPage({ nextPageToken, labelIds, dispatch })
      }
    }
    return null
  }

  const refetchMeta = () => {
    const labels = labelIds
    const params = {
      labelIds: labels,
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
      } else {
        refetchMeta()
      }
    }
  }, [currEmail, emailList])

  // Load additional emails when the first, current viewed email happens to be the last in the list
  useEffect(() => {
    if (viewIndex > -1 && !isSilentLoading && emailListIndex > -1) {
      if (emailList[emailListIndex].threads.length - 1 === viewIndex) {
        const { nextPageToken } = emailList[emailListIndex]
        const silentLoading = true
        emailList.length > 0 &&
          nextPageToken !== null &&
          emailList[emailListIndex].threads[viewIndex + 1] === undefined && loadNextPage({ nextPageToken, labelIds, dispatch, silentLoading })
      }
    }
  }, [viewIndex, isSilentLoading, emailListIndex])

  return (
    <S.Wrapper>
      <CustomIconLink
        className="button option-link"
        onClick={() =>
          NavigatePreviousMail({
            history,
            labelIds,
            emailListIndex,
            emailList,
            viewIndex,
            dispatch,
          })
        }
        disabled={isDisabledPrev}
        icon={<FiChevronLeft size={20} />}
      />
      <CustomIconLink
        className="button option-link"
        onClick={() => nextButtonSelector()}
        disabled={isDisabledNext || isLoading}
        icon={!isLoading ? <FiChevronRight size={20} /> : <CircularProgress size={10} />}
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
