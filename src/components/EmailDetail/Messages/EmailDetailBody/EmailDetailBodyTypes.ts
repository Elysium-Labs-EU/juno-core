import type { Dispatch, SetStateAction } from 'react'

import type { AppDispatch } from 'store/store'
import type { TFullMessage } from 'store/storeTypes/emailListTypes'

export interface IEmailDetailBody {
  threadDetailBody: any
  // threadDetailBody: IEmailMessagePayload
  detailBodyCSS: 'visible' | 'invisible'
  setUnsubscribeLink?: Dispatch<SetStateAction<string | null>>
  setBlockedTrackers?: Dispatch<SetStateAction<string[] | []>>
}

export interface IPostTreatmentBody
  extends Pick<IEmailDetailBody, 'setUnsubscribeLink'> {
  dispatch: AppDispatch
  activeDocument: HTMLDivElement | null
}

export interface IShadowBody
  extends Pick<IEmailDetailBody, 'setUnsubscribeLink'> {
  bodyState: TFullMessage['payload']['body']
}
