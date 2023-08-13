import type { TThreadObject } from 'store/storeTypes/emailListTypes'

export interface IInlineThreadActions {
  threadId: string
  isFocused: boolean
}
export interface InlineThreadActionsStyles {
  threadId: string
  isfocused: string
}

export interface IInlineThreadActionsRegular extends IInlineThreadActions {
  email: TThreadObject
  emailIndex: number
}
