import { GoogleLabel } from 'store/storeTypes/labelsTypes'

export interface IProfile {
  signature: string
  name: string
  picture: string
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

export type PrefetchedBoxes = GoogleLabel[][]
