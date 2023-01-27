import type { TThreadObject } from 'store/storeTypes/emailListTypes'

export interface IFilesOverview {
  threadDetail: TThreadObject | null | undefined
  isLoading: boolean
}
