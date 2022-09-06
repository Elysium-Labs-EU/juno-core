import { useEffect } from 'react'
import { selectLabelIds } from '../../../store/labelsSlice'
import { selectViewIndex } from '../../../store/emailDetailSlice'
import * as global from '../../../constants/globalConstants'
import loadNextPage from '../../../utils/loadNextPage'
import {
  selectEmailListSize,
  selectIsSilentLoading,
} from '../../../store/utilsSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import DetailNavigationView from './DetailNavigationView'
import { IEmailListObject } from '../../../store/storeTypes/emailListTypes'

const DetailNavigationContainer = ({
  activeEmailList,
}: {
  activeEmailList: IEmailListObject
}) => {
  const dispatch = useAppDispatch()
  const labelIds = useAppSelector(selectLabelIds)
  const isSilentLoading = useAppSelector(selectIsSilentLoading)
  const viewIndex = useAppSelector(selectViewIndex)
  const emailFetchSize = useAppSelector(selectEmailListSize)

  const isDisabledPrev = !!(
    activeEmailList.threads[viewIndex - 1] === undefined
  )

  const isDisabledNext =
    activeEmailList.nextPageToken === undefined &&
    activeEmailList.threads[viewIndex + 1] === undefined

  // Load additional emails when the first, current viewed email happens to be the last in the list
  useEffect(() => {
    let mounted = true
    if (viewIndex > -1 && !isSilentLoading) {
      if (activeEmailList.threads.length - 1 === viewIndex && mounted) {
        const { nextPageToken } = activeEmailList
        const silentLoading = true
        if (
          nextPageToken &&
          activeEmailList.threads[viewIndex + 1] === undefined &&
          mounted
        ) {
          if (!labelIds.includes(global.SEARCH_LABEL) && mounted) {
            return loadNextPage({
              nextPageToken,
              labelIds,
              dispatch,
              silentLoading,
              maxResults: emailFetchSize,
            })
          }
        }
      }
    }
    return () => {
      mounted = false
    }
  }, [viewIndex, isSilentLoading])

  return (
    <DetailNavigationView
      activeEmailList={activeEmailList}
      isDisabledPrev={isDisabledPrev}
      isDisabledNext={isDisabledNext}
    />
  )
}

export default DetailNavigationContainer
