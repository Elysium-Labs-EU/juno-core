import type { TThreadObject } from 'store/storeTypes/emailListTypes'

export interface IFilesOverview {
  isLoading: boolean
  threadDetail: TThreadObject | null | undefined
}
