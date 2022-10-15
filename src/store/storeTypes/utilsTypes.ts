export type TUpdateType = 'success' | 'info' | 'warning' | 'error'

export interface ISystemStatusUpdate {
  message: string
  type: TUpdateType
}

export interface ISystemStatusUpdateTimestamp extends ISystemStatusUpdate {
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
    isSentryActive: boolean
    isSilentLoading: boolean
    settingsLabelId: string | null
    systemStatusUpdate: ISystemStatusUpdateTimestamp | null
  }

