const NavigateNextMail = (props) => {
  const {
    history,
    labelURL,
    metaList,
    metaListIndex,
    filteredCurrentMetaList,
    viewIndex,
  } = props

  if (filteredCurrentMetaList) {
    const nextID = filteredCurrentMetaList[0].threads[viewIndex + 1].id
    return history.push(`/mail/${labelURL}/${nextID}/messages`)
  }
  if (metaList && metaListIndex > -1) {
    const nextID = metaList[metaListIndex].threads[viewIndex + 1].id
    return history.push(`/mail/${labelURL}/${nextID}/messages`)
  }
  return null
}

export default NavigateNextMail
