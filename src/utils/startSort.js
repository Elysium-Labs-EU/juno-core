const startSort = (props) => {
  const { history, labelURL, metaList, metaListIndex } = props

  if (history && labelURL && metaList && metaListIndex > -1) {
    return history.push(
      `/mail/${labelURL}/${metaList[metaListIndex].threads[0].id}/messages`
    )
  }
  return null
}

export default startSort
