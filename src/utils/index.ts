import { MessagePayload } from '../Store/draftsTypes'
import { EmailListObject, EmailListThreadItem } from '../Store/emailListTypes'
import { LabelIdName } from '../Store/labelsTypes'
import { MetaListObject } from '../Store/metaListTypes'

export const convertArrayToString = (data: string | string[]) => {
  if (data && typeof data === 'string') {
    const converted = data.toString().replace(',', '-')
    return converted
  }
  if (data && Array.isArray(data)) {
    const converted = data[0].toString().replace(',', '-')
    return converted
    // return data.map((item) => item.toString().replace(',', '-'))
  }
  return ''
}

interface FilteredMetaListProps {
  metaList: MetaListObject[]
  labelIds: string[]
}

export const FilteredMetaList = (props: FilteredMetaListProps) => {
  const { metaList, labelIds } = props
  if (metaList && metaList.length > 0 && labelIds && labelIds.length > 0) {
    return metaList.filter((threadList) =>
      threadList.labels.includes(labelIds[0])
    )
  }
  return []
}

interface FilteredEmailListProps {
  emailList: EmailListObject[]
  labelIds: string[]
}

export const FilteredEmailList = (props: FilteredEmailListProps) => {
  const { emailList, labelIds } = props
  if (emailList.length > 0 && labelIds.length > 0) {
    return emailList.filter((threadList) =>
      threadList.labels.includes(labelIds[0])
    )
  }
  return []
}

export const multipleIncludes = (first: any, second: any) => {
  const indexArray = first.map((el: any) => second.indexOf(el))
  return indexArray.indexOf(-1) === -1
}

interface FindPayloadHeadersDataType {
  query: string
  email?: EmailListThreadItem
  threadDetail?: EmailListThreadItem
}

export const findPayloadHeadersData = (props: FindPayloadHeadersDataType) => {
  const { query, email, threadDetail } = props
  if (email) {
    if (email.messages) {
      return email.messages[0].payload.headers.find(
        (data: MessagePayload) => data.name === query
      )
        ? email.messages[0].payload.headers.find(
            (data: MessagePayload) => data.name === query
          ).value
        : undefined
    }
    if (email.message) {
      return email.message.payload.headers.find(
        (data: MessagePayload) => data.name === query
      )
        ? email.message.payload.headers.find(
            (data: MessagePayload) => data.name === query
          ).value
        : undefined
    }
  }

  if (threadDetail && threadDetail.messages) {
    return threadDetail.messages[0].payload.headers.find(
      (data: MessagePayload) => data.name === query
    )
      ? threadDetail.messages[0].payload.headers.find(
          (data: MessagePayload) => data.name === query
        ).value
      : undefined
  }
  return null
}
