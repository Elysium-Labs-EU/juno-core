import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { selectLabelIds } from '../../../Store/labelsSlice'
import { selectCurrentEmail, selectViewIndex } from '../../../Store/emailDetailSlice'
import NavigateNextMail from '../../../utils/navigateNextEmail'
import loadNextPage from '../../../utils/loadNextPage'
import { loadEmails, selectEmailList } from '../../../Store/emailListSlice'
import { selectIsSilentLoading } from '../../../Store/utilsSlice'
import { loadDraftList, selectDraftListLoaded } from '../../../Store/draftsSlice'
import * as draft from '../../../constants/draftConstants'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import { LocationObjectType } from '../../types/globalTypes'
import DetailNavigationView from './DetailNavigationView'

const DetailNavigationContainer = () => {
  const emailList = useAppSelector(selectEmailList)
  const draftListLoaded = useAppSelector(selectDraftListLoaded)
  const labelIds = useAppSelector(selectLabelIds)
  const isSilentLoading = useAppSelector(selectIsSilentLoading)
  const currEmail = useAppSelector(selectCurrentEmail)
  const viewIndex = useAppSelector(selectViewIndex)
  const [currLocal, setCurrLocal] = useState<string>('')
  const dispatch = useAppDispatch()
  const location = useLocation<LocationObjectType>()

  const emailListIndex = useMemo(
    () => emailList.findIndex((threadList) => threadList.labels.includes(labelIds[0])),
    [emailList, labelIds]
  )

  const isDisabledPrev = !!(
    emailList[emailListIndex].threads[viewIndex - 1] === undefined
  )

  const isDisabledNext =
    emailList[emailListIndex].nextPageToken === null &&
    emailList[emailListIndex].threads[viewIndex + 1] === undefined

  const nextButtonSelector = () => {
    const { nextPageToken } = emailList[emailListIndex]
    if (
      emailList[emailListIndex].threads[viewIndex + 1] !== undefined &&
      labelIds
    ) {
      NavigateNextMail({
        labelIds,
        emailListIndex,
        emailList,
        viewIndex,
        dispatch,
      })

      // Attempt to load the next emails on the background when approaching the edge
      if ((emailList[emailListIndex].threads.length - 1) - viewIndex <= 4) {
        if (!isSilentLoading) {
          const silentLoading = true
          return loadNextPage({ nextPageToken, labelIds, dispatch, silentLoading })
        }
      }
    }
    // If loading isn't already happening, load the nextPage
    if (
      emailList[emailListIndex].nextPageToken !== null &&
      emailList[emailListIndex].threads[viewIndex + 1] === undefined
    ) {
      if (!isSilentLoading) {
        return loadNextPage({ nextPageToken, labelIds, dispatch })
      }
    }
    return null
  }

  const refetchEmailList = () => {
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
        return
      }
      refetchEmailList()
    }
  }, [currEmail, emailList])

  // Load additional emails when the first, current viewed email happens to be the last in the list
  useEffect(() => {
    if (viewIndex > -1 && !isSilentLoading && emailListIndex > -1) {
      if (emailList[emailListIndex].threads.length - 1 === viewIndex) {
        const { nextPageToken } = emailList[emailListIndex]
        const silentLoading = true
        if (nextPageToken !== null &&
          emailList[emailListIndex].threads[viewIndex + 1] === undefined) {
          return loadNextPage({ nextPageToken, labelIds, dispatch, silentLoading })
        }
      }
      return () => { }
    }
    return () => { }
  }, [viewIndex, isSilentLoading, emailListIndex])

  return (
    <DetailNavigationView
      labelIds={labelIds}
      emailListIndex={emailListIndex}
      emailList={emailList}
      viewIndex={viewIndex}
      isDisabledPrev={isDisabledPrev}
      isDisabledNext={isDisabledNext}
      nextButtonSelector={nextButtonSelector}
    />
  )
}

export default DetailNavigationContainer
