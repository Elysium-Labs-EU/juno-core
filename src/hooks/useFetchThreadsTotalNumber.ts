import { useEffect, useState } from 'react'

import { LOAD_STATE_MAP } from 'constants/globalConstants'
import labelApi from 'data/labelApi'
import { selectIsFetching } from 'store/emailListSlice'
import { useAppSelector } from 'store/hooks'

export default function useFetchThreadsTotalNumber(labelIds: Array<string>) {
  const [totalThreads, setTotalThreads] = useState(0)
  const [loadingState, setLoadingState] = useState(LOAD_STATE_MAP.idle)
  const isFetching = useAppSelector(selectIsFetching)

  const fetchLabel = async (mounted: boolean) => {
    try {
      setLoadingState(LOAD_STATE_MAP.loading)
      const [firstLabelId] = labelIds
      if (firstLabelId) {
        const response = await labelApi().fetchSingleLabel(firstLabelId)
        if (response && 'data' in response && response.data.threadsTotal) {
          mounted && setTotalThreads(response.data.threadsTotal)
          mounted && setLoadingState(LOAD_STATE_MAP.loaded)
        } else {
          mounted && setLoadingState(LOAD_STATE_MAP.error)
        }
      } else {
        mounted && setLoadingState(LOAD_STATE_MAP.error)
      }
    } catch (err) {
      mounted && setLoadingState(LOAD_STATE_MAP.error)
    }
  }

  useEffect(() => {
    let mounted = true
    if (isFetching) {
      void fetchLabel(mounted)
    }
    return () => {
      mounted = false
    }
  }, [isFetching])

  useEffect(() => {
    let mounted = true
    if (!isFetching && totalThreads === 0) {
      void fetchLabel(mounted)
    }
    return () => {
      mounted = false
    }
  }, [])

  return { loadingState, totalThreads }
}
