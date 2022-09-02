import { useState, useEffect } from 'react'
import labelApi from '../data/labelApi'
import * as global from '../constants/globalConstants'

export default function useFetchThreadsTotalNumber(labelIds: string[]) {
  const [totalThreads, setTotalThreads] = useState(0)
  const [loadingState, setLoadingState] = useState(global.LOAD_STATE_MAP.idle)

  useEffect(() => {
    let mounted = true
    const fetchLabel = async () => {
      try {
        setLoadingState(global.LOAD_STATE_MAP.loading)
        const response = await labelApi().fetchSingleLabel(labelIds[0])
        if (response?.threadsTotal) {
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
    return () => {
      mounted = false
    }
  }, [])

  return { loadingState, totalThreads }
}
