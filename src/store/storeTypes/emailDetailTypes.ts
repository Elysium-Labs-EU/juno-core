export interface IEmailDetailState {
  coreStatus: string | null
  currEmail: string
  isReplying: boolean
  isForwarding: boolean
  viewIndex: number
  sessionViewIndex: number
  fetchStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}
