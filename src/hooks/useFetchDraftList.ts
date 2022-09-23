import { useEffect } from 'react'

import { fetchDrafts } from '../store/draftsSlice'
import { useAppDispatch } from '../store/hooks'
import isPromise from '../utils/isPromise'

export default function useFetchDraftList({
  shouldFetchDrafts,
}: {
  shouldFetchDrafts: boolean
}) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    let draftPromise: any
    if (shouldFetchDrafts) {
      draftPromise = dispatch(fetchDrafts())
    }
    return () => {
      if (isPromise(draftPromise)) {
        draftPromise.abort()
      }
    }
  }, [shouldFetchDrafts])
}
