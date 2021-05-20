import { createApiClient } from '../data/api'
const api = createApiClient()

export const convertArrayToString = (data) => {
  const converted = data.toString().replace(',', '-')
  return converted
}

export const NavigatePreviousMail = (
  history,
  labelURL,
  emailList,
  viewIndex
) => {
  const prevID = emailList[viewIndex - 1].thread.id
  return history.push(`/mail/${labelURL}/${prevID}`)
}

export const NavigateNextMail = (history, labelURL, emailList, viewIndex) => {
  const nextID = emailList[viewIndex + 1].thread.id
  return history.push(`/mail/${labelURL}/${nextID}`)
}

export const CloseMail = (history) => {
  return history.push(`/inbox`)
}

export const startSort = (history, labelURL, emailList) => {
  return history.push(`/mail/${labelURL}/${emailList[0].thread.id}`)
}

export const createLabel = (label) => {
  const body = {
    labelVisibility: label.labelVisibility ?? 'labelShow',
    messageListVisibility: label.messageListVisibility ?? 'show',
    name: label.name ?? label,
  }
  api.createLabel(body)
}
