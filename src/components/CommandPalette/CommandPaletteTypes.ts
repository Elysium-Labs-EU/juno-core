import type { Dispatch, SetStateAction } from 'react'

import type { TEmailListObject } from 'store/storeTypes/emailListTypes'

export interface ISearchBody {
  q: string
  nextPageToken?: string | undefined | null
}

export interface ICommandPalletteSearchResults {
  focusedItemIndex: number
  handleOpenEmailEvent: (threadId: string) => void
  loadState: string
  loadMoreSearchResults: () => void
  searchResults: TEmailListObject | undefined
  setFocusedItemIndex: Dispatch<SetStateAction<number>>
}
