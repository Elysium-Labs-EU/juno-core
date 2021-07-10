const NavigatePreviousMail = (props) => {
  const { history, labelURL, metaList, metaListIndex, viewIndex } = props
  if (metaList && metaListIndex > -1) {
    const prevID = metaList[metaListIndex].threads[viewIndex - 1].id
    return history.push(`/mail/${labelURL}/${prevID}/messages`)
  }
  return null
}

export default NavigatePreviousMail
