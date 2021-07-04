const startSort = (props) => {
  const { history, labelURL, metaList } = props
  if (history && labelURL && metaList) {
    return history.push(`/mail/${labelURL}/${metaList[0].threads[0].id}`)
  }
  return null
}

export default startSort
