import type { TBaseState } from 'store/storeTypes/baseTypes'

interface IBaseLoader {
  hasError: boolean
}

export interface ILoadingComponent extends IBaseLoader {}

export interface IErrorNotification extends IBaseLoader {
  baseError: TBaseState['baseError']
  countDown: number
}
