import { z } from 'zod'

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

export interface IUtilsState {
  activeModal: null | string
  alternateActions: boolean
  emailFetchSize: number
  inSearch: boolean
  isAvatarVisible: boolean
  isFlexibleFlowActive: boolean
  isLoading: boolean
  isProcessing: boolean
  isSending: IMessageSendStatusTimestamp | null
  isSentryActive: boolean
  isSilentLoading: boolean
  settingsLabelId: string | null
  systemStatusUpdate: ISystemStatusUpdateTimestamp | null
}

export const Location = z.object({
  pathname: z.string(),
  search: z.string(),
  hash: z.string(),
  state: z.any(),
  key: z.string(),
})
