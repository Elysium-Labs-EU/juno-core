import type { Dispatch, SetStateAction } from 'react'

import type { AppDispatch } from 'store/store'

export interface IEmailDetailBody {
  threadDetailBody: any
  // threadDetailBody: IEmailMessagePayload
  detailBodyCSS: 'visible' | 'invisible'
  setUnsubscribeLink?: Dispatch<SetStateAction<string | null>>
  setBlockedTrackers?: Dispatch<SetStateAction<string[] | []>>
}

export interface IBodyState {
  emailHTML: string
  emailFileHTML: any[]
  removedTrackers: string[] | []
}

export interface IPostTreatmentBody
  extends Pick<IEmailDetailBody, 'setUnsubscribeLink'> {
  dispatch: AppDispatch
  activeDocument: HTMLDivElement | null
}

export interface IShadowBody
  extends Pick<IEmailDetailBody, 'setUnsubscribeLink'> {
  bodyState: IBodyState
}
