const NavigateNextMail = (props) => {
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
  return null
}

export default NavigateNextMail
