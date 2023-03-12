import type { Dispatch, SetStateAction } from 'react'

import type { AppDispatch } from 'store/store'
import type {
  TEmailListObject,
  TFullMessage,
  TThreadObject,
} from 'store/storeTypes/emailListTypes'
import type { TLabelState } from 'store/storeTypes/labelsTypes'

export interface IRenderEmailDetail {
  activeEmailList: TEmailListObject
  showNoNavigation: boolean
  threadDetail: TThreadObject | undefined | null
  setShouldRefreshDetail: Dispatch<SetStateAction<boolean>>
}

export interface IFilesOverview {
  threadDetail: TThreadObject | null | undefined
}

export interface IMessagesOverview
  extends Pick<IRenderEmailDetail, 'threadDetail'> {
  children: JSX.Element
  labelIds: TLabelState['labelIds']
  tabbedViewActive: boolean
}

export interface IMappedMessages
  extends Pick<IMessagesOverview, 'threadDetail'> {
  indexMessageListener: (value: number) => void
  setShouldRefreshDetail: Dispatch<SetStateAction<boolean>>
}

export interface IReadMessage
  extends Pick<IMappedMessages, 'setShouldRefreshDetail' | 'threadDetail'> {
  handleClickListener: ({ mIndex }: { mIndex: number }) => void
  message: TThreadObject['messages'][0]
  messageIndex: number
}

export interface IEmailDetailBody {
  detailBodyCSS: 'visible' | 'invisible'
  threadDetailBody: TThreadObject['messages'][0]['payload']
}

export interface IShadowBody {
  email: TFullMessage['payload']['body']['emailHTML']
}

export interface IPostTreatmentBody {
  activeDocument: HTMLDivElement | null
  dispatch: AppDispatch
}
