import { createApiClient } from '../data/api'
const api = createApiClient()

export const convertArrayToString = (data) => {
  const converted = data.toString().replace(',', '-')
  return converted
}

export const NavigatePreviousMail = (props) => {
  const { history, labelURL, filteredMetaList, viewIndex } = props
  const prevID = filteredMetaList[0].threads[viewIndex - 1].id
  return history.push(`/mail/${labelURL}/${prevID}`)
}

export const NavigateNextMail = (props) => {
  const {
    history,
    labelURL,
    filteredMetaList,
    filteredCurrentMetaList,
    viewIndex,
  } = props
  if (filteredCurrentMetaList) {
    const nextID = filteredCurrentMetaList[0].threads[viewIndex + 1].id
    return history.push(`/mail/${labelURL}/${nextID}`)
  }
  if (filteredMetaList) {
    const nextID = filteredMetaList[0].threads[viewIndex + 1].id
    return history.push(`/mail/${labelURL}/${nextID}`)
  }
}

export const CloseMail = (props) => {
  const { history } = props
  return history.push(`/inbox`)
}

export const startSort = (props) => {
  const { history, labelURL, metaList } = props
  // export const startSort = (history, labelURL, emailList, metaList) => {
  // return history.push(`/mail/${labelURL}/${emailList[0].thread.id}`)
  return history.push(`/mail/${labelURL}/${metaList[0].id}`)
}

export const FilteredMetaList = (props) => {
  const { metaList, labelIds } = props
  return metaList.filter((threadList) =>
    threadList.labels.includes(...labelIds)
  )
}

export const FilteredEmailList = (props) => {
  const { emailList, labelIds } = props
  return emailList.filter((threadList) =>
    threadList.labels.includes(...labelIds)
  )
}

export const FindLabel = (props) => {
  const { storageLabels, LABEL_NAME } = props
  return (
    storageLabels && storageLabels.filter((label) => label.name === LABEL_NAME)
  )
}
