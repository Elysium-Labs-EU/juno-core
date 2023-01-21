export type TUpdateType = 'success' | 'info' | 'warning' | 'error'
export type TActionType = 'copy' | 'close' | 'undo' | 'unsubscribe'

export interface ISystemStatusUpdate {
  actionType?: TActionType
  action?: string
  message: string
  type: TUpdateType
}

export interface ISystemStatusUpdateTimestamp extends ISystemStatusUpdate {
  timestamp: number
}

export type TSendStatusType = 'success' | 'info' | 'error'

export interface IMessageSendStatus {
  message: string
  type: TUpdateType
}

export interface IMessageSendStatusTimestamp extends IMessageSendStatus {
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
