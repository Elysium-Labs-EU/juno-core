const NavigatePreviousMail = (props) => {
  const { history, labelURL, filteredMetaList, viewIndex } = props
  const prevID = filteredMetaList[0].threads[viewIndex - 1].id
  return history.push(`/mail/${labelURL}/${prevID}`)
}

export default NavigatePreviousMail
