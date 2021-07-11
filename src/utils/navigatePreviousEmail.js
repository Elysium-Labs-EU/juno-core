const NavigatePreviousMail = (props) => {
  const { history, labelURL, emailList, emailListIndex, viewIndex } = props
  if (emailList && emailListIndex > -1) {
    const prevID = emailList[emailListIndex].threads[viewIndex - 1].id
    return history.push(`/mail/${labelURL}/${prevID}/messages`)
  }
  return null
}

export default NavigatePreviousMail
