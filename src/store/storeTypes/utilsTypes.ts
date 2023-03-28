import { z } from 'zod'

import { ACTIVE_MODAL_MAP } from 'constants/globalConstants'

import type { TGmailV1SchemaLabelSchema } from './gmailBaseTypes/gmailTypes'
import type { TUserSettings } from './gmailBaseTypes/otherTypes'

type ActiveModalMapType =
  (typeof ACTIVE_MODAL_MAP)[keyof typeof ACTIVE_MODAL_MAP]

// We do not require the showIntroduction key here, since we will intercept it when setting the Settings.
export interface IUtilsState extends Omit<TUserSettings, 'showIntroduction'> {
  activeModal: null | ActiveModalMapType | string
  inSearch: boolean
  isLoading: boolean
  isProcessing: boolean
  isSentryActive: boolean
  isSilentLoading: boolean
  settingsLabel: TGmailV1SchemaLabelSchema | null
}

export const Location = z.object({
  pathname: z.string(),
  search: z.string(),
  hash: z.string(),
  state: z.any(),
  key: z.string(),
})
