import { createApiClient } from '../data/api'
const api = createApiClient()

export const convertArrayToString = (data) => {
  const converted = data.toString().replace(',', '-')
  return converted
}

export const NavigatePreviousMail = (props) => {
  const { history, labelURL, filteredMetaList, viewIndex } = props
  const prevID = filteredMetaList[0].threads[viewIndex - 1].id
  // const prevID = emailList[viewIndex - 1].thread.id
  return history.push(`/mail/${labelURL}/${prevID}`)
}

export const NavigateNextMail = (props) => {
  console.log(props)
  const { history, labelURL, filteredMetaList, viewIndex } = props
  const nextID = filteredMetaList[0].threads[viewIndex + 1].id
  console.log(nextID)
  // const nextID = emailList[viewIndex + 1].thread.id
  return history.push(`/mail/${labelURL}/${nextID}`)
}

export const CloseMail = (props) => {
  const { history } = props
  return history.push(`/inbox`)
}

export const startSort = (props) => {
  const { history, labelURL, metaList } = props
  // export const startSort = (history, labelURL, emailList, metaList) => {
  console.log(metaList)
  // return history.push(`/mail/${labelURL}/${emailList[0].thread.id}`)
  return history.push(`/mail/${labelURL}/${metaList[0].id}`)
}
