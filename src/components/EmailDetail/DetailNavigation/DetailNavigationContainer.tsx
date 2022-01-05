import React, { useEffect, useState } from 'react'
import { selectLabelIds } from '../../../Store/labelsSlice'
import { selectCurrentEmail, selectViewIndex } from '../../../Store/emailDetailSlice'
import NavigateNextMail from '../../../utils/navigateNextEmail'
import loadNextPage from '../../../utils/loadNextPage'
import { selectIsSilentLoading } from '../../../Store/utilsSlice'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import DetailNavigationView from './DetailNavigationView'
import { EmailListObject } from '../../../Store/emailListTypes'

const DetailNavigationContainer = ({ activeEmailList }: { activeEmailList: EmailListObject }) => {
  const labelIds = useAppSelector(selectLabelIds)
  const isSilentLoading = useAppSelector(selectIsSilentLoading)
  const currentEmail = useAppSelector(selectCurrentEmail)
  const viewIndex = useAppSelector(selectViewIndex)
  const [currLocal, setCurrLocal] = useState<string>('')
  const dispatch = useAppDispatch()

  const isDisabledPrev = !!(
    activeEmailList.threads[viewIndex - 1] === undefined
  )

  const isDisabledNext =
    activeEmailList.nextPageToken === null &&
    activeEmailList.threads[viewIndex + 1] === undefined

  const nextButtonSelector = () => {
    const { nextPageToken } = activeEmailList
    if (
      activeEmailList.threads.length > 0 && activeEmailList.threads[viewIndex + 1] !== undefined &&
      labelIds
    ) {
      NavigateNextMail({
        labelIds,
        activeEmailList,
        viewIndex,
        dispatch,
      })

      // Attempt to load the next emails on the background when approaching the edge
      if ((activeEmailList.threads.length - 1) - viewIndex <= 4) {
        if (!isSilentLoading) {
          const silentLoading = true
          return loadNextPage({ nextPageToken, labelIds, dispatch, silentLoading })
        }
      }
    }
    // If loading isn't already happening, load the nextPage
    if (
      activeEmailList.nextPageToken !== null &&
      activeEmailList.threads[viewIndex + 1] === undefined
    ) {
      if (!isSilentLoading) {
        return loadNextPage({ nextPageToken, labelIds, dispatch })
      }
    }
    return null
  }

  useEffect(() => {
    if (currentEmail !== currLocal) {
      if (activeEmailList.threads.length > 0) {
        setCurrLocal(currentEmail)
      }
    }
  }, [currentEmail, activeEmailList])

  // Load additional emails when the first, current viewed email happens to be the last in the list
  useEffect(() => {
    if (viewIndex > -1 && !isSilentLoading) {
      if (activeEmailList.threads.length - 1 === viewIndex) {
        const { nextPageToken } = activeEmailList
        const silentLoading = true
        if (nextPageToken &&
          activeEmailList.threads[viewIndex + 1] === undefined) {
          return loadNextPage({ nextPageToken, labelIds, dispatch, silentLoading })
        }
      }
      return () => { }
    }
    return () => { }
  }, [viewIndex, isSilentLoading])

  return (
    <DetailNavigationView
      labelIds={labelIds}
      activeEmailList={activeEmailList}
      viewIndex={viewIndex}
      isDisabledPrev={isDisabledPrev}
      isDisabledNext={isDisabledNext}
      nextButtonSelector={nextButtonSelector}
    />
  )
}

export default DetailNavigationContainer
