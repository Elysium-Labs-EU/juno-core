interface NavigateNextMailProps {
  history: any
  labelURL: string
  emailList?: any
  emailListIndex?: number
  filteredCurrentEmailList?: any
  viewIndex: number
}

const NavigateNextMail = (props: NavigateNextMailProps) => {
  const {
    history,
    labelURL,
    emailList,
    emailListIndex,
    filteredCurrentEmailList,
    viewIndex,
  } = props

  if (filteredCurrentEmailList) {
    const nextID = filteredCurrentEmailList[0].threads[viewIndex + 1].id
    return history.push(`/mail/${labelURL}/${nextID}/messages`)
  }
  if (emailList && emailListIndex && emailListIndex > -1) {
    const nextID = emailList[emailListIndex].threads[viewIndex + 1].id
    return history.push(`/mail/${labelURL}/${nextID}/messages`)
  }
  return null
}

export default NavigateNextMail
