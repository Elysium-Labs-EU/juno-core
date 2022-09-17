import { useEffect } from 'react'

import { fetchDrafts } from '../store/draftsSlice'
import { useAppDispatch } from '../store/hooks'

export default function useFetchDraftList(draftDetails: any) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const draftPromise = dispatch(fetchDrafts())

    return () => {
      draftPromise.abort()
    }
  }, [draftDetails])
}
