export interface LoadEmailObject {
  labelIds: string[]
  maxResults: number
}

export interface MetaListThreadItem {
  id: string
  snippet: string
  historyId: string
}

export interface MetaListObject {
  labels: string[]
  threads: MetaListThreadItem[]
  nextPageToken: string
}

export interface MetaListState {
  metaList: MetaListObject[]
  isFetching: boolean
}
