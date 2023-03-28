interface IBaseLoader {
  hasErrorToast: boolean
}

export interface ILoadingComponent extends IBaseLoader {}

export interface IErrorNotification extends IBaseLoader {
  countDown: number
}
