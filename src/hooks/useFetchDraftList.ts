import { useEffect } from 'react'

import { fetchDrafts } from '../store/draftsSlice'
import { useAppDispatch } from '../store/hooks'

export default function useFetchDraftList({
  shouldFetchDrafts,
}: {
  shouldFetchDrafts: boolean
}) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    let draftPromise: unknown
    if (shouldFetchDrafts) {
      void dispatch(fetchDrafts())
    }
  }, [shouldFetchDrafts])
}
