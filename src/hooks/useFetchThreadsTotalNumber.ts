import { useState, useEffect } from 'react'
import labelApi from '../data/labelApi'
import * as global from '../constants/globalConstants'
import { selectIsFetching } from '../store/emailListSlice'
import { useAppSelector } from '../store/hooks'

export default function useFetchThreadsTotalNumber(labelIds: string[]) {
  const [totalThreads, setTotalThreads] = useState(0)
  const [loadingState, setLoadingState] = useState(global.LOAD_STATE_MAP.idle)
  const isFetching = useAppSelector(selectIsFetching)

  useEffect(() => {
    let mounted = true
    if (isFetching) {
      const fetchLabel = async () => {
        try {
          setLoadingState(global.LOAD_STATE_MAP.loading)
          const response = await labelApi().fetchSingleLabel(labelIds[0])
          if ('threadsTotal' in response) {
            mounted && setTotalThreads(response.threadsTotal)
            mounted && setLoadingState(global.LOAD_STATE_MAP.loaded)
          } else {
            mounted && setLoadingState(global.LOAD_STATE_MAP.error)
          }
        } catch (err) {
          mounted && setLoadingState(global.LOAD_STATE_MAP.error)
        }
      }
      fetchLabel()
    }
    return () => {
      mounted = false
    }
  }, [isFetching])

  return { loadingState, totalThreads }
}
