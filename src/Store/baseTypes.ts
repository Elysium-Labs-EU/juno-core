export interface IProfile {
  emailAddress: string
  messagesTotal: number
  threadsTotal: number
  historyId: string
}

export interface IBaseState {
  baseLoaded: boolean
  profile: IProfile
  isAuthenticated: boolean
}
