import type { Dispatch, SetStateAction } from 'react'

import type { IEmailListObject } from 'store/storeTypes/emailListTypes'

export interface ISearchBody {
  q: string
  nextPageToken?: string | undefined | null
}

export interface ICommandPalletteSearchResults {
  focusedItemIndex: number
  handleOpenEmailEvent: (threadId: string) => void
  loadState: string
  loadMoreSearchResults: () => void
  searchResults: IEmailListObject | undefined
  setFocusedItemIndex: Dispatch<SetStateAction<number>>
}
