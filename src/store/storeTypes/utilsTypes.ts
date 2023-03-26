import { z } from 'zod'

import type { TGmailV1SchemaLabelSchema } from './gmailBaseTypes/gmailTypes'
import type { TUserSettings } from './gmailBaseTypes/otherTypes'

type TUpdateType = 'success' | 'info' | 'warning' | 'error'
type TActionType = 'copy' | 'close' | 'undo' | 'unsubscribe'

export interface ISystemStatusUpdate {
  actionType?: TActionType
  action?: string
  message: string
  type: TUpdateType
}

interface ISystemStatusUpdateTimestamp extends ISystemStatusUpdate {
  timestamp: number
}

export interface IMessageSendStatus {
  message: string
  type: TUpdateType
}

interface IMessageSendStatusTimestamp extends IMessageSendStatus {
  timestamp: number
}

// We do not require the showIntroduction key here, since we will intercept it when setting the Settings.
export interface IUtilsState extends Omit<TUserSettings, 'showIntroduction'> {
  activeModal: null | string
  inSearch: boolean
  isLoading: boolean
  isProcessing: boolean
  isSending: IMessageSendStatusTimestamp | null
  isSentryActive: boolean
  isSilentLoading: boolean
  settingsLabel: TGmailV1SchemaLabelSchema | null
  systemStatusUpdate: ISystemStatusUpdateTimestamp | null
}

export const Location = z.object({
  pathname: z.string(),
  search: z.string(),
  hash: z.string(),
  state: z.any(),
  key: z.string(),
})
