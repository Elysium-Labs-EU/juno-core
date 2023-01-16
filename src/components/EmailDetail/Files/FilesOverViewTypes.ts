import type { IEmailListThreadItem } from 'store/storeTypes/emailListTypes'

export interface IFilesOverview {
  threadDetail: IEmailListThreadItem | null | undefined
  isLoading: boolean
}
